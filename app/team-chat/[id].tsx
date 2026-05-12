// /app/team-chat/[id].tsx
import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";
import { SharedFile } from "@/types/team";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const PURPLE = "#4B1363";

export default function TeamChatHubScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const team = useMemo(() => mockTeams.find((t) => t.id === id), [id]);

  // File States
  const [files, setFiles] = useState<SharedFile[]>(team?.sharedFiles || []);
  
  // Upload Modal State
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  // View Modal State
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);

  if (!team) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>Team not found.</Text>
      </SafeAreaView>
    );
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'file-text';
      case 'image': return 'image';
      case 'archive': return 'archive';
      case 'code': return 'code';
      default: return 'file';
    }
  };

  const handleOpenFile = (file: SharedFile) => {
    setSelectedFile(file);
    setViewModalVisible(true);
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;

    // Give it an extension if they didn't provide one
    const finalName = newFileName.includes('.') ? newFileName.trim() : `${newFileName.trim()}.txt`;
    
    // Fake size based on character count (1 char = 1 byte roughly)
    let fakeSize = `${newFileContent.length} B`;
    if (newFileContent.length > 1024) {
        fakeSize = `${(newFileContent.length / 1024).toFixed(1)} KB`;
    }

    const newFile: SharedFile = {
      id: `f_${Date.now()}`,
      name: finalName,
      size: fakeSize,
      type: finalName.endsWith('.tsx') || finalName.endsWith('.js') ? 'code' : 'doc',
      uploadedBy: 'currentUser',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: newFileContent
    };
    
    setFiles([newFile, ...files]);
    setUploadModalVisible(false);
    setNewFileName("");
    setNewFileContent("");
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
            <TouchableOpacity onPress={() => setUploadModalVisible(true)}>
                <Text style={styles.addFileText}>+ Upload</Text>
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

      {/* --- UPLOAD NEW FILE MODAL --- */}
      <Modal visible={uploadModalVisible} animationType="slide" transparent={true}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Upload New File</Text>
                  
                  <Text style={styles.inputLabel}>File Name</Text>
                  <TextInput 
                      style={styles.textInput} 
                      placeholder="e.g. project_notes.txt"
                      value={newFileName}
                      onChangeText={setNewFileName}
                      placeholderTextColor="#9CA3AF"
                  />

                  <Text style={styles.inputLabel}>File Content</Text>
                  <TextInput 
                      style={[styles.textInput, styles.textArea]} 
                      placeholder="Type or paste your file content here..."
                      value={newFileContent}
                      onChangeText={setNewFileContent}
                      multiline={true}
                      textAlignVertical="top"
                      placeholderTextColor="#9CA3AF"
                  />

                  <View style={styles.modalButtonRow}>
                      <TouchableOpacity 
                          style={[styles.modalBtn, styles.modalBtnCancel]} 
                          onPress={() => setUploadModalVisible(false)}
                      >
                          <Text style={styles.btnCancelText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                          style={[styles.modalBtn, styles.modalBtnSubmit, !newFileName.trim() && { opacity: 0.5 }]} 
                          onPress={handleCreateFile}
                          disabled={!newFileName.trim()}
                      >
                          <Text style={styles.btnSubmitText}>Upload File</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </KeyboardAvoidingView>
      </Modal>

      {/* --- VIEW FILE MODAL --- */}
      <Modal visible={viewModalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContentLarge}>
                  {selectedFile && (
                      <>
                        <View style={styles.viewFileHeader}>
                            <View style={styles.fileIconWrapperLarge}>
                                <Feather name={getFileIcon(selectedFile.type) as any} size={24} color={PURPLE} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.viewFileName} numberOfLines={1}>{selectedFile.name}</Text>
                                <Text style={styles.viewFileMeta}>{selectedFile.size} • Uploaded {selectedFile.uploadDate}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setViewModalVisible(false)} style={styles.closeIconBtn}>
                                <Feather name="x" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        
                        {/* CHANGED: Fixed scrolling behavior here */}
                        <ScrollView 
                            style={styles.fileContentScroll} 
                            contentContainerStyle={styles.fileContentInner}
                            showsVerticalScrollIndicator={true}
                        >
                            <Text style={styles.fileContentText}>
                                {selectedFile.content || "This file has no text content to display."}
                            </Text>
                        </ScrollView>
                      </>
                  )}
              </View>
          </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PURPLE },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: PURPLE, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 },
  backButton: { marginRight: 12 },
  headerTitle: { flex: 1, fontSize: 28, fontWeight: "600", color: "#fff", fontFamily: "serif" },
  headerAvatar: { width: 44, height: 44, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)" },
  body: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#9CA3AF", marginBottom: 12, letterSpacing: 0.5 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, marginBottom: 12 },
  addFileText: { fontSize: 14, fontWeight: '700', color: PURPLE },
  listContainer: { backgroundColor: "#FCFAFF", borderRadius: 12, paddingVertical: 8 },
  channelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 16 },
  channelName: { fontSize: 16, fontWeight: "500", color: "#374151" },
  dmRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 16 },
  dmUserInfo: { flexDirection: "row", alignItems: "center" },
  userAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  placeholderAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: "#D1C4DB", marginRight: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F6F0FA" },
  dmUserName: { fontSize: 16, fontWeight: "500", color: "#374151" },
  unreadText: { fontSize: 14, fontWeight: "600", color: "#4B5563" },
  fileRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  fileIconWrapper: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  fileInfo: { flex: 1, marginRight: 12 },
  fileName: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 4 },
  fileMeta: { fontSize: 13, color: '#6B7280' },
  emptyText: { padding: 16, color: "#9CA3AF", fontStyle: "italic" },
  
  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  modalContentLarge: { width: '100%', height: '80%', backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#4B5563', marginBottom: 6 },
  textInput: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: '#111827', marginBottom: 16 },
  textArea: { height: 120 },
  modalButtonRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  modalBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  modalBtnCancel: { backgroundColor: '#F3F4F6' },
  modalBtnSubmit: { backgroundColor: PURPLE },
  btnCancelText: { color: '#4B5563', fontWeight: '600', fontSize: 16 },
  btnSubmitText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  // VIEW FILE MODAL STYLES
  viewFileHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 16, marginBottom: 12 },
  fileIconWrapperLarge: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  viewFileName: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },
  viewFileMeta: { fontSize: 14, color: '#6B7280' },
  closeIconBtn: { padding: 4, marginLeft: 8 },
  
  // CHANGED: Separated Scroll container and inner content padding
  fileContentScroll: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  fileContentInner: { padding: 16, paddingBottom: 32 }, 
  fileContentText: { fontSize: 15, color: '#374151', lineHeight: 24, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
});