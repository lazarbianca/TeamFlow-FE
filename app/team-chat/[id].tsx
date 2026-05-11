import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PURPLE = "#4B1363";

export default function TeamChatHubScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const team = useMemo(() => mockTeams.find((t) => t.id === id), [id]);

  if (!team) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>Team not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header matching your mockup */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{team.name}</Text>
        <Image source={{ uri: team.avatar }} style={styles.headerAvatar} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* CHANNELS SECTION */}
        <Text style={styles.sectionTitle}>CHANNELS</Text>
        <View style={styles.listContainer}>
          {team.channels?.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={styles.channelRow}
              onPress={() =>
                router.push(`/team-chat/${id}/channel/${channel.name}`)
              }
            >
              <Text style={styles.channelName}>#{channel.name}</Text>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
          {(!team.channels || team.channels.length === 0) && (
            <Text style={styles.emptyText}>No channels yet.</Text>
          )}
        </View>

        {/* DIRECT MESSAGES SECTION */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>
          DIRECT MESSAGES
        </Text>
        <View style={styles.listContainer}>
          {team.directMessages?.map((dm) => {
            const user = mockUsers.find((u) => u.id === dm.otherUserId);
            if (!user) return null;

            return (
              <TouchableOpacity
                key={dm.id}
                style={styles.dmRow}
                onPress={() => router.push(`/team-chat/${id}/dm/${dm.id}`)}
              >
                <View style={styles.dmUserInfo}>
                  {user.avatar ? (
                    <Image
                      source={{ uri: user.avatar }}
                      style={styles.userAvatar}
                    />
                  ) : (
                    <View style={styles.placeholderAvatar}>
                      <Feather name="user" size={18} color={PURPLE} />
                    </View>
                  )}
                  <Text style={styles.dmUserName}>{user.fullName}</Text>
                </View>

                {/* Unread Badge */}
                {dm.unreadCount && dm.unreadCount > 0 ? (
                  <Text style={styles.unreadText}>
                    {dm.unreadCount > 9 ? "10+" : `${dm.unreadCount}+`}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
          {(!team.directMessages || team.directMessages.length === 0) && (
            <Text style={styles.emptyText}>No direct messages yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE, // Top notch area is purple
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "serif",
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  listContainer: {
    backgroundColor: "#FCFAFF", // Slight purple tint matching mockup
    borderRadius: 12,
    paddingVertical: 8,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  dmRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dmUserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  placeholderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#D1C4DB",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F0FA",
  },
  dmUserName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  unreadText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  emptyText: {
    padding: 16,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
});
