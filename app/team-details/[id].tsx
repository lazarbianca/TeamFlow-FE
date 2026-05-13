// /app/team-details/[id].tsx
import { mockTeams } from "@/constants/mock-teams";
import { useAppContext } from "@/context/AppContext";
import { Team } from "@/types/team";
import { Feather } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#4B1363";

export default function TeamDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();

  const { requestedTeams, addRequestedTeam } = useAppContext();

  const teamId = useMemo(() => {
    const { id } = params;
    return Array.isArray(id) ? id[0] : id;
  }, [params]);

  const team: Team | undefined = useMemo(() => {
    if (!teamId) return undefined;
    return mockTeams.find((t) => t.id === teamId);
  }, [teamId]);

  const StatPill = ({
    icon,
    text,
  }: {
    icon: React.ComponentProps<typeof Feather>["name"];
    text: string;
  }) => (
    <View style={styles.statPill}>
      <Feather name={icon} size={16} color={PURPLE} />
      <Text style={styles.statPillText}>{text}</Text>
    </View>
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/browse-teams");
  };

  const hasAlreadyRequested = teamId ? requestedTeams.has(teamId) : false;

  const isJoinDisabled =
    !team || team.status !== "available" || hasAlreadyRequested;

  const handleJoin = () => {
    if (isJoinDisabled || !team || !teamId) return;

    addRequestedTeam(teamId);

    alert(`You have requested to join ${team.name}.`);
  };

  let buttonText = "Join";
  if (team?.status === "busy") {
    buttonText = "Busy";
  } else if (hasAlreadyRequested) {
    buttonText = "Requested";
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.hero}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          activeOpacity={0.8}
        >
          <Feather name="chevron-left" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroRow}>
          <Text
            style={styles.heroTitle}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {team?.name ?? "Team Details"}
          </Text>

          <View style={styles.heroAvatarWrap}>
            {team?.avatar ? (
              <Image source={{ uri: team.avatar }} style={styles.heroAvatar} />
            ) : (
              <View style={[styles.heroAvatar, styles.heroAvatarPlaceholder]} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          {!team ? (
            <>
              <Text style={styles.pageTitle}>Team not found</Text>
              <Text style={styles.pageSubtitle}>
                We could not find a team for id: {teamId ?? "(missing)"}
              </Text>
            </>
          ) : (
            <>
              <View style={styles.portfolioRow}>
                <Text style={styles.portfolioLabel}>PORTFOLIO</Text>

                <View style={styles.statsRow}>
                  <StatPill icon="star" text={team.rating.toFixed(1)} />
                  <StatPill
                    icon="award"
                    text={`${team.projectCount} projects`}
                  />
                  <StatPill icon="user" text={`${team.memberCount}`} />
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>SKILLS</Text>
                <View style={styles.skillPillsRow}>
                  {team.skills.map((skill) => (
                    <View key={skill} style={styles.skillPill}>
                      <Text style={styles.skillPillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>ACHIEVEMENTS</Text>
                <View style={styles.achievementList}>
                  {team.achievements.map((a, idx) => (
                    <View
                      key={`${a.title}-${idx}`}
                      style={styles.achievementRow}
                    >
                      <View style={styles.achievementIconWrap}>
                        <Feather
                          name={idx % 2 === 0 ? "trending-up" : "star"}
                          size={28}
                          color="#111827"
                        />
                      </View>
                      <View style={styles.achievementTextWrap}>
                        <Text style={styles.achievementTitle}>{a.title}</Text>
                        <Text style={styles.achievementSubtitle}>
                          {a.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>RECENT PROJECTS</Text>
                <View style={styles.projectsList}>
                  {team.recentProjects.map((p, idx) => (
                    <View
                      key={`${p.name}-${idx}`}
                      style={[
                        styles.projectRow,
                        idx !== 0 && styles.projectRowDivider,
                      ]}
                    >
                      <View style={styles.projectTextWrap}>
                        <Text style={styles.projectName}>{p.name}</Text>
                        <Text style={styles.projectMeta}>
                          {p.client}, {p.date}
                        </Text>
                      </View>

                      <View style={styles.projectRatingPill}>
                        <Feather name="star" size={16} color="#F59E0B" />
                        <Text style={styles.projectRatingText}>{p.rating}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.joinBar}>
          <TouchableOpacity
            style={[
              styles.joinButton,
              isJoinDisabled && styles.joinButtonDisabled,
            ]}
            onPress={handleJoin}
            disabled={isJoinDisabled}
            accessibilityRole="button"
            accessibilityLabel="Join team"
            accessibilityState={{ disabled: isJoinDisabled }}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.joinButtonText,
                isJoinDisabled && styles.joinButtonTextDisabled,
              ]}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>

          {team?.status === "busy" && !hasAlreadyRequested && (
            <Text style={styles.joinHint}>This team is currently busy.</Text>
          )}
          {hasAlreadyRequested && (
            <Text style={styles.joinHint}>Your request is pending review.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },
  hero: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: PURPLE,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    zIndex: 10,
    elevation: 10,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 44,
  },
  heroTitle: {
    flex: 1,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: "500",
    color: "#fff",
    marginRight: 16,
    fontFamily: "serif",
  },
  heroAvatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heroAvatar: { width: "100%", height: "100%" },
  heroAvatarPlaceholder: { backgroundColor: "rgba(255,255,255,0.25)" },
  body: { flex: 1, backgroundColor: "#fff" },
  bodyContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  scroll: { flex: 1 },
  joinBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  joinButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PURPLE,
  },
  joinButtonDisabled: { backgroundColor: "#D1D5DB" },
  joinButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  joinButtonTextDisabled: { color: "#6B7280" },
  joinHint: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  pageTitle: { fontSize: 18, fontWeight: "800", color: PURPLE },
  pageSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  portfolioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  portfolioLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },
  statsRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1C4DB",
    backgroundColor: "#F6F0FA",
  },
  statPillText: { fontSize: 15, fontWeight: "800", color: "#374151" },
  card: {
    backgroundColor: "#FBF5FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#9CA3AF",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  skillPillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  skillPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C8C3CF",
    backgroundColor: "#F7F1FB",
  },
  skillPillText: { fontSize: 16, fontWeight: "800", color: "#4B5563" },
  achievementList: { gap: 18 },
  achievementRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  achievementIconWrap: { width: 44, alignItems: "center" },
  achievementTextWrap: { flex: 1 },
  achievementTitle: { fontSize: 20, fontWeight: "900", color: "#111827" },
  achievementSubtitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
  },
  projectsList: { gap: 16 },
  projectRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  projectRowDivider: { paddingTop: 12 },
  projectTextWrap: { flex: 1 },
  projectName: { fontSize: 20, fontWeight: "900", color: "#111827" },
  projectMeta: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
  },
  projectRatingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C8C3CF",
    backgroundColor: "#F7F1FB",
  },
  projectRatingText: { fontSize: 16, fontWeight: "800", color: "#374151" },
});
