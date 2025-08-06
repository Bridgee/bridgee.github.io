// Import functions from other modules
import { collectItem, createParticle } from './entities.js';
import { startDialogue, continueDialogue, enterArea, closePopup } from './ui.js';
import { gameData } from '../data/game.js';

// Game Variables - Initialize from gameData
export let player = {
    x: gameData.player.x,
    y: gameData.player.y,
    speed: gameData.player.speed,
    width: gameData.player.width,
    height: gameData.player.height,
    isMoving: false,
    direction: 'down',
    level: 1,
    xp: 0,
    xpToNextLevel: 100
};

export let camera = { x: 0, y: 0 };
export let world = { width: gameData.world.width, height: gameData.world.height };

// Game state variables
export let keys = {};
export let achievements = 0;
export let visitedAreas = new Set();
export let collectedItems = new Set();
export let currentInteraction = null;
export let dialogueIndex = 0;
export let isInDialogue = false;
export let isPopupOpen = false; // New state for popup

// DOM element references
export let gameWorld, playerElement, playerSprite, hudCoords, hudScore, hudLevel, hudAchievements;
export let interactionPrompt, dialogueBox, dialogueSpeaker, dialogueText, minimapPlayer;

// Cached interactive collections
export let npcList = [], areaList = [], collectibleList = [];

// State management functions
export function incrementAchievements() {
    if (achievements < 10) achievements++;
}

export function getAchievements() {
    return achievements;
}

export function setDialogueState(inDialogue, index = 0) {
    isInDialogue = inDialogue;
    dialogueIndex = index;
}

export function setPopupState(isOpen) { // New state setter
    isPopupOpen = isOpen;
}

export function setCurrentInteraction(interaction) {
    currentInteraction = interaction;
}

// Initialize DOM references
function initDOMReferences() {
    gameWorld = document.getElementById('game-world');
    playerElement = document.getElementById('player');
    playerSprite = playerElement?.querySelector('.player-sprite');
    hudCoords = document.getElementById('coordinates');
    hudScore = document.getElementById('score');
    hudLevel = document.getElementById('level');
    hudAchievements = document.getElementById('achievements');
    interactionPrompt = document.getElementById('interaction-prompt');
    dialogueBox = document.getElementById('dialogue-box');
    dialogueSpeaker = document.getElementById('dialogue-speaker');
    dialogueText = document.getElementById('dialogue-text');
    minimapPlayer = document.getElementById('minimap-player');
}

// Game initialization
export function initGame() {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1000);
    
    initDOMReferences();
    
    npcList = Array.from(document.querySelectorAll('.npc'));
    areaList = Array.from(document.querySelectorAll('.game-area'));
    collectibleList = Array.from(document.querySelectorAll('.collectible'));
    
    areaList.forEach(area => {
        area.setAttribute('role', 'button');
        area.setAttribute('tabindex', '0');
        area.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                enterArea(area);
            }
        });
    });
    
    updatePlayerPosition();
    attachEventListeners();
    attachButtonHandlers();
    
    document.addEventListener('click', (e) => {
        if (currentInteraction && e.target.closest('.interaction-prompt')) {
            interact();
        }
    });
    
    areaList.forEach(area => {
        area.addEventListener('click', (e) => {
            if (!e.target.closest('.area-label')) enterArea(area);
        });
    });
    
    npcList.forEach(npc => {
        npc.addEventListener('click', () => startDialogue(npc));
    });
    
    collectibleList.forEach(item => {
        item.addEventListener('click', () => collectItem(item));
    });
    
    setInterval(checkProximity, 100);
    gameLoop();
}

function gameLoop() {
    handleMovement();
    updateCamera();
    updateMinimap();
    requestAnimationFrame(gameLoop);
}

function attachEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', updateCamera);
}

function handleKeyDown(e) {
    if (isInDialogue && e.key === ' ') {
        e.preventDefault();
        continueDialogue();
        return;
    }
    
    if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
        return;
    }
    
    keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ' && currentInteraction) {
        e.preventDefault();
        interact();
    }
    
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        if (!player.isMoving) {
            player.isMoving = true;
            if (playerSprite) playerSprite.classList.add('moving');
        }
    }
}

function handleKeyUp(e) {
    const k = e.key.toLowerCase();
    keys[k] = false;
    
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(k)) {
        const stillMoving = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].some(key => keys[key]);
        if (!stillMoving) {
            player.isMoving = false;
            if (playerSprite) playerSprite.classList.remove('moving');
        }
    }
}

function handleMovement() {
    if (isInDialogue || isPopupOpen) return; // Updated logic
    
    let moved = false;
    let newX = player.x;
    let newY = player.y;
    
    if (keys['arrowup'] || keys['w']) { newY -= player.speed; player.direction = 'up'; moved = true; }
    if (keys['arrowdown'] || keys['s']) { newY += player.speed; player.direction = 'down'; moved = true; }
    if (keys['arrowleft'] || keys['a']) { newX -= player.speed; player.direction = 'left'; moved = true; }
    if (keys['arrowright'] || keys['d']) { newX += player.speed; player.direction = 'right'; moved = true; }
    
    if (newX >= 0 && newX <= world.width - player.width) player.x = newX;
    if (newY >= 0 && newY <= world.height - player.height) player.y = newY;
    
    if (moved) {
        updatePlayerPosition();
        createParticle();
    }
}

function updatePlayerPosition() {
    if (playerElement) {
        playerElement.style.left = player.x + 'px';
        playerElement.style.top = player.y + 'px';
        if (playerSprite) playerSprite.className = `player-sprite facing-${player.direction}${player.isMoving ? ' moving' : ''}`;
    }
    if (hudCoords) hudCoords.textContent = `X: ${Math.floor(player.x)} | Y: ${Math.floor(player.y)}`;
}

function updateCamera() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    const { clientWidth, clientHeight } = gameContainer;
    
    camera.x = player.x - clientWidth / 2 + player.width / 2;
    camera.y = player.y - clientHeight / 2 + player.height / 2;
    
    camera.x = Math.max(0, Math.min(camera.x, world.width - clientWidth));
    camera.y = Math.max(0, Math.min(camera.y, world.height - clientHeight));
    
    if (gameWorld) gameWorld.style.transform = `translate(-${camera.x}px, -${camera.y}px)`;
}

function updateMinimap() {
    if (!minimapPlayer) return;
    const map = document.getElementById('minimap');
    if (!map) return;
    
    const scaleX = (map.offsetWidth - minimapPlayer.offsetWidth) / world.width;
    const scaleY = (map.offsetHeight - minimapPlayer.offsetHeight) / world.height;
    
    let px = player.x * scaleX + 2;
    let py = player.y * scaleY + 2;
    
    px = Math.max(2, Math.min(px, map.offsetWidth - minimapPlayer.offsetWidth - 2));
    py = Math.max(2, Math.min(py, map.offsetHeight - minimapPlayer.offsetHeight - 2));
    
    minimapPlayer.style.left = px + 'px';
    minimapPlayer.style.top = py + 'px';
}

function checkProximity() {
    if (isInDialogue || isPopupOpen) return;

    const R = 40;
    const pcx = player.x + player.width / 2;
    const pcy = player.y + player.height / 2;

    for (const npc of npcList) {
        if (Math.hypot(pcx - (parseInt(npc.style.left) + 16), pcy - (parseInt(npc.style.top) + 16)) < R) {
            showInteractionPrompt(npc);
            setCurrentInteraction({ type: 'npc', element: npc });
            return;
        }
    }

    for (const area of areaList) {
        if (pcx > area.offsetLeft && pcx < area.offsetLeft + area.offsetWidth && pcy > area.offsetTop && pcy < area.offsetTop + area.offsetHeight) {
            showInteractionPrompt(area);
            setCurrentInteraction({ type: 'area', element: area });
            return;
        }
    }

    for (const item of collectibleList) {
        if (collectedItems.has(item)) continue;
        if (Math.hypot(pcx - (parseInt(item.style.left) + 12), pcy - (parseInt(item.style.top) + 12)) < R) {
            showInteractionPrompt(item);
            setCurrentInteraction({ type: 'collectible', element: item });
            return;
        }
    }

    hideInteractionPrompt();
    setCurrentInteraction(null);
}

function showInteractionPrompt(element) {
    if (!interactionPrompt) return;
    interactionPrompt.style.display = 'block';
    const desiredLeft = player.x - camera.x + player.width / 2 - interactionPrompt.offsetWidth / 2;
    const desiredTop = player.y - camera.y - interactionPrompt.offsetHeight - 10;
    const PAD = 8;
    const maxLeft = window.innerWidth - interactionPrompt.offsetWidth - PAD;
    const maxTop = window.innerHeight - interactionPrompt.offsetHeight - PAD;
    interactionPrompt.style.left = `${Math.max(PAD, Math.min(desiredLeft, maxLeft))}px`;
    interactionPrompt.style.top = `${Math.max(PAD, Math.min(desiredTop, maxTop))}px`;
}

function hideInteractionPrompt() {
    if (interactionPrompt) interactionPrompt.style.display = 'none';
}

function interact() {
    if (isInDialogue) {
        continueDialogue();
        return;
    }
    if (!currentInteraction) return;
    
    switch (currentInteraction.type) {
        case 'npc': startDialogue(currentInteraction.element); break;
        case 'area': enterArea(currentInteraction.element); break;
        case 'collectible': collectItem(currentInteraction.element); break;
    }
}

function attachButtonHandlers() {
    const keyMap = {
        'btn-up': 'arrowup', 'btn-down': 'arrowdown', 'btn-left': 'arrowleft', 'btn-right': 'arrowright', 'btn-action': 'action'
    };

    Object.entries(keyMap).forEach(([id, keyName]) => {
        const btn = document.getElementById(id);
        if (!btn) return;

        const press = (e) => {
            e.preventDefault();
            if (keyName === 'action') {
                interact();
                return;
            }
            keys[keyName] = true;
            if (!player.isMoving) {
                player.isMoving = true;
                if (playerSprite) playerSprite.classList.add('moving');
            }
        };

        const release = (e) => {
            e.preventDefault();
            if (keyName === 'action') return;
            keys[keyName] = false;
            const stillMoving = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].some(key => keys[key]);
            if (!stillMoving) {
                player.isMoving = false;
                if (playerSprite) playerSprite.classList.remove('moving');
            }
        };

        btn.addEventListener('pointerdown', press);
        btn.addEventListener('pointerup', release);
        btn.addEventListener('pointerleave', release);
        btn.addEventListener('contextmenu', e => e.preventDefault());
    });

    const closeBtn = document.querySelector('.popup-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
        closeBtn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') closePopup();
        });
    }
}
