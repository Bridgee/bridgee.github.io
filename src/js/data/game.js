// Game-specific data for Interactive Digital Twin mode only
export const gameData = {
  player: {
    x: 1250,
    y: 850,
    speed: 5,
    width: 32,
    height: 32,
  },
  world: {
    width: 2400,
    height: 1600,
  },
  npcs: [
    {
      name: "Dr. Smith",
      dialogue: [
        "Welcome to Bridge's Digital Twin!",
        "I research human-centered autonomous driving here.",
        "The Research Lab has details on our latest publications!",
        "We're creating digital twins of drivers to improve vehicle safety.",
      ],
      position: { top: "600px", left: "500px" },
      sprite: "scientist",
    },
    {
      name: "Maya",
      dialogue: [
        "Hey there! I love photography!",
        "Have you checked out the Gallery?",
        "I captured some amazing shots at MIT.",
        "Each photo tells a story of discovery.",
      ],
      position: { top: "450px", left: "1500px" },
      sprite: "photographer",
    },
    {
      name: "DJ Byte",
      dialogue: [
        "Yo! Welcome to the beat zone!",
        "I spin electronic tracks all day.",
        "Check out the Music Studio for some tunes!",
        "Music and science go hand in hand.",
      ],
      position: { top: "1050px", left: "400px" },
      sprite: "musician",
    },
  ],
  areas: {
    "home-area": {
      label: "HOME BASE",
      icon: "🏠",
      position: { top: "750px", left: "1150px", width: "200px", height: "200px" },
      content: `
        <h2>WELCOME TO MY DIGITAL REALM</h2>
        <p>Greetings, traveler! I'm YOUR NAME, a postdoc researcher at MIT.</p>
        <p>This interactive portfolio is my digital playground where science meets creativity.</p>
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
            <h3>Research Focus:</h3>
            <div style="margin: 20px 0;">
                <button class="menu-button" onclick="showResearchDetail('autonomy')">🤖 Human-Centered Autonomy</button>
                <button class="menu-button" onclick="showResearchDetail('modeling')">🚗 Driver Behavior Modeling</button>
                <button class="menu-button" onclick="showResearchDetail('twinning')">🚁 Digital Twinning of Intelligent Vehicles</button>
            </div>
            <h3>Recent Publications:</h3>
            <ul style="margin-left: 20px; line-height: 2; font-size: 8px;">
                <li>Liao, X., Zhao, X., Wang, Z., Zhao, Z., Han, K., Gupta, R., Barth, M. J., & Wu, G. (2023). Driver digital twin for online prediction of personalized lane-change behavior. IEEE Internet of Things Journal.</li>
                <li>Zhao, Z., Wang, Z., Han, K., Gupta, R., Tiwari, P., Wu, G., & Barth, M. J. (2022). Personalized car following for autonomous driving with inverse reinforcement learning. In 2022 International Conference on Robotics and Automation (ICRA).</li>
                <li>Liao, X., Wang, Z., Zhao, X., Zhao, Z., Han, K., Tiwari, P., Barth, M. J., & Wu, G. (2022). Online prediction of lane change with a hierarchical learning-based approach. In 2022 International Conference on Robotics and Automation (ICRA).</li>
            </ul>
            <div style="margin-top: 20px;">
                <button class="menu-button" onclick="window.open('https://scholar.google.com/citations?user=Y1s8cw0AAAAJ&hl=en', '_blank')">📚 GOOGLE SCHOLAR</button>
                <button class="menu-button" onclick="window.open('https://ctl.mit.edu/about/bio/zhouqiao-bridge-zhao', '_blank')">💻 Lab Website</button>
            </div>
        `,
    },
    "gallery-area": {
        label: "PHOTO GALLERY",
        icon: "📸",
        position: { top: "400px", left: "1800px", width: "300px", height: "250px" },
        content: `
            <h2>PHOTOGRAPHY GALLERY</h2>
            <p>Capturing moments between experiments...</p>
            <div class="gallery-grid">
                <div class="gallery-thumb" onclick="showPhoto(1)"><div style="padding: 20px; color: var(--secondary);">📸<br>Star Track</div></div>
                <div class="gallery-thumb" onclick="showPhoto(2)"><div style="padding: 20px; color: var(--secondary);">🟣<br>Purple Island</div></div>
                <div class="gallery-thumb" onclick="showPhoto(3)"><div style="padding: 20px; color: var(--secondary);">🎮<br>The Game</div></div>
                <div class="gallery-thumb" onclick="showPhoto(4)"><div style="padding: 20px; color: var(--secondary);">🔴<br>Red People</div></div>
                <div class="gallery-thumb" onclick="showPhoto(5)"><div style="padding: 20px; color: var(--secondary);">🏔️<br>Grand Teton</div></div>
                <div class="gallery-thumb" onclick="showPhoto(6)"><div style="padding: 20px; color: var(--secondary);">🌌<br>Joshua Tree</div></div>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <button class="menu-button" onclick="window.open('https://www.flickr.com/photos/bridgezhao/', '_blank')">🖼️ FLICKR</button>
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
            <h2>PLAYER PROFILE</h2>
            <div style="display: flex; gap: 20px; margin: 20px 0;">
                <div style="flex: 1;">
                    <h3>STATS:</h3>
                    <ul style="line-height: 2;">
                        <li>Level: {player.level}</li>
                        <li>XP: {player.xp}/{player.xpToNextLevel}</li>
                        <li>Class: Researcher/Artist</li>
                        <li>Location: MIT, Cambridge</li>
                    </ul>
                </div>
                <div style="flex: 1;">
                    <h3>SKILLS:</h3>
                    <ul style="line-height: 2;">
                        <li>Connected and Automated Vehicle [████████░░] 80%</li>
                        <li>Human-Centered AI [█████████░] 88%</li>
                        <li>Sound and Synthesizer Design [███████░░░] 70%</li>
                        <li>Photography [██████░░░░] 60%</li>
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
                <button class="menu-button" onclick="window.open('/Zhouqiao_Zhao_Resume_2025_Jul.pdf', '_blank')">📄 DOWNLOAD CV</button>
                <button class="menu-button" onclick="window.open('https://www.linkedin.com/in/zhouqiao-zhao-60560a56/', '_blank')">💼 LINKEDIN</button>
            </div>
        `,
    },
    "contact-area": {
        label: "CONTACT PORTAL",
        icon: "✉️",
        position: { top: "1200px", left: "1100px", width: "300px", height: "150px" },
        content: `
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
                <button class="menu-button" onclick="window.open('mailto:zhouqiao@mit.edu', '_blank')">📧 EMAIL</button>
                <button class="menu-button" onclick="copyGameEmail()">📋 COPY EMAIL</button>
            </div>
        `,
    },
  },
  collectibles: [
    { type: "xp", position: { top: "700px", left: "1000px" }, icon: "⭐" },
    { type: "xp", position: { top: "300px", left: "1400px" }, icon: "⭐" },
    { type: "achievement", position: { top: "500px", left: "1200px" }, icon: "🏆" },
    { type: "powerup", position: { top: "1100px", left: "800px" }, icon: "💎" },
    { type: "powerup", position: { top: "1000px", left: "1500px" }, icon: "💍" },
  ],
};