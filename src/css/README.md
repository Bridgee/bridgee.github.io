# CSS Architecture

This directory contains all CSS files organized by mode:

## Blog Mode CSS (`blog/`)
- **`base.css`** - Foundation styles (body, typography, containers, headers)
- **`components.css`** - Component styles (cards, buttons, research sections)
- **`responsive.css`** - Responsive breakpoints (1024px, 768px, 480px)

## Game Mode CSS (`game/`)
- **`palette.css`** - GameBoy color scheme and retro fonts
- **`layout.css`** - Game layout, HUD, popups, controls
- **`sprites.css`** - 8-bit character sprites and animations

## Usage

**Blog layouts** import from `../css/blog/`:
```astro
import '../css/blog/base.css';
import '../css/blog/components.css';
import '../css/blog/responsive.css';
```

**Game layout** imports from `../css/game/`:
```astro
import '../css/game/palette.css';
import '../css/game/layout.css';
import '../css/game/sprites.css';
```