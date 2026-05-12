export interface Reaction {
    emoji: string;
    count: number;
}

export interface Message {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
    reactions?: Reaction[];
    status?: "pending" | "approved" | "declined";
    approval?: {
        approver: string;
        note: string;
    };
}

export interface Channel {
    id: string;
    name: string;
    messages: Message[];
    unreadCount?: number;
}

export interface DirectMessage {
    id: string;
    otherUserId: string;
    messages: Message[];
    unreadCount?: number;
}