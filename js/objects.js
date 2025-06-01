import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene, camera } from './main.js';
import TWEEN from '@tweenjs/tween.js';

// 3D models and objects
let cube;
let torus;
let dodecahedron;
let particleSystem;
let codeModel;
let techSphere;

// Colors from config
import config from './config.js';
const secondaryColor = new THREE.Color(config.siteConfig.theme.secondary);

/**
 * Create floating 3D objects that appear when scrolling to specific sections
 */
export function initObjects() {
  // Create objects
  createCube();
  createTorus();
  createDodecahedron();
  createCodeModel();
  createTechSphere();
  createExperienceTimeline();
  
  // Set up scroll-triggered animations
  setupScrollTriggers();
}

/**
 * Create a floating cube for the about section
 */
function createCube() {
  // Create a group to hold the main cube and corner accents
  const cubeGroup = new THREE.Group();
  
  // Create main cube with glass-like material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(0.5),
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9, // Glass-like transparency
    thickness: 0.5,    // Glass thickness
    envMapIntensity: 1,
    transparent: true,
    opacity: 0.7
  });
  
  cube = new THREE.Mesh(geometry, material);
  cubeGroup.add(cube);
  
  // Add emissive edges
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ 
    color: secondaryColor,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  
  const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cubeGroup.add(wireframe);
  
  // Add corner accent points
  const corners = [
    [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5],
    [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5]
  ];
  
  const cornerPointGeometry = new THREE.SphereGeometry(0.06, 16, 16);
  const cornerPointMaterial = new THREE.MeshBasicMaterial({ 
    color: secondaryColor,
    transparent: true,
    opacity: 0.9
  });
  
  corners.forEach(corner => {
    const point = new THREE.Mesh(cornerPointGeometry, cornerPointMaterial);
    point.position.set(corner[0], corner[1], corner[2]);
    cubeGroup.add(point);
  });
  
  // Position the group
  cubeGroup.position.set(-5, 3, -3);
  cubeGroup.visible = false;
  scene.add(cubeGroup);
  
  cube = cubeGroup; // Assign the whole group to cube variable
  
  // Add subtle animation
  animateCube();
}

/**
 * Create a torus for the experience section
 */
function createTorus() {
  // Create a group for the torus and its particles
  const torusGroup = new THREE.Group();
  
  // Create main torus with improved geometry
  const geometry = new THREE.TorusGeometry(0.8, 0.2, 32, 100);
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(0.7),
    metalness: 0.7,
    roughness: 0.3,
    transparent: true,
    opacity: 0.7,
    emissive: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(0.3),
    emissiveIntensity: 0.5
  });
  
  const torusMesh = new THREE.Mesh(geometry, material);
  torusGroup.add(torusMesh);
  
  // Add particles orbiting the torus
  const particleCount = 50;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  
  // Create particles in a ring around the torus
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 0.8 + (Math.random() * 0.4 - 0.2);
    
    particlePositions[i * 3] = Math.sin(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() * 0.3 - 0.15);
    particlePositions[i * 3 + 2] = Math.cos(angle) * radius;
    
    particleSizes[i] = Math.random() * 0.04 + 0.01;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  
  // Create shader material for particles
  const particlesMaterial = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  torusGroup.add(particles);
  
  // Add emanating light
  const light = new THREE.PointLight(
    new THREE.Color(config.siteConfig.theme.secondary), 
    1,  // Intensity
    5   // Distance
  );
  torusGroup.add(light);
  
  // Position the group
  torusGroup.position.set(5, 0, -4);
  torusGroup.rotation.x = Math.PI / 4;
  torusGroup.visible = false;
  scene.add(torusGroup);
  
  torus = torusGroup; // Assign the whole group
  
  // Add subtle animation
  animateTorus();
}

/**
 * Create a dodecahedron for the projects section
 */
function createDodecahedron() {
  // Create a group for the complex dodecahedron
  const dodecaGroup = new THREE.Group();
  
  // Create main dodecahedron
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  
  // Create multi-layered effect with nested geometries
  const materials = [
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(config.siteConfig.theme.secondary),
      metalness: 0.5,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(1.2),
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.5,
      wireframe: true
    })
  ];
  
  // Create multiple nested dodecahedrons
  for (let i = 0; i < 3; i++) {
    const scale = 1 - (i * 0.15);
    const mesh = new THREE.Mesh(geometry, materials[i % 2]);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.set(
      i * Math.PI / 5,
      i * Math.PI / 4,
      i * Math.PI / 3
    );
    dodecaGroup.add(mesh);
  }
  
  // Add particle system orbiting the shape
  const particlesCount = 100;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particlesCount * 3);
  const particleSizes = new Float32Array(particlesCount);
  
  // Position particles in a spherical formation around the dodecahedron
  for (let i = 0; i < particlesCount; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const radius = 1.2 + Math.random() * 0.5;
    
    particlePositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    particlePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    particlePositions[i * 3 + 2] = radius * Math.cos(theta);
    
    particleSizes[i] = Math.random() * 0.04 + 0.01;
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  
  const particleMat = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particleGeo, particleMat);
  dodecaGroup.add(particles);
  
  // Add a pulsing light inside
  const light = new THREE.PointLight(
    new THREE.Color(config.siteConfig.theme.secondary), 
    1.5,  // Intensity
    5     // Distance
  );
  dodecaGroup.add(light);
  
  // Position the group
  dodecaGroup.position.set(-4, -3, -5);
  dodecaGroup.visible = false;
  scene.add(dodecaGroup);
  
  dodecahedron = dodecaGroup;
  
  // Add subtle animation
  animateDodecahedron();
}

/**
 * Create a code model that appears in the projects section
 * This creates a floating "code block" with shader effects
 */
function createCodeModel() {
  // Create a group for the code visualization
  const codeGroup = new THREE.Group();
  
  // Create the main "screen" geometry
  const screenGeometry = new THREE.PlaneGeometry(2, 1.3, 32, 32);
  
  // Create a custom shader material for the code effect
  const codeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(config.siteConfig.theme.secondary) },
      uSpeed: { value: 0.5 },
      uDensity: { value: 3.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uSpeed;
      uniform float uDensity;
      
      varying vec2 vUv;
      
      // Random function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        // Create horizontal scanlines
        float scanline = step(0.98, sin(vUv.y * 100.0 + uTime));
        
        // Create code-like blocks with animated highlights
        float yOffset = mod(uTime * uSpeed * 0.2, 1.0);
        float horizontalOffset = mod(uTime * uSpeed * 0.1, 1.0);
        
        // Generate different code blocks
        float codeBlock = 0.0;
        for(float i = 0.0; i < 10.0; i++) {
          float y = mod(vUv.y * uDensity + yOffset + i * 0.1, 1.0);
          float blockLength = random(vec2(i, 1.0)) * 0.6 + 0.1;
          float startX = random(vec2(i, 2.0)) * (1.0 - blockLength);
          float blockHeight = 0.03 + random(vec2(i, 3.0)) * 0.02;
          
          if(y < blockHeight && vUv.x > startX && vUv.x < startX + blockLength) {
            codeBlock = 1.0;
          }
        }
        
        // Add cursor blinking effect
        float cursorY = mod(yOffset * 10.0, 1.0);
        float cursorHeight = 0.04;
        float cursorX = horizontalOffset;
        float cursorWidth = 0.01;
        float cursor = 0.0;
        
        if(vUv.y > cursorY && vUv.y < cursorY + cursorHeight && 
           vUv.x > cursorX && vUv.x < cursorX + cursorWidth && 
           mod(uTime, 1.0) < 0.5) {
          cursor = 1.0;
        }
        
        // Composite the final image
        float brightness = codeBlock * 0.6 + scanline * 0.1 + cursor;
        vec3 finalColor = mix(uColor * 0.2, uColor, brightness);
        
        // Add vignette effect
        float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - vec2(0.5)));
        finalColor = mix(finalColor, finalColor * 0.3, 1.0 - vignette);
        
        gl_FragColor = vec4(finalColor, 0.8);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
  
  const screen = new THREE.Mesh(screenGeometry, codeMaterial);
  codeGroup.add(screen);
  
  // Add a frame around the screen
  const frameGeometry = new THREE.BoxGeometry(2.1, 1.4, 0.05);
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x333333,
    metalness: 0.8,
    roughness: 0.2
  });
  
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.z = -0.05;
  codeGroup.add(frame);
  
  // Position the group
  codeGroup.position.set(4, -2, -6);
  codeGroup.rotation.y = -Math.PI / 12;
  codeGroup.visible = false;
  scene.add(codeGroup);
  
  codeModel = codeGroup;
  
  // Add animation function
  animateCodeModel();
}

/**
 * Create a tech sphere for the skills section
 * This creates a sphere with animated tech-related symbols
 */
function createTechSphere() {
  // Create a group for the tech sphere visualization
  const techGroup = new THREE.Group();
  
  // Create main sphere geometry
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(0.3),
    metalness: 0.2,
    roughness: 0.5,
    transparent: true,
    transmission: 0.95,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  techGroup.add(sphere);
  
  // Create tech symbols that orbit around the sphere
  const techSymbols = [
    { symbol: '{ }', scale: 0.2 },
    { symbol: '<>', scale: 0.2 },
    { symbol: '()', scale: 0.2 },
    { symbol: '//', scale: 0.2 },
    { symbol: '[]', scale: 0.2 },
    { symbol: '#', scale: 0.2 },
    { symbol: '$', scale: 0.2 },
    { symbol: '@', scale: 0.2 },
    { symbol: '!', scale: 0.2 },
    { symbol: '*', scale: 0.2 }
  ];
  
  // We'll use primitive geometries instead of text since FontLoader requires external resources
  
  // Use a generic font since we don't have access to load external fonts
  const createTextGeometry = (text, size) => {
    const shapes = [];
    const circleGeometry = new THREE.CircleGeometry(size/2, 16);
    const circleMesh = new THREE.Mesh(circleGeometry);
    
    // Create a simple shapes arrangement to simulate text
    if(text === '{}') {
      shapes.push(new THREE.BoxGeometry(size, size, size/10));
    } else if(text === '<>') {
      shapes.push(new THREE.ConeGeometry(size/2, size, 4));
    } else {
      shapes.push(new THREE.BoxGeometry(size/2, size, size/10));
    }
    
    return shapes[0];
  };
  
  // Create symbols and position them around the sphere
  techSymbols.forEach((tech, index) => {
    const geometry = createTextGeometry(tech.symbol, tech.scale);
    const material = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.9
    });
    
    const textMesh = new THREE.Mesh(geometry, material);
    
    // Position in a spherical formation
    const phi = Math.acos(-1 + (2 * index) / techSymbols.length);
    const theta = Math.sqrt(techSymbols.length * Math.PI) * phi;
    const radius = 1.5;
    
    textMesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    textMesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
    textMesh.position.z = radius * Math.cos(phi);
    
    // Store original position for animation
    textMesh.userData.orbitRadius = radius;
    textMesh.userData.orbitSpeed = 0.2 + Math.random() * 0.3;
    textMesh.userData.orbitOffset = index * (Math.PI * 2) / techSymbols.length;
    textMesh.userData.orbitPhase = index * (Math.PI * 2) / techSymbols.length;
    
    techGroup.add(textMesh);
  });
  
  // Position the group
  techGroup.position.set(-3, 2, -7);
  techGroup.visible = false;
  scene.add(techGroup);
  
  techSphere = techGroup;
  
  // Add animation function
  animateTechSphere();
}

/**
 * Create a timeline visualization for the experience section
 */
function createExperienceTimeline() {
  // Create a group for the timeline visualization
  const timelineGroup = new THREE.Group();
  
  // Create the main timeline "track"
  const trackGeometry = new THREE.CylinderGeometry(0.02, 0.02, 6, 16);
  const trackMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(config.siteConfig.theme.secondary).multiplyScalar(0.5),
    transparent: true,
    opacity: 0.5
  });
  
  const track = new THREE.Mesh(trackGeometry, trackMaterial);
  track.rotation.x = Math.PI / 2;
  timelineGroup.add(track);
  
  // Create milestone points along the timeline
  const milestones = [
    { year: "2018", position: -2 },
    { year: "2020", position: 0 },
    { year: "2023", position: 2 }
  ];
  
  milestones.forEach((milestone, index) => {
    // Create milestone marker
    const markerGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const markerMaterial = new THREE.MeshPhysicalMaterial({
      color: secondaryColor,
      metalness: 0.7,
      roughness: 0.3,
      emissive: secondaryColor,
      emissiveIntensity: 0.5
    });
    
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.z = milestone.position;
    
    // Add light at each milestone
    const light = new THREE.PointLight(secondaryColor, 1, 2);
    light.position.z = milestone.position;
    timelineGroup.add(light);
    
    // Create year indicator
    const circleGeometry = new THREE.CircleGeometry(0.3, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(config.siteConfig.theme.primary),
      transparent: true,
      opacity: 0.8,
    });
    
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.z = milestone.position;
    circle.position.y = 0.5;
    circle.rotation.x = -Math.PI / 2;
    
    // Create a ring around the circle
    const ringGeometry = new THREE.RingGeometry(0.3, 0.35, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.z = milestone.position;
    ring.position.y = 0.5;
    ring.rotation.x = -Math.PI / 2;
    
    timelineGroup.add(marker);
    timelineGroup.add(circle);
    timelineGroup.add(ring);
  });
  
  // Position the group
  timelineGroup.position.set(0, 0, -8);
  timelineGroup.visible = false;
  scene.add(timelineGroup);
  
  particleSystem = timelineGroup;
  
  // Add animation function
  animateTimeline();
}

/**
 * Set up scroll triggers to reveal and animate 3D objects
 */
function setupScrollTriggers() {
  window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');
    
    // Show cube and tech sphere when scrolling to About section
    if (isElementInViewport(aboutSection)) {
      if (!cube.visible) {
        revealObject(cube);
        
        // Delay the tech sphere appearance for a staggered effect
        setTimeout(() => {
          if (techSphere && !techSphere.visible) {
            revealObject(techSphere);
          }
        }, 500);
      }
    }
    
    // Show torus and timeline when scrolling to Experience section
    if (isElementInViewport(experienceSection)) {
      if (!torus.visible) {
        revealObject(torus);
        
        // Delay the timeline appearance
        setTimeout(() => {
          if (particleSystem && !particleSystem.visible) {
            revealObject(particleSystem);
          }
        }, 700);
      }
    }
    
    // Show dodecahedron and code model when scrolling to Projects section
    if (isElementInViewport(projectsSection)) {
      if (!dodecahedron.visible) {
        revealObject(dodecahedron);
        
        // Delay the code model appearance
        setTimeout(() => {
          if (codeModel && !codeModel.visible) {
            revealObject(codeModel);
          }
        }, 600);
      }
    }
    
    // Show special effect when scrolling to Contact section
    if (isElementInViewport(contactSection)) {
      // Create a one-time particle burst effect when reaching the contact section
      if (contactSection.dataset.effectShown !== 'true') {
        createContactEffect();
        contactSection.dataset.effectShown = 'true';
      }
    }
  });
}

/**
 * Create a special particle burst effect for the Contact section
 */
function createContactEffect() {
  // Create a particle burst at the center of the contact section
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  const rect = contactSection.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Convert screen coordinates to 3D world coordinates
  const vector = new THREE.Vector3();
  vector.set(
    (centerX / window.innerWidth) * 2 - 1,
    - (centerY / window.innerHeight) * 2 + 1,
    0.5
  );
  
  vector.unproject(camera);
  const dir = vector.sub(camera.position).normalize();
  const distance = - camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));
  
  // Create the particle burst effect
  const particleCount = 200;
  const burstGeometry = new THREE.BufferGeometry();
  const burstPositions = new Float32Array(particleCount * 3);
  const burstSizes = new Float32Array(particleCount);
  const burstSpeeds = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // Start at center
    burstPositions[i * 3] = pos.x;
    burstPositions[i * 3 + 1] = pos.y;
    burstPositions[i * 3 + 2] = pos.z;
    
    // Random sizes
    burstSizes[i] = Math.random() * 0.04 + 0.01;
    
    // Random direction speeds
    const speed = Math.random() * 0.05 + 0.02;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    burstSpeeds[i * 3] = speed * Math.sin(theta) * Math.cos(phi);
    burstSpeeds[i * 3 + 1] = speed * Math.sin(theta) * Math.sin(phi);
    burstSpeeds[i * 3 + 2] = speed * Math.cos(theta);
  }
  
  burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
  burstGeometry.setAttribute('size', new THREE.BufferAttribute(burstSizes, 1));
  
  const burstMaterial = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const burstParticles = new THREE.Points(burstGeometry, burstMaterial);
  scene.add(burstParticles);
  
  // Animate the burst
  const animateBurst = () => {
    if (burstParticles.material.opacity <= 0) {
      scene.remove(burstParticles);
      burstGeometry.dispose();
      burstMaterial.dispose();
      return;
    }
    
    requestAnimationFrame(animateBurst);
    
    // Move particles outwards
    const positions = burstGeometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += burstSpeeds[i * 3];
      positions[i * 3 + 1] += burstSpeeds[i * 3 + 1];
      positions[i * 3 + 2] += burstSpeeds[i * 3 + 2];
    }
    
    // Fade out
    burstParticles.material.opacity -= 0.01;
    
    burstGeometry.attributes.position.needsUpdate = true;
  };
  
  animateBurst();
}

/**
 * Reveal a 3D object with impressive animation
 */
function revealObject(object) {
  object.visible = true;
  object.scale.set(0.01, 0.01, 0.01);
  object.userData.originalRotation = {
    x: object.rotation.x,
    y: object.rotation.y,
    z: object.rotation.z
  };
  
  // Add an extra initial rotation for dramatic effect
  object.rotation.x += Math.PI;
  
  // First tween: Scale up with a bounce effect
  const scaleTween = new TWEEN.Tween(object.scale)
    .to({ x: 1.2, y: 1.2, z: 1.2 }, 800)
    .easing(TWEEN.Easing.Back.Out)
    .onComplete(() => {
      // Slightly scale back for subtle bounce
      new TWEEN.Tween(object.scale)
        .to({ x: 1, y: 1, z: 1 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    });
  
  // Second tween: Restore rotation with a smooth animation
  const rotationTween = new TWEEN.Tween(object.rotation)
    .to({ 
      x: object.userData.originalRotation.x, 
      y: object.userData.originalRotation.y, 
      z: object.userData.originalRotation.z 
    }, 1200)
    .easing(TWEEN.Easing.Elastic.Out);
    
  // Create particles that burst out when the object appears
  createRevealParticles(object.position.clone());
  
  // Start tweens
  scaleTween.start();
  rotationTween.start();
  
  // Add subtle glow effect
  addTemporaryGlow(object);
}

/**
 * Create particles that burst out from an object when it's revealed
 */
function createRevealParticles(position) {
  const particleCount = 30;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  const particleSpeeds = new Float32Array(particleCount * 3);
  
  // Initialize particles at the object's position
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = position.x;
    particlePositions[i * 3 + 1] = position.y;
    particlePositions[i * 3 + 2] = position.z;
    
    particleSizes[i] = Math.random() * 0.05 + 0.02;
    
    // Random direction speeds
    const speed = Math.random() * 0.03 + 0.01;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    particleSpeeds[i * 3] = speed * Math.sin(theta) * Math.cos(phi);
    particleSpeeds[i * 3 + 1] = speed * Math.sin(theta) * Math.sin(phi);
    particleSpeeds[i * 3 + 2] = speed * Math.cos(theta);
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  
  const particleMat = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.05,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
  
  // Animate the particles
  const lifespan = 1.5; // seconds
  let elapsed = 0;
  
  const animateParticles = () => {
    if (elapsed >= lifespan) {
      scene.remove(particles);
      particleGeo.dispose();
      particleMat.dispose();
      return;
    }
    
    requestAnimationFrame(animateParticles);
    elapsed += 0.016; // Approximately 60fps
    
    // Move particles outward
    const positions = particleGeo.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particleSpeeds[i * 3];
      positions[i * 3 + 1] += particleSpeeds[i * 3 + 1];
      positions[i * 3 + 2] += particleSpeeds[i * 3 + 2];
      
      // Slow down over time
      particleSpeeds[i * 3] *= 0.98;
      particleSpeeds[i * 3 + 1] *= 0.98;
      particleSpeeds[i * 3 + 2] *= 0.98;
    }
    
    // Fade out
    particleMat.opacity = 1 - (elapsed / lifespan);
    
    particleGeo.attributes.position.needsUpdate = true;
  };
  
  animateParticles();
}

/**
 * Add a temporary glow effect to an object
 */
function addTemporaryGlow(object) {
  // Create a point light at the object's position
  const light = new THREE.PointLight(
    secondaryColor,
    2,     // intensity
    3,     // distance
    2      // decay
  );
  
  light.position.copy(object.position);
  scene.add(light);
  
  // Animate the light intensity
  const tween = new TWEEN.Tween(light)
    .to({ intensity: 0 }, 1500)
    .easing(TWEEN.Easing.Exponential.Out)
    .onComplete(() => {
      scene.remove(light);
    })
    .start();
}

/**
 * Animate the cube
 */
function animateCube() {
  if (!cube) return;
  
  requestAnimationFrame(animateCube);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

/**
 * Animate the torus
 */
function animateTorus() {
  if (!torus) return;
  
  requestAnimationFrame(animateTorus);
  
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;
}

/**
 * Animate the dodecahedron
 */
function animateDodecahedron() {
  if (!dodecahedron) return;
  
  requestAnimationFrame(animateDodecahedron);
  
  dodecahedron.rotation.x += 0.005;
  dodecahedron.rotation.y += 0.01;
  dodecahedron.rotation.z += 0.007;
}

/**
 * Animate the code model
 */
function animateCodeModel() {
  if (!codeModel) return;
  
  requestAnimationFrame(animateCodeModel);
  
  // Update shader time uniform
  const codeMaterial = codeModel.children[0].material;
  if (codeMaterial.uniforms) {
    codeMaterial.uniforms.uTime.value = performance.now() * 0.001;
  }
  
  // Subtle floating animation
  codeModel.position.y += Math.sin(performance.now() * 0.001) * 0.0005;
}

/**
 * Animate the tech sphere
 */
function animateTechSphere() {
  if (!techSphere) return;
  
  requestAnimationFrame(animateTechSphere);
  
  // Rotate the main sphere slowly
  techSphere.children[0].rotation.y += 0.002;
  techSphere.children[0].rotation.z += 0.001;
  
  // Animate orbiting symbols
  const time = performance.now() * 0.001;
  
  for (let i = 1; i < techSphere.children.length; i++) {
    const symbol = techSphere.children[i];
    const speed = symbol.userData.orbitSpeed;
    const offset = symbol.userData.orbitOffset;
    const radius = symbol.userData.orbitRadius;
    
    // Calculate new position in orbit
    symbol.position.x = radius * Math.cos(time * speed + offset);
    symbol.position.z = radius * Math.sin(time * speed + offset);
    
    // Make symbols always face the camera
    symbol.lookAt(camera.position);
  }
}

/**
 * Animate the experience timeline
 */
function animateTimeline() {
  if (!particleSystem) return;
  
  requestAnimationFrame(animateTimeline);
  
  // Rotate timeline slightly based on scroll position
  const scrollY = window.scrollY;
  const rotationFactor = 0.0001;
  
  particleSystem.rotation.z = scrollY * rotationFactor;
  
  // Pulse the milestone markers
  const time = performance.now() * 0.001;
  
  // Animate markers (spheres)
  for (let i = 0; i < particleSystem.children.length; i++) {
    const child = particleSystem.children[i];
    
    // Only animate the spherical markers (every 3rd object starting from index 3)
    if (i % 5 === 3) {
      const pulseFactor = (Math.sin(time * 2 + i) + 1) * 0.1;
      child.scale.set(
        1 + pulseFactor,
        1 + pulseFactor,
        1 + pulseFactor
      );
    }
  }
}

/**
 * Check if an element is in the viewport
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}
