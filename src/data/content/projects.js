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
        url: "https://www.cert.ucr.edu/transportation-systems-vehicle-infrastructure-interaction/eco-friendly-intelligent-transportation-systems"
      },
    ]
  },

  // AVT Behavior Modeling
  // Key idea: context-aware modeling of vehicle-driver-environment triads and explainable AI.
  // Related work includes lane-change prediction research at Honda.
  // Driver behavior and human-automation interaction research at MIT.
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
      summary: "Published and ongoing work across naturalistic driving, interviews, multimodal modeling, and explainable AI provides a connected view of human-automation interaction.",
      bullets: [
        "Lane Change Prediction: 87% F1-score using multi-modal spatio-temporal attention networks",
        "Forward Collision Warning Analysis: Context-dependent effectiveness across road types and traffic scenarios",
        "Transfer of Control: Published a 2026 context-aware GNN and explainable AI framework for prediction and design",
        "Driver Interviews: Published a 2026 LLM-agent workflow for comparing driver experience across partial automation systems",
        "Current Directions: Multimodal driver-pedestrian negotiation, FCW response modeling, and anomaly detection for transfers of control"
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
      },
      {
        title: "From Prediction to Design: Using Context-Aware Graph Neural Networks and Explainable AI to Anticipate Transfer-of-Control",
        url: "https://doi.org/10.4271/2026-01-0049"
      },
      {
        title: "Large-Language-Model-Agent-Enabled Analysis of Semi-Structured Interviews: Comparing Driver Experience Across Partial Automation Systems",
        url: "https://doi.org/10.1177/10711813261475249"
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
    keywords: [
      "Cooperative Driving Automation",
      "Ramp Merging",
      "Mixed Traffic",
      "Model Predictive Control (MPC)",
      "Linear Quadratic Regulator (LQR)",
      "Optimal Control",
      "Hierarchical Control",
      "Trajectory Optimization",
      "Connected and Automated Vehicles"
    ],

    // Overview
    overview: {
      summary: "Comprehensive cooperative driving automation system for safe and efficient ramp merging in mixed traffic environments. Implements hierarchical optimal control architecture spanning corridor, ramp, and vehicle levels with quantified improvements in mobility, sustainability, and safety.",
      bullets: [
        "Hierarchical optimal control system: corridor-level coordination, ramp-level metering, and vehicle-level trajectory optimization",
        "Mixed traffic environment support for seamless integration of human-driven and automated vehicles",
        "Multi-objective optimization targeting mobility improvement, energy efficiency, and safety enhancement",
        "Real-world validation through comprehensive simulation studies with traffic flow modeling"
      ]
    },

    // Details
    methodology: {
      summary: "Multi-level hierarchical control architecture combining corridor-wide ramp management with individual vehicle trajectory optimization using model predictive control and optimal control theory.",
      bullets: [
        "Corridor Level: Strategic ramp metering using coordination algorithms to optimize system-wide traffic flow",
        "Ramp Level: Model Predictive Control (MPC) for real-time ramp inflow rate optimization and merging coordination",
        "Vehicle Level: Linear Quadratic Regulator (LQR) and trajectory optimization for individual CAV speed and lane-change control",
        "Mixed Traffic Integration: Algorithms designed to handle both connected automated vehicles (CAVs) and human-driven vehicles",
        "Communication Protocols: V2V and V2I communication for real-time information sharing and cooperative decision-making"
      ],
      images: [
        {
          src: "/images/project_ramp_architecture.png",
          alt: "Hierarchical CDA ramp merging system architecture"
        },
        {
          src: "/images/project_ramp_geometry.png",
          alt: "Ramp merging geometry and control zones"
        }
      ]
    },

    results: {
      summary: "Demonstrated significant improvements across mobility, sustainability, and safety metrics through comprehensive simulation studies in realistic mixed traffic scenarios.",
      bullets: [
        "Mobility Enhancement: Up to 147% improvement in traffic throughput compared to conventional ramp metering",
        "Energy Efficiency: 47% fuel savings achieved through coordinated eco-friendly merging maneuvers",
        "Safety Improvement: Reduced conflict rates and smoother merging trajectories in mixed traffic scenarios",
        "Scalability Validation: Successful implementation across multiple ramp configurations and traffic density conditions",
        "Real-time Performance: Algorithms demonstrated computational feasibility for real-world deployment with sub-second response times"
      ]
    },

    videos: [
      {
        title: "IV Symposium 2020 Presentation",
        url: "https://www.youtube.com/watch?v=BRihgKCiG4M",
      },
      {
        title: "CDA Ramp Merging Demo - Three Scenarios",
        url: "https://www.youtube.com/watch?v=fvL2_pBQYhI",
      }
    ],

    // Resources
    publications: [
      {
        title: "Optimal Control-Based Eco-Ramp Merging System for Connected and Automated Vehicles",
        url: "/doc/cav_ramp.pdf"
      },
      {
        title: "The State-of-the-Art of Coordinated Ramp Control with Mixed Traffic Conditions",
        url: "/doc/review_of_cav_ramp_in_mixed_traffic.pdf"
      },
      {
        title: "Corridor-Wise Eco-Friendly Cooperative Ramp Management System for Connected and Automated Vehicles",
        url: "/doc/corridor_ramp_management.pdf"
      },
      {
        title: "Development of Eco-Friendly Ramp Control for Connected and Automated Electric Vehicles",
        url: "/doc/cav_ramp_tech_report.pdf"
      }
    ]
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
    keywords: [
      "Roadside Perception",
      "Vehicle-to-Infrastructure (V2I)",
      "Smart Intersection",
      "Roadside Perception Unit (RSPU)",
      "LiDAR Sensing",
      "Computer Vision",
      "Background Subtraction",
      "Real-time Traffic Monitoring",
      "Wireless Communication",
      "GPS with RTK",
      "Hierarchical Learning"
    ],

    // Overview
    overview: {
      summary: "Comprehensive roadside perception system integrating multi-sensor infrastructure for real-time traffic monitoring and V2I communication. Developed smart intersection technology with advanced computer vision algorithms for cooperative driving automation support.",
      bullets: [
        "Smart intersection infrastructure with integrated Roadside Perception Unit (RSPU) combining cameras, LiDAR, GPS with RTK, and wireless communication",
        "Advanced computer vision algorithms including hierarchical adaptive background subtraction for robust vehicle detection",
        "Real-time traffic monitoring system with sub-second latency for immediate traffic state estimation and communication",
        "Comprehensive validation framework including both CARLA simulation and real-world testing with communication delay modeling"
      ]
    },

    // Details
    methodology: {
      summary: "Multi-sensor fusion approach combining LiDAR, camera, and GPS technologies with advanced machine learning algorithms for robust traffic perception and real-time V2I communication in smart intersection environments.",
      bullets: [
        "Hardware Integration: Roadside Perception Unit (RSPU) with high-resolution cameras, 3D LiDAR, GPS with Real-Time Kinematic (RTK) positioning",
        "Computer Vision: Hierarchical adaptive background subtraction algorithm for robust vehicle detection in varying lighting and weather conditions",
        "Sensor Fusion: Multi-modal data integration for enhanced detection accuracy and reduced false positives in complex traffic scenarios",
        "Communication Architecture: Low-latency V2I communication protocols with real-time traffic state broadcasting to connected vehicles",
        "Auto-calibration System: Automated sensor calibration and dynamic parameter adjustment for long-term deployment reliability",
        "Validation Framework: Dual validation approach using CARLA simulation for controlled testing and real-world deployment for performance verification"
      ],
      images: [
        {
          src: "/images/project_rspu_architecture.png",
          alt: "Roadside Perception Unit (RSPU) system architecture"
        },
        {
          src: "/images/project_rspu_communication_topology.jpg",
          alt: "V2I communication network topology"
        },
        {
          src: "/images/project_rspu_results.png",
          alt: "Real-time traffic detection and monitoring results"
        }
      ]
    },

    results: {
      summary: "Successfully deployed smart intersection system with proven real-time traffic monitoring capabilities and reliable V2I communication performance validated through both simulation and field testing.",
      bullets: [
        "Real-time Performance: Achieved sub-100ms detection and communication latency for time-critical traffic applications",
        "Detection Accuracy: Superior performance compared to existing background subtraction algorithms in both simulation and real-world scenarios",
        "Weather Robustness: Maintained consistent detection performance across clear, rainy, and low-light conditions",
        "Communication Reliability: Demonstrated stable V2I communication with 99.5% message delivery rate within operational range",
        "Field Validation: Successfully deployed and tested at UC Riverside Innovation Corridor with multiple vehicle types and traffic scenarios",
        "Scalability Demonstration: Proven system architecture scalable to multiple intersection deployments with centralized coordination"
      ]
    },

    videos: [
      {
        title: "Smart Intersection LiDAR Demonstration",
        url: "https://www.youtube.com/watch?v=0egpmgkzyG0",
      },
      {
        title: "Roadside Camera-Based Traffic Detection",
        url: "https://www.youtube.com/watch?v=yl-4032b-_k",
      }
    ],

    // Resources
    publications: [
      {
        title: "Real-time Adaptive Background Subtraction for Traffic Scenarios at Signalized Intersections Based on Roadside Fish-eye Cameras",
        url: "/doc/real_time_adaptive_background_subtraction.pdf"
      },
      {
        title: "Connected Vehicle-Based Advanced Detection of Slow-Down Events on Freeways",
        url: "/doc/cav_slow_down.pdf"
      }
    ],
    links: [
      {
        title: "UC Riverside Innovation Corridor",
        url: "https://www.cert.ucr.edu/riverside-innovation-corridor"
      }
    ]
  },

  // Miniature CAV fleets
  {
    // Meta data
    slug: "miniature-cav-fleets",
    title: "Miniature Connected & Automated Vehicle Fleets",
    scope_tags: ["Sensing & Evaluation", "System Applications"],
    keywords: [
      "Connected and Automated Vehicles",
      "ROS2 (Robot Operating System 2)", 
      "Raspberry Pi 4",
      "Camera and Lidar Perception",
      "FFFB Control",
      "Wireless Communication",
    ],

    // Overview
    overview: {
      summary: "Developed a fleet of miniature connected and automated vehicles to simulate cooperative driving automation across varied traffic scenarios. The project designed and built the vehicle perception, decision-making, control, and communication systems from scratch, then tested the fleet in urban and highway scenarios.",
      bullets: [
        "Miniature testbed with multiple miniature connected and automated vehicles for cooperative driving automation proof-of-concept",
        "#-Shape track for urban scenario and J-shape track for highway scenario",
        "1:18 scale RC cars with Ackermann steering and a differential-drive robot car for enhanced maneuverability",
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
        url: "https://www.cert.ucr.edu/transportation-systems-vehicle-infrastructure-interaction/eco-friendly-intelligent-transportation-systems"
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


  // Routing and dispatching
  // 2 subproject and 3 papers
  // project 1: about optimizing the dispatching of battery-electric trucks: ant_dispatching_bev and bi_level_bet_dispatching
  // project 2: about demand-side cooperative shared automated mobility and simulated on a New York City network in SUMO: ride_sharing_simulation, with video demo: https://www.youtube.com/watch?v=bBsr0hk3Jxc
  {
    slug: "macroscopic-traffic-cooperation-and-optimization",
    title: "Macroscopic Traffic Cooperation and Optimization",
    scope_tags: ["System Applications"],
    keywords: [
      "Battery-Electric Truck Dispatching",
      "Vehicle Routing Problem",
      "Shared Automated Mobility",
      "Demand-Side Cooperation",
      "Metropolitan-Scale Optimization",
      "Metaheuristic Algorithms",
      "SUMO Traffic Simulation",
      "Pickup and Delivery",
      "En-route Charging",
      "Fleet Management"
    ],

    // Overview
    overview: {
      summary: "Large-scale traffic optimization research addressing metropolitan mobility challenges through advanced routing algorithms and cooperative mobility services. Encompasses both freight transportation with battery-electric truck fleets and passenger mobility through shared automated vehicle systems.",
      bullets: [
        "Battery-electric truck fleet optimization with bi-level hierarchical dispatching strategies for pickup and delivery operations",
        "Demand-side cooperative shared automated mobility (DC-SAM) framework for metropolitan passenger transportation",
        "Metaheuristic-based vehicle routing algorithms designed for large-scale real-world deployment scenarios",
        "Comprehensive validation using SUMO traffic simulation on New York City network with realistic traffic patterns"
      ]
    },

    // Details
    methodology: {
      summary: "Multi-scale optimization approach combining metaheuristic algorithms with microscopic traffic simulation to address both freight and passenger mobility challenges in metropolitan environments with electric and automated vehicle technologies.",
      bullets: [
        "Bi-Level Optimization: Upper-level routing zone partitioning and lower-level metaheuristic-based vehicle routing for scalable fleet dispatching",
        "Electric Vehicle Considerations: Integration of en-route opportunity charging, battery constraints, and energy-efficient routing for sustainable freight transport",
        "Demand-Side Cooperation: Passenger-centered shared mobility framework allowing flexible trip coordination and cooperative ride-sharing strategies",
        "Real-World Constraints: Time window compliance, traffic condition integration, and dynamic rerouting capabilities for practical deployment",
        "Simulation-Based Validation: Large-scale testing using SUMO microsimulation on realistic New York City network topology",
        "Performance Optimization: Multi-objective algorithms balancing travel time, energy consumption, service quality, and operational costs"
      ]
    },

    results: {
      summary: "Demonstrated significant improvements in operational efficiency and sustainability metrics across both freight and passenger transportation scenarios through comprehensive simulation studies on metropolitan-scale networks.",
      bullets: [
        "Freight Transportation: Substantial reduction in travel distance and time for battery-electric truck fleet operations with optimized dispatching",
        "Passenger Mobility: Significantly reduced operating costs for shared automated vehicles while improving customer service quality",
        "Energy Efficiency: Optimized charging strategies and energy-conscious routing leading to enhanced sustainability performance",
        "Scalability Validation: Successful algorithm performance on large-scale New York City network demonstrating real-world applicability",
        "Service Quality: Maintained high service levels while achieving operational efficiency through demand-side cooperation strategies",
        "Economic Impact: Demonstrated cost-effectiveness of cooperative mobility services compared to traditional transportation models"
      ]
    },

    videos: [
      {
        title: "Demand-Side Cooperative Shared Automated Mobility Demo",
        url: "https://www.youtube.com/watch?v=bBsr0hk3Jxc",
      }
    ],

    // Resources
    publications: [
      {
        title: "Vehicle Dispatching and Scheduling Algorithms for Battery Electric Heavy-Duty Truck Fleets Considering En-route Opportunity Charging",
        url: "/doc/ant_dispatching_bev.pdf"
      },
      {
        title: "Bi-Level Fleet Dispatching Strategy for Battery-Electric Trucks: A Real-World Case Study",
        url: "/doc/bi_level_bet_dispatching.pdf"
      },
      {
        title: "Shared Automated Mobility with Demand-Side Cooperation: A Proof-of-Concept Microsimulation Study",
        url: "/doc/ride_sharing_simulation.pdf"
      }
    ]
  },

];
