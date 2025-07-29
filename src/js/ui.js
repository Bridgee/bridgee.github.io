// Import from engine.js
import {
    player, visitedAreas, collectedItems, currentInteraction, dialogueIndex,
    dialogueSpeaker, dialogueText, dialogueBox, getAchievements, setDialogueState, setCurrentInteraction, setPopupState
} from './engine.js';
import { gainXP, unlockAchievement } from './entities.js';

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

// Show area content (exact from PoC)
function showAreaContent(areaId) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    if (!popup || !popupContent) return;

    const contents = {
        'home-area': `
            <h2>WELCOME TO MY DIGITAL REALM</h2>
            <p>Greetings, traveler! I'm YOUR NAME, a postdoc researcher at MIT.</p>
            <p>This interactive portfolio is my digital playground where science meets creativity.</p>
            <div style="margin-top: 20px;">
                <button class="menu-button" onclick="showStats()">VIEW STATS</button>
                <button class="menu-button" onclick="showControls()">CONTROLS</button>
            </div>
            <p style="margin-top: 20px; font-size: 8px;">Explore the world and talk to NPCs to gain XP!</p>
        `,
        'research-area': `
            <h2>RESEARCH LABORATORY</h2>
            <h3>Current Projects:</h3>
            <div style="margin: 20px 0;">
                <button class="menu-button" onclick="showResearchDetail('quantum')">🔬 QUANTUM MECHANICS</button>
                <button class="menu-button" onclick="showResearchDetail('ml')">🤖 MACHINE LEARNING</button>
                <button class="menu-button" onclick="showResearchDetail('bio')">🧬 BIOPHYSICS</button>
            </div>
            <h3>Recent Publications:</h3>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>"Quantum Entanglement in Complex Systems" - Nature Physics, 2024</li>
                <li>"Neural Networks for Molecular Prediction" - Science, 2024</li>
                <li>"Protein Folding Dynamics at Scale" - Cell, 2025</li>
            </ul>
            <div style="margin-top: 20px;">
                <button class="menu-button" onclick="window.open('https://scholar.google.com/citations?user=YOURID', '_blank')">📚 GOOGLE SCHOLAR</button>
                <button class="menu-button" onclick="window.open('https://github.com/yourusername', '_blank')">💻 GITHUB</button>
            </div>
        `,
        'gallery-area': `
            <h2>PHOTOGRAPHY GALLERY</h2>
            <p>Capturing moments between experiments...</p>
            <div class="gallery-grid">
                <div class="gallery-thumb" onclick="showPhoto(1)"><div style="padding: 20px; color: var(--secondary);">📸<br>MIT Sunset</div></div>
                <div class="gallery-thumb" onclick="showPhoto(2)"><div style="padding: 20px; color: var(--secondary);">🌃<br>Urban Night</div></div>
                <div class="gallery-thumb" onclick="showPhoto(3)"><div style="padding: 20px; color: var(--secondary);">🌿<br>Nature Macro</div></div>
                <div class="gallery-thumb" onclick="showPhoto(4)"><div style="padding: 20px; color: var(--secondary);">🎨<br>Abstract</div></div>
                <div class="gallery-thumb" onclick="showPhoto(5)"><div style="padding: 20px; color: var(--secondary);">🔬<br>Lab Life</div></div>
                <div class="gallery-thumb" onclick="showPhoto(6)"><div style="padding: 20px; color: var(--secondary);">🌌<br>Astrophoto</div></div>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <button class="menu-button" onclick="window.open('https://instagram.com/yourusername', '_blank')">📷 INSTAGRAM</button>
                <button class="menu-button" onclick="window.open('https://flickr.com/yourusername', '_blank')">🖼️ FLICKR</button>
            </div>
        `,
        'music-area': `
            <h2>MUSIC STUDIO</h2>
            <p>Electronic compositions and chiptune experiments</p>
            <div class="music-controls">
                <button class="music-btn" onclick="playTrack('prev')">⏮</button>
                <button class="music-btn" id="play-btn" onclick="playTrack('toggle')">▶</button>
                <button class="music-btn" onclick="playTrack('next')">⏭</button>
            </div>
            <div style="margin: 20px 0;">
                <div class="menu-button" style="display: block; margin: 10px auto; text-align: center;">🎵 Digital Dreams - 3:24</div>
                <div class="menu-button" style="display: block; margin: 10px auto; text-align: center;">🎹 Quantum Beats - 4:12</div>
                <div class="menu-button" style="display: block; margin: 10px auto; text-align: center;">🎼 Binary Sunset - 5:03</div>
            </div>
            <div style="text-align: center;">
                <button class="menu-button" onclick="window.open('https://soundcloud.com/yourusername', '_blank')">☁️ SOUNDCLOUD</button>
                <button class="menu-button" onclick="window.open('https://spotify.com/yourusername', '_blank')">🎧 SPOTIFY</button>
            </div>
        `,
        'about-area': `
            <h2>PLAYER PROFILE</h2>
            <div style="display: flex; gap: 20px; margin: 20px 0;">
                <div style="flex: 1;">
                    <h3>STATS:</h3>
                    <ul style="line-height: 2;">
                        <li>Level: ${player.level}</li>
                        <li>XP: ${player.xp}/${player.xpToNextLevel}</li>
                        <li>Class: Researcher/Artist</li>
                        <li>Location: MIT, Cambridge</li>
                    </ul>
                </div>
                <div style="flex: 1;">
                    <h3>SKILLS:</h3>
                    <ul style="line-height: 2;">
                        <li>Quantum Physics [████████░░] 80%</li>
                        <li>Machine Learning [█████████░] 90%</li>
                        <li>Photography [███████░░░] 70%</li>
                        <li>Music Production [██████░░░░] 60%</li>
                    </ul>
                </div>
            </div>
            <h3>BACKSTORY:</h3>
            <p style="line-height: 1.8;">
                Started the academic quest at [University Name], where I discovered the beauty of quantum mechanics. 
                Leveled up through various research dungeons, collecting knowledge and skills along the way. 
                Now embarking on postdoctoral adventures at MIT, seeking to unlock the mysteries of the universe 
                while capturing its beauty through lens and sound.
            </p>
            <div style="margin-top: 20px; text-align: center;">
                <button class="menu-button" onclick="window.open('/cv.pdf', '_blank')">📄 DOWNLOAD CV</button>
                <button class="menu-button" onclick="window.open('https://linkedin.com/in/yourusername', '_blank')">💼 LINKEDIN</button>
            </div>
        `,
        'contact-area': `
            <h2>COMMUNICATION PORTAL</h2>
            <p>Send a message through the digital void...</p>
            <div style="margin: 20px 0;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">NAME:</label>
                    <input type="text" id="contact-name" name="name" style="width: 100%; padding: 8px; background: var(--highlight); border: 2px solid var(--secondary); color: var(--secondary); font-family: inherit; font-size: 10px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">EMAIL:</label>
                    <input type="email" id="contact-email" name="email" style="width: 100%; padding: 8px; background: var(--highlight); border: 2px solid var(--secondary); color: var(--secondary); font-family: inherit; font-size: 10px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">MESSAGE:</label>
                    <textarea id="contact-message" rows="4" name="message" style="width: 100%; padding: 8px; background: var(--highlight); border: 2px solid var(--secondary); color: var(--secondary); font-family: inherit; font-size: 10px; resize: none;"></textarea>
                </div>
                <button class="menu-button" onclick="sendMessage()">📤 TRANSMIT MESSAGE</button>
            </div>
            <h3>DIRECT CHANNELS:</h3>
            <div style="text-align: center; margin-top: 20px;">
                <button class="menu-button" onclick="window.open('mailto:your.email@mit.edu', '_blank')">📧 EMAIL</button>
                <button class="menu-button" onclick="window.open('https://twitter.com/yourusername', '_blank')">🐦 TWITTER</button>
                <button class="menu-button" onclick="navigator.clipboard.writeText('your.email@mit.edu').then(() => alert('Email copied!'))">📋 COPY EMAIL</button>
            </div>
        `
    };
    
    popupContent.innerHTML = contents[areaId] || '<p>Area under construction...</p>';
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
        'quantum': 'Quantum Mechanics Research:\n\nFocusing on quantum entanglement and its applications in computing...',
        'ml': 'Machine Learning:\n\nCreating neural networks for scientific data analysis...',
        'bio': 'Biophysics:\n\nDeveloping algorithms for protein folding prediction...'
    };
    alert(details[type] || 'Research details coming soon!');
};

window.showPhoto = function(id) {
    alert(`Photo ${id}: High-resolution image would be displayed here.\n\nIn production, this would show the full image with EXIF data and description.`);
};

window.playTrack = function(action) {
    const playBtn = document.getElementById('play-btn');
    if (action === 'toggle' && playBtn) {
        playBtn.textContent = playBtn.textContent === '▶' ? '⏸' : '▶';
    }
    console.log('Music player action:', action);
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