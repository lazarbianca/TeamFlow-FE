import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PURPLE = "#4B1363";

export default function TeamChannelScreen() {
  const { id, channel } = useLocalSearchParams<{
    id: string;
    channel: string;
  }>();

  const team = useMemo(() => mockTeams.find((t) => t.id === id), [id]);
  const currentChannel = useMemo(
    () => team?.channels.find((item) => item.name === channel),
    [team, channel],
  );

  const [messages, setMessages] = useState(currentChannel?.messages || []);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const isAnnouncements = currentChannel?.name === "announcements";

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (!team || !currentChannel) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Channel not found</Text>
          <Text style={styles.emptyStateText}>
            The selected channel does not exist for this team.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: `msg_${Date.now()}`,
        userId: "currentUser",
        content: inputText.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    }
  };

  const handleReaction = (messageId: string) => {
    const hasUserReacted = userReactions.has(messageId);

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === "👍");

          if (hasUserReacted) {
            // User is removing their reaction
            if (existingReaction && existingReaction.count > 1) {
              // Decrement count
              const newReactions = msg.reactions?.map((r) =>
                r.emoji === "👍" ? { ...r, count: r.count - 1 } : r,
              );
              return { ...msg, reactions: newReactions };
            } else {
              // Remove reaction entirely
              const newReactions =
                msg.reactions?.filter((r) => r.emoji !== "👍") || [];
              return {
                ...msg,
                reactions: newReactions.length ? newReactions : undefined,
              };
            }
          } else {
            // User is adding reaction
            if (existingReaction) {
              // Increment existing count
              const newReactions = msg.reactions?.map((r) =>
                r.emoji === "👍" ? { ...r, count: r.count + 1 } : r,
              );
              return { ...msg, reactions: newReactions };
            } else {
              // Add new reaction
              const newReactions = [
                ...(msg.reactions || []),
                { emoji: "👍", count: 1 },
              ];
              return { ...msg, reactions: newReactions };
            }
          }
        }
        return msg;
      }),
    );

    // Update user reaction state
    setUserReactions((prev) => {
      const newSet = new Set(prev);
      if (hasUserReacted) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>#{currentChannel.name}</Text>
        <Image source={{ uri: team.avatar }} style={styles.headerAvatar} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>No messages yet</Text>
              <Text style={styles.emptyStateText}>
                Start the conversation in this channel.
              </Text>
            </View>
          ) : (
            messages.map((message) => {
              const sender =
                mockUsers.find((user) => user.id === message.userId) ??
                (message.userId === "currentUser"
                  ? {
                      fullName: "You",
                      avatar: "https://i.pravatar.cc/150?u=you",
                    }
                  : {
                      fullName: "Unknown",
                      avatar: "https://i.pravatar.cc/150?u=unknown",
                    });
              const isCurrentUser = message.userId === "currentUser";

              if (isAnnouncements) {
                return (
                  <View key={message.id} style={styles.announcementCard}>
                    <View style={styles.announcementHeader}>
                      <View style={styles.avatarWrapper}>
                        <Image
                          source={{ uri: sender.avatar }}
                          style={styles.announcementAvatar}
                        />
                      </View>
                      <View style={styles.announcementMeta}>
                        <Text style={styles.messageAuthor}>
                          {sender.fullName}
                        </Text>
                        <Text style={styles.messageTime}>
                          {message.timestamp}
                        </Text>
                      </View>
                      {message.status ? (
                        <View
                          style={[
                            styles.announcementBadge,
                            message.status === "approved"
                              ? styles.badgeApproved
                              : styles.badgePending,
                          ]}
                        >
                          <Text
                            style={[
                              styles.announcementBadgeText,
                              message.status === "approved"
                                ? styles.badgeApprovedText
                                : styles.badgePendingText,
                            ]}
                          >
                            {message.status}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.announcementText} numberOfLines={0}>
                      {message.content}
                    </Text>
                    {message.approval ? (
                      <View style={styles.approvalBox}>
                        <Text style={styles.approvalTitle}>
                          {message.approval.approver}
                        </Text>
                        <Text style={styles.approvalNote}>
                          {message.approval.note}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              }

              return (
                <View key={message.id}>
                  <View
                    style={[
                      styles.messageBubble,
                      isCurrentUser
                        ? styles.messageBubbleRight
                        : styles.messageBubbleLeft,
                    ]}
                  >
                    <View style={styles.messageTopRow}>
                      <Text style={styles.messageAuthor}>
                        {sender.fullName}
                      </Text>
                      <Text style={styles.messageTime}>
                        {message.timestamp}
                      </Text>
                    </View>
                    <Text style={styles.messageText} numberOfLines={0}>
                      {message.content}
                    </Text>
                    {message.reactions?.length ? (
                      <View style={styles.reactionsRow}>
                        {message.reactions.map((reaction) => (
                          <View
                            key={reaction.emoji}
                            style={styles.reactionPill}
                          >
                            <Text style={styles.reactionText}>
                              {reaction.emoji} {reaction.count}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.reactionButton,
                      isCurrentUser
                        ? styles.reactionButtonRight
                        : styles.reactionButtonLeft,
                      userReactions.has(message.id) &&
                        styles.reactionButtonActive,
                    ]}
                    onPress={() => handleReaction(message.id)}
                  >
                    <Text
                      style={[
                        styles.reactionButtonText,
                        userReactions.has(message.id) &&
                          styles.reactionButtonTextActive,
                      ]}
                    >
                      👍
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <View style={styles.composerBar}>
        <TextInput
          style={styles.composerInput}
          placeholder={`Message #${currentChannel.name}`}
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter" && !e.nativeEvent.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE,
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
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 96,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  messageBubbleLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
  },
  messageBubbleRight: {
    alignSelf: "flex-end",
    backgroundColor: "#E9D5FF",
  },
  messageTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  messageAuthor: {
    fontWeight: "700",
    color: "#111827",
  },
  messageTime: {
    fontSize: 12,
    color: "#6B7280",
  },
  messageText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  announcementCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  announcementAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  announcementMeta: {
    flex: 1,
  },
  announcementText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#111827",
    marginBottom: 12,
  },
  announcementBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  announcementBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  badgePending: {
    backgroundColor: "#F3F4F6",
  },
  badgePendingText: {
    color: "#6B7280",
  },
  badgeApproved: {
    backgroundColor: "#E9D5FF",
  },
  badgeApprovedText: {
    color: "#6B21A8",
  },
  approvalBox: {
    borderRadius: 18,
    backgroundColor: "#E9D5FF",
    padding: 14,
  },
  approvalTitle: {
    fontWeight: "700",
    color: "#3F1852",
    marginBottom: 4,
  },
  approvalNote: {
    color: "#3F1852",
    lineHeight: 20,
  },
  reactionsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 12,
  },
  reactionPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  reactionText: {
    color: "#374151",
    fontSize: 13,
  },
  composerBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  composerInput: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#374151",
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: PURPLE,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  reactionButton: {
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  reactionButtonLeft: {
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  reactionButtonRight: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  reactionButtonText: {
    fontSize: 14,
    color: "#6B7280",
  },
  reactionButtonActive: {
    backgroundColor: PURPLE,
  },
  reactionButtonTextActive: {
    color: "#fff",
  },
  emptyStateContainer: {
    padding: 28,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});