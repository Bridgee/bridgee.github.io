// Featured projects and research work
export const projects = [
  // P-ACC
  // toyota digital twin road map
  // a couple of papers ICRA, SMC and ITSC
  // start from IRL to GPR and real-time learning
  // DT structure
  // presentation and videos link
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
      "Human-in-the-loop Validation",
      "Cloud-Vehicle Architecture",
      "Digital Twin"
    ],

    // Overview
    overview: {
      summary: "Comprehensive research program developing personalized adaptive cruise control systems using inverse reinforcement learning and real-time adaptation. Part of Toyota's Digital Twin roadmap, evolving from offline IRL to online GPR-based real-time learning.",
      bullets: [
        "Cloud-vehicle collaborative framework for scalable personalized driving models",
        "Evolution from offline IRL modeling to online GPR-based real-time adaptation",
        "Driver and weather classification system for context-aware personalization",
        "Human-in-the-loop validation using Unity game engine simulator demonstrating up to 93.4% reduction in takeovers"
      ]
    },

    // Details
    methodology: {
      summary: "Multi-phase approach combining offline inverse reinforcement learning with online Gaussian process regression for real-time driver preference adaptation within a cloud-vehicle digital twin framework.",
      bullets: [
        "Offline Phase: IRL algorithm recovers reward functions from naturalistic driving data, classified by driver type and weather conditions",
        "Online Phase: GPR-based adaptation updates driving gap preference table (DGPT) in real-time using driver feedback",
        "Cloud Architecture: Digital Twin framework stores personalized models, enables incremental learning and federated model sharing",
        "Maximum cumulative reward criterion for model selection and real-time implementation"
      ],
      images: [
        {
          src: "/images/project_pacc_dt.png",
          alt: "P-ACC Digital Twin framework"
        },
        {
          src: "/images/project_pacc_online_learning.png",
          alt: "P-ACC IRL (offline) + GPR (online) learning"
        },
      ]
    },

    results: {
      summary: "Demonstrated improvements in personalization accuracy and driver satisfaction across multiple validation studies using both naturalistic driving data and human-in-the-loop simulation.",
      bullets: [
        "Numerical Simulation: 30.1% improvement in speed reproduction, 36.5% improvement in distance gap accuracy vs IDM",
        "Human-in-the-Loop: Up to 93.4% reduction in driver takeover frequency compared to IDM-based ACC",
        "Real-time Learning: 62.8% reduction in driver intervention (PoI) and 62.2% reduction in intervention frequency (NIM)",
        "Weather Adaptation: Successful personalization across clear sky, night, and foggy weather conditions",
        "Driver Classification: Effective model selection using cumulative reward criterion for untrained drivers"
      ],
    },

    videos: [
      {
        title: "P-ACC Presentation on ICRA 2022",
        url: "https://www.youtube.com/watch?v=emf0OvAOkMc&pp=0gcJCa0JAYcqIYzv",
      },
      {
        title: "Toyota Digital Twin Roadmap",
        url: "https://www.youtube.com/watch?v=5_kU-PzQH0g" ,
      }
    ],
    
    // Resources
    publications: [
      {
        title: "Personalized Car Following for Autonomous Driving with Inverse Reinforcement Learning",
        url: "/doc/personalized_car_following.pdf"
      },
      {
        title: "Real-time Learning of Driving Gap Preference for Personalized Adaptive Cruise Control",
        url: "/doc/real_time_pacc.pdf"
      },
      {
        title: "Inverse Reinforcement Learning and Gaussian Process Regression-based Real-time Framework for Personalized Adaptive Cruise Control",
        url: "/doc/real_time_pacc_with_gpr.pdf"
      }
    ],
    links: [
      {
        title: "Eco-Friendly ITS-DT",
        url: "https://www.cert.ucr.edu/transportation-systems-vehicle-infrastructure-interaction/eco-friendly-intelligent-transportation-systems#toyota-digital-twin"
      },
    ]
  },

  // AVT Behavior Modeling
  // key idea: context aware modeling: trids of vehicle-driver-environemnt modeling and XAI explainability
  // paper about lane-change preidction at honda
  // FCW paper at HFES
  // other unpublished work: GNN+XAI for FCW and TOC (transfer of control modeling)
  // other unpublished work: LLM for dirver pedestrian interaction modeling
  // link to AVT website
  {
    // Meta data
    slug: "driver-behavior-modeling-and-use-of-automation",
    title: "Driver Behavior Modeling and Use of Automation",
    scope_tags: ["Behavior Modeling"],
    keywords: [
      "Context-aware Modeling",
      "Explainable AI",
      "Lane Change Prediction", 
      "Forward Collision Warning",
      "Multi-modal Fusion",
      "Attention Mechanisms",
      "Naturalistic Driving Study"
    ],

    // Overview
    overview: {
      summary: "Comprehensive research program at MIT AgeLab developing context-aware driver behavior models using explainable AI methods. The core approach focuses on understanding triads of vehicle-driver-environment interactions in partial automation scenarios.",
      bullets: [
        "Context-aware modeling framework integrating vehicle dynamics, driver state, and environmental factors",
        "Multi-modal naturalistic driving data analysis using cameras, CAN bus, GPS, and IMU sensors",
        "Explainable AI methods for understanding human-automation interaction patterns",
        "Multiple research directions covering lane changes, collision warnings, transfer of control, and pedestrian interactions"
      ]
    },

    // Details
    methodology: {
      summary: "Employs naturalistic driving data from MIT-AVT dataset combined with advanced machine learning methods to understand context-dependent driver behavior in automated driving scenarios.",
      bullets: [
        "Naturalistic driving data collection: multi-perspective cameras (in-cabin face/body, forward view), CAN bus, GPS, IMU",
        "Context-aware modeling: triads of vehicle-driver-environment interactions with XAI explainability",
        "Multiple AI approaches: CNN-RNN with attention mechanisms, Graph Neural Networks (GNN), Large Language Models (LLM)",
        "Cross-scenario analysis: highway vs local roads, different automation levels, various traffic conditions"
      ],
      images: [
        {
          src: "/images/project_behavior_modeling_lane_change.png",
          alt: "Flowchart for lane change prediction"
        },
      ],
    },

    results: {
      summary: "Comprehensive insights into driver behavior patterns across multiple automation scenarios, with published and ongoing research demonstrating improved understanding of human-automation interaction.",
      bullets: [
        "Lane Change Prediction: 87% F1-score using multi-modal spatio-temporal attention networks",
        "Forward Collision Warning Analysis: Context-dependent effectiveness across road types and traffic scenarios",
        "Ongoing: GNN+XAI models for FCW effectiveness and Transfer of Control (TOC) modeling",
        "Ongoing: LLM-based driver-pedestrian interaction modeling in automated driving scenarios",
        "Ongoing: Electric vehicle usage patterns and large vehicle encounters during lateral assistance"
      ]
    },
    
    // Resources
    publications: [
      {
        title: "End-to-End Spatio-Temporal Attention-Based Lane-Change Intention Prediction from Multi-Perspective Cameras",
        url: "/doc/attention_based_lane_change.pdf"
      },
      {
        title: "Driver Behavior in Response to Forward Collision Warnings Considering Driving Context",
        url: "/doc/fcw_warning.pdf"
      }
    ],
    links: [
      {
        title: "MIT Advanced Vehicle Technology Consortium",
        url: "https://avt.mit.edu/"
      }
    ]
  },

  // Human-in-the-loop simulation and testing platform
  // https://www.cert.ucr.edu/shared-vehicle-testing
  // Dyno in the loop papers: recent Design, Implementation, .. paper, and original Dyno in the loop paper
  // other simulation effort: game engine based: p-acc paper, and lane-change prediction paper (with Xishun) using Unity
  // traffic simulation: SUMO, VISSIM
  // CARLA
  // co-simulation: link everythin level of simulation together 
  // also include the recent literature review paper: A Review of Personalization in Driving Behavior...
  {
    // Meta data
    slug: "human-in-the-loop-simulation-and-testing-platform",
    title: "Human-in-the-loop Simulation and Testing Platform",
    scope_tags: ["Sensing & Evaluation", "System Applications"],
    keywords: [
      "Human-in-the-Loop (HuiL)",
      "Dyno-in-the-Loop (DiL)", 
      "Multi-Human-in-the-Loop (MHuiL)",
      "Co-simulation Framework",
      "Vehicle Dynamics Testing",
      "Game Engine Simulation",
      "CARLA Simulator",
      "Unity Game Engine",
      "Traffic Simulation",
      "Hardware-in-the-Loop",
      "Real-time Validation",
      "Plug-in Hybrid Electric Bus (PHEB)"
    ],

    // Overview
    overview: {
      summary: "Comprehensive simulation and testing platform integrating human drivers with virtual environments and real vehicle hardware. Combines Dyno-in-the-Loop testing, game engine simulations, and traffic modeling to validate connected and automated vehicle technologies in realistic scenarios.",
      bullets: [
        "Dyno-in-the-Loop (DiL) platform integrating real vehicle hardware with virtual traffic environments",
        "Multi-Human-in-the-Loop (MHuiL) co-simulation framework enabling multiple human drivers in shared virtual scenarios",
        "Game engine-based simulation using Unity and CARLA for immersive human-vehicle interaction studies",
        "Traffic simulation integration with SUMO and VISSIM for realistic traffic flow modeling",
        "Real-time validation platform for personalized driving algorithms and vehicle control systems"
      ]
    },
    
    // Details
    methodology: {
      summary: "Multi-level simulation architecture combining hardware-in-the-loop testing with software simulation environments to create comprehensive validation platform for autonomous and connected vehicle technologies.",
      bullets: [
        "Hardware Integration: Real vehicle on chassis dynamometer with CAN bus data acquisition and powertrain control",
        "Virtual Environment: CARLA and Unity-based 3D simulation environments with realistic traffic scenarios",
        "Co-simulation Framework: Integration of vehicle dynamics, traffic flow, and human driver models in unified platform",
        "Multi-Human Support: Simultaneous multiple human drivers in shared virtual scenarios via networked simulation",
        "Real-time Communication: V2V and V2I communication protocols with realistic network delay modeling",
        "Validation Methods: Comparative analysis between simulation and real-world driving data for algorithm validation"
      ],
      images: [
        {
          src: "/images/project_dyno_flowchart.jpg",
          alt: "DiL platform flowchart"
        },
        {
          src: "/images/project_dyno_pt_optimization.jpg",
          alt: "DiL platform powertrain optimization"
        },
        {
          src: "/images/project_dyno_vd_optimization.jpg",
          alt: "DiL platform vehicle dynamics optimization"
        },
        {
          src: "/images/project_game_engine.jpg",
          alt: "Game engine-based simulation for driver personalization studies"
        }
      ]
    },

    results: {
      summary: "Successfully demonstrated comprehensive simulation platform capabilities across multiple vehicle types and scenarios, with validated improvements in energy efficiency and driving behavior modeling.",
      bullets: [
        "PHEB Eco-Operation: 13-15% fuel consumption reduction through coordinated vehicle-powertrain optimization",
        "Real-time Performance: Achieved stable co-simulation with <10ms latency for human-in-the-loop interactions",
        "Multi-Human Validation: Successfully tested up to 8 simultaneous human drivers in shared virtual scenarios",
        "Personalization Validation: P-ACC algorithm testing showed 93.4% reduction in driver takeover frequency",
        "Traffic Integration: Seamless integration with SUMO/VISSIM traffic models for realistic scenario testing",
        "Hardware Validation: Dyno-in-the-Loop testing validated across passenger cars, transit buses, and electric vehicles"
      ]
    },

    videos: [
      {
        title: "DiL Presentation at SAE World Congress 2020",
        url: "https://www.youtube.com/watch?v=ZxwppbHmcIY&t",
      },
      {
        title: "Modularized PHEB Modeling",
        url: "https://www.youtube.com/watch?v=8ed7obTcP6Y&t=736s",
      }
    ],

    // Resources
    publications: [
      {
        title: "Design, Implementation, and Evaluation of an Eco-Operation System for Plug-in Hybrid Electric Buses",
        url: "/doc/eco_operation_pheb.pdf"
      },
      {
        title: "A Dyno-in-the-Loop Approach for Testing Connected and Automated Vehicles in Virtual Traffic",
        url: "/doc/dyno_in_the_loop.pdf"
      },
      {
        title: "A Review of Personalization in Driving Behavior, Vehicle Control, and Traffic Management",
        url: "/doc/review_personalization.pdf"
      }
    ],
    links: [
      {
        title: "CE-CERT Shared Vehicle Testing Facility",
        url: "https://www.cert.ucr.edu/shared-vehicle-testing"
      },
      {
        title: "USDOE, ARPA-E Funded Project",
        url: "https://www.cert.ucr.edu/innovative-vehicle-powertrain-eco-operation-system-efficient-plug-hybrid-electric-buses"
      }
    ]
  },

  // Ramp: a CDA PoC case
  // A series of papers: ramp management in mixed traffic review, ramp merging, corridor-wise management and etc.
  // MPC, LQR, optimal control: hierarchical structure, corridor level, ramp level, vehicle level
  // trajectory optimization
  // quantified improvement from 3 perspectives: mobility, sustaintability, and safety
  // videos: presentation on IV Symposium2020: https://www.youtube.com/watch?v=BRihgKCiG4M, Demo on three scenarios: https://www.youtube.com/watch?v=fvL2_pBQYhI
  // methodology images: project_ramp_architecture.png and project_ramp_geometry.png
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
  // Innovation Corridor: https://www.cert.ucr.edu/riverside-innovation-corridor
  // Smart Intersection with RSPU: camera, lidar, gps with RTK, wireless communication
  // LiDAR: https://www.youtube.com/watch?v=0egpmgkzyG0
  // Camera: https://www.youtube.com/watch?v=yl-4032b-_k
  // Background substraction paper
  // Autocalibration, dynamic background subtraction based on hierarchical learning, validation in both CARLA simulation and real-world validation with communication delay
  // 3 demo images: project_rspu_architecture.png, project_rspu_communication_topology.jpg, project_rspu_results.png
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