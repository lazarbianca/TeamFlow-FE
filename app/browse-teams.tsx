import { mockTeams } from "@/constants/mock-teams";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PURPLE = "#4B1363";

const FILTER_TABS = ["Domain", "Technology", "Experience", "Skills"];

export default function BrowseTeamsScreen() {
  const [activeFilter, setActiveFilter] = useState(0);

  // Current user (pretend this comes from auth context)
  const currentUser = { id: "1", fullName: "Sarah Chen" };

  const allTeams = useMemo(() => {
    return mockTeams.filter((team) => !team.members.includes(currentUser.id));
  }, []);

  const getStatusColor = (status: string) => {
    return status === "available" ? "#22C55E" : "#EF4444";
  };

  const renderFilterTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {FILTER_TABS.map((filter, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setActiveFilter(index)}
          style={[
            styles.filterTab,
            activeFilter === index && styles.filterTabActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === index && styles.filterTextActive,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTeamCard = ({ item }: any) => (
    <View style={styles.card}>
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

      <TouchableOpacity style={styles.arrowButton}>
        <Feather name="chevron-right" size={24} color={PURPLE} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Browse Teams" }} />

      <View style={styles.searchDiv}>
        <Text style={styles.title}>Browse Teams</Text>
      </View>

      {renderFilterTabs()}

      <FlatList
        data={allTeams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeamCard}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchDiv: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: PURPLE,
    marginTop: 10,
  },
  filterContainer: {
    marginVertical: 16,
    paddingHorizontal: 20,
    flexGrow: 0,
  },
  filterContent: {
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
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
});
