// Game-specific data for Interactive Digital Twin mode only
import { publications } from '../content/publications.js';
import { projects } from '../content/projects.js';
import { research } from '../content/research.js'; 
import { personal } from '../content/personal.js';

export const gameData = {
  player: {
    x: 1250,
    y: 850,
    speed: 6,
    width: 48,
    height: 48,
  },
  world: {
    width: 2400,
    height: 1600,
  },
  npcs: [
    {
      name: "Dr. Chen",
      dialogue: [
        "Welcome to Bridge's research world!",
        "Did you know Bridge developed P-ACC using inverse reinforcement learning?",
        "The system learns individual driver preferences and adapts in real-time!",
        "Check the Papers Board - there are 15+ publications on cooperative driving!",
        "Bridge's work on digital twins is revolutionizing transportation safety.",
      ],
      position: { top: "650px", left: "400px" },
      sprite: "scientist",
      color: "blue",
    },
    {
      name: "Maya",
      dialogue: [
        "Bridge captures more than just research - check out the photography!",
        "Those vintage lens shots have such amazing character and warmth.",
        "I love how Bridge finds beauty between experiments and equations.",
        "The Gallery shows work from MIT, Grand Teton, and Joshua Tree!",
        "Each photo tells a story of curiosity and discovery.",
      ],
      position: { top: "450px", left: "1500px" },
      sprite: "photographer",
      color: "purple",
    },
    {
      name: "Alex",
      dialogue: [
        "Bridge's music production skills are incredible!",
        "Those electronic tracks blend science and creativity perfectly.",
        "The Music Studio has 'Spring kids', 'Island grass', and more!",
        "It's amazing how someone can model driver behavior AND create beats.",
        "Music and math both have patterns - Bridge sees them everywhere!",
      ],
      position: { top: "1050px", left: "400px" },
      sprite: "musician",
      color: "orange",
    },
    {
      name: "Pixel",
      dialogue: [
        "Beep boop! I'm the lab's AI assistant... sort of.",
        "Fun fact: Bridge's GNN models have 127,000+ parameters!",
        "I tried to learn driver behavior but kept getting carsick...",
        "Did you know cooperative driving requires 0.3ms response times?",
        "Error 404: Sarcasm module not found. Just kidding!",
        "Bridge taught me that humans are just really complex neural networks.",
      ],
      position: { top: "800px", left: "1700px" },
      sprite: "scientist",
      color: "green",
    },
    {
      name: "Luna",
      dialogue: [
        "I collect interesting data patterns like some people collect stamps.",
        "Bridge once said 'Every driver has a unique behavioral fingerprint.'",
        "I've been watching traffic for 3 years... cars are weird.",
        "The most beautiful equation? Probably something about entropy.",
        "Sometimes I wonder if autonomous cars dream of electric sheep...",
        "Want to hear a joke about UDP? Never mind, you might not get it.",
      ],
      position: { top: "300px", left: "1200px" },
      sprite: "photographer",
      color: "red",
    },
  ],
  areas: {
    "home-area": {
      label: "HOME BASE",
      icon: "🏠",
      position: { top: "750px", left: "1150px", width: "200px", height: "200px" },
      content: `
        <h2>WELCOME TO MY RESEARCH WORLD</h2>
        <p>Greetings, traveler! I'm Zhouqiao (Bridge) Zhao, a Postdoctoral Associate at MIT.</p>
        <p>This interactive portfolio showcases my research in intelligent transportation systems and human-centered AI.</p>
        <div style="margin-top: 20px;">
            <button class="menu-button" onclick="window.location.href='/blog'">📝 ACADEMIC PORTFOLIO</button>
            <button class="menu-button" onclick="showStats()">VIEW STATS</button>
            <button class="menu-button" onclick="showControls()">CONTROLS</button>
        </div>
        <p style="margin-top: 20px; font-size: 8px;">Explore the world and talk to NPCs to gain XP!</p>
      `,
    },
    "research-area": {
        label: "RESEARCH LAB",
        icon: "🔬",
        position: { top: "400px", left: "300px", width: "300px", height: "250px" },
        content: `
            <h2>RESEARCH LABORATORY</h2>
            <div style="text-align: center; margin: 15px 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">🧬</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    Exploring cooperation in intelligent transportation systems through multi-scale coordination,
                    human-centered AI, and digital twin technologies.
                </p>
            </div>
            
            <h3>📋 Research Philosophy:</h3>
            <div style="background: var(--highlight); padding: 15px; margin: 15px 0; border-radius: 5px; font-size: 9px; line-height: 1.5;">
                <p style="margin-bottom: 10px;">
                    <strong>Multi-Scale Approach:</strong> From macro-level fleet coordination to micro-level driver modeling
                </p>
                <p style="margin-bottom: 10px;">
                    <strong>Context-Aware Modeling:</strong> Driver–Vehicle–Environment triad using Graph Neural Networks
                </p>
                <p>
                    <strong>Human-Centered Design:</strong> Balancing automation capabilities with human agency and explainability
                </p>
            </div>
            
            <h3>🗺️ Research Roadmap:</h3>
            <div style="background: var(--highlight); padding: 15px; margin: 15px 0; border-radius: 5px; font-size: 9px; line-height: 1.5;">
                <p style="margin-bottom: 10px;">
                    <strong>Current Focus:</strong> Multi-scale cooperative driving systems integrating human factors, AI, and digital twin technologies
                </p>
                <p style="margin-bottom: 10px;">
                    <strong>Methodology:</strong> Context-aware modeling using Driver–Vehicle–Environment triad with Graph Neural Networks and explainable AI
                </p>
                <p>
                    <strong>Impact:</strong> Creating safer, more efficient transportation systems that preserve human agency while maximizing automation benefits
                </p>
            </div>

            <div style="margin: 15px 0; text-align: center;">
                <button class="menu-button" onclick="showResearchRoadmap()" style="font-size: 9px; padding: 8px 12px; margin: 5px;">🗺️ VIEW FRAMEWORK</button>
            </div>
            
            <h3>🎯 Research Focus Areas:</h3>
            <div style="margin: 15px 0;">
                <button class="menu-button" onclick="showResearchDetail('cooperative-driving')" style="margin: 5px 2px; font-size: 9px; padding: 8px 12px;">
                    🚗 Cooperative Driving Automation
                </button>
                <button class="menu-button" onclick="showResearchDetail('human-ai')" style="margin: 5px 2px; font-size: 9px; padding: 8px 12px;">
                    🧠 Human-Centered AI
                </button>
                <button class="menu-button" onclick="showResearchDetail('digital-twins')" style="margin: 5px 2px; font-size: 9px; padding: 8px 12px;">
                    🤖 Digital Twin Technologies
                </button>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <button class="menu-button" onclick="window.open('/blog#research', '_blank')">📖 FULL RESEARCH</button>
                <button class="menu-button" onclick="window.open('${personal.links.researchGate}', '_blank')">🔬 RESEARCHGATE</button>
            </div>
        `,
    },
    "papers-board": {
        label: "PAPERS",
        icon: "📋",
        position: { top: "450px", left: "650px", width: "100px", height: "70px" },
        content: `
            <h2>📋 RESEARCH PAPERS</h2>
            <div style="text-align: center; margin: 15px 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">📄</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    Browse ${publications.length} peer-reviewed publications in autonomous driving, human-AI interaction, and transportation systems.
                </p>
            </div>
            
            <div id="publication-browser" style="background: var(--highlight); border: 2px solid var(--secondary); padding: 15px; margin: 10px 0; border-radius: 5px; min-height: 120px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <button onclick="previousPaper()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="paper-counter" style="font-size: 8px; color: var(--secondary);">Paper 1 of ${publications.length}</div>
                    <button onclick="nextPaper()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
                </div>
                <div id="paper-scroll-bar" style="background: var(--secondary); height: 4px; margin: 5px 0; border-radius: 2px;">
                    <div id="paper-scroll-thumb" style="background: var(--accent); height: 100%; width: ${Math.round(100/publications.length)}%; border-radius: 2px; transition: margin-left 0.3s;"></div>
                </div>
                <div id="current-paper" style="font-size: 10px; line-height: 1.4;">
                    <strong>${publications[0].title}</strong><br>
                    <em style="color: var(--accent);">${publications[0].venue} (${publications[0].year})</em><br>
                    <div style="margin: 12px 0; text-align: center;">
                        <button onclick="showPaperDetails(0)" style="padding: 8px 16px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 10px; cursor: pointer;">📄 DETAILS</button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <button class="menu-button" onclick="window.open('${personal.links.googleScholar}', '_blank')">📚 ALL PUBLICATIONS</button>
            </div>
        `,
    },
    "projects-board": {
        label: "PROJECTS",
        icon: "📁",
        position: { top: "550px", left: "650px", width: "100px", height: "70px" },
        content: `
            <h2>📁 RESEARCH PROJECTS</h2>
            <div style="text-align: center; margin: 15px 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">🚀</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    Explore ${projects.length} major research projects with interactive demos, publications, and technical details.
                </p>
            </div>
            
            <div id="project-browser-board" style="background: var(--highlight); border: 2px solid var(--secondary); padding: 15px; margin: 10px 0; border-radius: 5px; min-height: 120px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <button onclick="previousProjectBoard()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="project-counter-board" style="font-size: 8px; color: var(--secondary);">Project 1 of ${projects.length}</div>
                    <button onclick="nextProjectBoard()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
                </div>
                <div id="project-scroll-bar-board" style="background: var(--secondary); height: 4px; margin: 5px 0; border-radius: 2px;">
                    <div id="project-scroll-thumb-board" style="background: var(--accent); height: 100%; width: ${Math.round(100/projects.length)}%; border-radius: 2px; transition: margin-left 0.3s;"></div>
                </div>
                <div id="current-project-board" style="font-size: 10px; line-height: 1.4;">
                    <strong>${projects[0].title}</strong><br>
                    <div style="margin: 8px 0;">
                        ${projects[0].scope_tags ? projects[0].scope_tags.map(tag => 
                            `<span style="background: var(--secondary); color: var(--primary); padding: 2px 6px; margin: 1px; font-size: 7px; border-radius: 8px; display: inline-block;">${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <div style="margin: 12px 0; text-align: center;">
                        <button onclick="showProjectDetails(0)" style="padding: 6px 12px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 9px; cursor: pointer;">🚀 DETAILS</button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <button class="menu-button" onclick="window.open('/blog#projects', '_blank')">📁 ALL PROJECTS</button>
            </div>
        `,
    },
    "gallery-area": {
        label: "PHOTO GALLERY",
        icon: "📸",
        position: { top: "400px", left: "1800px", width: "300px", height: "250px" },
        content: `
            <h2>📸 PHOTOGRAPHY STUDIO</h2>
            <div style="text-align: center; margin: 15px 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">🖼️</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    Captured moments from research adventures, travels, and life between experiments.
                </p>
            </div>
            
            <div id="photo-browser" style="background: var(--highlight); border: 2px solid var(--secondary); padding: 15px; margin: 10px 0; border-radius: 5px; min-height: 140px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <button onclick="previousPhotoPage()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="photo-page-counter" style="font-size: 8px; color: var(--secondary);">Page 1 of ${Math.ceil(personal.media.photos.length / 4)}</div>
                    <button onclick="nextPhotoPage()" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
                </div>
                <div id="photo-page-scroll-bar" style="background: var(--secondary); height: 4px; margin: 5px 0; border-radius: 2px;">
                    <div id="photo-page-scroll-thumb" style="background: var(--accent); height: 100%; width: ${Math.round(100/Math.ceil(personal.media.photos.length / 4))}%; border-radius: 2px; transition: margin-left 0.3s;"></div>
                </div>
                
                <!-- Multi-photo grid layout -->
                <div id="photo-grid" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; margin: 10px 0;">
                    ${personal.media.photos.slice(0, 4).map((photo, index) => `
                        <div style="text-align: center; cursor: pointer;" onclick="showPhotoDetails(${index})">
                            <div style="background: white; padding: 14px 14px 27px 14px; margin: 0 auto; width: 122px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                                <div style="width: 94px; height: 70px; background: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 14px; overflow: hidden;">
                                    <img src="/images/${photo.filename}" 
                                         style="width: 94px; height: 70px; object-fit: cover; border-radius: 4px;"
                                         onerror="this.style.display='none'; this.parentElement.innerHTML='📸';">
                                </div>
                                <div style="color: #333; font-size: 9px; font-weight: bold; line-height: 1.3; overflow: hidden; text-overflow: ellipsis;">
                                    ${photo.title.length > 12 ? photo.title.substring(0, 12) + '...' : photo.title}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin: 12px 0; text-align: center; font-size: 7px; color: var(--secondary);">
                    Click any photo to view full size
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <button class="menu-button" onclick="window.open('https://www.flickr.com/photos/bridgezhao/', '_blank')">☁️ FLICKR GALLERY</button>
            </div>
        `,
    },
    "music-area": {
        label: "MUSIC STUDIO",
        icon: "🎵",
        position: { top: "900px", left: "600px", width: "250px", height: "200px" },
        content: `
            <h2>MUSIC STUDIO</h2>
            <div class="music-controls">
                <button class="music-btn" onclick="playTrack('prev')">⏮</button>
                <button class="music-btn" id="play-btn" onclick="playTrack('toggle')">▶</button>
                <button class="music-btn" onclick="playTrack('next')">⏭</button>
            </div>
            <div style="margin: 20px 0;" id="track-list">
                <div class="menu-button track-btn" data-track="0" onclick="selectTrack(0)" style="display: block; margin: 10px auto; text-align: center; cursor: pointer; background: var(--highlight);">🎵 Spring kids</div>
                <div class="menu-button track-btn" data-track="1" onclick="selectTrack(1)" style="display: block; margin: 10px auto; text-align: center; cursor: pointer;">🎹 Island grass </div>
                <div class="menu-button track-btn" data-track="2" onclick="selectTrack(2)" style="display: block; margin: 10px auto; text-align: center; cursor: pointer;">🎼 A glass of ice </div>
            </div>
            <div style="text-align: center;">
                <button class="menu-button" onclick="window.open('https://soundcloud.com/zhouqiao-zhao', '_blank')">☁️ SOUNDCLOUD</button>
            </div>
        `,
    },
    "about-area": {
        label: "ABOUT ME",
        icon: "👤",
        position: { top: "900px", left: "1550px", width: "250px", height: "200px" },
        content: `
            <h2>👤 PLAYER PROFILE</h2>
            <div style="display: flex; gap: 20px; margin: 20px 0;">
                <div style="flex: 1;">
                    <h3>STATS:</h3>
                    <ul style="line-height: 2;">
                        <li>Level: {player.level}</li>
                        <li>XP: {player.xp}/{player.xpToNextLevel}</li>
                        <li>Class: Researcher/Creator</li>
                        <li>Location: ${personal.contact.location}</li>
                    </ul>
                </div>
                <div style="flex: 1;">
                    <h3>SKILLS:</h3>
                    <ul style="line-height: 1.8; font-size: 9px;">
                        <li>Cooperative Driving AI [████████░░] 85%</li>
                        <li>Human-Centered Design [█████████░] 88%</li>
                        <li>Music Production [███████░░░] 75%</li>
                        <li>Photography [██████░░░░] 65%</li>
                        <li>Digital Twin Tech [███████░░░] 70%</li>
                    </ul>
                </div>
            </div>
            <h3>JOURNEY:</h3>
            <p style="line-height: 1.8; font-size: 9px;">
                Completed PhD at UC Riverside in connected and automated vehicle systems. 
                Leveled up through research challenges and creative projects along the way. 
                Now at MIT, exploring the intersection of AI, transportation, and human behavior 
                while capturing the world through music and photography.
            </p>
            
            <h3 style="font-size: 9px; margin: 15px 0 8px 0;">🏛️ AFFILIATIONS:</h3>
            <div style="font-size: 8px; line-height: 1.5; margin-bottom: 15px;">
                <a href="${personal.links.mit_ctl}" target="_blank" style="color: var(--secondary); text-decoration: none;">MIT CTL</a> • 
                <a href="${personal.links.mit_agelab}" target="_blank" style="color: var(--secondary); text-decoration: none;">MIT AgeLab</a> • 
                <a href="${personal.links.mit_avt}" target="_blank" style="color: var(--secondary); text-decoration: none;">MIT AVT</a> • 
                <a href="${personal.links.ucr_ece}" target="_blank" style="color: var(--secondary); text-decoration: none;">UC Riverside</a>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <button class="menu-button" onclick="window.open('${personal.links.cv}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">📄 CV</button>
                <button class="menu-button" onclick="window.open('${personal.links.linkedin}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">💼 LINKEDIN</button>
                <button class="menu-button" onclick="window.open('${personal.links.labWebsite}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">🏛️ MIT BIO</button>
            </div>
        `,
    },
    "contact-area": {
        label: "CONTACT PORTAL",
        icon: "✉️",
        position: { top: "1200px", left: "1100px", width: "300px", height: "150px" },
        content: `
            <h2>📧 CONTACT HUB</h2>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 48px; margin-bottom: 15px;">📬</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    <strong>Connect for research collaborations, opportunities in transportation AI, and discussions.</strong>
                </p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <button class="menu-button" onclick="copyGameEmail()" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
                    📋 COPY EMAIL
                </button>
                <button class="menu-button" onclick="window.open('${personal.links.linkedin}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
                    💼 LINKEDIN
                </button>
                <button class="menu-button" onclick="window.open('${personal.links.researchGate}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
                    🔬 RESEARCHGATE
                </button>
                <button class="menu-button" onclick="window.open('${personal.links.googleScholar}', '_blank')" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
                    📚 SCHOLAR
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 15px; font-size: 8px; color: var(--accent); opacity: 0.8;">
                Open to research discussions and academic collaborations
            </div>
        `,
    },
  },
  collectibles: [
    { type: "xp", position: { top: "700px", left: "1000px" }, icon: "⭐" },
    { type: "xp", position: { top: "300px", left: "1400px" }, icon: "⭐" },
    { type: "achievement", position: { top: "500px", left: "1200px" }, icon: "🏆" },
    { type: "achievement", position: { top: "190px", left: "800px" }, icon: "🏆" },
    { type: "powerup", position: { top: "1100px", left: "800px" }, icon: "💎" },
    { type: "powerup", position: { top: "1000px", left: "1500px" }, icon: "💍" },
  ],
};