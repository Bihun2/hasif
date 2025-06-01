# Hasif's 3D Portfolio Website

A modern, interactive portfolio website featuring Three.js animations, responsive design, and a sleek user interface. This portfolio beautifully showcases projects, experiences, and skills with impressive 3D elements that respond to user interaction.

![Portfolio Website Screenshot](./screenshots/preview.jpg)

[Live Demo](https://bihun2.github.io)

**Ported from**: [Original Portfolio](https://main.d369oltvcf67rh.amplifyapp.com/)

## Technologies Used

- **Three.js** - For 3D graphics and animations
- **Tailwind CSS** - For responsive styling
- **Vite** - For fast development and optimized builds
- **GitHub Pages** - For hosting

## Features

- Interactive 3D background and elements using Three.js
- Responsive design works on all devices (mobile, tablet, desktop)
- Smooth scroll animations and transitions
- Dark/light mode toggle
- Contact form with validation
- Social media links and floating sidebars
- Tabbed sections for work experience
- Animated project showcases

## Features

- Responsive design that works on all devices
- Interactive 3D background elements using Three.js
- Animated section transitions
- Tabbed content for experience section
- Project showcase with hover effects
- Mobile-friendly navigation
- Optimized for performance

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch.

## Project Structure

```
├── .github/workflows - GitHub Actions workflows for CI/CD
├── assets/ - Assets like 3D models
├── css/ - CSS styles
├── images/ - Project images and profile photo
├── js/ - JavaScript files
│   ├── main.js - Main entry point
│   ├── background.js - 3D background
│   ├── navigation.js - Site navigation
│   └── objects.js - 3D objects that appear on scroll
├── index.html - Main HTML file
└── package.json - Project dependencies
```

## License

MIT
