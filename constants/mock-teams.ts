import { Team } from '@/types/team';

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Innovators',
    avatar: 'https://i.pravatar.cc/150?u=frontend',
    memberCount: 8,
    status: 'available',
    rating: 4.8,
    tags: ['#React', '#TypeScript', '#Design'],
    skills: ['UI/UX', 'Figma', 'React', 'React Native', 'Design Systems', 'Expo Go'],
    projectCount: 23,
    achievements: [
      { title: 'Fast Delivery Award', description: '5 projects ahead of schedule' },
      { title: 'Top Rated Team', description: '4.8+ rating for 6 months' },
    ],
    recentProjects: [
      { name: 'Mobile App Redesign', client: 'TechCorp', date: 'Mar 2026', rating: 5 },
      { name: 'Component Library', client: 'StartupXYZ', date: 'Feb 2026', rating: 4.9 },
    ],
  },
  {
    id: '2',
    name: 'Backend Team',
    avatar: 'https://i.pravatar.cc/150?u=backend',
    memberCount: 6,
    status: 'available',
    rating: 4.6,
    tags: ['#Node.js', '#Python', '#DevOps'],
    skills: ['Node.js', 'Python', 'Docker', 'AWS', 'PostgreSQL'],
    projectCount: 18,
    achievements: [
      { title: 'Zero Downtime', description: '99.9% uptime for 12 months' },
      { title: 'Security Champion', description: 'Passed all security audits' },
    ],
    recentProjects: [
      { name: 'API Gateway', client: 'FinTech Inc', date: 'Mar 2026', rating: 4.7 },
      { name: 'Auth Service', client: 'TechCorp', date: 'Jan 2026', rating: 4.5 },
    ],
  },
  {
    id: '3',
    name: 'Full Stack Fairies',
    avatar: 'https://i.pravatar.cc/150?u=fullstack',
    memberCount: 10,
    status: 'busy',
    rating: 3.5,
    tags: ['#React', '#Node.js', '#TypeScript'],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL'],
    projectCount: 15,
    achievements: [
      { title: 'Hackathon Winners', description: '1st place Spring 2026' },
    ],
    recentProjects: [
      { name: 'E-commerce Platform', client: 'ShopNow', date: 'Feb 2026', rating: 3.8 },
    ],
  },
  {
    id: '4',
    name: 'AI Research',
    avatar: 'https://i.pravatar.cc/150?u=ai',
    memberCount: 5,
    status: 'available',
    rating: 3.5,
    tags: ['#Python', '#AI/ML'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
    projectCount: 8,
    achievements: [
      { title: 'Innovation Award', description: 'Best ML model accuracy' },
    ],
    recentProjects: [
      { name: 'Sentiment Analyzer', client: 'MediaCo', date: 'Mar 2026', rating: 4.0 },
    ],
  },
  {
    id: '5',
    name: 'Mobile First',
    avatar: 'https://i.pravatar.cc/150?u=mobile',
    memberCount: 7,
    status: 'available',
    rating: 3.5,
    tags: ['#Mobile', '#React', '#TypeScript'],
    skills: ['React Native', 'Expo', 'Swift', 'Kotlin'],
    projectCount: 12,
    achievements: [
      { title: 'App Store Featured', description: 'Featured app in Q1 2026' },
    ],
    recentProjects: [
      { name: 'Fitness Tracker', client: 'HealthPlus', date: 'Feb 2026', rating: 4.2 },
    ],
  },
  {
    id: '6',
    name: 'Legacy .NET Upgraders',
    avatar: 'https://i.pravatar.cc/150?u=dotnet',
    memberCount: 6,
    status: 'busy',
    rating: 3.5,
    tags: ['#ASP.NET', '#EFCore', '#Dapper'],
    skills: ['ASP.NET', 'Entity Framework', 'Dapper', 'SQL Server'],
    projectCount: 10,
    achievements: [
      { title: 'Migration Master', description: '3 legacy systems modernized' },
    ],
    recentProjects: [
      { name: 'CRM Migration', client: 'BigCorp', date: 'Jan 2026', rating: 3.9 },
    ],
  },
  {
    id: '7',
    name: 'Java Enthusiasts',
    avatar: 'https://i.pravatar.cc/150?u=java',
    memberCount: 6,
    status: 'available',
    rating: 3.5,
    tags: ['#Java', '#JavaScript', '#BootStrap'],
    skills: ['Java', 'Spring Boot', 'JavaScript', 'Bootstrap'],
    projectCount: 14,
    achievements: [
      { title: 'Code Quality Star', description: '95%+ test coverage' },
    ],
    recentProjects: [
      { name: 'Student Portal', client: 'University', date: 'Mar 2026', rating: 4.1 },
    ],
  },
];
