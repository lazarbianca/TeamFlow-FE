import { Team } from "@/types/team";

export const mockTeams: Team[] = [
    {
        id: "1",
        name: "Frontend Innovators",
        avatar: "https://i.pravatar.cc/150?u=frontend",
        memberCount: -1,
        status: "busy",
        rating: -1,
        tags: [],
        skills: [],
        projectCount: -1,
        members: ["currentUser", "1", "2", "3", "4", "16", "23", "27"],
        achievements: [],
        recentProjects: [],
        channels: [
            { 
                id: "c1", 
                name: "general", 
                messages: [
                    { id: "gen_1", userId: "1", content: "Morning everyone! Standup at 10:00 AM as usual?", timestamp: "9:00 AM" },
                    { id: "gen_2", userId: "currentUser", content: "I'll be there! Just finished up the navbar responsiveness ticket.", timestamp: "9:05 AM", reactions: [{ emoji: "👍", count: 2 }] },
                    { id: "gen_3", userId: "16", content: "Great progress this week, team. Let's make sure we review the sprint board today.", timestamp: "9:15 AM", reactions: [{ emoji: "👍", count: 4 }] },
                    { id: "gen_4", userId: "4", content: "See you all in the call ☕", timestamp: "9:45 AM" }
                ] 
            },
            { 
                id: "c2", 
                name: "design-reviews", 
                messages: [
                    { id: "m1", userId: "1", content: "Can someone review the new dashboard mockups?", timestamp: "10:00 AM" },
                    { id: "m2", userId: "2", content: "I'll take a look! 👍", timestamp: "10:05 AM", reactions: [{ emoji: "👍", count: 2 }] },
                    { id: "m4", userId: "currentUser", content: "I noticed the padding on the primary cards is slightly off compared to our design system guidelines. Should we bump it from 16px to 24px to match the new grid?", timestamp: "10:30 AM" },
                    { id: "m5", userId: "3", content: "Good catch. I just updated the Figma file and uploaded the new PDF to our shared files. Take a look!", timestamp: "11:00 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            },
            { 
                id: "c3", 
                name: "resources", 
                messages: [
                    { id: "res_1", userId: "2", content: "Hey guys, found this incredible article on React Native Reanimated optimizations. Explains the UI thread perfectly: https://docs.swmansion.com/react-native-reanimated/", timestamp: "Yesterday, 1:00 PM" },
                    { id: "res_2", userId: "currentUser", content: "Thanks Alex, this is exactly what I needed for the profile screen swipe gesture!", timestamp: "Yesterday, 1:45 PM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "res_3", userId: "23", content: "Adding the updated brand guidelines zip to the files tab. Make sure to use the new SVG logos instead of the old PNGs.", timestamp: "Yesterday, 4:20 PM" }
                ] 
            },
            { 
                id: "c4", 
                name: "random", 
                messages: [
                    { id: "rnd_1", userId: "27", content: "Is anyone going to the local React Native meetup downtown this Friday?", timestamp: "Monday, 4:00 PM" },
                    { id: "rnd_2", userId: "4", content: "I'm in! Let's grab some tacos beforehand. 🌮", timestamp: "Monday, 4:15 PM", reactions: [{ emoji: "👍", count: 3 }] },
                    { id: "rnd_3", userId: "currentUser", content: "Count me in. I desperately need to step away from my IDE for a few hours lol.", timestamp: "Monday, 4:30 PM", reactions: [{ emoji: "👍", count: 2 }] }
                ] 
            },
            {
                id: "c5",
                name: "announcements",
                messages: [
                    { id: "m5a", userId: "1", content: "We've completed the Q1 milestones and are ready for review.", timestamp: "2 hours ago", status: "pending" },
                    {
                        id: "m5b",
                        userId: "1",
                        content: "Requesting extension for the final user testing deliverable.",
                        timestamp: "1 day ago",
                        status: "approved",
                        approval: {
                            approver: "Dr. Emily Chen",
                            note: "Approved. New deadline is April 26th. Quality over speed.",
                        },
                    },
                    { id: "m5c", userId: "currentUser", content: "V1.0 of the Component Library has officially been published to our internal NPM registry! 🎉", timestamp: "3 days ago", status: "approved", approval: { approver: "Project Coordinator", note: "Fantastic work team." } }
                ],
            },
        ],
        directMessages: [
            { 
                id: "dm1", 
                otherUserId: "1", 
                unreadCount: 2, 
                messages: [
                    { id: "dm1_m1", userId: "1", content: "Hey! How's the project going?", timestamp: "9:00 AM" },
                    { id: "dm1_m2", userId: "currentUser", content: "Going well! Just finished the design reviews.", timestamp: "9:05 AM" },
                    { id: "dm1_m3", userId: "1", content: "Awesome! Let me know if you need any help with the implementation. I'm free after 2 PM.", timestamp: "9:10 AM" },
                    { id: "dm1_m4", userId: "1", content: "Also, did you push that hotfix for the auth screen?", timestamp: "9:12 AM" }
                ] 
            }, 
            { 
                id: "dm2", 
                otherUserId: "2", 
                unreadCount: 0, 
                messages: [
                    { id: "dm2_m1", userId: "currentUser", content: "Hey Alex, are you getting a weird hydration error on the latest main branch?", timestamp: "Yesterday, 3:00 PM" },
                    { id: "dm2_m2", userId: "2", content: "Yeah, delete your node_modules and clear the expo cache. That fixed it for me.", timestamp: "Yesterday, 3:05 PM" },
                    { id: "dm2_m3", userId: "currentUser", content: "Lifesaver. Thanks man.", timestamp: "Yesterday, 3:10 PM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            },
            { 
                id: "dm4", 
                otherUserId: "16", 
                unreadCount: 0, 
                messages: [
                    { id: "dm4_m1", userId: "currentUser", content: "Hi Dr. Chen, do you have a few minutes tomorrow to review the architecture changes?", timestamp: "Monday, 10:00 AM" },
                    { id: "dm4_m2", userId: "16", content: "Of course. Let's sync right after the lecture. Feel free to drop the diagram file in the chat beforehand.", timestamp: "Monday, 10:45 AM" }
                ] 
            },
            {
                id: "dm3",
                otherUserId: "3",
                unreadCount: 1,
                messages: [
                    { id: "dm3_m1", userId: "3", content: "Hi! I saw your work on the mobile app. Really impressive!", timestamp: "8:30 AM" },
                    { id: "dm3_m2", userId: "currentUser", content: "Thanks! It was a fun project to work on.", timestamp: "8:35 AM" },
                    { id: "dm3_m3", userId: "3", content: "Would love to collaborate on something similar in the future.", timestamp: "8:40 AM" },
                    { id: "dm3_m4", userId: "currentUser", content: "Definitely! Let's keep in touch.", timestamp: "8:45 AM" },
                    { id: "dm3_m5", userId: "3", content: "By the way, could you send me the hex code for that specific purple you used?", timestamp: "8:50 AM" }
                ]
            }
        ],
        sharedFiles: [
            {
                id: "f1",
                name: "Dashboard_Mockups_Final.pdf",
                size: "4.2 MB",
                type: "pdf",
                uploadedBy: "3",
                uploadDate: "Oct 24, 2026",
                content: 'PAGE 1: Dashboard Overview\n- Top navigation bar should be #4B1363.\n- Include 3 summary metric cards (Users, Revenue, Active Sessions).\n\nPAGE 2: Analytics Chart\n- Line chart showing 30-day user growth.\n- Use D3.js for rendering.'
            },
            {
                id: "f2",
                name: "brand_assets_and_fonts.zip",
                size: "18.5 MB",
                type: "archive",
                uploadedBy: "23",
                uploadDate: "Oct 20, 2026",
                content: 'This archive contains:\n- /fonts (Inter, Roboto Mono)\n- /logos (SVG and PNG formats)\n- /icons (Feather export slice)\n\nPlease extract to /assets folder before running the app.'
            },
            {
                id: "f3",
                name: "architecture_diagram.png",
                size: "1.1 MB",
                type: "image",
                uploadedBy: "currentUser",
                uploadDate: "Oct 18, 2026",
                imageUri: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop' 
            },
            {
                id: "f4",
                name: "animations.tsx",
                size: "3.2 KB",
                type: "code",
                uploadedBy: "2",
                uploadDate: "Oct 15, 2026",
                content: 'import { withSpring, withTiming } from "react-native-reanimated";\n\nexport const springConfig = {\n  damping: 20,\n  stiffness: 90,\n  mass: 1\n};\n\nexport const slideIn = () => {\n  "worklet";\n  return {\n    initialValues: { transform: [{ translateY: 50 }], opacity: 0 },\n    animations: {\n      transform: [{ translateY: withSpring(0, springConfig) }],\n      opacity: withTiming(1, { duration: 300 })\n    }\n  };\n};'
            },
            {
                id: "f5",
                name: "api_endpoints_v2.txt",
                size: "14 KB",
                type: "doc",
                uploadedBy: "16",
                uploadDate: "Oct 10, 2026",
                content: 'REST API Documentation v2.0\n\nBASE URL: https://api.university.edu/v2\n\nGET /teams\nReturns an array of available teams.\nHeaders: Authorization: Bearer <token>\n\nPOST /teams/:id/join\nRequests to join a specific team.\nBody: { "userId": string, "message": string }'
            }
        ]
    },
    {
        id: "2",
        name: "Backend Team",
        avatar: "https://i.pravatar.cc/150?u=backend",
        memberCount: 6,
        status: "available",
        rating: 4.6,
        tags: ["#Node.js", "#Python", "#DevOps", "#AWS", "#Microservices"],
        skills: ["Node.js", "Python", "Docker", "AWS", "PostgreSQL", "Redis", "GraphQL", "Kubernetes"],
        projectCount: 18,
        members: ["currentUser", "3", "4", "9", "10", "11"], // Included currentUser and Prof. Andrei (11)
        achievements: [
            { title: "Zero Downtime", description: "99.9% uptime for 12 months" },
            { title: "Security Champion", description: "Passed all security audits" },
            { title: "Database Optimizer", description: "Reduced complex query times by over 50%" },
            { title: "API Architect", description: "Designed scalable RESTful APIs for 3 platforms" },
            { title: "Cloud Native", description: "Successfully migrated backend to serverless architecture" }
        ],
        recentProjects: [
            { name: "API Gateway", client: "FinTech Inc", date: "Mar 2026", rating: 4.7 },
            { name: "Distributed Caching Layer", client: "SpeedyNet", date: "Dec 2025", rating: 4.4 },
            { name: "Auth Service", client: "TechCorp", date: "Jan 2026", rating: 4.5 },
            { name: "GraphQL API Migration", client: "DataStream", date: "May 2026", rating: 4.6 }
        ],
        channels: [],
        directMessages: [],
        sharedFiles: []
    },
    {
        id: "3",
        name: "Full Stack Fairies",
        avatar: "https://i.pravatar.cc/150?u=fullstack",
        memberCount: -1,
        status: "busy",
        rating: -1,
        tags: [],
        skills: [],
        projectCount: -1,
        // Included currentUser, students, the Project Coordinator (5), and Prof. Laura (12)
        members: ["currentUser", "1", "3", "5", "6", "7", "8", "12", "17", "18", "19"],
        achievements: [],
        recentProjects: [],
        channels: [
            { 
                id: "c1", 
                name: "general", 
                messages: [
                    { id: "fs_gen1", userId: "3", content: "Hey everyone, reminder that we are in a code freeze until the ShopNow e-commerce bug is patched.", timestamp: "Yesterday, 9:00 AM" },
                    { id: "fs_gen2", userId: "currentUser", content: "I'm looking into the cart state issue right now. It seems like the Context isn't updating before the API call fires.", timestamp: "Yesterday, 9:15 AM", reactions: [{ emoji: "👍", count: 2 }] },
                    { id: "fs_gen3", userId: "6", content: "Let me know if you need help! I dealt with a similar race condition last sprint.", timestamp: "Yesterday, 9:30 AM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "fs_gen4", userId: "currentUser", content: "Fixed and merged. We should be good to lift the freeze.", timestamp: "Today, 2:00 AM", reactions: [{ emoji: "👍", count: 5 }] }
                ] 
            },
            { 
                id: "c2", 
                name: "frontend-sync", 
                messages: [
                    { id: "fs_fe1", userId: "19", content: "Are we migrating the old React class components to functional ones this week?", timestamp: "10:00 AM" },
                    { id: "fs_fe2", userId: "8", content: "Not yet. We need to prioritize the responsive layout for the Campus Navigation map first. The client complained it breaks on mobile.", timestamp: "10:10 AM", reactions: [{ emoji: "👍", count: 2 }] },
                    { id: "fs_fe3", userId: "currentUser", content: "I'll grab the responsive map ticket. I can use CSS Grid to fix the overflow.", timestamp: "10:15 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            },
            { 
                id: "c3", 
                name: "backend-sync", 
                messages: [
                    { id: "fs_be1", userId: "17", content: "The MongoDB aggregation query for the analytics dashboard is timing out on production. Taking almost 5 seconds.", timestamp: "Monday, 3:00 PM" },
                    { id: "fs_be2", userId: "7", content: "We probably need a compound index on userId and createdAt. I'll write a quick script to build it.", timestamp: "Monday, 3:10 PM", reactions: [{ emoji: "👍", count: 3 }] }
                ] 
            },
            {
                id: "c4",
                name: "announcements",
                messages: [
                    { 
                        id: "fs_ann1", 
                        userId: "3", 
                        content: "Requesting a 2-day deadline extension for the Customer Support Bot integration to handle edge cases in the NLP model.", 
                        timestamp: "2 days ago", 
                        status: "approved",
                        approval: {
                            approver: "Prof. Laura Marinescu",
                            note: "Approved. Please ensure comprehensive testing before the final handover."
                        }
                    },
                    {
                        id: "fs_ann2",
                        userId: "currentUser",
                        content: "The E-commerce Platform V1.2 hotfix has been deployed to production.",
                        timestamp: "4 hours ago",
                        status: "pending"
                    }
                ],
            },
        ],
        directMessages: [
            { 
                id: "fs_dm1", 
                otherUserId: "3", // Maddie Anita
                unreadCount: 3, 
                messages: [
                    { id: "m_dm1", userId: "3", content: "Hey! Did you manage to fix the cart state bug?", timestamp: "Yesterday, 11:00 PM" },
                    { id: "m_dm2", userId: "currentUser", content: "Almost there. Just writing the Jest tests for it now so it doesn't break again.", timestamp: "Yesterday, 11:15 PM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "m_dm3", userId: "3", content: "You're a lifesaver. Let me know when the PR is up and I'll review it immediately.", timestamp: "Yesterday, 11:20 PM" },
                    { id: "m_dm4", userId: "3", content: "Hey, are you awake? The pipeline just failed on the linting step.", timestamp: "Today, 1:45 AM" }
                ] 
            }, 
            { 
                id: "fs_dm2", 
                otherUserId: "12", // Prof. Laura Marinescu
                unreadCount: 0, 
                messages: [
                    { id: "pl_dm1", userId: "12", content: "I've noticed the team has been working very late hours recently. Please ensure you are balancing your workload properly.", timestamp: "Monday, 9:00 AM" },
                    { id: "pl_dm2", userId: "currentUser", content: "Thank you Professor. We're just pushing through the last of the tech debt from the hackathon. Things should smooth out next week.", timestamp: "Monday, 9:30 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            },
            { 
                id: "fs_dm3", 
                otherUserId: "7", // Mihai Ionescu
                unreadCount: 0, 
                messages: [
                    { id: "mi_dm1", userId: "currentUser", content: "Did that MongoDB compound index work?", timestamp: "Monday, 4:00 PM" },
                    { id: "mi_dm2", userId: "7", content: "Yep! Query time dropped from 5s down to 120ms. Total game changer.", timestamp: "Monday, 4:05 PM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            }
        ],
        sharedFiles: [
            {
                id: "fs_f1",
                name: "e_commerce_db_schema.pdf",
                size: "1.4 MB",
                type: "pdf",
                uploadedBy: "7",
                uploadDate: "Oct 25, 2026",
                content: 'COLLECTIONS:\n\n1. Users\n- _id: ObjectId\n- email: String\n- passwordHash: String\n- role: Enum[ADMIN, CUSTOMER]\n\n2. Orders\n- _id: ObjectId\n- userId: Ref(Users)\n- totalAmount: Number\n- status: Enum[PENDING, SHIPPED, DELIVERED]\n- items: Array[Object]'
            },
            {
                id: "fs_f2",
                name: "cartReducer.ts",
                size: "4.2 KB",
                type: "code",
                uploadedBy: "currentUser",
                uploadDate: "Oct 26, 2026",
                content: "export const cartReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_ITEM':\n      const existing = state.items.find(i => i.id === action.payload.id);\n      if (existing) {\n        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };\n      }\n      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };\n    case 'CLEAR_CART':\n      return { ...state, items: [] };\n    default:\n      return state;\n  }\n};"
            },
            {
                id: "fs_f3",
                name: "mobile_checkout_flow.png",
                size: "3.1 MB",
                type: "image",
                uploadedBy: "8",
                uploadDate: "Oct 22, 2026",
                // A UI wireframe/design mockup image
                imageUri: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: "fs_f4",
                name: "hackathon_pitch_script.txt",
                size: "12 KB",
                type: "doc",
                uploadedBy: "3",
                uploadDate: "Apr 10, 2026",
                content: "SLIDE 1: Introduction\nHi judges, we are the Full Stack Fairies. Today we are presenting 'ShopNow AI', an e-commerce platform that predicts what you want before you know it.\n\nSLIDE 2: The Problem\nCart abandonment is currently at 70%.\n\nSLIDE 3: Our Solution\nUsing our custom NLP model, we analyze user sentiment in real-time..."
            }
        ]
    },
    {
        id: "4",
        name: "AI Research",
        avatar: "https://i.pravatar.cc/150?u=ai",
        memberCount: 5,
        status: "available",
        rating: 3.5,
        tags: ["#Python", "#AI/ML", "#DeepLearning", "#NLP", "#ComputerVision"],
        skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "Scikit-Learn", "Hugging Face", "Pandas", "CUDA"],
        projectCount: 8,
        members: ["currentUser", "6", "8", "10", "22"],
        achievements: [
            { title: "Innovation Award", description: "Best ML model accuracy" },
            { title: "Research Pioneer", description: "Published 3 internal tech papers" },
            { title: "Stack Overflow Survivor", description: "Solved a critical bug with zero external documentation" },
            { title: "Performance Optimizer", description: "Reduced load time by 40%" }
        ],
        recentProjects: [
            { name: "Sentiment Analyzer", client: "MediaCo", date: "Mar 2026", rating: 4.0 },
            { name: "Customer Support Bot", client: "HelpDesk AI", date: "Feb 2026", rating: 3.5 },
            { name: "Predictive Text Algorithm", client: "TypeFast", date: "Feb 2026", rating: 4.1 },
            { name: "Image Recognition Service", client: "VisionAI", date: "Mar 2026", rating: 4.2 }
        ],
        channels: [],
        directMessages: [],
        sharedFiles: []
    },
    {
        id: "5",
        name: "Mobile First",
        avatar: "https://i.pravatar.cc/150?u=mobile",
        memberCount: -1,
        status: "busy",
        rating: -1,
        tags: [],
        skills: [],
        projectCount: -1,
        members: ["currentUser", "1", "3", "7", "21", "35", "5"],
        achievements: [
            { title: "App Store Featured", description: "Featured app in Q1 2026" },
            { title: "Animation Wizard", description: "Implemented complex 60fps UI animations" },
            { title: "Performance Optimizer", description: "Reduced load time by 40%" },
            { title: "Accessibility Advocate", description: "Achieved WCAG AA compliance" },
            { title: "Client Favorite", description: "5 consecutive 5-star client reviews" },
            { title: "Zero Downtime", description: "99.9% uptime for 12 months" }
        ],
        recentProjects: [
            { name: "Language Learning App", client: "LingoLeap", date: "Mar 2026", rating: 4.7 },
            { name: "Fitness Tracker", client: "HealthPlus", date: "Feb 2026", rating: 4.2 },
            { name: "Weather App", client: "ClimateTech", date: "Nov 2025", rating: 3.9 },
            { name: "Parking Spot Finder", client: "ParkEasy", date: "Nov 2025", rating: 3.4 },
            { name: "Recipe App", client: "FoodieHub", date: "Dec 2025", rating: 3.6 }
        ],
        channels: [
            { 
                id: "c1", 
                name: "general", 
                messages: [
                    { id: "mob_gen1", userId: "21", content: "Hey team, Apple just updated their App Store review guidelines again. I dropped the PDF in shared files.", timestamp: "Monday, 10:00 AM" },
                    { id: "mob_gen2", userId: "1", content: "Thanks Liam. Hopefully it doesn't affect our pending release for LingoLeap.", timestamp: "Monday, 10:15 AM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "mob_gen3", userId: "currentUser", content: "I just checked, we should be fine. Our data collection disclosures are up to date.", timestamp: "Monday, 10:20 AM", reactions: [{ emoji: "👍", count: 3 }] }
                ] 
            },
            { 
                id: "c2", 
                name: "app-releases", 
                messages: [
                    { id: "mob_rel1", userId: "35", content: "EAS Build just finished for Android. APK is ready for internal testing.", timestamp: "Yesterday, 3:00 PM" },
                    { id: "mob_rel2", userId: "currentUser", content: "Downloading now. I'll test the push notifications on my physical Pixel device.", timestamp: "Yesterday, 3:05 PM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "mob_rel3", userId: "currentUser", content: "Notifications are working perfectly even when the app is killed. Good to go.", timestamp: "Yesterday, 3:45 PM", reactions: [{ emoji: "👍", count: 4 }] }
                ] 
            },
            {
                id: "c3",
                name: "announcements",
                messages: [
                    { 
                        id: "mob_ann1", 
                        userId: "5", 
                        content: "The university's Apple Developer Enterprise Program membership has been successfully renewed.", 
                        timestamp: "3 days ago", 
                        status: "approved",
                        approval: {
                            approver: "Project Coordinator",
                            note: "Certificates are valid until May 2027. Proceed with signing."
                        }
                    },
                    {
                        id: "mob_ann2",
                        userId: "1",
                        content: "Submitting the Weather App V2.1 to App Store Review.",
                        timestamp: "2 hours ago",
                        status: "pending"
                    }
                ],
            },
        ],
        directMessages: [
            { 
                id: "dm_mob1", 
                otherUserId: "1", // Sarah Chen
                unreadCount: 1, 
                messages: [
                    { id: "mob_dm1_1", userId: "1", content: "Could you take a look at the bottom tab navigator? The icons look a bit blurry on retina displays.", timestamp: "9:00 AM" },
                    { id: "mob_dm1_2", userId: "currentUser", content: "Sure, let me swap them out for the SVG versions instead of the PNGs.", timestamp: "9:15 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            }, 
            { 
                id: "dm_mob2", 
                otherUserId: "5", // Project Coordinator
                unreadCount: 0, 
                messages: [
                    { id: "mob_dm2_1", userId: "currentUser", content: "Hi! Do we have access to the client's Google Play Console yet?", timestamp: "Yesterday, 2:00 PM" },
                    { id: "mob_dm2_2", userId: "5", content: "Yes, an invite was just sent to the team email alias.", timestamp: "Yesterday, 2:30 PM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            }
        ],
        sharedFiles: [
            {
                id: "f_mob1",
                name: "AppStore_Screenshots_Final.zip",
                size: "24.5 MB",
                type: "archive",
                uploadedBy: "7",
                uploadDate: "May 10, 2026",
                content: "Contains all 6.5-inch and 5.5-inch display screenshots for the iOS App Store listing. Formatted in PNG, no alpha channels."
            },
            {
                id: "f_mob2",
                name: "eas.json",
                size: "1.2 KB",
                type: "code",
                uploadedBy: "currentUser",
                uploadDate: "May 08, 2026",
                content: "{\n  \"cli\": {\n    \"version\": \">= 7.6.0\"\n  },\n  \"build\": {\n    \"development\": {\n      \"developmentClient\": true,\n      \"distribution\": \"internal\"\n    },\n    \"production\": {\n      \"node\": \"18.x\"\n    }\n  },\n  \"submit\": {\n    \"production\": {\n      \"ios\": {\n        \"appleId\": \"team@university.edu\",\n        \"ascAppId\": \"1234567890\"\n      }\n    }\n  }\n}"
            },
            {
                id: "f_mob3",
                name: "splash_screen_design.png",
                size: "3.4 MB",
                type: "image",
                uploadedBy: "21",
                uploadDate: "May 05, 2026",
                // A great looking mobile splash screen representation
                imageUri: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: "f_mob4",
                name: "Apple_Review_Guidelines_2026.pdf",
                size: "4.8 MB",
                type: "pdf",
                uploadedBy: "21",
                uploadDate: "May 01, 2026",
                content: "App Store Review Guidelines\n\n1. Safety\nWhen people install an app from the App Store, they want to feel confident that it’s safe to do so—that the app doesn’t contain upsetting or offensive content...\n\n2. Performance\nApp Completeness: Make sure your app is complete and free of crashes and obvious technical problems..."
            }
        ]
    },
    {
        id: "6",
        name: "Legacy .NET Upgraders",
        avatar: "https://i.pravatar.cc/150?u=dotnet",
        memberCount: 6,
        status: "busy",
        rating: 3.5,
        tags: ["#C#", "#ASP.NET", "#EFCore", "#Dapper", "#Azure", "#Enterprise"],
        skills: ["C#", ".NET Core 8", "ASP.NET Web API", "Entity Framework", "Dapper", "SQL Server", "Azure DevOps", "WCF Migration"],
        projectCount: 10,
        members: ["currentUser", "7", "8", "9", "10", "11"], // Included currentUser and Prof. Andrei (11)
        achievements: [
            { title: "Migration Master", description: "3 legacy systems modernized" },
            { title: "Refactoring Guru", description: "Reduced overall technical debt by 30%" },
            { title: "Database Optimizer", description: "Reduced complex query times by over 50%" },
            { title: "Bug Squasher", description: "Resolved 50+ user-reported issues in record time" },
            { title: "Zero Downtime", description: "99.9% uptime for 12 months" }
        ],
        recentProjects: [
            { name: "CRM Migration", client: "BigCorp", date: "Jan 2026", rating: 3.9 },
            { name: "Inventory System", client: "RetailMax", date: "Nov 2025", rating: 3.7 },
            { name: "Fleet Management", client: "DriveFleet", date: "Jan 2026", rating: 3.9 },
            { name: "Supply Chain Tracker", client: "LogiTrack", date: "Jan 2026", rating: 4.0 },
            { name: "Payment Gateway", client: "PayFlow", date: "Jan 2026", rating: 4.8 }
        ],
        channels: [],
        directMessages: [],
        sharedFiles: []
    },
    {
        id: "7",
        name: "Java Enthusiasts",
        avatar: "https://i.pravatar.cc/150?u=java",
        memberCount: 6,
        status: "available",
        rating: 3.5,
        tags: ["#Java", "#Spring", "#SpringBoot", "#JavaScript", "#Bootstrap", "#Enterprise", "#Maven", "#Hibernate"],
        skills: ["Java", "Spring Boot", "JavaScript", "Bootstrap", "JUnit", "Hibernate", "Maven", "Tomcat", "SQL", "Thymeleaf", "JSP", "Jenkins"],
        projectCount: 14,
        members: ["currentUser", "1", "2", "3", "6", "11", "12"],
        achievements: [
            { title: "Code Quality Star", description: "95%+ test coverage" },
            { title: "Testing Guru", description: "Wrote 500+ unit tests" },
            { title: "Zero Downtime", description: "99.9% uptime for 12 months" },
            { title: "Security Champion", description: "Passed all security audits" },
            { title: "Documentation Hero", description: "Wrote docs for 20+ endpoints" },
            { title: "CI/CD Pioneer", description: "Set up the first CI/CD pipeline" },
            { title: "Mentorship Excellence", description: "Mentored 10+ junior members" }
        ],
        recentProjects: [
            { name: "Student Portal", client: "University", date: "Mar 2026", rating: 4.1 },
            { name: "Learning Platform", client: "EduTech", date: "Feb 2026", rating: 4.5 },
            { name: "Campus Navigation", client: "University", date: "Jan 2026", rating: 3.7 },
            { name: "HR Management Tool", client: "PeopleFirst", date: "Apr 2026", rating: 4.4 },
            { name: "Online Booking System", client: "BookItNow", date: "Apr 2026", rating: 4.5 },
            { name: "Inventory System", client: "RetailMax", date: "Nov 2025", rating: 3.7 }
        ],
        channels: [
            { 
                id: "c1", 
                name: "general", 
                messages: [
                    { id: "java_gen1", userId: "11", content: "Welcome everyone to the Spring semester. Please make sure your JDK is updated to version 21 before pulling the Student Portal repo.", timestamp: "Monday, 8:00 AM" },
                    { id: "java_gen2", userId: "2", content: "Done. Has anyone had issues with the new Maven dependencies downloading?", timestamp: "Monday, 8:30 AM" },
                    { id: "java_gen3", userId: "currentUser", content: "Yeah, you have to flush your local .m2 cache. I posted the command in the resources channel.", timestamp: "Monday, 8:45 AM", reactions: [{ emoji: "👍", count: 2 }] }
                ] 
            },
            { 
                id: "c2", 
                name: "sprint-planning", 
                messages: [
                    { id: "java_sp1", userId: "currentUser", content: "Are we picking up the Bootstrap 5 migration tickets this sprint?", timestamp: "Yesterday, 10:00 AM" },
                    { id: "java_sp2", userId: "6", content: "Not yet. Prof. Laura wants us to hit 95% test coverage on the grading module first.", timestamp: "Yesterday, 10:15 AM", reactions: [{ emoji: "👍", count: 1 }] },
                    { id: "java_sp3", userId: "currentUser", content: "Got it. I'll write the Mockito tests for the Controller layer then.", timestamp: "Yesterday, 10:20 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            },
            {
                id: "c3",
                name: "announcements",
                messages: [
                    { 
                        id: "java_ann1", 
                        userId: "12", 
                        content: "The production server will undergo maintenance this Sunday to upgrade the Tomcat instances.", 
                        timestamp: "Yesterday, 5:00 PM", 
                        status: "approved",
                        approval: {
                            approver: "IT Department",
                            note: "Downtime window approved from 2 AM to 4 AM EST."
                        }
                    },
                    {
                        id: "java_ann2",
                        userId: "currentUser",
                        content: "Spring Boot 3.2 upgrade PR is currently running through the Jenkins pipeline.",
                        timestamp: "2 hours ago",
                        status: "pending"
                    }
                ],
            },
        ],
        directMessages: [
            { 
                id: "dm_java1", 
                otherUserId: "6", 
                unreadCount: 1, 
                messages: [
                    { id: "java_dm1_1", userId: "6", content: "Hey! Do you remember how to configure the Hibernate dialect for the testing database?", timestamp: "11:00 AM" },
                    { id: "java_dm1_2", userId: "currentUser", content: "Yeah, it goes in the application-test.properties file. Set spring.jpa.database-platform=org.hibernate.dialect.H2Dialect", timestamp: "11:05 AM" },
                    { id: "java_dm1_3", userId: "6", content: "Perfect, tests are passing now. Thank you!", timestamp: "11:10 AM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            }, 
            { 
                id: "dm_java2", 
                otherUserId: "11", // Prof. Andrei Dumitrescu
                unreadCount: 0, 
                messages: [
                    { id: "java_dm2_1", userId: "currentUser", content: "Professor, I've finished the documentation for the remaining 5 REST endpoints.", timestamp: "Monday, 4:00 PM" },
                    { id: "java_dm2_2", userId: "11", content: "Thank you. Your dedication to the 'Code Quality Star' metric is noted. Please review Elena's PR next.", timestamp: "Monday, 4:30 PM", reactions: [{ emoji: "👍", count: 1 }] }
                ] 
            }
        ],
        sharedFiles: [
            {
                id: "f_java1",
                name: "StudentPortal_UML.png",
                size: "1.2 MB",
                type: "image",
                uploadedBy: "11",
                uploadDate: "Oct 25, 2026",
                imageUri: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: "f_java2",
                name: "pom.xml",
                size: "4.5 KB",
                type: "code",
                uploadedBy: "currentUser",
                uploadDate: "Oct 24, 2026",
                content: "<project xmlns=\"http://maven.apache.org/POM/4.0.0\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>edu.university</groupId>\n  <artifactId>student-portal</artifactId>\n  <version>2.0.1-SNAPSHOT</version>\n  \n  <parent>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-parent</artifactId>\n    <version>3.2.0</version>\n  </parent>\n  \n  <dependencies>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n  </dependencies>\n</project>"
            },
            {
                id: "f_java3",
                name: "Java_Coding_Standards_2026.pdf",
                size: "2.1 MB",
                type: "pdf",
                uploadedBy: "12",
                uploadDate: "Oct 15, 2026",
                content: "University Java Coding Standards\n\n1. Naming Conventions\n- Classes must use PascalCase.\n- Methods and variables must use camelCase.\n- Constants must be ALL_CAPS_WITH_UNDERSCORES.\n\n2. Documentation\n- Every public method MUST have a Javadoc block explaining parameters and return values."
            },
            {
                id: "f_java4",
                name: "flush_cache_script.txt",
                size: "120 B",
                type: "doc",
                uploadedBy: "currentUser",
                uploadDate: "Oct 10, 2026",
                content: "If your dependencies are failing to download, run this in your terminal:\n\nrm -rf ~/.m2/repository/edu/university\nmvn clean install -U"
            }
        ]
    },
    {
    id: "8",
    name: "CyberSec Sentinels",
    avatar: "https://i.pravatar.cc/150?u=cybersec",
    memberCount: 5,
    status: "busy",
    rating: 4.9,
    tags: ["#Security", "#PenTesting", "#ZeroTrust", "#Cybersecurity"],
    skills: ["Kali Linux", "Wireshark", "Network Security", "Cryptography", "Python"],
    projectCount: 34,
    members: ["2", "4", "10", "15", "30"],
    achievements: [
      { title: 'Security Champion', description: 'Passed all security audits' },
      { title: 'Bug Bounty Hunter', description: 'Found and fixed 100+ critical bugs' }
    ],
    recentProjects: [
      { name: 'Zero Trust Security Model', client: 'DefendIt', date: 'May 2026', rating: 5.0 },
      { name: 'Fraud Detection Pipeline', client: 'SecureBank', date: 'Jun 2026', rating: 4.9 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "9",
    name: "Data Engineering Guild",
    avatar: "https://i.pravatar.cc/150?u=dataeng",
    memberCount: 8,
    status: "available",
    rating: 4.5,
    tags: ["#Data", "#ETL", "#Python", "#BigData", "#SQL"],
    skills: ["Python", "Apache Spark", "Snowflake", "SQL", "AWS Glue", "Airflow"],
    projectCount: 22,
    members: ["currentUser", "7", "8", "9", "22", "23", "24", "25"],
    achievements: [
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' },
      { title: 'Database Optimizer', description: 'Reduced complex query times by over 50%' }
    ],
    recentProjects: [
      { name: 'ETL Data Pipeline Upgrade', client: 'DataWorks', date: 'Mar 2026', rating: 4.7 },
      { name: 'Real-time Log Analytics', client: 'MetricsPro', date: 'Mar 2026', rating: 4.3 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "10",
    name: "QA Automation Squad",
    avatar: "https://i.pravatar.cc/150?u=qa",
    memberCount: 12,
    status: "available",
    rating: 4.7,
    tags: ["#QA", "#Testing", "#Cypress", "#Selenium"],
    skills: ["Cypress", "Selenium", "Jest", "Playwright", "Test Automation"],
    projectCount: 45,
    members: ["3", "12", "13", "14", "20", "28", "31", "32", "33", "34", "35", "40"],
    achievements: [
      { title: 'Testing Guru', description: 'Wrote 500+ unit tests' },
      { title: 'Code Quality Star', description: '95%+ test coverage' }
    ],
    recentProjects: [
      { name: 'Automated E2E Test Suite', client: 'QA Labs', date: 'Apr 2026', rating: 4.8 },
      { name: 'Chaos Testing Bot', client: 'Resilience Corp', date: 'Dec 2025', rating: 3.9 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "11",
    name: "Cloud Architects",
    avatar: "https://i.pravatar.cc/150?u=cloud",
    memberCount: 4,
    status: "busy",
    rating: 4.8,
    tags: ["#Cloud", "#AWS", "#DevOps", "#Infrastructure"],
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "Linux"],
    projectCount: 15,
    members: ["2", "5", "16", "41"],
    achievements: [
      { title: 'Cloud Native', description: 'Successfully migrated backend to serverless architecture' },
      { title: 'Zero Downtime', description: '99.9% uptime for 12 months' }
    ],
    recentProjects: [
      { name: 'Kubernetes Cluster Setup', client: 'CloudScale', date: 'Feb 2026', rating: 4.5 },
      { name: 'Load Balancer Configuration', client: 'HighTraffic Inc', date: 'May 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "12",
    name: "UI/UX Ninjas",
    avatar: "https://i.pravatar.cc/150?u=uiux",
    memberCount: 6,
    status: "available",
    rating: 4.9,
    tags: ["#Design", "#UI/UX", "#Figma", "#Accessibility"],
    skills: ["Figma", "Sketch", "CSS", "User Research", "Prototyping"],
    projectCount: 38,
    members: ["6", "17", "18", "19", "26", "27"],
    achievements: [
      { title: 'Pixel Perfect', description: 'Matched Figma designs with 100% accuracy' },
      { title: 'Accessibility Advocate', description: 'Achieved WCAG AA compliance' },
      { title: 'Design System Creator', description: 'Built a reusable component library' }
    ],
    recentProjects: [
      { name: 'Dark Mode Design System', client: 'StyleUX', date: 'Jan 2026', rating: 4.9 },
      { name: 'Web Accessibility Overhaul', client: 'GovTech', date: 'Jan 2026', rating: 5.0 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "13",
    name: "Blockchain Builders",
    avatar: "https://i.pravatar.cc/150?u=crypto",
    memberCount: 3,
    status: "busy",
    rating: 3.2,
    tags: ["#Web3", "#Crypto", "#Solidity", "#SmartContracts"],
    skills: ["Solidity", "Ethereum", "Rust", "Cryptography", "Web3.js"],
    projectCount: 6,
    members: ["8", "21", "44"],
    achievements: [
      { title: 'Innovation Award', description: 'Best ML model accuracy' }, // They pivot a lot
      { title: 'Quick Learner', description: 'Picked up a new tech stack in under 2 weeks' }
    ],
    recentProjects: [
      { name: 'Blockchain Smart Contract', client: 'CryptoFin', date: 'Feb 2026', rating: 3.5 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "14",
    name: "Game Dev Mavericks",
    avatar: "https://i.pravatar.cc/150?u=gamedev",
    memberCount: 9,
    status: "available",
    rating: 4.4,
    tags: ["#Gaming", "#Unity", "#C#", "#3D"],
    skills: ["Unity3D", "C#", "Blender", "Unreal Engine", "C++"],
    projectCount: 11,
    members: ["currentUser", "2", "4", "6", "9", "29", "38", "39", "42"],
    achievements: [
      { title: 'Animation Wizard', description: 'Implemented complex 60fps UI animations' },
      { title: 'Demo Day Winner', description: 'Best project presentation of the semester' }
    ],
    recentProjects: [
      { name: '3D WebGL Product Configurator', client: 'AutoMaker', date: 'Apr 2026', rating: 4.9 },
      { name: 'AR Furniture Viewer', client: 'HomeDecor', date: 'Jun 2026', rating: 4.4 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "15",
    name: "Serverless Synergists",
    avatar: "https://i.pravatar.cc/150?u=serverless",
    memberCount: 5,
    status: "busy",
    rating: 4.6,
    tags: ["#Serverless", "#AWSLambda", "#Node.js", "#Cloud"],
    skills: ["AWS Lambda", "API Gateway", "DynamoDB", "Node.js", "Serverless Framework"],
    projectCount: 19,
    members: ["5", "11", "12", "15", "16"], // Professor heavy team
    achievements: [
      { title: 'API Architect', description: 'Designed scalable RESTful APIs for 3 platforms' },
      { title: 'Research Pioneer', description: 'Published 3 internal tech papers' }
    ],
    recentProjects: [
      { name: 'Serverless Payment Webhook', client: 'PayFlow', date: 'Apr 2026', rating: 4.8 },
      { name: 'API Gateway', client: 'FinTech Inc', date: 'Mar 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "16",
    name: "Embedded Systems Lab",
    avatar: "https://i.pravatar.cc/150?u=iot",
    memberCount: 7,
    status: "available",
    rating: 3.8,
    tags: ["#IoT", "#Hardware", "#C++", "#Arduino"],
    skills: ["C", "C++", "Arduino", "Raspberry Pi", "Microcontrollers", "RTOS"],
    projectCount: 14,
    members: ["10", "13", "14", "22", "36", "37", "43"],
    achievements: [
      { title: 'Hackathon Winners', description: '1st place Spring 2026' },
      { title: 'Innovation Award', description: 'Best ML model accuracy' }
    ],
    recentProjects: [
      { name: 'IoT Dashboard', client: 'SmartHome Inc', date: 'Mar 2026', rating: 4.0 },
      { name: 'Drone Fleet Routing Algorithm', client: 'LogiTrack', date: 'Jan 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "17",
    name: "FinTech Force",
    avatar: "https://i.pravatar.cc/150?u=fintech",
    memberCount: 11,
    status: "busy",
    rating: 4.8,
    tags: ["#Finance", "#Security", "#Backend", "#Java"],
    skills: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Redis", "Financial APIs"],
    projectCount: 29,
    members: ["currentUser", "2", "3", "4", "7", "11", "20", "25", "30", "35", "40"],
    achievements: [
      { title: 'Client Favorite', description: '5 consecutive 5-star client reviews' },
      { title: 'Security Champion', description: 'Passed all security audits' },
      { title: 'On-Time Delivery', description: 'Never missed a deadline in 6 months' }
    ],
    recentProjects: [
      { name: 'Payment Gateway', client: 'PayFlow', date: 'Jan 2026', rating: 4.8 },
      { name: 'Expense Tracker', client: 'BudgetWise', date: 'May 2026', rating: 4.1 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "18",
    name: "The Agile Avengers",
    avatar: "https://i.pravatar.cc/150?u=agile",
    memberCount: 8,
    status: "available",
    rating: 4.2,
    tags: ["#Agile", "#Scrum", "#FullStack", "#Management"],
    skills: ["Scrum", "Jira", "React", "Node.js", "Project Management"],
    projectCount: 25,
    members: ["5", "6", "8", "9", "12", "18", "28", "31"],
    achievements: [
      { title: 'Agile Evangelist', description: 'Maintained perfect Jira/Trello boards for 5 sprints' },
      { title: 'Sprint Champion', description: '10 sprints completed with 100% velocity' }
    ],
    recentProjects: [
      { name: 'Task Manager', client: 'ProductivityCo', date: 'May 2026', rating: 4.3 },
      { name: 'HR Management Tool', client: 'PeopleFirst', date: 'Apr 2026', rating: 4.4 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "19",
    name: "Vue.js Virtuosos",
    avatar: "https://i.pravatar.cc/150?u=vue",
    memberCount: 5,
    status: "busy",
    rating: 4.5,
    tags: ["#Frontend", "#Vue.js", "#Nuxt", "#JavaScript"],
    skills: ["Vue.js", "Nuxt.js", "JavaScript", "Tailwind CSS", "Pinia"],
    projectCount: 16,
    members: ["currentUser", "10", "17", "21", "26"],
    achievements: [
      { title: 'Fast Delivery Award', description: '5 projects ahead of schedule' },
      { title: 'Top Rated Team', description: '4.8+ rating for 6 months' }
    ],
    recentProjects: [
      { name: 'Component Library', client: 'StartupXYZ', date: 'Feb 2026', rating: 4.9 },
      { name: 'Portfolio Builder', client: 'CreativeStudio', date: 'Apr 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "20",
    name: "Python Pioneers",
    avatar: "https://i.pravatar.cc/150?u=python",
    memberCount: 7,
    status: "available",
    rating: 4.0,
    tags: ["#Python", "#Django", "#Backend", "#Data"],
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Celery"],
    projectCount: 20,
    members: ["2", "3", "8", "16", "23", "33", "42"],
    achievements: [
      { title: 'Code Review Legend', description: '200+ code reviews completed' },
      { title: 'Mentorship Excellence', description: 'Mentored 10+ junior members' }
    ],
    recentProjects: [
      { name: 'Newsletter Platform', client: 'MailCraft', date: 'Mar 2026', rating: 4.0 },
      { name: 'API Rate Limiting Service', client: 'CloudScale', date: 'Jun 2026', rating: 4.8 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "21",
    name: "Go Lang Gurus",
    avatar: "https://i.pravatar.cc/150?u=golang",
    memberCount: 4,
    status: "busy",
    rating: 4.8,
    tags: ["#Go", "#Backend", "#Microservices", "#Performance"],
    skills: ["Go", "gRPC", "Docker", "Microservices", "Concurrency"],
    projectCount: 13,
    members: ["4", "9", "11", "29"],
    achievements: [
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' },
      { title: 'High Traffic Hero', description: 'Handled 10k+ concurrent users without crashing' }
    ],
    recentProjects: [
      { name: 'Video Encoding Microservice', client: 'StreamNow', date: 'May 2026', rating: 4.3 },
      { name: 'Distributed Caching Layer', client: 'SpeedyNet', date: 'Dec 2025', rating: 4.4 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "22",
    name: "Flutter Fanatics",
    avatar: "https://i.pravatar.cc/150?u=flutter",
    memberCount: 6,
    status: "available",
    rating: 3.9,
    tags: ["#Mobile", "#Flutter", "#Dart", "#CrossPlatform"],
    skills: ["Flutter", "Dart", "Firebase", "Mobile UI", "Animations"],
    projectCount: 17,
    members: ["6", "13", "14", "24", "38", "44"],
    achievements: [
      { title: 'App Store Featured', description: 'Featured app in Q1 2026' },
      { title: 'Quick Learner', description: 'Picked up a new tech stack in under 2 weeks' }
    ],
    recentProjects: [
      { name: 'Recipe App', client: 'FoodieHub', date: 'Dec 2025', rating: 3.6 },
      { name: 'Event Planner', client: 'EventBright', date: 'Jan 2026', rating: 4.1 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "23",
    name: "Site Reliability Experts",
    avatar: "https://i.pravatar.cc/150?u=sre",
    memberCount: 5,
    status: "busy",
    rating: 5.0,
    tags: ["#SRE", "#DevOps", "#Monitoring", "#Infrastructure"],
    skills: ["Prometheus", "Grafana", "Linux", "Bash", "Incident Response"],
    projectCount: 40,
    members: ["currentUser", "12", "15", "22", "28"], // Heavy prof/admin presence
    achievements: [
      { title: 'Zero Downtime', description: '99.9% uptime for 12 months' },
      { title: 'Night Owl', description: 'Pushed a life-saving hotfix at 2:00 AM' },
      { title: 'Bug Squasher', description: 'Resolved 50+ user-reported issues in record time' }
    ],
    recentProjects: [
      { name: 'Disaster Recovery Simulation', client: 'SafeGuard', date: 'Jun 2026', rating: 4.5 },
      { name: 'Real-time Log Analytics', client: 'MetricsPro', date: 'Mar 2026', rating: 4.3 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "24",
    name: "Open Source Samurais",
    avatar: "https://i.pravatar.cc/150?u=oss",
    memberCount: 14,
    status: "available",
    rating: 4.3,
    tags: ["#OSS", "#Community", "#JavaScript", "#Tools"],
    skills: ["JavaScript", "Git", "Markdown", "Community Management", "CI/CD"],
    projectCount: 50,
    members: ["2", "3", "4", "7", "8", "9", "10", "17", "18", "19", "20", "21", "25", "30"],
    achievements: [
      { title: 'Open Source Contributor', description: '50+ merged PRs in open source' },
      { title: 'Community Builder', description: 'Organized 5+ tech meetups' },
      { title: 'Internal Tooling Hero', description: 'Created a library adopted by 5 other teams' }
    ],
    recentProjects: [
      { name: 'Code Review Tool', client: 'DevTools Inc', date: 'Apr 2026', rating: 4.6 },
      { name: 'Automated Dependency Updates', client: 'DevTools Inc', date: 'Feb 2026', rating: 4.5 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "25",
    name: "Accessibility Advocates",
    avatar: "https://i.pravatar.cc/150?u=a11y",
    memberCount: 4,
    status: "available",
    rating: 4.9,
    tags: ["#A11y", "#Frontend", "#HTML", "#CSS"],
    skills: ["HTML5", "CSS3", "WCAG", "Screen Readers", "ARIA"],
    projectCount: 12,
    members: ["currentUser", "12", "16", "31"],
    achievements: [
      { title: 'Accessibility Advocate', description: 'Achieved WCAG AA compliance' },
      { title: 'Client Favorite', description: '5 consecutive 5-star client reviews' }
    ],
    recentProjects: [
      { name: 'Web Accessibility Overhaul', client: 'GovTech', date: 'Jan 2026', rating: 5.0 },
      { name: 'Student Portal', client: 'University', date: 'Mar 2026', rating: 4.1 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "26",
    name: "Ruby Rustlers",
    avatar: "https://i.pravatar.cc/150?u=ruby",
    memberCount: 5,
    status: "busy",
    rating: 3.6,
    tags: ["#Ruby", "#Rails", "#Backend", "#Web"],
    skills: ["Ruby", "Ruby on Rails", "PostgreSQL", "RSpec", "Sidekiq"],
    projectCount: 21,
    members: ["6", "13", "27", "34", "36"],
    achievements: [
      { title: 'Refactoring Guru', description: 'Reduced overall technical debt by 30%' },
      { title: 'On-Time Delivery', description: 'Never missed a deadline in 6 months' }
    ],
    recentProjects: [
      { name: 'Volunteer Matching', client: 'GiveBack', date: 'Feb 2026', rating: 4.3 },
      { name: 'Pet Adoption Platform', client: 'PawFriends', date: 'Dec 2025', rating: 4.9 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "27",
    name: "Big Data Bosses",
    avatar: "https://i.pravatar.cc/150?u=bigdata",
    memberCount: 7,
    status: "available",
    rating: 4.6,
    tags: ["#Data", "#MachineLearning", "#Hadoop", "#Analytics"],
    skills: ["Hadoop", "Spark", "Scala", "Data Warehousing", "Tableau"],
    projectCount: 18,
    members: ["2", "5", "8", "11", "22", "33", "42"],
    achievements: [
      { title: 'Innovation Award', description: 'Best ML model accuracy' },
      { title: 'Research Pioneer', description: 'Published 3 internal tech papers' }
    ],
    recentProjects: [
      { name: 'Dashboard Analytics', client: 'DataViz Co', date: 'Apr 2026', rating: 4.6 },
      { name: 'Social Media Dashboard', client: 'BuzzMetrics', date: 'Feb 2026', rating: 4.2 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "28",
    name: "Progressive Web App Devs",
    avatar: "https://i.pravatar.cc/150?u=pwa",
    memberCount: 6,
    status: "busy",
    rating: 4.1,
    tags: ["#PWA", "#Frontend", "#ServiceWorkers", "#Web"],
    skills: ["JavaScript", "Service Workers", "IndexedDB", "Web App Manifest", "Lighthouse"],
    projectCount: 14,
    members: ["currentUser", "3", "9", "18", "29", "39"],
    achievements: [
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' },
      { title: 'Green Energy Coder', description: 'Optimized app to reduce battery consumption by 20%' }
    ],
    recentProjects: [
      { name: 'PWA Offline Mode', client: 'NewsNow', date: 'Jan 2026', rating: 4.0 },
      { name: 'Digital Menu', client: 'FoodieHub', date: 'May 2026', rating: 4.8 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "29",
    name: "The CI/CD Masters",
    avatar: "https://i.pravatar.cc/150?u=cicd",
    memberCount: 4,
    status: "available",
    rating: 4.7,
    tags: ["#DevOps", "#Pipelines", "#GitHubActions", "#Jenkins"],
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "Docker", "YAML"],
    projectCount: 32,
    members: ["4", "10", "15", "23"],
    achievements: [
      { title: 'CI/CD Pioneer', description: 'Set up the first CI/CD pipeline' },
      { title: 'Feature Factory', description: 'Delivered 20+ epic features in a single quarter' }
    ],
    recentProjects: [
      { name: 'Automated E2E Test Suite', client: 'QA Labs', date: 'Apr 2026', rating: 4.8 },
      { name: 'Automated Dependency Updates', client: 'DevTools Inc', date: 'Feb 2026', rating: 4.5 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "30",
    name: "NLP Innovators",
    avatar: "https://i.pravatar.cc/150?u=nlp",
    memberCount: 8,
    status: "busy",
    rating: 4.4,
    tags: ["#AI", "#NLP", "#Chatbots", "#Python"],
    skills: ["Python", "NLTK", "Spacy", "Transformers", "LLMs"],
    projectCount: 9,
    members: ["2", "6", "8", "16", "22", "30", "35", "40"],
    achievements: [
      { title: 'Innovation Award', description: 'Best ML model accuracy' },
      { title: 'Research Pioneer', description: 'Published 3 internal tech papers' }
    ],
    recentProjects: [
      { name: 'NLP Chatbot Enhancements', client: 'HelpDesk AI', date: 'Apr 2026', rating: 3.7 },
      { name: 'Sentiment Analyzer', client: 'MediaCo', date: 'Mar 2026', rating: 4.0 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "31",
    name: "Micro Frontenders",
    avatar: "https://i.pravatar.cc/150?u=microfrontend",
    memberCount: 10,
    status: "available",
    rating: 4.0,
    tags: ["#Frontend", "#Architecture", "#Webpack", "#React"],
    skills: ["React", "Webpack Module Federation", "Single-SPA", "System Design"],
    projectCount: 12,
    members: ["currentUser", "3", "4", "7", "11", "17", "21", "24", "26", "38"],
    achievements: [
      { title: 'Migration Master', description: '3 legacy systems modernized' },
      { title: 'Cross-Team Collaborator', description: 'Contributed to 3+ different teams' }
    ],
    recentProjects: [
      { name: 'Micro Frontends Architecture', client: 'BigStore', date: 'Apr 2026', rating: 4.2 },
      { name: 'E-commerce Platform', client: 'ShopNow', date: 'Feb 2026', rating: 3.8 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "32",
    name: "HealthTech Hackers",
    avatar: "https://i.pravatar.cc/150?u=healthtech",
    memberCount: 6,
    status: "busy",
    rating: 4.8,
    tags: ["#Healthcare", "#Compliance", "#Backend", "#Data"],
    skills: ["HIPAA Compliance", "HL7", "Python", "Data Security", "AWS"],
    projectCount: 22,
    members: ["5", "12", "19", "25", "32", "37"],
    achievements: [
      { title: 'Security Champion', description: 'Passed all security audits' },
      { title: 'Top Rated Team', description: '4.8+ rating for 6 months' }
    ],
    recentProjects: [
      { name: 'Fitness Tracker', client: 'HealthPlus', date: 'Feb 2026', rating: 4.2 },
      { name: 'Biometric Auth Module', client: 'SecureBank', date: 'May 2026', rating: 4.9 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "33",
    name: "AR/VR Visionaries",
    avatar: "https://i.pravatar.cc/150?u=arvr",
    memberCount: 5,
    status: "available",
    rating: 4.3,
    tags: ["#AR", "#VR", "#3D", "#Innovation"],
    skills: ["ARKit", "ARCore", "Unity", "Three.js", "WebGL"],
    projectCount: 8,
    members: ["2", "8", "14", "28", "43"],
    achievements: [
      { title: 'Hackathon Winners', description: '1st place Spring 2026' },
      { title: 'Innovation Award', description: 'Best ML model accuracy' } // Loosely applied to Innovation
    ],
    recentProjects: [
      { name: 'AR Furniture Viewer', client: 'HomeDecor', date: 'Jun 2026', rating: 4.4 },
      { name: '3D WebGL Product Configurator', client: 'AutoMaker', date: 'Apr 2026', rating: 4.9 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "34",
    name: "Rust Renegades",
    avatar: "https://i.pravatar.cc/150?u=rust",
    memberCount: 4,
    status: "busy",
    rating: 4.9,
    tags: ["#Rust", "#Systems", "#Performance", "#Backend"],
    skills: ["Rust", "C++", "Memory Management", "WebAssembly", "Concurrency"],
    projectCount: 11,
    members: ["currentUser", "9", "16", "31"],
    achievements: [
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' },
      { title: 'Type Safety Net', description: 'Achieved 100% strict TypeScript compliance' } // Equivalent for Rust strictness
    ],
    recentProjects: [
      { name: 'Video Encoding Microservice', client: 'StreamNow', date: 'May 2026', rating: 4.3 },
      { name: 'API Gateway', client: 'FinTech Inc', date: 'Mar 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "35",
    name: "Low-Code Luminaries",
    avatar: "https://i.pravatar.cc/150?u=lowcode",
    memberCount: 7,
    status: "available",
    rating: 3.8,
    tags: ["#LowCode", "#NoCode", "#RapidDev", "#Automation"],
    skills: ["Zapier", "Retool", "Webflow", "Airtable", "Process Automation"],
    projectCount: 42,
    members: ["3", "6", "10", "15", "20", "27", "41"],
    achievements: [
      { title: 'Fast Delivery Award', description: '5 projects ahead of schedule' },
      { title: 'Feature Factory', description: 'Delivered 20+ epic features in a single quarter' },
      { title: 'Client Favorite', description: '5 consecutive 5-star client reviews' }
    ],
    recentProjects: [
      { name: 'Newsletter Platform', client: 'MailCraft', date: 'Mar 2026', rating: 4.0 },
      { name: 'Portfolio Builder', client: 'CreativeStudio', date: 'Apr 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "36",
    name: "GraphQL Giants",
    avatar: "https://i.pravatar.cc/150?u=graphql",
    memberCount: 5,
    status: "busy",
    rating: 4.6,
    tags: ["#GraphQL", "#Apollo", "#Backend", "#API"],
    skills: ["GraphQL", "Apollo Server", "Node.js", "Prisma", "Schema Design"],
    projectCount: 16,
    members: ["currentUser", "4", "7", "11", "34"],
    achievements: [
      { title: 'API Architect', description: 'Designed scalable RESTful APIs for 3 platforms' }, // Adapted for GQL
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' }
    ],
    recentProjects: [
      { name: 'GraphQL API Migration', client: 'DataStream', date: 'May 2026', rating: 4.6 },
      { name: 'Student Portal', client: 'University', date: 'Mar 2026', rating: 4.1 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "37",
    name: "E-Commerce Experts",
    avatar: "https://i.pravatar.cc/150?u=ecommerce",
    memberCount: 8,
    status: "available",
    rating: 4.1,
    tags: ["#Shopify", "#Commerce", "#FullStack", "#Payments"],
    skills: ["Shopify Liquid", "Stripe API", "React", "Next.js", "Conversion Optimization"],
    projectCount: 28,
    members: ["2", "8", "12", "18", "23", "29", "33", "40"],
    achievements: [
      { title: 'Launch Day Legend', description: 'Led the successful V1.0 production release' },
      { title: 'Top Rated Team', description: '4.8+ rating for 6 months' }
    ],
    recentProjects: [
      { name: 'E-commerce Platform', client: 'ShopNow', date: 'Feb 2026', rating: 3.8 },
      { name: 'Payment Gateway', client: 'PayFlow', date: 'Jan 2026', rating: 4.8 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "38",
    name: "The Swift Syndicate",
    avatar: "https://i.pravatar.cc/150?u=swift",
    memberCount: 4,
    status: "busy",
    rating: 4.8,
    tags: ["#iOS", "#Swift", "#Mobile", "#Apple"],
    skills: ["Swift", "SwiftUI", "CoreData", "Combine", "XCode"],
    projectCount: 15,
    members: ["currentUser", "9", "13", "36"],
    achievements: [
      { title: 'App Store Featured', description: 'Featured app in Q1 2026' },
      { title: 'Code Quality Star', description: '95%+ test coverage' }
    ],
    recentProjects: [
      { name: 'iOS Home Screen Widgets', client: 'AppMasters', date: 'May 2026', rating: 4.6 },
      { name: 'Fitness Tracker', client: 'HealthPlus', date: 'Feb 2026', rating: 4.2 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "39",
    name: "Kotlin Kings",
    avatar: "https://i.pravatar.cc/150?u=kotlin",
    memberCount: 5,
    status: "available",
    rating: 4.4,
    tags: ["#Android", "#Kotlin", "#Mobile", "#Jetpack"],
    skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Room", "Android Studio"],
    projectCount: 18,
    members: ["3", "6", "14", "25", "39"],
    achievements: [
      { title: 'Bug Squasher', description: 'Resolved 50+ user-reported issues in record time' },
      { title: 'Fast Delivery Award', description: '5 projects ahead of schedule' }
    ],
    recentProjects: [
      { name: 'Mobile App Redesign', client: 'TechCorp', date: 'Mar 2026', rating: 5 },
      { name: 'Parking Spot Finder', client: 'ParkEasy', date: 'Nov 2025', rating: 3.4 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "40",
    name: "Audio/Video Streamers",
    avatar: "https://i.pravatar.cc/150?u=media",
    memberCount: 6,
    status: "busy",
    rating: 4.7,
    tags: ["#Media", "#WebRTC", "#Streaming", "#Video"],
    skills: ["WebRTC", "FFmpeg", "HLS", "Socket.io", "Media Servers"],
    projectCount: 10,
    members: ["4", "7", "11", "22", "30", "44"],
    achievements: [
      { title: 'Zero Downtime', description: '99.9% uptime for 12 months' },
      { title: 'High Traffic Hero', description: 'Handled 10k+ concurrent users without crashing' }
    ],
    recentProjects: [
      { name: 'Video Streaming Service', client: 'StreamNow', date: 'Apr 2026', rating: 4.6 },
      { name: 'Chat Platform', client: 'SocialNet', date: 'Dec 2025', rating: 4.3 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "41",
    name: "Hardware Hackers",
    avatar: "https://i.pravatar.cc/150?u=hardware",
    memberCount: 3,
    status: "available",
    rating: 4.2,
    tags: ["#Hardware", "#Robotics", "#C", "#Engineering"],
    skills: ["PCB Design", "C", "Soldering", "Sensors", "CAD"],
    projectCount: 7,
    members: ["currentUser", "5", "35"],
    achievements: [
      { title: 'Hackathon Winners', description: '1st place Spring 2026' },
      { title: 'Innovation Award', description: 'Best ML model accuracy' }
    ],
    recentProjects: [
      { name: 'IoT Dashboard', client: 'SmartHome Inc', date: 'Mar 2026', rating: 4.0 },
      { name: 'Drone Fleet Routing Algorithm', client: 'LogiTrack', date: 'Jan 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "42",
    name: "SEO Strategists",
    avatar: "https://i.pravatar.cc/150?u=seo",
    memberCount: 4,
    status: "busy",
    rating: 3.9,
    tags: ["#SEO", "#Marketing", "#Analytics", "#Web"],
    skills: ["Google Analytics", "A/B Testing", "Next.js", "Content Strategy", "Lighthouse"],
    projectCount: 24,
    members: ["2", "8", "16", "26"],
    achievements: [
      { title: 'Performance Optimizer', description: 'Reduced load time by 40%' },
      { title: 'Client Favorite', description: '5 consecutive 5-star client reviews' }
    ],
    recentProjects: [
      { name: 'Portfolio Builder', client: 'CreativeStudio', date: 'Apr 2026', rating: 4.7 },
      { name: 'E-commerce Platform', client: 'ShopNow', date: 'Feb 2026', rating: 3.8 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "43",
    name: "The Documentation Dream Team",
    avatar: "https://i.pravatar.cc/150?u=docs",
    memberCount: 5,
    status: "available",
    rating: 4.6,
    tags: ["#Docs", "#TechnicalWriting", "#OpenSource", "#Markdown"],
    skills: ["Technical Writing", "Docusaurus", "Markdown", "Swagger", "API Design"],
    projectCount: 30,
    members: ["3", "10", "17", "28", "42"],
    achievements: [
      { title: 'Documentation Hero', description: 'Wrote docs for 20+ endpoints' },
      { title: 'Team Spirit Award', description: 'Voted most helpful by teammates' }
    ],
    recentProjects: [
      { name: 'Component Library', client: 'StartupXYZ', date: 'Feb 2026', rating: 4.9 },
      { name: 'API Gateway', client: 'FinTech Inc', date: 'Mar 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "44",
    name: "SaaS Spinners",
    avatar: "https://i.pravatar.cc/150?u=saas",
    memberCount: 8,
    status: "busy",
    rating: 4.5,
    tags: ["#SaaS", "#B2B", "#FullStack", "#Startup"],
    skills: ["React", "Node.js", "Stripe", "Multi-tenancy", "AWS"],
    projectCount: 16,
    members: ["currentUser", "6", "9", "12", "19", "24", "31", "37"],
    achievements: [
      { title: 'Launch Day Legend', description: 'Led the successful V1.0 production release' },
      { title: 'Fast Delivery Award', description: '5 projects ahead of schedule' }
    ],
    recentProjects: [
      { name: 'HR Management Tool', client: 'PeopleFirst', date: 'Apr 2026', rating: 4.4 },
      { name: 'Online Booking System', client: 'BookItNow', date: 'Apr 2026', rating: 4.5 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "45",
    name: "Agtech Innovators",
    avatar: "https://i.pravatar.cc/150?u=agtech",
    memberCount: 4,
    status: "available",
    rating: 4.1,
    tags: ["#AgTech", "#IoT", "#Data", "#Sustainability"],
    skills: ["Python", "IoT Sensors", "Data Analysis", "GIS", "Machine Learning"],
    projectCount: 9,
    members: ["4", "11", "20", "32"],
    achievements: [
      { title: 'Green Energy Coder', description: 'Optimized app to reduce battery consumption by 20%' },
      { title: 'Research Pioneer', description: 'Published 3 internal tech papers' }
    ],
    recentProjects: [
      { name: 'Weather App', client: 'ClimateTech', date: 'Nov 2025', rating: 3.9 },
      { name: 'Supply Chain Tracker', client: 'LogiTrack', date: 'Jan 2026', rating: 4.0 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "46",
    name: "The Accessibility Auditors",
    avatar: "https://i.pravatar.cc/150?u=audit",
    memberCount: 3,
    status: "busy",
    rating: 5.0,
    tags: ["#Audit", "#QA", "#A11y", "#Compliance"],
    skills: ["WCAG 2.1", "Screen Readers", "Manual Testing", "Reporting", "Jira"],
    projectCount: 55, // They do a lot of small audits
    members: ["currentUser", "7", "21"],
    achievements: [
      { title: 'Accessibility Advocate', description: 'Achieved WCAG AA compliance' },
      { title: 'Security Champion', description: 'Passed all security audits' }
    ],
    recentProjects: [
      { name: 'Web Accessibility Overhaul', client: 'GovTech', date: 'Jan 2026', rating: 5.0 },
      { name: 'Student Portal', client: 'University', date: 'Mar 2026', rating: 4.1 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  },
  {
    id: "47",
    name: "EdTech Enablers",
    avatar: "https://i.pravatar.cc/150?u=edtech",
    memberCount: 13,
    status: "available",
    rating: 4.8,
    tags: ["#EdTech", "#Education", "#Elearning", "#FullStack"],
    skills: ["React", "Django", "Video Streaming", "Gamification", "UX Design"],
    projectCount: 23,
    members: ["2", "5", "8", "10", "13", "14", "18", "23", "28", "34", "38", "41", "44"], // Heavy professor presence
    achievements: [
      { title: 'Community Builder', description: 'Organized 5+ tech meetups' },
      { title: 'Client Favorite', description: '5 consecutive 5-star client reviews' },
      { title: 'Demo Day Winner', description: 'Best project presentation of the semester' }
    ],
    recentProjects: [
      { name: 'Learning Platform', client: 'EduTech', date: 'Feb 2026', rating: 4.5 },
      { name: 'Language Learning App', client: 'LingoLeap', date: 'Mar 2026', rating: 4.7 }
    ],
    channels: [],
    directMessages: [],
    sharedFiles: []
  }
];