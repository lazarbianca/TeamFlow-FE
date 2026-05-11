import { Achievement } from './achievement';
import { Channel, DirectMessage } from './chat';
import { Project } from './project';

export interface Team {
    id: string;
    name: string;
    avatar: string;
    memberCount: number;
    status: 'available' | 'busy';
    rating: number;
    tags: string[];
    skills: string[];
    projectCount: number;
    achievements: Achievement[];
    recentProjects: Project[];
    members: string[];
    channels: Channel[];
    directMessages: DirectMessage[];
}