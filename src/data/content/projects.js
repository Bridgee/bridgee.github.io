// Featured projects and research work
export const projects = [
  // P-ACC
  {
    // Meta data
    slug: "personalized-adaptive-cruise-control",
    title: "Personalized Adaptive Cruise Control (P-ACC)",
    scope_tags: ["Behavior Modeling", "System Applications"],
    keywords: [
      "Inverse Reinforcement Learning", 
      "Gaussian Process Regression",
      "Behavioral Modeling", 
      "Adaptive Cruise Control",
      "Real-time Learning",
      "Human-in-the-loop Validation"
    ],

    // Overview
    description: "Implemented inverse reinforcement learning algorithms to create personalized driving models for individual drivers, improving safety and comfort in autonomous vehicles.", 
    objectives: [
      "Develop personalized driving models using inverse reinforcement learning",
      "Improve driver acceptance and comfort in automated driving systems",
      "Create adaptive control systems that learn individual driving preferences",
      "Validate personalization effectiveness through human subject studies"
    ],

    // Details
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
    
    // Resources
    publications: [
      {
        title: "Personalized Adaptive Cruise Control using Inverse Reinforcement Learning",
        url: "/doc/personalized-acc.pdf"
      }
    ]
  },

  // Human-in-the-loop simulation and testing platform
  {
    // Meta data
    slug: "human-in-the-loop-simulation-and-testing-platform",
    title: "Human-in-the-loop Simulation and Testing Platform",
    scope_tags: ["Sensing & Evaluation", "System Applications"],

    // Overview
    description: "Developed a human-in-the-loop simulation platform to test and validate autonomous driving algorithms in real-world scenarios.",
    
    // Details

    // Resources
  },

  // Ramp
  {
    // Meta data
    slug: "cooperative-driving-automation",
    title: "Cooperative Driving Automation (CDA) for Ramp Merging",
    scope_tags: ["System Applications"],

    // Overview
    description: "Developed cooperative driving automation (CDA) algorithms for safe and efficient ramp merging in mixed traffic environments.",
    
    // Details

    // Resources
  },

  // Roadside perception and V2I communication
  {
    // Meta data
    slug: "roadside-perception",
    title: "Roadside Perception and Vehicle-to-Infrastructure (V2I) Communication",
    scope_tags: ["Sensing & Evaluation", "System Applications"],

    // Overview
    description: "Developed roadside perception and V2I communication systems for real-time traffic monitoring and cooperative driving automation.",
    
    // Details

    // Resources
  },

  // Miniature CAV fleets
  {
    // Meta data
    slug: "miniature-cav-fleets",
    title: "Miniature Connected & Automated Vehicle Fleets",
    scope_tags: ["Sensing & Evaluation", "System Applications"],
    keywords: [
      "Connected andAutomated Vehicles",
      "ROS2 (Robot Operating System 2)", 
      "Raspberry Pi 4",
      "Camera and Lidar Perception",
      "FFFB Control",
      "Wireless Communication",
    ],

    // Overview
    overview: {
      summary: "Developed a fleet of miniature connected and automated vehicles to simulate cooperative driving automation in different traffic scenarios. The project designed and built the vehicles perception, decision making, control, and communication protocols from scratch, and the fleet was tested in various traffic scenarios.",
      bullets: [
        "Miniature testbed with multiple miniature connected and automated vehicles for cooperative driving automation proof-of-concept",
        "#-Shape track for urban scenario and J-shape track for highway scenario",
        "1:18 scale RC cars with ackermann steering and differential drive robot car for better maneuverability",
        "V2V communication protocol for small-scale fleet coordination",
      ],
    },

    // Details
    methodology: {
      summary: "",
      bullets: [ 
        "Sensors: speed encoders, one-dimensional LiDAR, fish-eye camera",
        "Computing Unit: Raspberry Pi 4B with ROS2 (Robot Operating System 2)",
        "Auxiliary circuits: motor driver, PWM driver",
        "Perception: U-Net for semantic segmentation, and ellipse detection for traffic sign detection",
        "Control: FFFB (Feed-Forward-Feedback) controller",
        "V2V Communication: IEEE 802.11p (Wi-Fi)"
      ],
      images: [
        {
          src: "/images/project_autotrac_cam_view.jpg",
          alt: "Traffic sign detection and environment perception"
        },
      ]
    }, 

    results: {
      summary: "Successfully demonstrated cooperative driving automation in a miniature fleet of connected and automated vehicles in highway and urban driving scenarios.",
      bullets: [
        "2nd place in International AUTOnomous vehicle TRAffic Challenge (called AUTOTRAC), held on June 17, 2021. AUTOTRAC is an internationally recognized competition funded by the European Commission under the Joint Research Centre's (JRC) Exploratory Research Program, aiming to raise awareness about the potential impact of automated vehicles' cooperation in future transport networks. The final event of the competition was held as part of the 7th International IEEE Conference on Models and Technologies for Intelligent Transportation Systems.",
        "People's Choice Award in the Student Poster Competition at the IEEE SusTech 2021 conference."
      ],
      images: [
        {
          src: "/images/project_autotrac_team.avif",
          alt: "CE-CERT AUTOTRAC Team"
        },
      ]
    },

    videos: [
      {
        title: "AUTOTRAC 2020 Competition Demo",
        url: "https://www.youtube.com/watch?v=OeG4tGgS0Wk",
      },
      {
        title: "Urban Scenario",
        url: "https://www.youtube.com/watch?v=wiyetcOoaXk",
      },
      {
        title: "Highway Scenario",
        url: "https://www.youtube.com/watch?v=BgQJrJPRylo&t=49s" ,
      }
    ],

    // Resources
    links: [
      {
        title: "JRC AUTOTRAC 2020 Competition",
        url: "https://joint-research-centre.ec.europa.eu/events/autotrac-2020-final-event-2021-06-17_en"
      },
      {
        title: "Rules",
        url: "https://joint-research-centre.ec.europa.eu/system/files/2019-05/autotrac2020_competition_rules.pdf"
      },
      {
        title: "CE-CERT News: UCR Team Takes 2nd Place",
        url: "https://www.cert.ucr.edu/news/2021/07/01/ce-cert-student-team-takes-2nd-place-autonomous-vehicle-traffic-challenge"
      },
      {
        title: "Toyota Digital Twin",
        url: "https://www.cert.ucr.edu/transportation-systems-vehicle-infrastructure-interaction/eco-friendly-intelligent-transportation-systems#toyota_digital_twin"
      }
    ],
    publications: [
      {
        title: "Robotics Competitions to Design Future Transport Systems: The Case of JRC AUTOTRAC 2020",
        url: "/doc/autotrac.pdf"
      }
    ],
    repository: "https://github.com/Bridgee/autotrac_ros",
  },
];