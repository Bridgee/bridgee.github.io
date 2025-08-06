// Content shared between both game and blog modes
export const sharedData = {
  // Featured projects displayed in both modes
  projects: [
    {
      id: "human-centered-av",
      title: "Human-Centered Autonomous Driving Framework",
      description: "Developed a comprehensive framework for integrating human factors into autonomous vehicle decision-making systems, focusing on trust, transparency, and user acceptance.",
      tags: ["Machine Learning", "Human-AI Interaction"],
      link: "#", // Replace with actual project link when available
      featured: true
    },
    {
      id: "personalized-driver-modeling",
      title: "Personalized Driver Behavior Modeling",
      description: "Implemented inverse reinforcement learning algorithms to create personalized driving models for individual drivers, improving safety and comfort in autonomous vehicles.",
      tags: ["Reinforcement Learning", "Behavioral Modeling"],
      link: "#", // Replace with actual project link when available
      featured: true
    },
    {
      id: "music-synthesis-platform",
      title: "Interactive Music Synthesis Platform",
      description: "Built a real-time interactive music synthesis platform combining algorithmic composition with user-driven creative control, exploring the intersection of AI and artistic expression.",
      tags: ["Audio Processing", "Creative AI"],
      link: "https://soundcloud.com/zhouqiao-zhao",
      featured: true
    }
  ],

  // Media assets for both modes
  media: {
    photos: [
      // Real Flickr photos from bridgezhao account
      { id: "54680329597", title: "Star Track", description: "Celestial night photography capturing star movements", emoji: "⭐" },
      { id: "54681311838", title: "Purple Island", description: "Mystical landscape with purple hues", emoji: "🟣" },
      { id: "54680184412", title: "The Game", description: "Creative composition exploring visual storytelling", emoji: "🎮" },
      { id: "54681001891", title: "Red People", description: "Vibrant street photography with bold colors", emoji: "🔴" },
      { id: "54680302237", title: "The Grand Teton", description: "Majestic mountain landscape photography", emoji: "🏔️" },
      { id: "54680359637", title: "Night in Joshua Tree", description: "Desert night scene under starlit sky", emoji: "🌌" }
    ],
    music: {
      // Real SoundCloud tracks from zhouqiao-zhao account
      tracks: [
        { id: "2137403307", title: "Spring kids", duration: "1:19" },
        { id: "2137347381", title: "Island grass", duration: "3:12" },  
        { id: "2137347393", title: "A glass of ice", duration: "1:04" }
      ],
      currentTrack: 0
    }
  },

  // Research interests for both modes
  research: {
    interests: [
      {
        title: "Connected & Automated Vehicles",
        description: "Developing personalized driver models using inverse reinforcement learning to improve autonomous vehicle safety and user acceptance.",
        future: "Expanding to multi-agent systems and V2X communication protocols for smart city integration.",
        tags: ["Active Research", "Industry Collaboration"]
      },
      {
        title: "Human-Centered AI", 
        description: "Building transparent AI systems that maintain human agency while leveraging machine intelligence for complex decision-making tasks.",
        future: "Exploring adaptive interfaces and explainable AI for critical applications in healthcare and transportation.",
        tags: ["Interdisciplinary", "Ethics Focus"]
      },
      {
        title: "Digital Twin Technologies",
        description: "Creating comprehensive digital replicas of human drivers and vehicles to enable real-time simulation and prediction in autonomous systems.",
        future: "Scaling to city-wide transportation networks and exploring applications in other complex systems.",
        tags: ["Emerging Tech", "Scalability"]
      }
    ]
  }
};