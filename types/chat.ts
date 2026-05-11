export interface Reaction {
    emoji: string;
    count: number;
}

export interface Message {
    id: string;
    userId: string; // The ID of the user who sent it
    content: string;
    timestamp: string;
    reactions?: Reaction[];
}

export interface Channel {
    id: string;
    name: string; // e.g., 'general', 'design-reviews'
    messages: Message[];
    unreadCount?: number;
}

export interface DirectMessage {
    id: string;
    otherUserId: string; // The ID of the person you are chatting with
    messages: Message[];
    unreadCount?: number;
}