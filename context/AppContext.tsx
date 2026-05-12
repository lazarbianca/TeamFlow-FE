import { SharedFile } from '@/types/shared-file';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType {
  requestedTeams: Set<string>;
  addRequestedTeam: (teamId: string) => void;

  teamFiles: Record<string, SharedFile[]>;
  addTeamFile: (teamId: string, file: SharedFile) => void;
  initializeTeamFiles: (teamId: string, defaultFiles: SharedFile[]) => void;

  chatMessages: Record<string, any[]>;
  updateChatMessages: (chatKey: string, newMessages: any[]) => void;
  initializeChatMessages: (chatKey: string, defaultMessages: any[]) => void;

  // NEW: Global User Reactions tracking
  userReactions: Set<string>;
  toggleUserReaction: (messageId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [requestedTeams, setRequestedTeams] = useState<Set<string>>(new Set());
  const [teamFiles, setTeamFiles] = useState<Record<string, SharedFile[]>>({});
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});
  
  // NEW: Store reactions globally
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  const addRequestedTeam = (teamId: string) => {
    setRequestedTeams((prev) => {
      const newSet = new Set(prev);
      newSet.add(teamId);
      return newSet;
    });
  };

  const addTeamFile = (teamId: string, file: SharedFile) => {
    setTeamFiles((prev) => ({
      ...prev,
      [teamId]: [file, ...(prev[teamId] || [])],
    }));
  };

  const initializeTeamFiles = (teamId: string, defaultFiles: SharedFile[]) => {
    setTeamFiles((prev) => {
      if (prev[teamId]) return prev;
      return { ...prev, [teamId]: defaultFiles };
    });
  };

  const updateChatMessages = (chatKey: string, newMessages: any[]) => {
    setChatMessages((prev) => ({
      ...prev,
      [chatKey]: newMessages,
    }));
  };

  const initializeChatMessages = (chatKey: string, defaultMessages: any[]) => {
    setChatMessages((prev) => {
      if (prev[chatKey]) return prev;
      return { ...prev, [chatKey]: defaultMessages };
    });
  };

  // NEW: Toggle function
  const toggleUserReaction = (messageId: string) => {
    setUserReactions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  return (
    <AppContext.Provider 
      value={{ 
        requestedTeams, addRequestedTeam, 
        teamFiles, addTeamFile, initializeTeamFiles,
        chatMessages, updateChatMessages, initializeChatMessages,
        userReactions, toggleUserReaction // <--- Exported here
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}