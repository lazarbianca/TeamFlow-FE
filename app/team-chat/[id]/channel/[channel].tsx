import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { useAppContext } from "@/context/AppContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PURPLE = "#4B1363";

export default function TeamChannelScreen() {
  const params = useLocalSearchParams();
  const teamId = Array.isArray(params.id) ? params.id[0] : params.id;
  const channelName = Array.isArray(params.channel)
    ? params.channel[0]
    : params.channel;

  const team = useMemo(() => mockTeams.find((t) => t.id === teamId), [teamId]);
  const currentChannel = useMemo(
    () => team?.channels.find((item) => item.name === channelName),
    [team, channelName],
  );

  const {
    chatMessages,
    updateChatMessages,
    initializeChatMessages,
    userReactions,
    toggleUserReaction,
  } = useAppContext();
  const chatKey = `${teamId}_${channelName}`;

  useEffect(() => {
    if (currentChannel) {
      initializeChatMessages(chatKey, currentChannel.messages || []);
    }
  }, [currentChannel, chatKey, initializeChatMessages]);

  const messages = useMemo(
    () => chatMessages[chatKey] || [],
    [chatMessages, chatKey],
  );
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const isAnnouncements = currentChannel?.name === "announcements";
  const insets = useSafeAreaInsets(); // FIX: Dynamic Safe Area

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (!team || !currentChannel) {
    return (
      <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Channel not found</Text>
          <Text style={styles.emptyStateText}>
            The selected channel &quot;{channelName}&quot; does not exist for
            this team.
          </Text>
        </View>
      </View>
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
      updateChatMessages(chatKey, [...messages, newMessage]);
      setInputText("");
    }
  };

  const handleReaction = (messageId: string) => {
    const hasUserReacted = userReactions.has(messageId);

    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(
          (r: any) => r.emoji === "👍",
        );

        if (hasUserReacted) {
          if (existingReaction && existingReaction.count > 1) {
            const newReactions = msg.reactions!.map((r: any) =>
              r.emoji === "👍" ? { ...r, count: r.count - 1 } : r,
            );
            return { ...msg, reactions: newReactions };
          } else {
            const newReactions =
              msg.reactions?.filter((r: any) => r.emoji !== "👍") || [];
            return {
              ...msg,
              reactions: newReactions.length ? newReactions : undefined,
            };
          }
        } else {
          if (existingReaction) {
            const newReactions = msg.reactions!.map((r: any) =>
              r.emoji === "👍" ? { ...r, count: r.count + 1 } : r,
            );
            return { ...msg, reactions: newReactions };
          } else {
            const newReactions = [
              ...(msg.reactions || []),
              { emoji: "👍", count: 1 },
            ];
            return { ...msg, reactions: newReactions };
          }
        }
      }
      return msg;
    });

    updateChatMessages(chatKey, updatedMessages);
    toggleUserReaction(messageId); // Update global state!
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
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
                        {/* Status Badge */}
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
                      {/* Approval Box */}
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
                          {message.reactions.map((reaction: any) => (
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

        <View
          style={[
            styles.composerBar,
            { paddingBottom: Math.max(insets.bottom, 14) },
          ]}
        >
          <TextInput
            style={styles.composerInput}
            placeholder={`Message #${currentChannel.name}`}
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Enter") {
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: PURPLE },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: { marginRight: 12 },
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
  body: { flex: 1, backgroundColor: "#fff" },
  messagesContainer: { padding: 20, paddingBottom: 24 },
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
  messageBubbleLeft: { alignSelf: "flex-start", backgroundColor: "#F3F4F6" },
  messageBubbleRight: { alignSelf: "flex-end", backgroundColor: "#E9D5FF" },
  messageTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  messageAuthor: { fontWeight: "700", color: "#111827" },
  messageTime: { fontSize: 12, color: "#6B7280" },
  messageText: { fontSize: 15, color: "#374151", lineHeight: 22 },
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
  announcementAvatar: { width: 40, height: 40, borderRadius: 12 },
  announcementMeta: { flex: 1 },
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
  badgePending: { backgroundColor: "#F3F4F6" },
  badgePendingText: { color: "#6B7280" },
  badgeApproved: { backgroundColor: "#E9D5FF" },
  badgeApprovedText: { color: "#6B21A8" },
  approvalBox: { borderRadius: 18, backgroundColor: "#E9D5FF", padding: 14 },
  approvalTitle: { fontWeight: "700", color: "#3F1852", marginBottom: 4 },
  approvalNote: { color: "#3F1852", lineHeight: 20 },
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
  reactionText: { color: "#374151", fontSize: 13 },
  composerBar: {
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
  sendButtonDisabled: { backgroundColor: "#D1D5DB" },
  reactionButton: {
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  reactionButtonLeft: { alignSelf: "flex-start", marginLeft: 16 },
  reactionButtonRight: { alignSelf: "flex-end", marginRight: 16 },
  reactionButtonText: { fontSize: 14, color: "#6B7280" },
  reactionButtonActive: { backgroundColor: PURPLE },
  reactionButtonTextActive: { color: "#fff" },
  emptyStateContainer: { padding: 28, alignItems: "center" },
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
