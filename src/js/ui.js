// Import from engine.js
import {
    player, visitedAreas, collectedItems, currentInteraction, dialogueIndex,
    dialogueSpeaker, dialogueText, dialogueBox, getAchievements, setDialogueState, setCurrentInteraction, setPopupState
} from './engine.js';
import { gainXP, unlockAchievement } from './entities.js';
import { gameData } from './data.js';

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