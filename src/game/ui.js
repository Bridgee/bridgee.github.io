// Import from engine.js
import {
    player, visitedAreas, collectedItems, currentInteraction, dialogueIndex,
    dialogueSpeaker, dialogueText, dialogueBox, getAchievements, setDialogueState, setCurrentInteraction, setPopupState
} from './engine.js';
import { gainXP, triggerAchievement } from './entities.js';
import { gameData, personal, projects, publications, research } from '../data/index.js';
import { closeDialog, closeDialogById, openDialog } from './dialogs.js';

// Track interactions for achievements
let talkedToNPCs = new Set();
let viewedAreas = new Set();

// Transient presentation state stays outside the shared content modules.
// Each area is re-rendered from this state whenever its popup opens.
const areaViewState = {
    projectIndex: 0,
    paperIndex: 0,
    photoPage: 0,
    trackIndex: 0,
};

function configureGameModal(modal, label, options = {}) {
    modal.classList.add('game-modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', label);
    modal.gameDialogOptions = { label, ...options };
}

function presentGameModal(modal) {
    return openDialog(modal, modal.gameDialogOptions);
}

// Start dialogue
export function startDialogue(npc) {
    const dialogue = JSON.parse(npc.dataset.dialogue);
    const npcName = npc.dataset.name || 'NPC';
    
    if (dialogueSpeaker) dialogueSpeaker.textContent = npcName;
    if (dialogueText) dialogueText.textContent = dialogue[0];
    if (dialogueBox) dialogueBox.style.display = 'block';
    
    setDialogueState(true, 0);
    setCurrentInteraction({ type: 'npc', element: npc });
    gainXP(15); // Increased base XP for talking to NPCs
    
    // Track NPC interactions for achievements
    if (!talkedToNPCs.has(npcName)) {
        talkedToNPCs.add(npcName);
        
        // First contact achievement
        if (talkedToNPCs.size === 1) {
            triggerAchievement('FIRST_CONTACT');
        }
        
        // Social butterfly achievement (all 5 NPCs)
        if (talkedToNPCs.size >= 5) {
            triggerAchievement('SOCIAL_BUTTERFLY');
        }
    }
}

// Continue dialogue
export function continueDialogue() {
    if (!currentInteraction) return;
    const npc = currentInteraction.element;
    const dialogue = JSON.parse(npc.dataset.dialogue);
    const newIndex = dialogueIndex + 1;
    
    if (newIndex < dialogue.length) {
        if (dialogueText) dialogueText.textContent = dialogue[newIndex];
        setDialogueState(true, newIndex);
    } else {
        if (dialogueBox) dialogueBox.style.display = 'none';
        setDialogueState(false, 0);
        setCurrentInteraction(null);
    }
}

// Enter area
export function enterArea(area) {
    const areaId = area.id;
    
    // Track first visit for achievements
    if (!visitedAreas.has(areaId)) {
        visitedAreas.add(areaId);
        gainXP(30); // Base XP for visiting new area
        
        // First visit achievement
        if (visitedAreas.size === 1) {
            triggerAchievement('FIRST_STEPS');
        }
        
        // Area explorer achievement (3+ areas)
        if (visitedAreas.size >= 3) {
            triggerAchievement('AREA_EXPLORER');
        }
        
        // World traveler achievement (all interactive areas)
        if (visitedAreas.size >= Object.keys(gameData.areas).length) {
            triggerAchievement('WORLD_TRAVELER');
        }
    }
    
    // Track area viewing for content-specific achievements
    if (!viewedAreas.has(areaId)) {
        viewedAreas.add(areaId);
        
        // Content-specific achievements
        if (areaId === 'gallery-area') {
            triggerAchievement('PHOTO_ENTHUSIAST');
        } else if (areaId === 'music-area') {
            triggerAchievement('MUSIC_LOVER');
        }
        
        // Check if viewed both creative areas
        if (viewedAreas.has('gallery-area') && viewedAreas.has('music-area')) {
            triggerAchievement('CREATIVE_SOUL');
        }
    }
    
    showAreaContent(areaId);
}

// Show area content using gameData
function showAreaContent(areaId) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    if (!popup || !popupContent) return;

    // Get content from gameData instead of hardcoded object
    const areaContent = gameData.areas[areaId]?.content;
    if (!areaContent) {
        popupContent.innerHTML = '<p>Area under construction...</p>';
    } else {
        // For about-area, we need to interpolate dynamic player stats
        if (areaId === 'about-area') {
            popupContent.innerHTML = areaContent
                .replace('{player.level}', player.level)
                .replace('{player.xp}', player.xp)
                .replace('{player.xpToNextLevel}', player.xpToNextLevel);
        } else {
            popupContent.innerHTML = areaContent;
        }
    }

    syncAreaView(areaId);
    
    popup.style.display = 'block';
    openDialog(popup, {
        label: `${gameData.areas[areaId]?.label || 'Game area'} details`,
        removeOnClose: false,
        onAfterClose: () => setPopupState(false),
    });
    setPopupState(true);
}

// Close popup
export function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) closeDialog(popup);
    setPopupState(false);
}

function showStats() {
    alert(`PLAYER STATS:\n\nLevel: ${player.level}\nXP: ${player.xp}/${player.xpToNextLevel}\nAchievements: ${getAchievements()}\nAreas Visited: ${visitedAreas.size}/${Object.keys(gameData.areas).length}\nItems Collected: ${collectedItems.size}`);
}

function showControls() {
    alert('GAME CONTROLS:\n\n🎮 Movement:\n• WASD or Arrow Keys\n• Mobile: Touch buttons\n\n🎯 Interactions:\n• SPACE or Click to interact\n• ESC to close popups\n\n📱 Mobile:\n• Tap to move\n• Tap objects to interact');
}

function showPhoto(id) {
    const photoIndex = id - 1;
    const photo = personal.media.photos[photoIndex];
    
    if (!photo) {
        alert('Photo not found!');
        return;
    }
    
    // Create photo viewer modal
    const photoModal = document.createElement('div');
    photoModal.id = 'photo-modal';
    configureGameModal(photoModal, `Photo: ${photo.title}`);
    photoModal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.9); z-index: 10000; display: flex; 
        align-items: center; justify-content: center; cursor: pointer;
    `;
    
    // Try multiple Flickr image URL formats for better compatibility
    const flickrPageUrl = `${personal.links.flickr}${photo.id}/`;
    
    photoModal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%; text-align: center;">
            <div id="photo-container-${photo.id}" style="min-height: 300px; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; font-size: 14px;">Loading photo...</div>
            </div>
            <div style="color: white; margin-top: 10px; font-family: inherit;">
                <h3>${photo.title}</h3>
                <p style="font-size: 12px; line-height: 1.4;">${photo.description}</p>
                <a href="${flickrPageUrl}" target="_blank" rel="noopener noreferrer"
                   style="color: var(--secondary); text-decoration: none; font-size: 10px;">
                   View on Flickr ↗
                </a>
                <p style="font-size: 10px; margin-top: 10px; opacity: 0.7;">Click anywhere to close</p>
            </div>
        </div>
    `;
    
    // Display local images with Flickr backup
    const container = photoModal.querySelector(`#photo-container-${photo.id}`);
    const localImagePath = `/images/${photo.filename}`;
    
    container.innerHTML = `
        <div style="color: white; text-align: center; padding: 20px;">
            <h3 style="margin-bottom: 15px; color: var(--secondary); font-size: 18px;">${photo.title}</h3>
            
            <!-- Local Image Display -->
            <div style="margin-bottom: 20px; max-height: 70vh; overflow: hidden;">
                <img src="${localImagePath}" 
                     alt="${photo.title}" 
                     style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                
                <!-- Fallback if local image doesn't exist -->
                <div style="display: none; padding: 40px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">📸</div>
                    <p style="font-size: 12px; opacity: 0.8;">Local image not found</p>
                </div>
            </div>
            
            ${photo.description ? `<p style="font-size: 12px; margin-bottom: 20px; line-height: 1.4; opacity: 0.9;">${photo.description}</p>` : ''}
            
            <div style="margin-bottom: 20px;">
                <a href="${flickrPageUrl}" target="_blank" rel="noopener noreferrer"
                   style="color: var(--secondary); text-decoration: none; 
                          padding: 10px 20px; border: 2px solid var(--secondary);
                          display: inline-block; background: var(--highlight);
                          font-size: 11px; margin-right: 10px;">
                   📷 VIEW ON FLICKR
                </a>
                <a href="${personal.links.flickr}" target="_blank" rel="noopener noreferrer"
                   style="color: var(--secondary); text-decoration: none; 
                          padding: 10px 20px; border: 2px solid var(--secondary);
                          display: inline-block; background: transparent;
                          font-size: 11px;">
                   🖼️ ALL PHOTOS
                </a>
            </div>
        </div>
    `;
    
    photoModal.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            closeDialog(photoModal);
        }
    });
    
    presentGameModal(photoModal);
}

function playTrack(action) {
    const musicData = personal.media.music;
    const playBtn = document.getElementById('play-btn');
    
    if (action === 'prev') {
        areaViewState.trackIndex = (areaViewState.trackIndex - 1 + musicData.tracks.length) % musicData.tracks.length;
        updateCurrentTrack();
    } else if (action === 'next') {
        areaViewState.trackIndex = (areaViewState.trackIndex + 1) % musicData.tracks.length;
        updateCurrentTrack();
    } else if (action === 'toggle') {
        const currentTrack = musicData.tracks[areaViewState.trackIndex];
        
        // Check if music modal already exists
        const existingModal = document.getElementById('music-modal');
        if (existingModal) {
            closeDialog(existingModal);
            return;
        }
        
        // Create SoundCloud embed modal
        const musicModal = document.createElement('div');
        musicModal.id = 'music-modal';
        configureGameModal(musicModal, `Now playing: ${currentTrack.title}`, {
            onAfterClose: () => {
                const currentPlayButton = document.getElementById('play-btn');
                if (currentPlayButton) currentPlayButton.textContent = '▶';
            },
        });
        musicModal.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: var(--primary); border: 3px solid var(--secondary);
            padding: 20px; z-index: 10000; max-width: 450px; width: 95%;
            font-family: inherit; color: var(--secondary); box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
        
        const soundcloudEmbed = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentTrack.id}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        
        musicModal.innerHTML = `
            <div style="text-align: center;">
                <h3>🎵 NOW PLAYING</h3>
                <p style="margin: 10px 0; font-size: 14px;">${currentTrack.title}</p>
                <iframe id="soundcloud-player" title="SoundCloud player for ${currentTrack.title}" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay"
                        src="${soundcloudEmbed}"></iframe>
                <div style="margin-top: 15px;">
                    <button type="button" data-game-action="close-dialog" data-dialog-id="music-modal"
                            style="padding: 8px 16px; background: var(--highlight); 
                                   border: 2px solid var(--secondary); color: var(--secondary); 
                                   font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                    <a href="${personal.links.soundcloud}" target="_blank" rel="noopener noreferrer"
                            style="padding: 8px 16px; background: transparent; 
                                   border: 2px solid var(--secondary); color: var(--secondary); 
                                   font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">OPEN IN SOUNDCLOUD</a>
                </div>
                <p style="font-size: 10px; margin-top: 10px; opacity: 0.8;">
                    Closing this player stops playback. Open SoundCloud to continue listening.
                </p>
            </div>
        `;
        
        presentGameModal(musicModal);
        
        if (playBtn) {
            playBtn.textContent = '⏸';
        }
    }
}

function selectTrack(trackIndex) {
    if (!Number.isInteger(trackIndex) || !personal.media.music.tracks[trackIndex]) return;
    areaViewState.trackIndex = trackIndex;
    updateCurrentTrack();
}

function updateCurrentTrack() {
    // Update visual selection in track list
    document.querySelectorAll('.track-btn').forEach((btn, index) => {
        const isSelected = index === areaViewState.trackIndex;
        btn.setAttribute('aria-pressed', String(isSelected));
        if (isSelected) {
            btn.style.background = 'var(--highlight)';
            btn.style.color = 'var(--secondary)';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text)';
        }
    });
    
    // Track selection updated silently for better UX
}

// Safe email copy function for game interface
function copyGameEmail() {
    const email = personal.contact.email;
    
    // Modern clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            alert(`📧 EMAIL COPIED TO CLIPBOARD!\n\n${email}`);
        }).catch(() => {
            // Fallback for clipboard API failure
            fallbackCopyGameEmail(email);
        });
    } else {
        // Fallback for browsers without clipboard API
        fallbackCopyGameEmail(email);
    }
}

function fallbackCopyGameEmail(email) {
    window.prompt('Copy this email address:', email);
}

// Global function for research detail popup
function showResearchDetail(researchId) {
    // Use actual blog content instead of generic descriptions
    const researchAreas = Object.fromEntries(
        research.interests.map(area => [area.id, {
            title: area.title,
            description: `${area.description} ${area.methods}`,
            tags: area.tags,
            icon: area.icon
        }])
    );

    const researchArea = researchAreas[researchId];
    if (!researchArea) {
        alert('Research area details not found!');
        return;
    }
    
    // Create research detail modal
    const researchModal = document.createElement('div');
    researchModal.id = 'research-modal';
    configureGameModal(researchModal, researchArea.title);
    researchModal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--primary); border: 3px solid var(--secondary);
        padding: 25px; z-index: 10000; max-width: 500px; width: 95%;
        font-family: inherit; color: var(--secondary); 
        box-shadow: 0 4px 20px rgba(0,0,0,0.7);
        max-height: 80vh; overflow-y: auto;
    `;
    
    researchModal.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">${researchArea.icon}</div>
            <h2 style="color: var(--accent); margin-bottom: 20px; font-size: 16px;">${researchArea.title}</h2>
            
            <div style="text-align: left; margin: 20px 0;">
                <p style="font-size: 10px; line-height: 1.6; margin-bottom: 15px;">${researchArea.description}</p>
                
                <div style="margin: 15px 0;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🔍 KEY AREAS:</h4>
                    ${researchArea.tags.map(tag =>
                        `<span style="background: var(--highlight); padding: 3px 8px; margin: 2px; 
                                      font-size: 8px; border-radius: 10px; display: inline-block;">${tag}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button type="button" data-game-action="close-dialog" data-dialog-id="research-modal"
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <a href="/blog#research"
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">VIEW FULL RESEARCH</a>
            </div>
        </div>
    `;
    
    presentGameModal(researchModal);
    
    // Close on click outside
    researchModal.addEventListener('click', (e) => {
        if (e.target === researchModal) {
            closeDialog(researchModal);
        }
    });
}

// Global function for project details popup
function showProjectDetails(projectIndex) {
    // Trigger research achievement
    triggerAchievement('PROJECT_SCOUT');
    
    const project = projects[projectIndex];
    if (!project) {
        alert('Project details not found!');
        return;
    }
    
    // Create project details modal
    const projectModal = document.createElement('div');
    projectModal.id = 'project-modal';
    configureGameModal(projectModal, project.title);
    projectModal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--primary); border: 3px solid var(--secondary);
        padding: 25px; z-index: 10000; max-width: 600px; width: 95%;
        font-family: inherit; color: var(--secondary); 
        box-shadow: 0 4px 20px rgba(0,0,0,0.7);
        max-height: 80vh; overflow-y: auto;
    `;
    
    projectModal.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 32px; margin-bottom: 15px;">🚀</div>
            <h2 style="color: var(--accent); margin-bottom: 15px; font-size: 14px; line-height: 1.3;">${project.title}</h2>
            <p style="color: var(--accent); margin-bottom: 20px; font-size: 12px; font-style: italic;">Research Project</p>
            
            <div style="text-align: left; margin: 20px 0;">
                <h3 style="color: var(--secondary); font-size: 12px; margin-bottom: 15px;">📋 PROJECT OVERVIEW:</h3>
                <p style="font-size: 11px; line-height: 1.6; margin-bottom: 15px; background: var(--highlight); padding: 15px; border-radius: 5px;">${project.overview?.summary || project.description}</p>
                
                ${project.overview?.bullets ? `
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🎯 KEY HIGHLIGHTS:</h4>
                    <ul style="font-size: 10px; line-height: 1.5; margin-left: 15px;">
                        ${project.overview.bullets.map(bullet => `<li style="margin-bottom: 5px;">${bullet}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${project.scope_tags ? `
                <div style="margin: 15px 0;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🏷️ RESEARCH AREAS:</h4>
                    ${project.scope_tags.map(tag => 
                        `<span style="background: var(--secondary); color: var(--primary); padding: 3px 8px; margin: 2px; 
                                      font-size: 8px; border-radius: 10px; display: inline-block;">${tag}</span>`
                    ).join('')}
                </div>
                ` : ''}

                ${project.keywords ? `
                <div style="margin: 15px 0;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🔑 KEYWORDS:</h4>
                    ${project.keywords.map(tag => 
                        `<span style="background: var(--highlight); border: 1px solid var(--secondary); color: var(--secondary); padding: 3px 8px; margin: 2px; 
                                      font-size: 8px; border-radius: 10px; display: inline-block;">${tag}</span>`
                    ).join('')}
                </div>
                ` : ''}
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button type="button" data-game-action="close-dialog" data-dialog-id="project-modal"
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <a href="/projects/${project.slug}"
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">🔗 EXPLORE PROJECT</a>
            </div>
        </div>
    `;
    
    presentGameModal(projectModal);
    
    // Close on click outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeDialog(projectModal);
        }
    });
}

// Global function for research roadmap popup  
function showResearchRoadmap() {
    // Create roadmap modal using standard popup style
    const roadmapModal = document.createElement('div');
    roadmapModal.id = 'roadmap-modal';
    configureGameModal(roadmapModal, 'Research framework');
    roadmapModal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--primary); border: 3px solid var(--secondary);
        padding: 25px; z-index: 10000; max-width: 700px; width: 95%;
        font-family: inherit; color: var(--secondary); 
        box-shadow: 0 4px 20px rgba(0,0,0,0.7);
        max-height: 80vh; overflow-y: auto;
    `;
    
    roadmapModal.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">🗺️</div>
            <h2 style="color: var(--accent); margin-bottom: 20px; font-size: 16px;">RESEARCH FRAMEWORK</h2>
            
            <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 11px; line-height: 1.6; margin-bottom: 20px; background: var(--highlight); padding: 15px; border-radius: 5px;">
                    Human-centered AI connecting behavior and interaction to trajectories, mobility choices, intelligent agents and fleets, transportation networks, and system-level operations.
                </p>
                
                <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <img src="/images/research_framework.png" 
                         alt="Research Framework" 
                         style="max-width: 100%; height: auto; display: block; margin: 0 auto;"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    
                    <!-- Fallback content if image doesn't exist -->
                    <div style="display: none; text-align: center; padding: 20px; color: #666; font-size: 12px; line-height: 1.6;">
                        <div style="font-size: 32px; margin-bottom: 15px;">🗺️</div>
                        <h3 style="margin-bottom: 15px; color: #333;">Research Framework Overview</h3>
                        
                        <div style="text-align: left;">
                            <div style="margin-bottom: 15px;">
                                <h4 style="color: #4A90E2; margin-bottom: 5px;">👥 Human Behavior &amp; Interaction</h4>
                                <p style="font-size: 10px;">Multimodal and context-aware modeling of how people behave, react, decide, and interact</p>
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <h4 style="color: #7B68EE; margin-bottom: 5px;">🧠 Intelligent Agents &amp; Coordination</h4>
                                <p style="font-size: 10px;">Prediction, planning, personalization, and coordination for agents, vehicles, and fleets</p>
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <h4 style="color: #FF6B6B; margin-bottom: 5px;">🚦 Transportation Systems &amp; Digital Twins</h4>
                                <p style="font-size: 10px;">Network optimization, system operations, simulation, and digital twins for safety, sustainability, and mobility</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button type="button" data-game-action="close-dialog" data-dialog-id="roadmap-modal"
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <a href="/blog#research"
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">FULL RESEARCH</a>
            </div>
        </div>
    `;
    
    // Close when the modal itself is used as a backdrop.
    roadmapModal.addEventListener('click', (e) => {
        if (e.target === roadmapModal) {
            closeDialog(roadmapModal);
        }
    });
    
    presentGameModal(roadmapModal);
}

function updateScrollThumb(scrollThumb, currentIndex, itemCount) {
    if (!scrollThumb) return;
    if (itemCount <= 1) {
        scrollThumb.style.marginLeft = '0%';
        return;
    }

    const fallbackWidth = 100 / itemCount;
    const thumbWidth = Number.parseFloat(scrollThumb.style.width) || fallbackWidth;
    const thumbPosition = (currentIndex / (itemCount - 1)) * (100 - thumbWidth);
    scrollThumb.style.marginLeft = `${thumbPosition}%`;
}

function syncAreaView(areaId) {
    const areaRenderers = {
        'papers-board': updatePaperDisplay,
        'projects-board': updateProjectBoardDisplay,
        'gallery-area': updatePhotoGrid,
        'music-area': updateCurrentTrack,
    };
    areaRenderers[areaId]?.();
}

function nextProjectBoard() {
    areaViewState.projectIndex = (areaViewState.projectIndex + 1) % projects.length;
    updateProjectBoardDisplay();
}

function previousProjectBoard() {
    areaViewState.projectIndex = (areaViewState.projectIndex - 1 + projects.length) % projects.length;
    updateProjectBoardDisplay();
}

function updateProjectBoardDisplay() {
    const project = projects[areaViewState.projectIndex];
    const projectElement = document.getElementById('current-project-board');
    const counterElement = document.getElementById('project-counter-board');
    const scrollThumb = document.getElementById('project-scroll-thumb-board');
    
    if (projectElement && project) {
        projectElement.innerHTML = `
            <strong>${project.title}</strong><br>
            <div style="margin: 8px 0;">
                ${project.scope_tags ? project.scope_tags.map(tag => 
                    `<span style="background: var(--secondary); color: var(--primary); padding: 2px 6px; margin: 1px; font-size: 7px; border-radius: 8px; display: inline-block;">${tag}</span>`
                ).join('') : ''}
            </div>
            <div style="margin: 12px 0; text-align: center;">
                <button type="button" data-game-action="project-details" data-index="${areaViewState.projectIndex}" style="padding: 6px 12px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 9px; cursor: pointer;">📋 DETAILS</button>
            </div>
        `;
    }
    
    if (counterElement) {
        counterElement.textContent = `Project ${areaViewState.projectIndex + 1} of ${projects.length}`;
    }
    
    if (scrollThumb) {
        updateScrollThumb(scrollThumb, areaViewState.projectIndex, projects.length);
    }
}

function nextPaper() {
    areaViewState.paperIndex = (areaViewState.paperIndex + 1) % publications.length;
    updatePaperDisplay();
}

function previousPaper() {
    areaViewState.paperIndex = (areaViewState.paperIndex - 1 + publications.length) % publications.length;
    updatePaperDisplay();
}

function updatePaperDisplay() {
    const paper = publications[areaViewState.paperIndex];
    const paperElement = document.getElementById('current-paper');
    const counterElement = document.getElementById('paper-counter');
    const scrollThumb = document.getElementById('paper-scroll-thumb');
    
    if (paperElement && paper) {
        paperElement.innerHTML = `
            <strong>${paper.title}</strong><br>
            <em style="color: var(--accent);">${paper.venue} (${paper.year})</em><br>
            <div style="margin: 12px 0; text-align: center;">
                <button type="button" data-game-action="paper-details" data-index="${areaViewState.paperIndex}" style="padding: 8px 16px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 10px; cursor: pointer;">📋 DETAILS</button>
            </div>
        `;
    }
    
    if (counterElement) {
        counterElement.textContent = `Paper ${areaViewState.paperIndex + 1} of ${publications.length}`;
    }
    
    if (scrollThumb) {
        updateScrollThumb(scrollThumb, areaViewState.paperIndex, publications.length);
    }
}

// Global function for paper details popup
function showPaperDetails(paperIndex) {
    // Trigger research achievement
    triggerAchievement('PAPER_READER');
    
    const paper = publications[paperIndex];
    if (!paper) {
        alert('Paper details not found!');
        return;
    }
    
    // Create paper details modal
    const paperModal = document.createElement('div');
    paperModal.id = 'paper-modal';
    configureGameModal(paperModal, paper.title);
    paperModal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--primary); border: 3px solid var(--secondary);
        padding: 25px; z-index: 10000; max-width: 600px; width: 95%;
        font-family: inherit; color: var(--secondary); 
        box-shadow: 0 4px 20px rgba(0,0,0,0.7);
        max-height: 80vh; overflow-y: auto;
    `;
    
    paperModal.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 32px; margin-bottom: 15px;">📄</div>
            <h2 style="color: var(--accent); margin-bottom: 15px; font-size: 14px; line-height: 1.3;">${paper.title}</h2>
            <p style="color: var(--accent); margin-bottom: 20px; font-size: 12px; font-style: italic;">${paper.venue} (${paper.year}) - ${paper.type}</p>
            
            <div style="text-align: left; margin: 20px 0;">
                <h3 style="color: var(--secondary); font-size: 12px; margin-bottom: 15px;">📋 ABSTRACT:</h3>
                <p style="font-size: 11px; line-height: 1.6; margin-bottom: 20px; background: var(--highlight); padding: 15px; border-radius: 5px;">${paper.description}</p>
                
                ${paper.scope_tags ? `
                <div style="margin: 15px 0;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🏷️ RESEARCH AREAS:</h4>
                    ${paper.scope_tags.map(tag => 
                        `<span style="background: var(--secondary); color: var(--primary); padding: 3px 8px; margin: 2px; 
                                      font-size: 8px; border-radius: 10px; display: inline-block;">${tag}</span>`
                    ).join('')}
                </div>
                ` : ''}
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button type="button" data-game-action="close-dialog" data-dialog-id="paper-modal"
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <a href="${paper.link}" target="_blank" rel="noopener noreferrer"
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">📄 READ FULL PAPER</a>
            </div>
        </div>
    `;
    
    presentGameModal(paperModal);
    
    // Close on click outside
    paperModal.addEventListener('click', (e) => {
        if (e.target === paperModal) {
            closeDialog(paperModal);
        }
    });
}

// Photo Gallery Functions - Multi-photo Grid with Pagination
const photosPerPage = 4;

function previousPhotoPage() {
    if (areaViewState.photoPage > 0) {
        areaViewState.photoPage--;
        updatePhotoGrid();
    }
}

function nextPhotoPage() {
    const maxPages = Math.ceil(personal.media.photos.length / photosPerPage);
    if (areaViewState.photoPage < maxPages - 1) {
        areaViewState.photoPage++;
        updatePhotoGrid();
    }
}

function updatePhotoGrid() {
    const maxPages = Math.ceil(personal.media.photos.length / photosPerPage);
    const photoPageCounter = document.getElementById('photo-page-counter');
    const photoPageScrollThumb = document.getElementById('photo-page-scroll-thumb');
    const photoGrid = document.getElementById('photo-grid');
    
    if (photoPageCounter) {
        photoPageCounter.textContent = `Page ${areaViewState.photoPage + 1} of ${maxPages}`;
    }
    
    if (photoPageScrollThumb && maxPages > 1) {
        updateScrollThumb(photoPageScrollThumb, areaViewState.photoPage, maxPages);
    }
    
    // Update photo grid with current page photos
    if (photoGrid) {
        const startIndex = areaViewState.photoPage * photosPerPage;
        const endIndex = Math.min(startIndex + photosPerPage, personal.media.photos.length);
        const currentPagePhotos = personal.media.photos.slice(startIndex, endIndex);
        
        photoGrid.innerHTML = currentPagePhotos.map((photo, pageIndex) => {
            const actualIndex = startIndex + pageIndex;
            return `
                <button class="game-photo-card" type="button" aria-label="View photo: ${photo.title}" data-game-action="photo-details" data-index="${actualIndex}">
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
            `;
        }).join('');
    }
}

function showPhotoDetails(index) {
    showPhoto(index + 1);
}

const gameActions = {
    'show-stats': showStats,
    'show-controls': showControls,
    'research-detail': trigger => showResearchDetail(trigger.dataset.researchId),
    'research-roadmap': showResearchRoadmap,
    'select-track': trigger => selectTrack(Number(trigger.dataset.index)),
    'play-track': trigger => playTrack(trigger.dataset.trackAction),
    'copy-email': copyGameEmail,
    'previous-project': previousProjectBoard,
    'next-project': nextProjectBoard,
    'project-details': trigger => showProjectDetails(Number(trigger.dataset.index)),
    'previous-paper': previousPaper,
    'next-paper': nextPaper,
    'paper-details': trigger => showPaperDetails(Number(trigger.dataset.index)),
    'previous-photo-page': previousPhotoPage,
    'next-photo-page': nextPhotoPage,
    'photo-details': trigger => showPhotoDetails(Number(trigger.dataset.index)),
    'close-dialog': trigger => closeDialogById(trigger.dataset.dialogId),
};

document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-game-action]');
    if (!trigger) return;
    const action = gameActions[trigger.dataset.gameAction];
    if (action) action(trigger);
});
