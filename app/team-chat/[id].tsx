// /app/team-chat/[id].tsx
import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { SharedFile } from "@/types/team";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const PURPLE = "#4B1363";

export default function TeamChatHubScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const team = useMemo(() => mockTeams.find((t) => t.id === id), [id]);

  // Local state for files so we can mock uploading in real-time
  const [files, setFiles] = useState<SharedFile[]>(team?.sharedFiles || []);
  const [isUploading, setIsUploading] = useState(false);

  if (!team) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>Team not found.</Text>
      </SafeAreaView>
    );
  }

  // Helper to get the right icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'file-text';
      case 'image': return 'image';
      case 'archive': return 'archive';
      case 'code': return 'code';
      default: return 'file';
    }
  };

  // Mock opening a file
  const handleOpenFile = (file: SharedFile) => {
    Alert.alert(
      "Opening File",
      `Simulating opening:\n\nName: ${file.name}\nSize: ${file.size}\nUploaded: ${file.uploadDate}`,
      [{ text: "Close", style: "cancel" }]
    );
  };

  // Mock uploading a file
  const handleUploadFile = () => {
    setIsUploading(true);
    
    // Simulate a network delay for realism
    setTimeout(() => {
      const newFile: SharedFile = {
        id: `f_${Date.now()}`,
        name: `new_upload_document_${Math.floor(Math.random() * 100)}.pdf`,
        size: '2.4 MB',
        type: 'pdf',
        uploadedBy: 'currentUser',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      setFiles([newFile, ...files]);
      setIsUploading(false);
      Alert.alert("Success", "File successfully shared with the team!");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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
              onPress={() => router.push(`/team-chat/${id}/channel/${channel.name}`)}
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
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>DIRECT MESSAGES</Text>
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
                    <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                  ) : (
                    <View style={styles.placeholderAvatar}>
                      <Feather name="user" size={18} color={PURPLE} />
                    </View>
                  )}
                  <Text style={styles.dmUserName}>{user.fullName}</Text>
                </View>

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

        {/* SHARED FILES SECTION */}
        <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>SHARED FILES</Text>
            <TouchableOpacity onPress={handleUploadFile} disabled={isUploading}>
                {isUploading ? (
                    <ActivityIndicator size="small" color={PURPLE} />
                ) : (
                    <Text style={styles.addFileText}>+ Upload</Text>
                )}
            </TouchableOpacity>
        </View>
        
        <View style={[styles.listContainer, { marginBottom: 40 }]}>
          {files.map((file) => {
            const uploader = mockUsers.find(u => u.id === file.uploadedBy) || { fullName: 'You' };
            
            return (
              <TouchableOpacity
                key={file.id}
                style={styles.fileRow}
                onPress={() => handleOpenFile(file)}
              >
                <View style={styles.fileIconWrapper}>
                    <Feather name={getFileIcon(file.type) as any} size={20} color={PURPLE} />
                </View>
                <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                    <Text style={styles.fileMeta}>{file.size} • Uploaded by {uploader.fullName}</Text>
                </View>
                <Feather name="download" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
          {files.length === 0 && (
            <Text style={styles.emptyText}>No files shared yet.</Text>
          )}
        </View>

      </ScrollView>
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  addFileText: {
    fontSize: 14,
    fontWeight: '700',
    color: PURPLE,
  },
  listContainer: {
    backgroundColor: "#FCFAFF", 
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
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fileIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
    marginRight: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  fileMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyText: {
    padding: 16,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
});