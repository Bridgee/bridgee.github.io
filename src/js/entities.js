// Import from engine.js
import { 
    player, collectedItems, collectibleList, gameWorld,
    hudScore, hudLevel, hudAchievements, incrementAchievements, getAchievements
} from './engine.js';

// Gain XP and level up
export function gainXP(amount) {
    player.xp += amount;
    while (player.xp >= player.xpToNextLevel) {
        player.xp -= player.xpToNextLevel;
        player.level++;
        player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
        unlockAchievement(`LEVEL UP! You reached level ${player.level}!`);
    }
    updateHUD();
}

// Unlock achievement
export function unlockAchievement(text) {
    incrementAchievements();
    const achievementEl = document.getElementById('achievement');
    const achievementText = document.getElementById('achievement-text');
    if (achievementEl && achievementText) {
        achievementText.textContent = text;
        achievementEl.style.display = 'block';
        setTimeout(() => {
            achievementEl.style.display = 'none';
        }, 3000);
    }
    updateHUD();
}

// Update HUD
export function updateHUD() {
    if (hudScore) hudScore.textContent = `XP: ${player.xp}/${player.xpToNextLevel}`;
    if (hudLevel) hudLevel.textContent = `LEVEL: ${player.level}`;
    if (hudAchievements) hudAchievements.textContent = `🏆 ${getAchievements()}/10`;
}

// Collect item
export function collectItem(item) {
    if (collectedItems.has(item)) return;
    
    collectedItems.add(item);
    const type = item.dataset.type;
    
    if (type === 'xp') {
        gainXP(25);
        unlockAchievement("STAR COLLECTOR - Found a star!");
    } else if (type === 'achievement') {
        gainXP(50);
        unlockAchievement("TREASURE HUNTER - Found a rare item!");
    } else if (type === 'powerup') {
        player.speed = 8;
        setTimeout(() => { player.speed = 5; }, 10000);
        gainXP(100);
        unlockAchievement("SPEED BOOST - Collected a power-up!");
    }
    
    item.style.transition = 'all 0.5s';
    item.style.transform = 'scale(2) rotate(360deg)';
    item.style.opacity = '0';
    
    setTimeout(() => {
        item.remove();
        const index = collectibleList.indexOf(item);
        if (index > -1) collectibleList.splice(index, 1);
    }, 500);
}

// Particle system from PoC
let lastParticleTime = 0;
const PARTICLE_INTERVAL = 100;
const PARTICLE_POOL = [];

export function createParticle(x = player.x + player.width / 2, y = player.y + player.height) {
    const now = performance.now();
    if (now - lastParticleTime < PARTICLE_INTERVAL) return;
    lastParticleTime = now;

    if (Math.random() > 0.8) return;

    let particle = PARTICLE_POOL.pop();
    if (!particle) {
        particle = document.createElement('div');
        particle.className = 'particle';
        particle.addEventListener('animationend', () => {
            particle.style.display = 'none';
            PARTICLE_POOL.push(particle);
        });
        if (gameWorld) gameWorld.appendChild(particle);
    }

    if (particle) {
        particle.style.display = 'block';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animation = 'none';
        void particle.offsetWidth;
        particle.style.animation = '';
    }
}