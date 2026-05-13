import { mockTeams } from "@/constants/mock-teams";
import { Team } from "@/types/team";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PURPLE = "#4B1363";

type SortKey = "Domain" | "Members" | "Technology" | "Projects" | "Skills";
type FilterStatus = "all" | "available" | "busy";

export default function BrowseTeamsScreen() {
  const currentUser = { id: "1", fullName: "Sarah Chen" };

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>(null);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterMinRating, setFilterMinRating] = useState<string>("");
  const [filterMaxRating, setFilterMaxRating] = useState<string>("");
  const [filterMinProjects, setFilterMinProjects] = useState<string>("");
  const [filterMaxProjects, setFilterMaxProjects] = useState<string>("");
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [filterAchievements, setFilterAchievements] = useState<string[]>([]);

  const allAvailableSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    mockTeams.forEach((team) =>
      team.skills.forEach((skill) => skillsSet.add(skill)),
    );
    return Array.from(skillsSet).sort();
  }, []);

  const allAvailableAchievements = useMemo(() => {
    const achSet = new Set<string>();
    mockTeams.forEach((team) =>
      team.achievements.forEach((a) => achSet.add(a.title)),
    );
    return Array.from(achSet).sort();
  }, []);

  const processedTeams = useMemo(() => {
    let result = mockTeams.filter(
      (team) => !team.members.includes(currentUser.id),
    );

    if (filterStatus !== "all") {
      result = result.filter((team) => team.status === filterStatus);
    }

    const minR = parseFloat(filterMinRating);
    if (!isNaN(minR)) {
      result = result.filter((team) => team.rating >= minR);
    }
    const maxR = parseFloat(filterMaxRating);
    if (!isNaN(maxR)) {
      result = result.filter((team) => team.rating <= maxR);
    }

    const minP = parseInt(filterMinProjects, 10);
    if (!isNaN(minP)) {
      result = result.filter((team) => team.projectCount >= minP);
    }
    const maxP = parseInt(filterMaxProjects, 10);
    if (!isNaN(maxP)) {
      result = result.filter((team) => team.projectCount <= maxP);
    }

    if (filterSkills.length > 0) {
      result = result.filter((team) =>
        filterSkills.every((selectedSkill) =>
          team.skills.includes(selectedSkill),
        ),
      );
    }

    if (filterAchievements.length > 0) {
      result = result.filter((team) =>
        filterAchievements.every((selectedAch) =>
          team.achievements.some((a) => a.title === selectedAch),
        ),
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (team) =>
          team.name.toLowerCase().includes(query) ||
          team.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          team.skills.some((skill) => skill.toLowerCase().includes(query)),
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (sortConfig.key) {
          case "Domain":
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case "Members":
            valA = a.memberCount;
            valB = b.memberCount;
            break;
          case "Technology":
            valA = a.skills[0]?.toLowerCase() || "";
            valB = b.skills[0]?.toLowerCase() || "";
            break;
          case "Projects":
            valA = a.projectCount;
            valB = b.projectCount;
            break;
          case "Skills":
            valA = a.skills.length;
            valB = b.skills.length;
            break;
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [
    currentUser.id,
    searchQuery,
    sortConfig,
    filterStatus,
    filterMinRating,
    filterMaxRating,
    filterMinProjects,
    filterMaxProjects,
    filterSkills,
    filterAchievements,
  ]);

  const handleSort = (key: SortKey) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const toggleSkillFilter = (skill: string) => {
    setFilterSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const toggleAchievementFilter = (achievement: string) => {
    setFilterAchievements((prev) =>
      prev.includes(achievement)
        ? prev.filter((a) => a !== achievement)
        : [...prev, achievement],
    );
  };

  const getStatusColor = (status: string) => {
    return status === "available" ? "#22C55E" : "#EF4444";
  };

  const renderSortTabs = () => {
    const tabs: SortKey[] = [
      "Domain",
      "Members",
      "Technology",
      "Projects",
      "Skills",
    ];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {tabs.map((filter) => {
          const isActive = sortConfig?.key === filter;
          const direction = isActive ? sortConfig!.direction : "asc";
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => handleSort(filter)}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter}
              </Text>
              {isActive && (
                <Feather
                  name={
                    direction === "asc"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={14}
                  color="#fff"
                  style={styles.sortIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderAdvancedFilters = () => {
    if (!showAdvancedFilters) return null;

    return (
      <View style={styles.advancedFiltersContainer}>
        <Text style={styles.advancedFilterLabel}>Team Status</Text>
        <View style={styles.pillRow}>
          {(["all", "available", "busy"] as FilterStatus[]).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.pill,
                filterStatus === status && styles.pillActive,
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.pillText,
                  filterStatus === status && styles.pillTextActive,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.advancedFilterLabel}>Rating Range</Text>
        <View style={styles.numberInputRow}>
          <TextInput
            style={styles.numberInput}
            placeholder="Min (e.g. 3.5)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={filterMinRating}
            onChangeText={setFilterMinRating}
            maxLength={3}
          />
          <Text style={styles.numberDash}>-</Text>
          <TextInput
            style={styles.numberInput}
            placeholder="Max (e.g. 5.0)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={filterMaxRating}
            onChangeText={setFilterMaxRating}
            maxLength={3}
          />
        </View>

        <Text style={styles.advancedFilterLabel}>Total Projects Range</Text>
        <View style={styles.numberInputRow}>
          <TextInput
            style={styles.numberInput}
            placeholder="Min (e.g. 5)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={filterMinProjects}
            onChangeText={setFilterMinProjects}
            maxLength={4}
          />
          <Text style={styles.numberDash}>-</Text>
          <TextInput
            style={styles.numberInput}
            placeholder="Max (e.g. 20)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={filterMaxProjects}
            onChangeText={setFilterMaxProjects}
            maxLength={4}
          />
        </View>

        <Text style={styles.advancedFilterLabel}>
          Technologies (Must have all)
        </Text>
        <View style={styles.pillRow}>
          {allAvailableSkills.map((skill) => {
            const isSelected = filterSkills.includes(skill);
            return (
              <TouchableOpacity
                key={skill}
                style={[styles.pill, isSelected && styles.pillActive]}
                onPress={() => toggleSkillFilter(skill)}
              >
                <Text
                  style={[styles.pillText, isSelected && styles.pillTextActive]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.advancedFilterLabel}>
          Achievements (Must have all)
        </Text>
        <View style={styles.pillRow}>
          {allAvailableAchievements.map((ach) => {
            const isSelected = filterAchievements.includes(ach);
            return (
              <TouchableOpacity
                key={ach}
                style={[styles.pill, isSelected && styles.pillActive]}
                onPress={() => toggleAchievementFilter(ach)}
              >
                <Feather
                  name="award"
                  size={12}
                  color={isSelected ? "#fff" : "#6B7280"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[styles.pillText, isSelected && styles.pillTextActive]}
                >
                  {ach}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTeamCard = ({ item }: { item: Team }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/team-details/[id]",
          params: { id: item.id },
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.memberCount}>{item.memberCount} members</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.teamName}>{item.name}</Text>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.arrowButton}>
        <Feather name="chevron-right" size={24} color={PURPLE} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Browse Teams", headerShown: false }} />

      <View style={styles.headerArea}>
        <Text style={styles.title}>Browse Teams</Text>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..." 
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              multiline={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Feather name="x-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.filterToggleButton,
              showAdvancedFilters && styles.filterToggleButtonActive,
            ]}
            onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Feather
              name="sliders"
              size={20}
              color={showAdvancedFilters ? "#fff" : PURPLE}
            />
          </TouchableOpacity>
        </View>

        {showAdvancedFilters && (
          <ScrollView
            style={{ maxHeight: 350 }}
            showsVerticalScrollIndicator={true}
          >
            {renderAdvancedFilters()}
          </ScrollView>
        )}
      </View>

      {renderSortTabs()}

      <FlatList
        data={processedTeams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeamCard}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No teams match your current filters.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerArea: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: PURPLE,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
  filterToggleButton: {
    height: 44,
    width: 44,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  filterToggleButtonActive: {
    backgroundColor: PURPLE,
  },
  advancedFiltersContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  advancedFilterLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 8,
    marginTop: 4,
    textTransform: "uppercase",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
  pillTextActive: {
    color: "#fff",
  },
  numberInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  numberInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#111827",
  },
  numberDash: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  filterContainer: {
    minHeight: 50, 
    marginVertical: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  filterContent: {
    paddingHorizontal: 20, 
    gap: 8,
    paddingRight: 32,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 36, 
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
  },
  filterTabActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#fff",
  },
  sortIcon: {
    marginLeft: 6,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F59E0B",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "700",
    color: PURPLE,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    fontSize: 11,
    color: "#6B7280",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    fontWeight: "500",
  },
  arrowButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
    fontSize: 16,
  },
});
