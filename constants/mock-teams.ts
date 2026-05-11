import { Team } from "@/types/team";

export const mockTeams: Team[] = [
  {
    id: "1",
    name: "Frontend Innovators",
    avatar: "https://i.pravatar.cc/150?u=frontend",
    memberCount: 8,
    status: "available",
    rating: 4.8,
    tags: ["#React", "#TypeScript", "#Design"],
    skills: [
      "UI/UX",
      "Figma",
      "React",
      "React Native",
      "Design Systems",
      "Expo Go",
    ],
    projectCount: 23,
    members: ["1", "2", "3", "4", "5", "6", "7", "8"],
    achievements: [
      {
        title: "Fast Delivery Award",
        description: "5 projects ahead of schedule",
      },
      { title: "Top Rated Team", description: "4.8+ rating for 6 months" },
    ],
    recentProjects: [
      {
        name: "Mobile App Redesign",
        client: "TechCorp",
        date: "Mar 2026",
        rating: 5,
      },
      {
        name: "Component Library",
        client: "StartupXYZ",
        date: "Feb 2026",
        rating: 4.9,
      },
    ],
    channels: [
      { id: "c1", name: "general", messages: [] },
      {
        id: "c2",
        name: "design-reviews",
        messages: [
          {
            id: "m1",
            userId: "1", // Sarah Chen
            content:
              "Can someone review the new dashboard mockups? I've updated the color scheme and added the requested analytics cards.",
            timestamp: "10:00 AM",
          },
          {
            id: "m2",
            userId: "2", // Alex Stanescu
            content: "I'll take a look! 👍",
            timestamp: "10:05 AM",
            reactions: [{ emoji: "👍", count: 2 }],
          },
          {
            id: "m3",
            userId: "4", // Jordan Lee
            content: "Looking good! The new layout feels much cleaner.",
            timestamp: "10:15 AM",
          },
          {
            id: "m4",
            userId: "currentUser", // Represents "You"
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac scelerisque nisi, vel tincidunt leo. Sed euismod malesuada urna eu vestibulum. Morbi mi mauris, cursus sit amet nulla interdum, facilisis viverra lorem. Nulla ultricies eu erat sed tristique. Quisque leo quam, maximus sed odio et, rhoncus faucibus ante. Mauris gravida turpis efficitur volutpat mattis. Morbi consectetur nunc sed ante rutrum mattis. Cras laoreet libero ac lacinia semper. Nulla non nulla lacus. Mauris scelerisque placerat lorem, vel aliquam lectus interdum vitae. Donec non convallis metus, ac viverra lectus.`,
            timestamp: "10:30 AM",
          },
        ],
      },
      { id: "c3", name: "resources", messages: [] },
      { id: "c4", name: "random", messages: [] },
      { id: "c5", name: "announcements", messages: [] },
    ],
    directMessages: [
      {
        id: "dm1",
        otherUserId: "1",
        unreadCount: 2,
        messages: [
          {
            id: "dm1_m1",
            userId: "1",
            content: "Hey! How's the project going?",
            timestamp: "9:00 AM",
          },
          {
            id: "dm1_m2",
            userId: "currentUser",
            content: "Going well! Just finished the design reviews.",
            timestamp: "9:05 AM",
          },
          {
            id: "dm1_m3",
            userId: "1",
            content:
              "Awesome! Let me know if you need any help with the implementation.",
            timestamp: "9:10 AM",
          },
        ],
      },
      { id: "dm2", otherUserId: "2", unreadCount: 0, messages: [] },
      {
        id: "dm3",
        otherUserId: "3",
        unreadCount: 10,
        messages: [
          {
            id: "dm3_m1",
            userId: "3",
            content:
              "Hi! I saw your work on the mobile app. Really impressive!",
            timestamp: "8:30 AM",
          },
          {
            id: "dm3_m2",
            userId: "currentUser",
            content: "Thanks! It was a fun project to work on.",
            timestamp: "8:35 AM",
          },
          {
            id: "dm3_m3",
            userId: "3",
            content:
              "Would love to collaborate on something similar in the future.",
            timestamp: "8:40 AM",
          },
          {
            id: "dm3_m4",
            userId: "currentUser",
            content: "Definitely! Let's keep in touch.",
            timestamp: "8:45 AM",
          },
        ],
      },
      { id: "dm4", otherUserId: "4", unreadCount: 0, messages: [] },
    ],
  },
  {
    id: "2",
    name: "Backend Team",
    avatar: "https://i.pravatar.cc/150?u=backend",
    memberCount: 6,
    status: "available",
    rating: 4.6,
    tags: ["#Node.js", "#Python", "#DevOps"],
    skills: ["Node.js", "Python", "Docker", "AWS", "PostgreSQL"],
    projectCount: 18,
    members: ["3", "4", "5", "9", "10", "11"],
    achievements: [
      { title: "Zero Downtime", description: "99.9% uptime for 12 months" },
      { title: "Security Champion", description: "Passed all security audits" },
    ],
    recentProjects: [
      {
        name: "API Gateway",
        client: "FinTech Inc",
        date: "Mar 2026",
        rating: 4.7,
      },
      {
        name: "Auth Service",
        client: "TechCorp",
        date: "Jan 2026",
        rating: 4.5,
      },
    ],
    channels: [],
    directMessages: [],
  },
  {
    id: "3",
    name: "Full Stack Fairies",
    avatar: "https://i.pravatar.cc/150?u=fullstack",
    memberCount: 10,
    status: "busy",
    rating: 3.5,
    tags: ["#React", "#Node.js", "#TypeScript"],
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL"],
    projectCount: 15,
    members: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    achievements: [
      { title: "Hackathon Winners", description: "1st place Spring 2026" },
    ],
    recentProjects: [
      {
        name: "E-commerce Platform",
        client: "ShopNow",
        date: "Feb 2026",
        rating: 3.8,
      },
    ],
    channels: [],
    directMessages: [],
  },
  {
    id: "4",
    name: "AI Research",
    avatar: "https://i.pravatar.cc/150?u=ai",
    memberCount: 5,
    status: "available",
    rating: 3.5,
    tags: ["#Python", "#AI/ML"],
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    projectCount: 8,
    members: ["2", "4", "6", "8", "10"],
    achievements: [
      { title: "Innovation Award", description: "Best ML model accuracy" },
    ],
    recentProjects: [
      {
        name: "Sentiment Analyzer",
        client: "MediaCo",
        date: "Mar 2026",
        rating: 4.0,
      },
    ],
    channels: [],
    directMessages: [],
  },
  {
    id: "5",
    name: "Mobile First",
    avatar: "https://i.pravatar.cc/150?u=mobile",
    memberCount: 7,
    status: "available",
    rating: 3.5,
    tags: ["#Mobile", "#React", "#TypeScript"],
    skills: ["React Native", "Expo", "Swift", "Kotlin"],
    projectCount: 12,
    members: ["1", "3", "5", "7", "9", "11", "12"],
    achievements: [
      { title: "App Store Featured", description: "Featured app in Q1 2026" },
    ],
    recentProjects: [
      {
        name: "Fitness Tracker",
        client: "HealthPlus",
        date: "Feb 2026",
        rating: 4.2,
      },
    ],
    channels: [],
    directMessages: [],
  },
  {
    id: "6",
    name: "Legacy .NET Upgraders",
    avatar: "https://i.pravatar.cc/150?u=dotnet",
    memberCount: 6,
    status: "busy",
    rating: 3.5,
    tags: ["#ASP.NET", "#EFCore", "#Dapper"],
    skills: ["ASP.NET", "Entity Framework", "Dapper", "SQL Server"],
    projectCount: 10,
    members: ["6", "7", "8", "9", "10", "11"],
    achievements: [
      { title: "Migration Master", description: "3 legacy systems modernized" },
    ],
    recentProjects: [
      {
        name: "CRM Migration",
        client: "BigCorp",
        date: "Jan 2026",
        rating: 3.9,
      },
    ],
    channels: [],
    directMessages: [],
  },
  {
    id: "7",
    name: "Java Enthusiasts",
    avatar: "https://i.pravatar.cc/150?u=java",
    memberCount: 6,
    status: "available",
    rating: 3.5,
    tags: ["#Java", "#JavaScript", "#BootStrap"],
    skills: ["Java", "Spring Boot", "JavaScript", "Bootstrap"],
    projectCount: 14,
    members: ["1", "2", "3", "6", "11", "12"],
    achievements: [
      { title: "Code Quality Star", description: "95%+ test coverage" },
    ],
    recentProjects: [
      {
        name: "Student Portal",
        client: "University",
        date: "Mar 2026",
        rating: 4.1,
      },
    ],
    channels: [],
    directMessages: [],
  },
];
