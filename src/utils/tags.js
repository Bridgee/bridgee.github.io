// Shared tag variant utility
// Provides consistent tag styling based on tag content across all pages

/**
 * Get appropriate tag variant based on tag content
 * @param {string} tag - The tag text to analyze
 * @returns {string} - The variant name for styling
 */
export function getTagVariant(tag) {
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