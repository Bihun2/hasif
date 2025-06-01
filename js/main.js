import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

// Import other modules
import { initBackground } from './background.js';
import { initNavigation } from './navigation.js';
import { initObjects } from './objects.js';
import { initScrollAnimations } from './animations.js';
import { initPreloader } from './preloader.js';
import { initContactForm } from './contact.js';
import { initSocialSidebar } from './social.js';
import { initThemeToggle } from './theme.js';
import loadContent from './content-loader.js';

// Initialize the scene
let scene, camera, renderer;
let animationId = null;

// Initialize the app
function init() {
  // Initialize preloader
  initPreloader();
  
  // Load content from config
  loadContent();
  
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Initialize background particles
  initBackground(scene);
  
  // Initialize 3D objects
  initObjects();
    // Initialize navigation handlers
  initNavigation();
    // Initialize scroll animations
  initScrollAnimations();
    // Initialize contact form
  initContactForm();
    // Initialize social sidebar
  initSocialSidebar();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize window resize listener
  window.addEventListener('resize', onWindowResize);
  
  // Start animation
  animate();
}

// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);
  
  // Update animations
  TWEEN.update();
  
  // Render scene
  renderer.render(scene, camera);
}

// Window resize handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for use in other modules
export { scene, camera, renderer };
