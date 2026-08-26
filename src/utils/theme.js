// Shared theme management utility
// Centralized theme toggle functionality for consistent behavior across all pages

function updateThemeButton(isDark) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  toggleBtn.setAttribute('aria-pressed', String(isDark));
}

function getSavedTheme() {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', theme);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
}

/** Toggle between dark and light themes and persist the preference. */
export function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  updateThemeButton(isDark);
  saveTheme(isDark ? 'dark' : 'light');
}

/**
 * Initialize theme based on saved preference
 * Defaults to dark mode if no preference is saved
 */
export function initializeTheme() {
  const savedTheme = getSavedTheme();
  const toggleBtn = document.getElementById('theme-toggle');

  const isDark = savedTheme !== 'light';
  document.body.classList.toggle('dark-mode', isDark);
  updateThemeButton(isDark);

  if (!savedTheme) saveTheme('dark');

  if (toggleBtn && toggleBtn.dataset.themeBound !== 'true') {
    toggleBtn.addEventListener('click', toggleTheme);
    toggleBtn.dataset.themeBound = 'true';
  }
}

// Make toggleTheme available globally for inline onclick handlers
if (typeof window !== 'undefined') {
  window.toggleTheme = toggleTheme;
}
