// Featured projects and research work
export const projects = [
  {
    id: "miniature-cav-fleets",
    slug: "miniature-cav-fleets",
    title: "Miniature Connected & Automated Vehicle Fleets",
    description: "Developed a comprehensive framework for integrating human factors into autonomous vehicle decision-making systems, focusing on trust, transparency, and user acceptance.",
    tags: ["Cooperative Driving Automation", "Robotics"],
    link: "/project_minicar",
    featured: true,
    status: "Active Research",
    objectives: [
      "Design and build a miniature testbed for cooperative driving automation research",
      "Develop V2V and V2I communication protocols for small-scale fleet coordination",
      "Create scalable algorithms for multi-vehicle trajectory planning and optimization",
      "Validate cooperation strategies through real-world miniature vehicle experiments"
    ],
    methodology: "This project combines hardware development, wireless communication systems, and cooperative control algorithms to create a physical testbed for connected and automated vehicle research.",
    methods: [
      "Custom miniature vehicle platform design with embedded sensors",
      "Wireless mesh networking for vehicle-to-vehicle communication",
      "Distributed optimization algorithms for fleet coordination",
      "Real-time trajectory planning and collision avoidance systems"
    ],
    technologies: ["ROS (Robot Operating System)", "ESP32 Microcontrollers", "Python", "C++", "Wireless Communication", "Computer Vision", "SLAM"],
    results: "Successfully demonstrated coordinated behaviors including platoon formation, intersection management, and cooperative lane merging with a fleet of 6 miniature vehicles.",
    metrics: [
      "Achieved 95% success rate in cooperative maneuvers",
      "Reduced average travel time by 23% through coordination",
      "Demonstrated real-time communication with <50ms latency",
      "Validated scalability with up to 10 vehicles simultaneously"
    ],
    challenges: "Scaling wireless communication reliability, managing real-time constraints, and ensuring robust performance in dynamic environments.",
    repository: "https://github.com/username/miniature-cav-fleets",
    publications: [
      {
        title: "Miniature Testbeds for Cooperative Driving Research",
        url: "/doc/miniature-testbeds.pdf"
      }
    ]
  },
  {
    id: "personalized-adaptive-cruise-control",
    slug: "personalized-adaptive-cruise-control",
    title: "Personalized Adaptive Cruise Control (P-ACC)",
    description: "Implemented inverse reinforcement learning algorithms to create personalized driving models for individual drivers, improving safety and comfort in autonomous vehicles.",
    tags: ["Inverse Reinforcement Learning", "Behavioral Modeling"],
    link: "/project_pacc",
    featured: true,
    status: "Published Research",
    objectives: [
      "Develop personalized driving models using inverse reinforcement learning",
      "Improve driver acceptance and comfort in automated driving systems",
      "Create adaptive control systems that learn individual driving preferences",
      "Validate personalization effectiveness through human subject studies"
    ],
    methodology: "Uses inverse reinforcement learning to infer individual driving preferences from human driving data, then applies these learned preferences to adaptive cruise control systems.",
    methods: [
      "Naturalistic driving data collection and analysis",
      "Inverse reinforcement learning algorithm development", 
      "Personalized reward function optimization",
      "Human-in-the-loop validation studies"
    ],
    technologies: ["Python", "TensorFlow", "MATLAB/Simulink", "CARLA Simulator", "Machine Learning", "Reinforcement Learning"],
    results: "Demonstrated 40% improvement in driver satisfaction and 25% reduction in intervention rates compared to standard adaptive cruise control.",
    metrics: [
      "40% increase in driver satisfaction scores",
      "25% reduction in manual interventions",
      "15% improvement in fuel efficiency",
      "Successful personalization for 85% of test participants"
    ],
    challenges: "Balancing personalization with safety constraints, handling diverse driving styles, and ensuring system robustness across different traffic conditions.",
    publications: [
      {
        title: "Personalized Adaptive Cruise Control using Inverse Reinforcement Learning",
        url: "/doc/personalized-acc.pdf"
      }
    ]
  }
];