# 8-Bit Interactive Personal Website

This project is a unique, semi-professional personal website designed to showcase research, personal projects, and contact information in an engaging, 8-bit retro game format. The goal is to create a memorable and interactive user experience that stands out from traditional portfolio websites.

**Current Status**: ✅ **Deployed and Functional** - The game mode is fully operational on GitHub Pages with all core features working correctly.

The project is built with [Astro](https://astro.build/) and vanilla JavaScript, and its development has been a collaborative effort with multiple AI assistants, including Google's Gemini, OpenAI's ChatGPT, and Anthropic's Claude.

## Core Functionality

*   **Interactive Game World:** A 2400×1600px explorable world where users can navigate a player character
*   **Dual-Mode Concept:** ⚠️ Game mode complete, blog mode in development
*   **Interactive NPCs:** Non-player characters with multi-line dialogue that provide context and grant XP
*   **Explorable Areas:** Six themed zones (Home Base, Research Lab, Photo Gallery, Music Studio, About Me, Contact Portal) with detailed popup content
*   **Gamification:** Complete XP and leveling system with 10 unlockable achievements
*   **Responsive Controls:** Full support for keyboard (WASD/Arrows), mobile touch controls, and accessibility features
*   **Data-Driven Architecture:** ⚠️ Partially implemented centralized content management system

## Development Progress

### ✅ Completed Features
- **Game Engine**: Full 2D movement, camera system, collision detection
- **Interactive Systems**: NPC dialogue, area exploration, collectible items
- **UI/UX**: HUD, minimap, mobile controls, achievement notifications
- **Content Areas**: All six areas with rich popup content and external links
- **Deployment**: Successfully deployed to GitHub Pages with proper asset handling

### 🔄 In Progress
- **Data Externalization**: Migrating from hardcoded content to centralized data management
- **Content Management**: Preparing for easy content updates across both modes

### ⏳ Planned Features
- **Blog Mode**: Traditional researcher interface sharing content with game mode
- **Content Integration**: Unified data source for publications, photos, music, and blog posts
- **Enhanced Interactions**: Expanded NPC dialogues and area content

## AI-Assisted Development

This project was brought to life through a partnership with several AI models:

*   **ChatGPT & Claude:** Provided initial project planning, architectural suggestions, and helped scaffold the original single-file HTML proof-of-concept
*   **Gemini:** Was responsible for the critical task of porting the project from a single HTML file to a scalable Astro project structure, debugging complex deployment issues
*   **Claude Code:** Currently assisting with code review, data architecture refactoring, and documentation

## Key Development Learnings & Notes

The transition from a single HTML file to a modern Astro project hosted on GitHub Pages revealed several crucial technical challenges and solutions:

1.  **Astro Build vs. Dev Environments:** The most significant challenge was understanding why the site worked perfectly with `npm run dev` but failed in production. The key takeaway is that Astro's build process (`astro build`) bundles, optimizes, and renames assets, creating new paths that must be correctly configured to work on a live server.

2.  **GitHub Pages and Jekyll:** The root cause of the "plain text" website issue was the default Jekyll process on GitHub Pages. **Jekyll ignores any file or folder that begins with an underscore (`_`)**. Since Astro's compiled assets are placed in an `/_astro/` directory, they were not being served.
    *   **Solution:** Creating an empty file named `.nojekyll` in the `public` directory completely disables Jekyll, allowing all files to be served correctly. This is a critical step for any non-Jekyll site hosted on GitHub Pages.

3.  **Astro Configuration for Deployment:** The `astro.config.mjs` file is the control panel for deployment.
    *   **For a root domain (e.g., `username.github.io`):** The `site` property must be set to the root URL, and the `base` property must be omitted.
    *   **For a project page (e.g., `username.github.io/repo-name/`):** The `site` property is the root URL, and the `base` property must be set to the repository name (e.g., `"/repo-name/"`).

4.  **The `gh-pages` Deployment Workflow:** The `gh-pages` npm package is a reliable way to deploy the `dist` folder.
    *   **The `deploy` script:** A robust script in `package.json` automates the process: `"deploy": "astro build && gh-pages -d dist"`. The `&&` ensures the deployment only runs if the build is successful.
    *   **The `.dotfiles` flag:** It's good practice to include the `--dotfiles` flag (`gh-pages -d dist --dotfiles`) to ensure that files starting with a dot (like `.nojekyll`) are included in the deployment.

5.  **Windows Path Length Limit:** A `Filename too long` error during deployment was caused by Windows' default 260-character path limit.
    *   **Solution:** Running `git config --global core.longpaths true` resolves this by allowing Git to handle longer file paths.

## How to Run This Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Bridgee/Bridgee.github.io.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Bridgee.github.io/project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **To build and preview the production site locally:**
    ```bash
    npm run build
    npm run preview
    ```

## Next Steps

*   Implement the "Classic Researcher Mode."
*   Create a shared content layer (using Markdown or JSON) so that content can be rendered in both modes.
*   Add more content to the explorable areas (publications, photos, music).
*   Expand the game world with more collectibles, NPCs, and achievements.

---
*This README was generated in collaboration with Gemini-2.5-pro using Gemini CLI.*