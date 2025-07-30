# Project Refactoring: Externalize Content

This plan outlines the steps to refactor the website by moving all hard-coded content into a centralized data structure. This will make the project more scalable, maintainable, and easier to update.

## Phase 1: Create the Central Data Source

- [ ] **Create `src/js/data.js`:**
  - This file will export a single `gameData` object.
  - This object will contain all text, dialogue, and configuration for the game world.

- [ ] **Define Data Structures within `data.js`:**
  - **`npcs`:** An array of objects, where each object contains the NPC's `name`, `dialogue`, and initial position (`top`, `left`).
  - **`areas`:** An object where each key is an `areaId` (e.g., `home-area`) and the value is an object containing the `label`, `icon`, and all the HTML content for its pop-up.
  - **`collectibles`:** An array of objects for each collectible item, defining its `type` and initial position.
  - **`player`:** An object for the player's initial state (`x`, `y`, `speed`, etc.).

## Phase 2: Refactor Game World Generation

- [ ] **Update `src/pages/game.astro`:**
  - Import the `gameData` object from `src/js/data.js`.
  - Remove the hard-coded HTML for NPCs, areas, and collectibles.
  - Use Astro's template directives (`.map()`) to dynamically generate these elements by looping through the data from `gameData`.
    - Example: `gameData.npcs.map(npc => <div class="npc" ...></div>)`

## Phase 3: Refactor UI and Pop-up Content

- [ ] **Update `src/js/ui.js`:**
  - Import the `gameData` object.
  - Modify the `showAreaContent(areaId)` function.
  - Remove the large, hard-coded `contents` object.
  - Instead, retrieve the pop-up content directly from `gameData.areas[areaId].content`.

- [ ] **Update `src/js/engine.js`:**
  - Import the `gameData` object.
  - Use `gameData.player` to set the initial player state, removing the hard-coded player object.

## Phase 4: Refactor Blog Page (Demonstrate Shared Content)

- [ ] **Update `src/pages/blog.astro`:**
  - Import the `gameData` object.
  - Demonstrate how to render content from the data file, for example, by displaying a list of research projects from `gameData.areas['research-area'].projects`.

## Phase 5: Final Cleanup and Verification

- [ ] **Review all modified files** for correctness and code quality.
- [ ] **Thoroughly test** the application in both `dev` and `preview` modes to ensure all content loads and all interactions work as expected.
- [ ] **Commit and deploy** the final, refactored project.
