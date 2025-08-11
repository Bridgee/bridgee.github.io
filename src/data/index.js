// Unified data export - single source of truth for ALL content and config
export { publications } from './content/publications.js';
export { projects } from './content/projects.js';
export { research } from './content/research.js';
export { personal } from './content/personal.js';
export { siteConfig } from './config/site.js';
export { navigationConfig } from './config/navigation.js';
export { gameData } from './config/game.js';

// Import content for legacy support
import { publications } from './content/publications.js';
import { projects } from './content/projects.js';
import { research } from './content/research.js';
import { personal } from './content/personal.js';

// Legacy support for existing imports
export const blogData = {
  publications,
  links: personal.links,
};

export const sharedData = {
  projects,
  research,
  media: personal.media,
};