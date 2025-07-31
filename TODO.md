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

## Phase 2: Refactor Game World Generation ⚠️ PARTIALLY COMPLETE

- [x] **Update `src/pages/game.astro`:**
  - ✅ Import `gameData` from `src/js/data.js`
  - ✅ Dynamic rendering of NPCs using `gameData.npcs.map()`
  - ✅ Dynamic rendering of areas using `Object.entries(gameData.areas).map()`
  - ✅ Dynamic rendering of collectibles using `gameData.collectibles.map()`

- [ ] **🚨 CRITICAL: Update `src/js/engine.js`:**
  - [ ] Import the `gameData` object
  - [ ] Replace hardcoded `player` object initialization with `gameData.player`
  - [ ] Replace hardcoded `world` object with `gameData.world`
  - [ ] Ensure all initial values come from centralized data

## Phase 3: Refactor UI and Pop-up Content ❌ NOT STARTED

- [ ] **🚨 HIGH PRIORITY: Update `src/js/ui.js`:**
  - [ ] Import the `gameData` object
  - [ ] Remove the large hardcoded `contents` object (lines 55-179)
  - [ ] Modify `showAreaContent(areaId)` function to use `gameData.areas[areaId].content`
  - [ ] Ensure content consistency between data source and UI rendering

- [ ] **Fix Content Duplication Issue:**
  - [ ] Resolve minor content differences (e.g., commented vs active SoundCloud link)
  - [ ] Ensure single source of truth for all area content

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

## Current Blockers & Issues

1. **🚨 Critical**: `engine.js` not using `gameData` - breaks centralized data concept
2. **🚨 High**: `ui.js` has duplicate content - creates maintenance burden
3. **⚠️ Medium**: Missing imports prevent proper data flow
4. **⚠️ Low**: Minor content inconsistencies between data sources

## Next Immediate Actions

1. Fix `engine.js` to use `gameData.player` and `gameData.world`
2. Refactor `ui.js` to eliminate hardcoded content duplication
3. Test thoroughly to ensure no regressions
4. Update documentation to reflect actual implementation status
