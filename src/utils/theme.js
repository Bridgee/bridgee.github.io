// Shared theme management utility
// Centralized theme toggle functionality for consistent behavior across all pages

/**
 * Toggle between dark and light themes
 * Updates body class, button text, and localStorage
 */
export function toggleTheme() {
  try {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (error) {
    // Theme toggle error (silenced in production)
  }
}

/**
 * Initialize theme based on saved preference
 * Defaults to dark mode if no preference is saved
 */
export function initializeTheme() {
  try {
    // Load saved theme, defaulting to dark mode
    const savedTheme = localStorage.getItem('theme');
    const toggleBtn = document.getElementById('theme-toggle');
    
    // Default to dark mode if no preference is saved
    if (savedTheme === 'light') {
      // User explicitly chose light mode
      document.body.classList.remove('dark-mode');
      if (toggleBtn) {
        toggleBtn.textContent = '🌙 Dark';
      }
    } else {
      // Default to dark mode (savedTheme is null, undefined, or 'dark')
      document.body.classList.add('dark-mode');
      if (toggleBtn) {
        toggleBtn.textContent = '☀️ Light';
      }
      // Save the default preference
      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
    
    // Attach theme toggle event listener
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  } catch (error) {
    // Theme initialization error (silenced in production)
  }
}

// Make toggleTheme available globally for inline onclick handlers
if (typeof window !== 'undefined') {
  window.toggleTheme = toggleTheme;
}