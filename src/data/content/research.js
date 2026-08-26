// Canonical lab identity and research agenda shared by both site modes.
const lab = {
  shortName: "HAITS Lab",
  abbreviation: "HAITS",
  fullName: "Human-Centered Artificial Intelligence for Intelligent Transportation Systems Lab",
  expandedName: "Human-Centered Artificial Intelligence for Intelligent Transportation Systems",
  pronunciation: "heights",
  tagline: "From human behavior to intelligent transportation systems.",
  description: "We study how understanding people can inform the design of intelligent agents and transportation systems—from individual behavior and interaction to fleets, networks, and system-level operations.",
  domainStatement: "Transportation is our primary application domain and proving ground, not the boundary of the research."
};

const methods = [
  "artificial intelligence and machine learning",
  "robotics",
  "control",
  "optimization",
  "human factors",
  "simulation and digital twins",
  "graph neural networks and explainable AI",
  "reinforcement and inverse reinforcement learning",
  "multimodal and foundation models"
];

const outcomes = [
  "safety",
  "environmental sustainability",
  "mobility",
  "trustworthy human–AI collaboration",
  "effective transportation operations"
];

const formatList = items => `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;

export const research = {
  lab,
  summary: "human-centered AI that connects how people behave, react, decide, and interact with the design of intelligent agents, fleets, transportation networks, and system-level operations.",
  vision: "My research asks how intelligent systems can be designed around the people who use, supervise, and share space with them. I model how people behave, react, decide, and interact, then translate that understanding into prediction, planning, coordination, and system design.",
  currentFocus: "Multimodal modeling of human–automation interaction, explainable AI, and multi-agent transportation systems.",
  methodology: `I combine ${formatList(methods)}.`,
  impact: `The work advances ${outcomes.slice(0, 2).join(", ")} and ${outcomes[2]}, while supporting ${outcomes.slice(3).join(" and ")}.`,
  methods,
  outcomes,

  interests: [
    {
      id: "behavior",
      title: "Human Behavior & Human–AI Interaction",
      icon: "👥",
      iconSrc: "/images/icons/vision_icon.png",
      description: "Understanding how people behave, react, decide, and interact with intelligent and automated systems using naturalistic, multimodal, and experimental data.",
      methods: "Multimodal learning, human factors, explainable AI, foundation models, and behavioral modeling.",
      tags: ["Behavior", "Interaction", "Trust & Safety"]
    },
    {
      id: "agents",
      title: "Intelligent Agents & Multi-Agent Coordination",
      icon: "🧠",
      iconSrc: "/images/icons/robot_icon.png",
      description: "Translating behavioral understanding into prediction, planning, personalization, and coordination for intelligent agents, vehicles, and fleets.",
      methods: "Machine learning, robotics, control, optimization, reinforcement learning, and inverse reinforcement learning.",
      tags: ["Agents", "Planning", "Coordination"]
    },
    {
      id: "systems",
      title: "Transportation Systems & Digital Twins",
      icon: "🚦",
      iconSrc: "/images/icons/digital_twin_icon.png",
      description: "Connecting mobility choices, multi-agent fleets, transportation networks, and system-level operations to improve safety, environmental sustainability, and mobility.",
      methods: "Network optimization, cooperative automation, simulation, digital twins, and system-level evaluation.",
      tags: ["Fleets", "Networks", "System Operations"]
    }
  ],
  agendaChain: [
    "human behavior, reactions & interactions",
    "trajectories",
    "mobility choices",
    "intelligent agents & fleets",
    "transportation networks",
    "system-level operations"
  ]
};
