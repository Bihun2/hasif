import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { scene } from './main.js';

// Particle system variables
let particles;
const particlesCount = 3000; // Increased particle count
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
const mouseLerpFactor = 0.05; // For smooth mouse following

// Color palette from config
import config from './config.js';
const colorPrimary = new THREE.Color(config.siteConfig.theme.primary);
const colorSecondary = new THREE.Color(config.siteConfig.theme.secondary);

// Track mouse movement for interactive particles
document.addEventListener('mousemove', (event) => {
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

/**
 * Initialize the 3D background
 */
export function initBackground(scene) {
  // Create geometry for particles
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const sizes = new Float32Array(particlesCount);
  const speeds = new Float32Array(particlesCount);
  
  // Create multiple particle clusters
  const clusters = [
    { center: new THREE.Vector3(-5, 2, -10), radius: 8, particleCount: Math.floor(particlesCount * 0.4) },
    { center: new THREE.Vector3(5, -3, -15), radius: 10, particleCount: Math.floor(particlesCount * 0.3) },
    { center: new THREE.Vector3(0, 0, -5), radius: 15, particleCount: Math.floor(particlesCount * 0.3) }
  ];
  
  // Create particles with random positions in clusters
  let currentParticle = 0;
  
  // Function to create a particle in a cluster
  const createClusterParticle = (center, radius) => {
    // Create a random position within a sphere
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random()); // Cube root for uniform distribution
    
    const x = center.x + r * Math.sin(phi) * Math.cos(theta);
    const y = center.y + r * Math.sin(phi) * Math.sin(theta);
    const z = center.z + r * Math.cos(phi);
    
    return { x, y, z };
  };
  
  // Create particles for each cluster
  clusters.forEach(cluster => {
    for (let i = 0; i < cluster.particleCount && currentParticle < particlesCount; i++) {
      const { x, y, z } = createClusterParticle(cluster.center, cluster.radius);
      
      const index = currentParticle * 3;
      positions[index] = x;
      positions[index + 1] = y;
      positions[index + 2] = z;
      
      // Color - gradient between primary and secondary colors
      const mixFactor = Math.random();
      const color = new THREE.Color().lerpColors(colorPrimary, colorSecondary, mixFactor);
      
      colors[index] = color.r;
      colors[index + 1] = color.g;
      colors[index + 2] = color.b;
      
      // Size - varied with some larger particles
      sizes[currentParticle] = Math.random() > 0.95 
        ? Math.random() * 0.15 + 0.05  // Larger particles (5% of total)
        : Math.random() * 0.05 + 0.01; // Regular particles
      
      // Random speed for animation
      speeds[currentParticle] = Math.random() * 0.5 + 0.5;
      
      currentParticle++;
    }
  });
  
  // Fill any remaining particles randomly
  while (currentParticle < particlesCount) {
    const x = (Math.random() - 0.5) * 30;
    const y = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 30 - 10;
    
    const index = currentParticle * 3;
    positions[index] = x;
    positions[index + 1] = y;
    positions[index + 2] = z;
    
    // Color - using the secondary color for outliers
    const color = colorSecondary;
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
    
    // Size - smaller for distant particles
    sizes[currentParticle] = Math.random() * 0.03 + 0.01;
    
    // Speed
    speeds[currentParticle] = Math.random() * 0.3 + 0.2;
    
    currentParticle++;
  }
    // Add attributes to the geometry
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particlesGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
  
  // Create custom shader material for better looking particles
  const particlesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 200 }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      attribute float speed;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uSize;
      varying vec3 vColor;

      void main() {
        vColor = color;
        
        // Position with subtle animation
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        // Add some movement
        float movementRadius = 0.1 * speed;
        modelPosition.x += sin(uTime * speed + position.z * 100.0) * movementRadius;
        modelPosition.y += cos(uTime * speed + position.x * 100.0) * movementRadius;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        
        // Size attenuation
        gl_PointSize = size * uSize * uPixelRatio * (1.0 / - viewPosition.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Circular particle
        float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
        float strength = 1.0 - smoothstep(0.0, 0.5, distanceFromCenter);
        
        // Apply color and fade toward edges
        gl_FragColor = vec4(vColor, strength * 0.8);
        
        // Discard if transparent
        if (gl_FragColor.a < 0.05) discard;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  // Create the particle system
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
  
  // Add animation to particles
  animateParticles();
  
  return particles;
}

/**
 * Animate the particles
 */
function animateParticles() {
  requestAnimationFrame(animateParticles);
  
  if (!particles) return;
  
  // Smooth mouse movement with lerp (linear interpolation)
  mouseX += (targetMouseX - mouseX) * mouseLerpFactor;
  mouseY += (targetMouseY - mouseY) * mouseLerpFactor;
  
  // Rotate particles based on mouse position
  particles.rotation.y += 0.0002;
  particles.rotation.x += 0.0001;
  
  // Mouse influence
  const rotationInfluence = 0.05;
  const targetRotationY = mouseX * rotationInfluence;
  const targetRotationX = mouseY * rotationInfluence;
  
  // Smooth rotation towards the mouse position
  particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.02;
  particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.02;
  
  // Update time uniform for shader animation
  const material = particles.material;
  if (material.uniforms) {
    material.uniforms.uTime.value = performance.now() * 0.001;
  }
  
  // Respond to scroll position for parallax effect
  const scrollY = window.scrollY;
  const parallaxFactor = 0.0005;
  particles.position.y = scrollY * -parallaxFactor;
  
  // Effect when user scrolls
  const scrollVelocity = Math.abs(scrollY - (particles.userData.lastScrollY || 0));
  if (scrollVelocity > 10) {
    // Create a ripple effect when scrolling quickly
    const rippleStrength = Math.min(scrollVelocity * 0.01, 0.5);
    if (material.uniforms) {
      material.uniforms.uSize.value = 200 + (rippleStrength * 100);
      // Gradually return to normal size
      setTimeout(() => {
        if (material.uniforms) {
          new TWEEN.Tween(material.uniforms.uSize)
            .to({ value: 200 }, 1000)
            .easing(TWEEN.Easing.Exponential.Out)
            .start();
        }
      }, 50);
    }
  }
  
  // Store last scroll position for velocity calculation
  particles.userData.lastScrollY = scrollY;
}
