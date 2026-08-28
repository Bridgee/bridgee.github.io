// Game-specific data for Interactive Digital Twin mode only
import { publications } from '../content/publications.js';
import { projects } from '../content/projects.js';
import { personal } from '../content/personal.js';
import { research } from '../content/research.js';
import { modeConfig } from './modes.js';

const researchPrinciples = research.interests.map(area => `
  <p style="margin-bottom: 10px;">
    <strong>${area.title}:</strong> ${area.description}
  </p>
`).join('');

const researchButtons = research.interests.map(area => `
  <button class="menu-button" type="button" data-game-action="research-detail" data-research-id="${area.id}" style="margin: 5px 2px; font-size: 9px; padding: 8px 12px;">
    ${area.icon} ${area.title}
  </button>
`).join('');

const musicTrackButtons = personal.media.music.tracks.map((track, index) => `
  <button class="menu-button track-btn" type="button" data-track="${index}" data-game-action="select-track" data-index="${index}" style="display: block; margin: 10px auto; text-align: center; cursor: pointer;${index === 0 ? ' background: var(--highlight);' : ''}">
    🎵 ${track.title}
  </button>
`).join('');

const affiliationLinks = personal.affiliations.map(affiliation => `
  <a href="${affiliation.url}" ${affiliation.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: var(--secondary); text-decoration: none;">${affiliation.label}</a>
`).join(' • ');

const researchSkills = research.interests.map((area, index) =>
  `<li>${area.title} [${index === 1 ? '████████░░' : '█████████░'}]</li>`
).join('');

const academicProfileButtons = personal.academicProfiles.map(profile => `
  <a class="menu-button" href="${profile.url}" target="_blank" rel="noopener noreferrer" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
    ${profile.icon} ${profile.gameLabel}
  </a>
`).join('');

const horizontalFence = (x, y) => ({ x, y, width: 120, height: 20, orientation: 'horizontal' });
const verticalFence = (x, y) => ({ x, y, width: 20, height: 80, orientation: 'vertical' });

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
    minimap: {
      width: 150,
      height: 100,
      markerSize: 4,
    },
  },
  entities: {
    npc: { visualSize: 32, targetSize: 44 },
    collectible: { visualSize: 24, targetSize: 44 },
  },
  fences: [
    horizontalFence(400, 100),
    horizontalFence(520, 100),
    horizontalFence(640, 100),
    verticalFence(200, 750),
    verticalFence(200, 830),
    horizontalFence(600, 1450),
    horizontalFence(720, 1450),
    horizontalFence(2000, 1500),
    horizontalFence(2120, 1500),
    verticalFence(2240, 1420),
    verticalFence(2240, 1340),
    verticalFence(2240, 1260),
  ],
  npcs: [
    {
      name: "Dr. Chen",
      dialogue: [
        "Welcome to Bridge's research world!",
        "Did you know Bridge developed P-ACC using inverse reinforcement learning?",
        "The system learns individual driver preferences and adapts in real-time!",
        `Check the Papers Board—this site currently features ${publications.length} publications!`,
        "Bridge's research connects human behavior to intelligent agents and transportation systems.",
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
        "The Gallery includes scenes from research life, Grand Teton, and Joshua Tree!",
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
        `The Music Studio features ${personal.media.music.tracks.map(track => `'${track.title}'`).join(', ')}!`,
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
        `Beep boop! I'm the ${research.lab.shortName}'s AI assistant... sort of.`,
        `${research.lab.abbreviation} stands for ${research.lab.expandedName}.`,
        "I tried to learn driver behavior but kept getting carsick...",
        "Human-centered AI connects behavior, prediction, planning, and coordination.",
        "Error 404: Sarcasm module not found. Just kidding!",
        research.lab.domainStatement,
      ],
      position: { top: "800px", left: "1700px" },
      sprite: "scientist",
      color: "green",
    },
    {
      name: "Luna",
      dialogue: [
        "I collect interesting data patterns like some people collect stamps.",
        `The research agenda starts with ${research.agendaChain[0].toLowerCase()} and connects it to ${research.agendaChain.at(-1).toLowerCase()}.`,
        "Naturalistic, multimodal, and experimental data reveal different parts of human behavior.",
        "A useful model should support prediction, planning, coordination, or system design—not just fit a dataset.",
        "Digital twins help connect algorithm development to system-level evaluation.",
        `The intended outcomes include ${research.outcomes.slice(0, 3).join(', ')}.`,
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
        <h2>WELCOME TO MY DIGITAL REALM</h2>
        <p>${personal.bio.homeIntroduction}</p>
        <p>This interactive portfolio showcases my research, creative projects, music, photography, and personal journey as a scientist and creator.</p>
        <div style="margin-top: 20px;">
            <a class="menu-button" href="${modeConfig.portfolio.path}">📝 ${modeConfig.portfolio.label.toUpperCase()}</a>
            <button class="menu-button" type="button" data-game-action="show-stats">VIEW STATS</button>
            <button class="menu-button" type="button" data-game-action="show-controls">CONTROLS</button>
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
                    Developing ${research.summary}
                </p>
            </div>
            
            <h3>📋 Research Philosophy:</h3>
            <div style="background: var(--highlight); padding: 15px; margin: 15px 0; border-radius: 5px; font-size: 9px; line-height: 1.5;">
                ${researchPrinciples}
            </div>
            
            <h3>🗺️ Research Roadmap:</h3>
            <div style="background: var(--highlight); padding: 15px; margin: 15px 0; border-radius: 5px; font-size: 9px; line-height: 1.5;">
                <p style="margin-bottom: 10px;">
                    <strong>Current Focus:</strong> ${research.currentFocus}
                </p>
                <p style="margin-bottom: 10px;">
                    <strong>Methodology:</strong> ${research.methods.join(', ')}
                </p>
                <p>
                    <strong>Impact:</strong> ${research.impact}
                </p>
            </div>

            <div style="margin: 15px 0; text-align: center;">
                <button class="menu-button" type="button" data-game-action="research-roadmap" style="font-size: 9px; padding: 8px 12px; margin: 5px;">🗺️ VIEW FRAMEWORK</button>
            </div>
            
            <h3>🎯 Research Focus Areas:</h3>
            <div style="margin: 15px 0;">${researchButtons}</div>
            
            <div style="margin-top: 15px; text-align: center;">
                <a class="menu-button" href="${modeConfig.portfolio.path}#research">📖 FULL RESEARCH</a>
                <a class="menu-button" href="${personal.links.researchGate}" target="_blank" rel="noopener noreferrer">🔬 RESEARCHGATE</a>
            </div>
        `,
    },
    "papers-board": {
        label: "PAPERS",
        icon: "📋",
        position: { top: "430px", left: "620px", width: "100px", height: "70px" },
        content: `
            <h2>📋 RESEARCH PAPERS</h2>
            <div style="text-align: center; margin: 15px 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">📄</div>
                <p style="font-size: 10px; line-height: 1.4; margin-bottom: 20px;">
                    Browse ${publications.length} selected publications in human-centered AI, vehicle automation, and transportation systems.
                </p>
            </div>
            
            <div id="publication-browser" style="background: var(--highlight); border: 2px solid var(--secondary); padding: 15px; margin: 10px 0; border-radius: 5px; min-height: 120px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <button type="button" aria-label="Previous paper" data-game-action="previous-paper" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="paper-counter" style="font-size: 8px; color: var(--secondary);">Paper 1 of ${publications.length}</div>
                    <button type="button" aria-label="Next paper" data-game-action="next-paper" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
                </div>
                <div id="paper-scroll-bar" style="background: var(--secondary); height: 4px; margin: 5px 0; border-radius: 2px;">
                    <div id="paper-scroll-thumb" style="background: var(--accent); height: 100%; width: ${Math.round(100/publications.length)}%; border-radius: 2px; transition: margin-left 0.3s;"></div>
                </div>
                <div id="current-paper" style="font-size: 10px; line-height: 1.4;">
                    <strong>${publications[0].title}</strong><br>
                    <em style="color: var(--accent);">${publications[0].venue} (${publications[0].year})</em><br>
                    <div style="margin: 12px 0; text-align: center;">
                        <button type="button" data-game-action="paper-details" data-index="0" style="padding: 8px 16px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 10px; cursor: pointer;">📄 DETAILS</button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <a class="menu-button" href="${personal.links.googleScholar}" target="_blank" rel="noopener noreferrer">📚 ALL PUBLICATIONS</a>
            </div>
        `,
    },
    "projects-board": {
        label: "PROJECTS",
        icon: "📁",
        position: { top: "504px", left: "620px", width: "100px", height: "70px" },
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
                    <button type="button" aria-label="Previous project" data-game-action="previous-project" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="project-counter-board" style="font-size: 8px; color: var(--secondary);">Project 1 of ${projects.length}</div>
                    <button type="button" aria-label="Next project" data-game-action="next-project" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
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
                        <button type="button" data-game-action="project-details" data-index="0" style="padding: 6px 12px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 9px; cursor: pointer;">🚀 DETAILS</button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <a class="menu-button" href="/blog#projects">📁 ALL PROJECTS</a>
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
                    <button type="button" aria-label="Previous photo page" data-game-action="previous-photo-page" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">◀</button>
                    <div id="photo-page-counter" style="font-size: 8px; color: var(--secondary);">Page 1 of ${Math.ceil(personal.media.photos.length / 4)}</div>
                    <button type="button" aria-label="Next photo page" data-game-action="next-photo-page" style="background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); padding: 5px 10px; font-size: 12px; cursor: pointer;">▶</button>
                </div>
                <div id="photo-page-scroll-bar" style="background: var(--secondary); height: 4px; margin: 5px 0; border-radius: 2px;">
                    <div id="photo-page-scroll-thumb" style="background: var(--accent); height: 100%; width: ${Math.round(100/Math.ceil(personal.media.photos.length / 4))}%; border-radius: 2px; transition: margin-left 0.3s;"></div>
                </div>
                
                <!-- Multi-photo grid layout -->
                <div id="photo-grid" class="game-photo-grid" style="margin: 10px 0;">
                    ${personal.media.photos.slice(0, 4).map((photo, index) => `
                        <button class="game-photo-card" type="button" aria-label="View photo: ${photo.title}" data-game-action="photo-details" data-index="${index}">
                            <div style="background: white; padding: 14px 14px 27px 14px; margin: 0 auto; width: 122px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                                <div style="width: 94px; height: 70px; background: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 14px; overflow: hidden;">
                                    <img src="/images/${photo.filename}" 
                                         alt="${photo.title}"
                                         style="width: 94px; height: 70px; object-fit: cover; border-radius: 4px;"
                                         onerror="this.style.display='none'; this.parentElement.innerHTML='📸';">
                                </div>
                                <div style="color: #333; font-size: 9px; font-weight: bold; line-height: 1.3; overflow: hidden; text-overflow: ellipsis;">
                                    ${photo.title.length > 12 ? photo.title.substring(0, 12) + '...' : photo.title}
                                </div>
                            </div>
                        </button>
                    `).join('')}
                </div>
                
                <div style="margin: 12px 0; text-align: center; font-size: 7px; color: var(--secondary);">
                    Click any photo to view full size
                </div>
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <a class="menu-button" href="${personal.links.flickr}" target="_blank" rel="noopener noreferrer">☁️ FLICKR GALLERY</a>
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
                <button class="music-btn" type="button" aria-label="Previous track" data-game-action="play-track" data-track-action="prev">⏮</button>
                <button class="music-btn" type="button" id="play-btn" aria-label="Play or pause selected track" data-game-action="play-track" data-track-action="toggle">▶</button>
                <button class="music-btn" type="button" aria-label="Next track" data-game-action="play-track" data-track-action="next">⏭</button>
            </div>
            <div style="margin: 20px 0;" id="track-list">${musicTrackButtons}</div>
            <div style="text-align: center;">
                <a class="menu-button" href="${personal.links.soundcloud}" target="_blank" rel="noopener noreferrer">☁️ SOUNDCLOUD</a>
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
                        <li>Class: ${personal.currentRole.shortTitle}/Researcher/Creator</li>
                        <li>Location: ${personal.contact.location}</li>
                    </ul>
                </div>
                <div style="flex: 1;">
                    <h3>SKILLS:</h3>
                    <ul style="line-height: 1.8; font-size: 9px;">${researchSkills}</ul>
                </div>
            </div>
            <h3>JOURNEY:</h3>
            <p style="line-height: 1.8; font-size: 9px;">
                ${personal.bio.careerSummary} My research develops ${research.summary}
            </p>
            
            <h3 style="font-size: 9px; margin: 15px 0 8px 0;">🏛️ AFFILIATIONS:</h3>
            <div style="font-size: 8px; line-height: 1.5; margin-bottom: 15px;">
                ${affiliationLinks}
            </div>
            
            <div style="margin-top: 15px; text-align: center;">
                <a class="menu-button" href="${personal.links.cv}" target="_blank" rel="noopener noreferrer" style="margin: 3px; font-size: 8px; padding: 6px 10px;">📄 CV</a>
                <a class="menu-button" href="${personal.links.linkedin}" target="_blank" rel="noopener noreferrer" style="margin: 3px; font-size: 8px; padding: 6px 10px;">💼 LINKEDIN</a>
                <a class="menu-button" href="${personal.links.lmuEce}" target="_blank" rel="noopener noreferrer" style="margin: 3px; font-size: 8px; padding: 6px 10px;">🏛️ LMU ECE</a>
                <a class="menu-button" href="${personal.links.haitsLab}" target="_blank" rel="noopener noreferrer" style="margin: 3px; font-size: 8px; padding: 6px 10px;">🧠 ${research.lab.shortName.toUpperCase()}</a>
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
                <button class="menu-button" type="button" data-game-action="copy-email" style="margin: 3px; font-size: 8px; padding: 6px 10px;">
                    📋 COPY EMAIL
                </button>
                ${academicProfileButtons}
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
