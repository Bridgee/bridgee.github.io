// Shared tag variant utility
// Provides consistent tag styling based on tag content across all pages

/**
 * Get appropriate tag variant based on tag content
 * Maps core modules to colors matching the research roadmap framework
 * @param {string} tag - The tag text to analyze
 * @returns {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'subtle'} - The variant name for styling
 */
export function getTagVariant(tag) {
  // Core Modules (matching roadmap colors)
  if (tag === 'Sensing & Evaluation') return 'success';  // Green (#4CAF50)
  if (tag === 'Behavior Modeling') return 'warning';     // Red/Orange (#D84315) - matches roadmap
  if (tag === 'System Applications') return 'primary';   // Blue (#2196F3)
  
  const tagLower = tag.toLowerCase();
  
  // Research and active projects
  if (tagLower.includes('research') || tagLower.includes('active')) return 'primary';
  
  // Collaboration and industry projects
  if (tagLower.includes('collaboration') || tagLower.includes('industry')) return 'success';
  
  // Interdisciplinary and ethics topics
  if (tagLower.includes('interdisciplinary') || tagLower.includes('ethics')) return 'info';
  
  // Emerging technologies and scalability
  if (tagLower.includes('emerging') || tagLower.includes('scalability')) return 'warning';
  
  // AI and machine learning
  if (tagLower.includes('machine learning') || tagLower.includes('ai')) return 'primary';
  
  // Human-centered and behavioral topics
  if (tagLower.includes('behavioral') || tagLower.includes('human')) return 'info';
  
  // Reinforcement learning
  if (tagLower.includes('reinforcement')) return 'secondary';
  
  // Creative and audio topics
  if (tagLower.includes('audio') || tagLower.includes('creative')) return 'warning';
  
  // Default variant
  return 'default';
}
