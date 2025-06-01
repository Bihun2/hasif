/**
 * Preloader animation for the website
 * Shows a loading animation until all assets are loaded
 */

/**
 * Initialize the preloader
 */
export function initPreloader() {
  // Create preloader elements
  createPreloaderElements();
  
  // Handle the page load event
  window.addEventListener('load', () => {
    hidePreloader();
  });
  
  // Fallback in case load event doesn't fire
  setTimeout(() => {
    hidePreloader();
  }, 3000); // 3 seconds fallback
}

/**
 * Create preloader elements
 */
function createPreloaderElements() {
  // Create container
  const preloaderContainer = document.createElement('div');
  preloaderContainer.id = 'preloader';
  preloaderContainer.className = 'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary z-[9999]';
  
  // Create logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'relative text-5xl font-bold';
  
  // Create logo text
  const logoText = document.createElement('span');
  logoText.className = 'text-secondary';
  logoText.textContent = 'H';
  
  // Create dot
  const logoDot = document.createElement('span');
  logoDot.className = 'text-light';
  logoDot.textContent = '.';
  
  // Create loading bar container
  const loadingBarContainer = document.createElement('div');
  loadingBarContainer.className = 'absolute -bottom-4 left-0 w-full h-0.5 bg-text bg-opacity-30';
  
  // Create loading bar
  const loadingBar = document.createElement('div');
  loadingBar.className = 'h-full bg-secondary w-0 transition-all duration-2000';
  loadingBar.id = 'loading-bar';
  
  // Assemble elements
  logoContainer.appendChild(logoText);
  logoContainer.appendChild(logoDot);
  loadingBarContainer.appendChild(loadingBar);
  logoContainer.appendChild(loadingBarContainer);
  preloaderContainer.appendChild(logoContainer);
  
  // Add to body
  document.body.appendChild(preloaderContainer);
  
  // Animate the loading bar
  setTimeout(() => {
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '100%';
    }
  }, 100);
}

/**
 * Hide the preloader with animation
 */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  
  if (preloader) {
    // Add fade-out animation
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease-out';
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 500);
  }
}
