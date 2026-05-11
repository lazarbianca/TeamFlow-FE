import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PURPLE = "#4B1363";

export default function TeamDMScreen() {
  const { id, dm } = useLocalSearchParams<{
    id: string;
    dm: string;
  }>();

  const team = useMemo(() => mockTeams.find((t) => t.id === id), [id]);
  const currentDM = useMemo(
    () => team?.directMessages.find((item) => item.id === dm),
    [team, dm],
  );

  const otherUser = useMemo(
    () => mockUsers.find((user) => user.id === currentDM?.otherUserId),
    [currentDM],
  );

  const [messages, setMessages] = useState(currentDM?.messages || []);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (!team || !currentDM || !otherUser) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>DM not found</Text>
          <Text style={styles.emptyStateText}>
            The selected direct message does not exist for this team.
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
              const newReactions = msg.reactions.map((r) =>
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
              const newReactions = msg.reactions.map((r) =>
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
        <Text style={styles.headerTitle}>{otherUser.fullName}</Text>
        <Image source={{ uri: otherUser.avatar }} style={styles.headerAvatar} />
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
                Start the conversation with {otherUser.fullName}.
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
                  : { fullName: "Unknown" });
              const isCurrentUser = message.userId === "currentUser";

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
          placeholder={`Message ${otherUser.fullName}`}
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
          <Feather name="arrow-up" size={20} color="#fff" />
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
    backgroundColor: "#F3F4F6",
    marginRight: 60,
  },
  messageBubbleRight: {
    backgroundColor: "#E9D5FF",
    marginLeft: 60,
    alignSelf: "flex-end",
  },
  messageTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  messageTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
  },
  reactionsRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  reactionPill: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reactionText: {
    fontSize: 14,
    color: "#6B7280",
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
  reactionButtonActive: {
    backgroundColor: PURPLE,
  },
  reactionButtonText: {
    fontSize: 14,
    color: "#6B7280",
  },
  reactionButtonTextActive: {
    color: "#fff",
  },
  composerBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  composerInput: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PURPLE,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: 280,
  },
});
