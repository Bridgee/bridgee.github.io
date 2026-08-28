// Canonical identity, career, contact, links, and creative media.
// Portfolio and Interactive modes both consume this module.
const identity = {
  fullName: "Zhouqiao Zhao",
  displayName: "Zhouqiao (Bridge) Zhao",
  preferredName: "Bridge"
};

const currentRole = {
  title: "Assistant Professor of Electrical and Computer Engineering",
  shortTitle: "Assistant Professor",
  institution: "Loyola Marymount University",
  institutionShort: "LMU",
  department: "Electrical and Computer Engineering",
  departmentShort: "LMU Electrical & Computer Engineering",
  startDate: "August 2026",
  labRole: "Lead, HAITS Lab",
  headline: "Assistant Professor • LMU Electrical & Computer Engineering • Lead, HAITS Lab"
};

const links = {
  googleScholar: "https://scholar.google.com/citations?hl=en&user=Y1s8cw0AAAAJ&view_op=list_works&sortby=pubdate",
  youtubePlaylist: "https://youtube.com/playlist?list=PLglsfJu-Fhfg893g6oB0Jxnqo_zDuk7b-&si=w8rnWdLvJ6cXvSr6",
  linkedin: "https://www.linkedin.com/in/zhouqiao-zhao-60560a56/",
  researchGate: "https://www.researchgate.net/profile/Zhouqiao-Zhao",
  expertFile: "https://expertfile.com/experts/bridge.zhao/bridge-zhao",
  orcid: "https://orcid.org/0000-0002-5286-3807",
  haitsLab: "https://haits.lmu.build",
  lmu: "https://www.lmu.edu/",
  lmuEce: "https://cse.lmu.edu/department/electricalandcomputerengineeringdepartment/faculty/?expert=bridge.zhao",
  lmuCollegeFaculty: "https://cse.lmu.edu/faculty/?expert=bridge.zhao",
  soundcloud: "https://soundcloud.com/zhouqiao-zhao",
  flickr: "https://www.flickr.com/photos/bridgezhao/",
  mitCtl: "https://ctl.mit.edu/",
  mitCtlProfile: "https://ctl.mit.edu/people/zhouqiao-zhao",
  mitAgeLab: "https://agelab.mit.edu/",
  mitAgeLabProfile: "https://agelab.mit.edu/about-us/people/zhouqiao-bridge-zhao",
  mitAvt: "https://avt.mit.edu/",
  ucrEce: "https://www.ee.ucr.edu/",
  ucrCeCert: "https://www.cert.ucr.edu/",
  matthewBarth: "https://en.wikipedia.org/wiki/Matthew_Barth",
  guoyuanWu: "https://scholar.google.com/citations?user=VFRZoHSmZTwC&hl=en",
  hondaResearchInstitute: "https://usa.honda-ri.com/",
  toyotaInfoTech: "https://amrd.toyota.com/division/itl/",
  toyotaDigitalTwin: "https://www.youtube.com/watch?v=5_kU-PzQH0g",
  cv: "/doc/Zhouqiao_Zhao_CV.pdf",
  dissertation: "/doc/dissertation.pdf"
};

const academicProfiles = [
  {
    id: "lmu",
    label: "LMU Profile",
    gameLabel: "LMU PROFILE",
    url: links.lmuEce,
    icon: "🏛️"
  },
  {
    id: "expertfile",
    label: "ExpertFile",
    gameLabel: "EXPERTFILE",
    url: links.expertFile,
    icon: "🎓"
  },
  {
    id: "scholar",
    label: "Google Scholar",
    gameLabel: "SCHOLAR",
    url: links.googleScholar,
    icon: "📚",
    iconSrc: "/images/icons/google_scholar_icon.svg"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    gameLabel: "LINKEDIN",
    url: links.linkedin,
    icon: "💼",
    iconSrc: "/images/icons/linkedin_icon.svg"
  },
  {
    id: "researchgate",
    label: "ResearchGate",
    gameLabel: "RESEARCHGATE",
    url: links.researchGate,
    icon: "🔬",
    iconSrc: "/images/icons/research_gate_icon.png"
  }
];

const education = {
  doctorate: {
    degree: "PhD in Electrical Engineering",
    institution: "University of California, Riverside",
    institutionShort: "UC Riverside",
    period: "2018–2023"
  },
  masters: {
    degree: "MS in Electrical and Computer Engineering",
    institution: "The Ohio State University",
    institutionShort: "Ohio State",
    period: "2015–2017"
  },
  bachelors: {
    degree: "BS in Electronic and Information Engineering",
    institution: "University of Electronic Science and Technology of China",
    institutionShort: "UESTC",
    period: "2012–2015"
  }
};

const career = {
  lmu: {
    institution: currentRole.institution,
    institutionShort: currentRole.institutionShort,
    role: currentRole.title,
    unit: currentRole.department,
    period: "August 2026–present",
    current: true
  },
  mit: {
    institution: "Massachusetts Institute of Technology",
    institutionShort: "MIT",
    role: "Postdoctoral Associate",
    units: ["MIT AgeLab", "MIT Center for Transportation and Logistics"],
    supervisors: ["Pnina Gershon", "Bryan Reimer"],
    period: "September 2023–July 2026",
    current: false
  },
  ucr: {
    institution: education.doctorate.institution,
    institutionShort: education.doctorate.institutionShort,
    degree: education.doctorate.degree,
    advisors: ["Matthew Barth", "Guoyuan Wu"],
    dissertation: "A Connected Automation-Enabled Cooperative Management Framework for Mixed Traffic",
    period: education.doctorate.period,
    current: false
  }
};

export const personal = {
  identity,
  currentRole,

  contact: {
    email: "bridge.zhao@lmu.edu",
    location: "Los Angeles, California"
  },

  bio: {
    homeIntroduction: `Welcome! I'm ${identity.preferredName}, an ${currentRole.title} at ${currentRole.institution}, where I lead the HAITS Lab.`,
    careerSummary: `I completed a PhD in Electrical Engineering at ${career.ucr.institutionShort}, then joined the ${career.mit.units[0]} and ${career.mit.units[1]} as a ${career.mit.role}. I am now at ${currentRole.institutionShort}, where I lead the HAITS Lab.`,
    creativeSummary: "Beyond academia, I enjoy photography, sound design, music composition, and synthesizer design."
  },

  career,
  education,
  academicProfiles,

  affiliations: [
    { label: "LMU ECE", url: links.lmuEce, current: true },
    { label: "HAITS Lab", url: links.haitsLab, current: true },
    { label: "MIT AgeLab", url: links.mitAgeLab, current: false },
    { label: "MIT CTL", url: links.mitCtl, current: false },
    { label: "UC Riverside", url: links.ucrEce, current: false }
  ],

  links,

  media: {
    photos: [
      // Local gallery images with Flickr backup
      {
        id: "54680329597", 
        title: "Star Track",
        filename: "star_track.jpg",
        description: "",
      },
      {
        id: "54681311838",
        title: "Purple Island",
        filename: "purple_island.jpg",
        description: "",
      },
      {
        id: "54680184412",
        title: "The Game",
        filename: "the_game.jpg", 
        description: "",
      },
      {
        id: "54681001891",
        title: "Red People",
        filename: "red_people.jpg",
        description: "",
      },
      {
        id: "54680302237",
        title: "The Grand Teton",
        filename: "the_grand_teton.jpg",
        description: "", 
      },
      {
        id: "54680359637",
        title: "Night in Joshua Tree",
        filename: "night_in_joshua_tree.jpg", 
        description: "", 
      }
    ],

    music: {
      // Real SoundCloud tracks from zhouqiao-zhao account
      artistName: "BridgeZhao",
      tracks: [
        {
          id: "2137403307", 
          title: "Spring kids", 
          link: "https://soundcloud.com/zhouqiao-zhao/spring-kids",
          description: ""
        },
        {
          id: "2137347381", 
          title: "Island grass",
          link: "https://soundcloud.com/zhouqiao-zhao/island-grass-5",
          description: ""
        },  
        {
          id: "2137347393", 
          title: "A glass of ice", 
          link: "https://soundcloud.com/zhouqiao-zhao/a-glass-of-ice-1",
          description: ""
        }
      ]
    }
  }
};
