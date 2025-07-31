# Project Development Plan: Data Externalization & Content Management

This plan outlines the steps to complete the data externalization refactoring and prepare for dual-mode functionality. Based on code review findings, some phases need correction and completion.

## Phase 1: Create the Central Data Source ✅ COMPLETE

- [x] **Create `src/js/data.js`** with complete data structures
- [x] **Define Data Structures:**
  - **`npcs`**: Array with name, dialogue, position, sprite
  - **`areas`**: Object with areaId keys containing label, icon, position, content
  - **`collectibles`**: Array with type, position, icon
  - **`player`**: Object with initial state (x, y, speed, dimensions)
  - **`world`**: Object with width, height

## Phase 2: Refactor Game World Generation ✅ COMPLETE

- [x] **Update `src/pages/game.astro`:**
  - ✅ Import `gameData` from `src/js/data.js`
  - ✅ Dynamic rendering of NPCs using `gameData.npcs.map()`
  - ✅ Dynamic rendering of areas using `Object.entries(gameData.areas).map()`
  - ✅ Dynamic rendering of collectibles using `gameData.collectibles.map()`

- [x] **Update `src/js/engine.js`:**
  - [x] Import the `gameData` object
  - [x] Replace hardcoded `player` object initialization with `gameData.player`
  - [x] Replace hardcoded `world` object with `gameData.world`
  - [x] Ensure all initial values come from centralized data

## Phase 3: Refactor UI and Pop-up Content ✅ COMPLETE

- [x] **Update `src/js/ui.js`:**
  - [x] Import the `gameData` object
  - [x] Remove the large hardcoded `contents` object (lines 55-179)
  - [x] Modify `showAreaContent(areaId)` function to use `gameData.areas[areaId].content`
  - [x] Ensure content consistency between data source and UI rendering

- [x] **Fix Content Duplication Issue:**
  - [x] Resolve minor content differences (SoundCloud URL corrected)
  - [x] Ensure single source of truth for all area content

## Phase 4: Enhanced Content Management 🆕 NEW PRIORITY

- [ ] **Expand Data Structure for Blog Mode:**
  - [ ] Add structured data for research publications
  - [ ] Add photography metadata and descriptions
  - [ ] Add music track information and streaming links
  - [ ] Add blog post content structure

- [ ] **Update `src/pages/blog.astro`:**
  - [ ] Import and render content from `gameData`
  - [ ] Create responsive blog layout
  - [ ] Demonstrate shared content rendering between modes

## Phase 5: Code Quality & Testing ⚠️ NEEDS ATTENTION

- [ ] **Address Code Review Findings:**
  - [ ] Fix missing `gameData` imports in `engine.js` and `ui.js`
  - [ ] Resolve data source confusion (game.astro uses gameData, ui.js uses hardcoded)
  - [ ] Test that changes don't break existing functionality

- [ ] **Comprehensive Testing:**
  - [ ] Test `npm run dev` after each change
  - [ ] Test `npm run build && npm run preview` before deployment
  - [ ] Verify all interactions work correctly
  - [ ] Test mobile responsiveness

- [ ] **Deploy Updated Version:**
  - [ ] Run `npm run deploy` after testing
  - [ ] Verify live site functionality

## Phase 6: Advanced Features 🔮 FUTURE

- [ ] **Mode Switching Enhancement:**
  - [ ] Implement seamless mode transitions
  - [ ] Add user preference persistence
  - [ ] Create mode-specific styling

- [ ] **Content Expansion:**
  - [ ] Add more interactive NPCs and areas
  - [ ] Implement blog post creation workflow
  - [ ] Add photo gallery with lightbox functionality
  - [ ] Integrate music player with playlists

## Current Status ✅ DATA EXTERNALIZATION COMPLETE!

**All critical blockers have been resolved:**

1. ✅ **Fixed**: `engine.js` now uses `gameData.player` and `gameData.world`
2. ✅ **Fixed**: `ui.js` eliminates hardcoded content duplication
3. ✅ **Fixed**: All modules properly import `gameData`
4. ✅ **Fixed**: Content inconsistencies resolved (SoundCloud URL corrected)
5. ✅ **Tested**: Functionality verified with `npm run dev`, `build`, and `preview`

## Next Priority Actions

1. **Deploy Updated Version**: Run `npm run deploy` to publish centralized data architecture
2. **Begin Phase 4**: Start enhanced content management for blog mode
3. **Content Expansion**: Add structured data for publications, photos, music
4. **Blog Implementation**: Create responsive blog layout sharing game content
