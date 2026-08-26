// Import from engine.js
import { 
    player, collectedItems, collectibleList, gameWorld,
    hudScore, hudLevel, hudAchievements, incrementAchievements
} from './engine.js';
import { gameData } from '../data/index.js';
import { showGameNotification } from './notifications.js';

// Gain XP and level up
export function gainXP(amount) {
    player.xp += amount;
    while (player.xp >= player.xpToNextLevel) {
        player.xp -= player.xpToNextLevel;
        player.level++;
        player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.2); // Reduced multiplier for smoother progression
        
        // Level-based achievements
        if (player.level === 5 && !unlockedAchievements.has('LEVEL_5')) {
            unlockAchievement('LEVEL_5');
        } else if (player.level === 10 && !unlockedAchievements.has('LEVEL_10')) {
            unlockAchievement('LEVEL_10');
        } else {
            showGameNotification(`🆙 LEVEL UP! You reached level ${player.level}!`, { duration: 3000 });
        }
    }
    updateHUD();
}

// Unlock achievement
export function unlockAchievement(achievementKey) {
    if (unlockedAchievements.has(achievementKey)) return;
    
    const achievement = ACHIEVEMENTS[achievementKey];
    if (!achievement) return;
    
    unlockedAchievements.add(achievementKey);
    incrementAchievements();
    
    // Award XP for achievement
    if (achievement.xp > 0) {
        gainXP(achievement.xp);
    }
    
    showGameNotification(achievement.text, { duration: 4000 });
    updateHUD();
}

// Public function to trigger specific achievements
export function triggerAchievement(achievementKey) {
    unlockAchievement(achievementKey);
}

// Update HUD
export function updateHUD() {
    if (hudScore) hudScore.textContent = `XP: ${player.xp}/${player.xpToNextLevel}`;
    if (hudLevel) hudLevel.textContent = `LEVEL: ${player.level}`;
    // Show collected items vs total collectibles on map (dynamic count)
    const totalCollectibles = gameData.collectibles?.length || 6;
    if (hudAchievements) hudAchievements.textContent = `🏆 ${collectedItems.size}/${totalCollectibles}`;
}

// Achievement definitions
const ACHIEVEMENTS = {
    // Exploration Achievements
    FIRST_STEPS: { text: "🦶 FIRST STEPS - Welcome to the research world!", xp: 10 },
    AREA_EXPLORER: { text: "🗺️ AREA EXPLORER - Visited 3 different areas!", xp: 50 },
    WORLD_TRAVELER: { text: "🌍 WORLD TRAVELER - Explored all major areas!", xp: 100 },
    
    // Social Achievements  
    FIRST_CONTACT: { text: "👋 FIRST CONTACT - Talked to your first NPC!", xp: 25 },
    SOCIAL_BUTTERFLY: { text: "🦋 SOCIAL BUTTERFLY - Met all the NPCs!", xp: 75 },
    DEEP_THINKER: { text: "🧠 DEEP THINKER - Had meaningful research discussions!", xp: 50 },
    
    // Research Achievements
    PAPER_READER: { text: "📄 PAPER READER - Explored research publications!", xp: 40 },
    PROJECT_SCOUT: { text: "🚀 PROJECT SCOUT - Discovered research projects!", xp: 40 },
    FRAMEWORK_MASTER: { text: "🗺️ FRAMEWORK_MASTER - Viewed the research roadmap!", xp: 30 },
    
    // Creative Achievements
    MUSIC_LOVER: { text: "🎵 MUSIC LOVER - Explored the music studio!", xp: 30 },
    PHOTO_ENTHUSIAST: { text: "📸 PHOTO ENTHUSIAST - Browsed the photo gallery!", xp: 30 },
    CREATIVE_SOUL: { text: "🎨 CREATIVE SOUL - Appreciated both research and art!", xp: 60 },
    
    // Collection Achievements
    STAR_COLLECTOR: { text: "⭐ STAR COLLECTOR - Found your first star!", xp: 15 },
    TREASURE_HUNTER: { text: "🏆 TREASURE HUNTER - Discovered a rare artifact!", xp: 40 },
    SPEED_DEMON: { text: "💎 SPEED DEMON - Activated a speed boost!", xp: 25 },
    COMPLETIONIST: { text: "🎯 COMPLETIONIST - Collected everything!", xp: 150 },
    
    // Level Achievements
    LEVEL_5: { text: "🌟 RISING STAR - Reached level 5!", xp: 0 },
    LEVEL_10: { text: "🚀 RESEARCH VETERAN - Reached level 10!", xp: 0 }
};

// Track unlocked achievements
let unlockedAchievements = new Set();

// Collect item
export function collectItem(item) {
    if (collectedItems.has(item)) return;
    
    collectedItems.add(item);
    const type = item.dataset.type;
    
    if (type === 'xp') {
        gainXP(ACHIEVEMENTS.STAR_COLLECTOR.xp);
        if (!unlockedAchievements.has('STAR_COLLECTOR')) {
            unlockAchievement('STAR_COLLECTOR');
        }
    } else if (type === 'achievement') {
        gainXP(ACHIEVEMENTS.TREASURE_HUNTER.xp);
        if (!unlockedAchievements.has('TREASURE_HUNTER')) {
            unlockAchievement('TREASURE_HUNTER');
        }
    } else if (type === 'powerup') {
        player.speed = 8;
        setTimeout(() => { player.speed = 6; }, 8000); // Reduced from 10s to 8s, reset to 6 not 5
        gainXP(ACHIEVEMENTS.SPEED_DEMON.xp);
        if (!unlockedAchievements.has('SPEED_DEMON')) {
            unlockAchievement('SPEED_DEMON');
        }
    }
    
    // Check for completionist achievement (collected all items)
    const totalCollectibles = gameData.collectibles?.length || 6;
    if (collectedItems.size >= totalCollectibles && !unlockedAchievements.has('COMPLETIONIST')) {
        unlockAchievement('COMPLETIONIST');
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
