// Import from engine.js
import {
    player, visitedAreas, collectedItems, currentInteraction, dialogueIndex,
    dialogueSpeaker, dialogueText, dialogueBox, getAchievements, setDialogueState, setCurrentInteraction, setPopupState
} from './engine.js';
import { gainXP, unlockAchievement } from './entities.js';
import { gameData, personal } from '../data/index.js';

// Start dialogue
export function startDialogue(npc) {
    const dialogue = JSON.parse(npc.dataset.dialogue);
    if (dialogueSpeaker) dialogueSpeaker.textContent = npc.dataset.name || 'NPC';
    if (dialogueText) dialogueText.textContent = dialogue[0];
    if (dialogueBox) dialogueBox.style.display = 'block';
    
    setDialogueState(true, 0);
    setCurrentInteraction({ type: 'npc', element: npc });
    gainXP(10);
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
    if (!visitedAreas.has(area.id)) {
        visitedAreas.add(area.id);
        gainXP(50);
        if (visitedAreas.size === 6) {
            unlockAchievement("EXPLORER - Visited all areas!");
        }
    }
    showAreaContent(area.id);
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
    
    popup.style.display = 'block';
    setPopupState(true);
}

// Close popup
export function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
    setPopupState(false);
}

// Global window functions for popup content
window.showStats = function() {
    alert(`PLAYER STATS:\n\nLevel: ${player.level}\nXP: ${player.xp}/${player.xpToNextLevel}\nAchievements: ${getAchievements()}/10\nAreas Visited: ${visitedAreas.size}/6\nItems Collected: ${collectedItems.size}`);
};

window.showControls = function() {
    alert('GAME CONTROLS:\n\n🎮 Movement:\n• WASD or Arrow Keys\n• Mobile: Touch buttons\n\n🎯 Interactions:\n• SPACE or Click to interact\n• ESC to close popups\n\n📱 Mobile:\n• Tap to move\n• Tap objects to interact');
};

window.showResearchDetail = function(type) {
    const details = {
        'autonomy': 'Human-Centered Autonomy Research:\n\nDeveloping AI systems that augment human capabilities in autonomous vehicles while maintaining transparency, trust, and ethical considerations. Focus on creating seamless human-machine interfaces for intelligent transportation systems that enhance safety and accessibility.\n\nKey areas: Human-AI interaction, trust in automation, ethical AI design.',
        'modeling': 'Driver Behavior Modeling:\n\nUtilizing advanced machine learning techniques to model and predict individual driver behaviors for personalized autonomous driving systems. Research includes inverse reinforcement learning and hierarchical learning approaches for lane-change prediction and car-following behaviors.\n\nKey methods: Inverse reinforcement learning, personalized prediction models, real-time behavior analysis.',
        'twinning': 'Digital Twinning of Intelligent Vehicles:\n\nCreating comprehensive digital twins of drivers and vehicles to improve autonomous driving safety and performance. These digital replicas enable real-time simulation and prediction of driving scenarios, enhancing decision-making in complex traffic environments.\n\nApplications: Safety enhancement, personalized driving assistance, predictive maintenance.'
    };
    alert(details[type] || 'Research details coming soon!');
};

window.showPhoto = function(id) {
    const photoIndex = id - 1;
    const photo = personal.media.photos[photoIndex];
    
    if (!photo) {
        alert('Photo not found!');
        return;
    }
    
    // Create photo viewer modal
    const photoModal = document.createElement('div');
    photoModal.id = 'photo-modal';
    photoModal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.9); z-index: 10000; display: flex; 
        align-items: center; justify-content: center; cursor: pointer;
    `;
    
    // Try multiple Flickr image URL formats for better compatibility
    const flickrPageUrl = `https://www.flickr.com/photos/bridgezhao/${photo.id}/`;
    
    photoModal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%; text-align: center;">
            <div id="photo-container-${photo.id}" style="min-height: 300px; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; font-size: 14px;">Loading photo...</div>
            </div>
            <div style="color: white; margin-top: 10px; font-family: inherit;">
                <h3>${photo.title}</h3>
                <p style="font-size: 12px; line-height: 1.4;">${photo.description}</p>
                <a href="${flickrPageUrl}" target="_blank" 
                   style="color: var(--secondary); text-decoration: none; font-size: 10px;">
                   View on Flickr ↗
                </a>
                <p style="font-size: 10px; margin-top: 10px; opacity: 0.7;">Click anywhere to close</p>
            </div>
        </div>
    `;
    
    // Since Flickr direct image URLs are restricted, provide a nice preview interface
    const container = photoModal.querySelector(`#photo-container-${photo.id}`);
    
    container.innerHTML = `
        <div style="color: white; text-align: center; padding: 40px;">
            <div style="font-size: 64px; margin-bottom: 20px;">${photo.emoji || '📸'}</div>
            <h3 style="margin-bottom: 15px; color: var(--secondary); font-size: 18px;">${photo.title}</h3>
            <p style="font-size: 14px; margin-bottom: 30px; line-height: 1.4; opacity: 0.9; max-width: 400px; margin-left: auto; margin-right: auto;">${photo.description}</p>
            <div style="margin-bottom: 25px;">
                <a href="${flickrPageUrl}" target="_blank" 
                   style="color: var(--secondary); text-decoration: none; 
                          padding: 14px 28px; border: 2px solid var(--secondary);
                          display: inline-block; background: var(--highlight);
                          font-weight: bold; margin-bottom: 10px; font-size: 12px;
                          transition: all 0.2s ease;">
                   📷 VIEW FULL PHOTO ON FLICKR
                </a>
            </div>
            <div style="margin-bottom: 20px;">
                <a href="https://www.flickr.com/photos/bridgezhao/" target="_blank" 
                   style="color: var(--text); text-decoration: none; font-size: 11px;
                          opacity: 0.8; border-bottom: 1px solid transparent;">
                   🖼️ Browse All Photos
                </a>
            </div>
            <p style="font-size: 10px; opacity: 0.6; line-height: 1.3; font-style: italic;">
                High-resolution photos available on Flickr
            </p>
        </div>
    `;
    
    photoModal.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            document.body.removeChild(photoModal);
        }
    });
    
    document.body.appendChild(photoModal);
};

window.playTrack = function(action) {
    const musicData = personal.media.music;
    const playBtn = document.getElementById('play-btn');
    
    if (action === 'prev') {
        musicData.currentTrack = (musicData.currentTrack - 1 + musicData.tracks.length) % musicData.tracks.length;
        updateCurrentTrack();
    } else if (action === 'next') {
        musicData.currentTrack = (musicData.currentTrack + 1) % musicData.tracks.length;
        updateCurrentTrack();
    } else if (action === 'toggle') {
        const currentTrack = musicData.tracks[musicData.currentTrack];
        
        // Check if music modal already exists
        const existingModal = document.getElementById('music-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
            if (playBtn) playBtn.textContent = '▶';
            return;
        }
        
        // Create SoundCloud embed modal
        const musicModal = document.createElement('div');
        musicModal.id = 'music-modal';
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
                <p style="margin: 10px 0; font-size: 14px;">${currentTrack.title} (${currentTrack.duration})</p>
                <iframe id="soundcloud-player" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" 
                        src="${soundcloudEmbed}"></iframe>
                <div style="margin-top: 15px;">
                    <button onclick="closeMusicPlayer()" 
                            style="padding: 8px 16px; background: var(--highlight); 
                                   border: 2px solid var(--secondary); color: var(--secondary); 
                                   font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                    <button onclick="openSoundCloudPage()" 
                            style="padding: 8px 16px; background: transparent; 
                                   border: 2px solid var(--secondary); color: var(--secondary); 
                                   font-family: inherit; cursor: pointer;">OPEN IN SOUNDCLOUD</button>
                </div>
                <p style="font-size: 10px; margin-top: 10px; opacity: 0.8;">
                    Music continues playing even when closed. Visit SoundCloud to control playback.
                </p>
            </div>
        `;
        
        document.body.appendChild(musicModal);
        
        if (playBtn) {
            playBtn.textContent = '⏸';
        }
    }
};

// Global function for track selection
window.selectTrack = function(trackIndex) {
    personal.media.music.currentTrack = trackIndex;
    updateCurrentTrack();
};

function updateCurrentTrack() {
    const currentTrack = personal.media.music.tracks[personal.media.music.currentTrack];
    
    // Update visual selection in track list
    document.querySelectorAll('.track-btn').forEach((btn, index) => {
        if (index === personal.media.music.currentTrack) {
            btn.style.background = 'var(--highlight)';
            btn.style.color = 'var(--secondary)';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text)';
        }
    });
    
    // Track selection updated silently for better UX
}

// Global functions for music player
window.closeMusicPlayer = function() {
    const modal = document.getElementById('music-modal');
    if (modal) {
        document.body.removeChild(modal);
        const playBtn = document.getElementById('play-btn');
        if (playBtn) playBtn.textContent = '▶';
    }
};

window.openSoundCloudPage = function() {
    // Open general SoundCloud profile instead of constructed URL
    window.open('https://soundcloud.com/zhouqiao-zhao', '_blank');
};

window.sendMessage = function() {
    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const message = document.getElementById('contact-message')?.value;
    
    if (name && email && message) {
        gainXP(50);
        alert('MESSAGE SENT SUCCESSFULLY!\n\nThank you for reaching out!');
        closePopup();
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-message').value = '';
    } else {
        alert('Please fill all fields!');
    }
};

// Safe email copy function for game interface
window.copyGameEmail = function() {
    const email = 'zhouqiao@mit.edu';
    
    // Modern clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            alert('📧 EMAIL COPIED TO CLIPBOARD!\n\nzhouqiao@mit.edu');
        }).catch(() => {
            // Fallback for clipboard API failure
            fallbackCopyGameEmail(email);
        });
    } else {
        // Fallback for browsers without clipboard API
        fallbackCopyGameEmail(email);
    }
};

function fallbackCopyGameEmail(email) {
    // Create temporary text area
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('📧 EMAIL COPIED TO CLIPBOARD!\n\nzhouqiao@mit.edu');
    } catch (err) {
        alert('📧 COPY FAILED\n\nPlease manually copy: ' + email);
    }
    
    document.body.removeChild(textArea);
}

// Global function for research detail popup
window.showResearchDetail = function(researchId) {
    // Use actual blog content instead of generic descriptions
    const researchAreas = {
        'cooperative-driving': {
            title: 'Cooperative Driving Automation',
            description: 'I explore cooperation in ITS at all scales: Macro – ride-sharing optimization, multi-vehicle routing, and coordinated dispatch for mixed fleets. Meso – cooperative trajectory planning, eco-ramp merging, and formation control using CDA frameworks. Micro – driver intention prediction, personalized adaptive cruise control, and cooperative lane merging. I also integrate vehicle-to-infrastructure (V2I) communication and infrastructure-side perception using roadside perception units (RSPUs).',
            tags: ['Cooperative Driving Automation (CDA)', 'V2I & Roadside Perception', 'Multi-Scale Coordination', 'Mixed-Traffic Optimization'],
            icon: '🚗'
        },
        'human-ai': {
            title: 'Human-Centered AI',
            description: 'I develop personalized and explainable AI models for transportation safety and automation. This includes context-aware modeling of the driver–vehicle–environment triad using Graph Neural Networks (GNNs) and multi-modal large language models (MLLMs), predicting and interpreting driver responses to safety systems like Forward Collision Warnings (FCW), and designing machine learning pipelines that balance performance with explainability.',
            tags: ['Driver–Vehicle–Environment Modeling', 'Graph Neural Networks (GNN) & MLLM', 'Explainable AI (XAI)', 'Personalized Safety Systems'],
            icon: '🧠'
        },
        'digital-twins': {
            title: 'Digital Twin Technologies',
            description: 'Digital twins provide a virtual mirror of real-world transportation systems, enabling scenario testing, predictive analytics, and real-time decision support. My work focuses on building high-fidelity digital twins for ITS and vehicle automation, using these twins to test safety systems and optimize traffic flow, and supporting resilient infrastructure planning by simulating the impact of new technologies, policies, and mobility patterns at city and regional scales.',
            tags: ['High-Fidelity Transportation Simulations', 'Real-Time ITS Optimization', 'Scenario-Based Infrastructure Planning', 'Data-Driven Policy Testing'],
            icon: '🤖'
        }
    };
    
    const research = researchAreas[researchId];
    if (!research) {
        alert('Research area details not found!');
        return;
    }
    
    // Create research detail modal
    const researchModal = document.createElement('div');
    researchModal.id = 'research-modal';
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
            <div style="font-size: 48px; margin-bottom: 15px;">${research.icon}</div>
            <h2 style="color: var(--accent); margin-bottom: 20px; font-size: 16px;">${research.title}</h2>
            
            <div style="text-align: left; margin: 20px 0;">
                <p style="font-size: 10px; line-height: 1.6; margin-bottom: 15px;">${research.description}</p>
                
                <div style="margin: 15px 0;">
                    <h4 style="color: var(--accent); font-size: 10px; margin-bottom: 8px;">🔍 KEY AREAS:</h4>
                    ${research.tags.map(tag => 
                        `<span style="background: var(--highlight); padding: 3px 8px; margin: 2px; 
                                      font-size: 8px; border-radius: 10px; display: inline-block;">${tag}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button onclick="closeResearchDetail()" 
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <button onclick="window.open('/blog#research', '_blank')" 
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer;">VIEW FULL RESEARCH</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(researchModal);
    
    // Add close function
    window.closeResearchDetail = function() {
        const modal = document.getElementById('research-modal');
        if (modal) modal.remove();
    };
    
    // Close on click outside
    researchModal.addEventListener('click', (e) => {
        if (e.target === researchModal) {
            window.closeResearchDetail();
        }
    });
};

// Global publication browser functionality
let currentPaperIndex = 0;

// Import publications data (available via gameData imports)
import { publications } from '../data/index.js';

window.nextPaper = function() {
    currentPaperIndex = (currentPaperIndex + 1) % publications.length;
    updatePaperDisplay();
};

window.previousPaper = function() {
    currentPaperIndex = (currentPaperIndex - 1 + publications.length) % publications.length;
    updatePaperDisplay();
};

function updatePaperDisplay() {
    const paper = publications[currentPaperIndex];
    const paperElement = document.getElementById('current-paper');
    const counterElement = document.getElementById('paper-counter');
    const scrollThumb = document.getElementById('paper-scroll-thumb');
    
    if (paperElement && paper) {
        paperElement.innerHTML = `
            <strong>${paper.title}</strong><br>
            <em style="color: var(--accent);">${paper.venue} (${paper.year})</em><br>
            <div style="margin: 12px 0; text-align: center;">
                <button onclick="showPaperDetails(${currentPaperIndex})" style="padding: 8px 16px; background: var(--primary); border: 2px solid var(--secondary); color: var(--secondary); font-size: 10px; cursor: pointer;">📋 DETAILS</button>
            </div>
        `;
    }
    
    if (counterElement) {
        counterElement.textContent = `Paper ${currentPaperIndex + 1} of ${publications.length}`;
    }
    
    if (scrollThumb) {
        const thumbPosition = (currentPaperIndex / (publications.length - 1)) * (100 - parseFloat(scrollThumb.style.width));
        scrollThumb.style.marginLeft = `${thumbPosition}%`;
    }
}

// Global function for paper details popup
window.showPaperDetails = function(paperIndex) {
    const paper = publications[paperIndex];
    if (!paper) {
        alert('Paper details not found!');
        return;
    }
    
    // Create paper details modal
    const paperModal = document.createElement('div');
    paperModal.id = 'paper-modal';
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
                <button onclick="closePaperDetails()" 
                        style="padding: 10px 20px; background: var(--highlight); 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer; margin-right: 10px;">CLOSE</button>
                <button onclick="window.open('${paper.link}', '_blank')" 
                        style="padding: 10px 20px; background: transparent; 
                               border: 2px solid var(--secondary); color: var(--secondary); 
                               font-family: inherit; cursor: pointer;">📄 READ FULL PAPER</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(paperModal);
    
    // Add close function
    window.closePaperDetails = function() {
        const modal = document.getElementById('paper-modal');
        if (modal) modal.remove();
    };
    
    // Close on click outside
    paperModal.addEventListener('click', (e) => {
        if (e.target === paperModal) {
            window.closePaperDetails();
        }
    });
};