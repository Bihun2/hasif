/**
 * Dark/Light theme toggling functionality
 * Even though the site is primarily dark-themed, this provides an option for light mode
 */

export function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.className = 'fixed right-6 top-24 z-50 bg-primary bg-opacity-80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-text border-opacity-20';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
  
  // Create toggle icon
  const toggleIcon = document.createElement('i');
  toggleIcon.className = 'fas fa-sun text-secondary';
  
  // Add icon to button
  themeToggle.appendChild(toggleIcon);
  
  // Add button to body
  document.body.appendChild(themeToggle);
  
  // Check for user preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial theme
  if (savedTheme === 'light') {
    enableLightMode();
  } else {
    enableDarkMode();
  }
  
  // Add event listener to toggle button
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark-theme')) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  });
  
  /**
   * Enable dark mode
   */
  function enableDarkMode() {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    toggleIcon.className = 'fas fa-sun text-secondary';
    localStorage.setItem('theme', 'dark');
  }
  
  /**
   * Enable light mode
   */
  function enableLightMode() {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    toggleIcon.className = 'fas fa-moon text-secondary';
    localStorage.setItem('theme', 'light');
  }
  
  // Add theme styles
  addThemeStyles();
}

/**
 * Add theme styles to document head
 */
function addThemeStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    :root {
      --color-primary: #0a192f;
      --color-secondary: #64ffda;
      --color-text: #8892b0;
      --color-light: #ccd6f6;
      --color-bg: #0a192f;
    }
    
    html {
      transition: color 0.5s, background-color 0.5s;
    }
    
    html.dark-theme {
      --color-primary: #0a192f;
      --color-secondary: #64ffda;
      --color-text: #8892b0;
      --color-light: #ccd6f6;
      --color-bg: #0a192f;
    }
    
    html.light-theme {
      --color-primary: #f6f9fc;
      --color-secondary: #007ea7;
      --color-text: #4a5568;
      --color-light: #1a202c;
      --color-bg: #f6f9fc;
    }
    
    html.light-theme body {
      background-color: var(--color-bg);
      color: var(--color-text);
    }
    
    html.light-theme h1,
    html.light-theme h2,
    html.light-theme h3,
    html.light-theme h4,
    html.light-theme h5,
    html.light-theme h6 {
      color: var(--color-light);
    }
    
    html.light-theme a {
      color: var(--color-secondary);
    }
    
    html.light-theme .card {
      background-color: var(--color-primary);
      border-color: rgba(74, 85, 104, 0.2);
    }
    
    html.light-theme .btn {
      border-color: var(--color-secondary);
      color: var(--color-secondary);
    }
    
    html.light-theme .btn:hover {
      background-color: rgba(0, 126, 167, 0.1);
    }
    
    /* Add more light theme styles as needed */
  `;
  
  document.head.appendChild(styleSheet);
}
