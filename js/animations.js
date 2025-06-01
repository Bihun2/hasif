/**
 * Scroll animations using Intersection Observer API
 * This script adds reveal animations to elements when they scroll into view
 */

// Classes to add to elements when they enter the viewport
const ANIMATION_CLASSES = {
  fadeUp: 'animate-fade-up',
  fadeIn: 'animate-fade-in',
  fadeRight: 'animate-fade-right',
  fadeLeft: 'animate-fade-left',
  scaleUp: 'animate-scale-up',
  rotate: 'animate-rotate',
};

/**
 * Initialize scroll animations
 */
export function initScrollAnimations() {
  // Add necessary CSS classes to the document
  addAnimationStyles();
  
  // Setup the intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the animation type from data attribute
          const animType = entry.target.dataset.animationType || 'fadeUp';
          
          // Add the animation class
          entry.target.classList.add(ANIMATION_CLASSES[animType]);
          
          // Remove the initial hidden class
          entry.target.classList.remove('opacity-0', 'invisible');
          
          // Unobserve the element after animation is applied
          observer.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,  // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -10% 0px'  // Slightly before element enters viewport
    }
  );
  
  // Get all elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  // Set initial state and observe each element
  animatedElements.forEach((el) => {
    // Hide elements initially
    el.classList.add('opacity-0', 'invisible');
    
    // Start observing
    observer.observe(el);
  });
}

/**
 * Add animation styles to the document head
 */
function addAnimationStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* Base transition for all animations */
    [data-animate] {
      transition: transform 0.8s ease-out, opacity 0.8s ease-out;
      will-change: transform, opacity;
    }
    
    /* Fade up animation */
    .animate-fade-up {
      animation: fadeUp 0.8s ease-out forwards;
    }
    
    /* Fade in animation */
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    /* Fade right animation */
    .animate-fade-right {
      animation: fadeRight 0.8s ease-out forwards;
    }
    
    /* Fade left animation */
    .animate-fade-left {
      animation: fadeLeft 0.8s ease-out forwards;
    }
    
    /* Scale up animation */
    .animate-scale-up {
      animation: scaleUp 0.8s ease-out forwards;
    }
    
    /* Rotate animation */
    .animate-rotate {
      animation: rotate 0.8s ease-out forwards;
    }
    
    /* Keyframes for animations */
    @keyframes fadeUp {
      0% {
        opacity: 0;
        transform: translateY(2rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes fadeRight {
      0% {
        opacity: 0;
        transform: translateX(-2rem);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeLeft {
      0% {
        opacity: 0;
        transform: translateX(2rem);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleUp {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes rotate {
      0% {
        opacity: 0;
        transform: rotate(-10deg) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }
  `;
  
  document.head.appendChild(styleSheet);
}
