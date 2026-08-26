// Site metadata derived from canonical personal and research content.
import { personal } from '../content/personal.js';
import { research } from '../content/research.js';

export const siteConfig = {
  siteName: `${personal.identity.displayName} | Human-Centered AI & Transportation`,
  author: personal.identity.displayName,
  description: `${personal.currentRole.title} at ${personal.currentRole.institution} and lead of the ${research.lab.shortName}, developing human-centered AI for intelligent transportation systems.`,
  lastUpdated: "August 2026"
};
