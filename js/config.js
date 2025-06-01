/**
 * Portfolio configuration file
 * Edit this file to update your portfolio information
 * Ported from the original website at localhost:5174
 */

const config = {
  // Personal information
  name: "Hasif Aslam", 
  title: "Software Engineer",
  email: "hasifaslam@gmail.com",
  description: "I'm a passionate software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products and exploring interactive 3D web applications.",
  
  // Social media links
  social: {
    github: "https://github.com/Bihun2",
    linkedin: "https://www.linkedin.com/in/hasif-aslam-84b7b9305/",
    whatsapp: "https://wa.me/60175095708",
    // Add other social media as needed
  },
  
  // Navigation
  navLinks: [
    { name: "About", url: "#about" },
    { name: "Experience", url: "#experience" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" }
  ],  // About section
  about: {
    bio: [
      "Hello! My name is Hasif and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!",
      "Fast-forward to today, and I've had the privilege of working at a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences.",
      "I'm passionate about creating interactive 3D experiences that blend technology and creativity to deliver memorable user interfaces."
    ],
    skills: [
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "TypeScript",
      "Three.js & WebGL",
      "AWS",
      "Docker",
      "MongoDB",
      "C++",
      "Python",
    ]
  },  // Experience section
  experience: [
    {
      company: "Freelance",
      position: "Software Developer",
      period: "January 2025 - Present",
      duties: [
        "Developed fullstack applications with React, Angular, NodeJS and PostgreSQL.",
        "Deploy and maintain web applications on AWS",
        "Collaborated closely with stakeholder and other developers on developing mobile apps with Flutter.",
      ]
    },
    {
      company: "Continental",
      position: "Software Engineer",
      period: "July 2018 - December 2024",
      duties: [
        "Developed new variant model into C++ automotive embedded project, allowing new car model support and added into dataset.",
        "Established automated testing using Robot Framework and Perl script to reduce time taken for integration testing on software release.",
        "Contributed to the development of the internal design system",
        "Design and maintain automated deployment pipelines using Jenkins and Python, to ensure smooth nightly delivery to customer.",
        "Utilized MSSQL to access and store dataset for variant flashing.",
        "Mentoring junior developers and conducting code reviews"
      ]
    },
    {
      company: "Mesraweb",
      position: "Intern Full Stack Developer",
      period: "September 2017 - February 2018",
      duties: [
        "Builted back-end web systems using PHP and MySQL.",
        "Enhanced user experience by refining front-end registration forms with JavaScript and Bootstrap",
        "Implemented multi-language support for web applications using XML and JSON",
      ]
    }
  ],  // Projects section
  projects: [
    {
      title: "A 3D printing marketplace",
      description: "A website built with Angular as Frontend, NodeJS as Backend, PostgreSQL as Database. Everything is currently hosted on AWS.",
      image: "./images/project1.jpg",
      technologies: ["Angular", "Node.js", "Express", "PostgreSQL", "AWS", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/Bihun2/3d-portfolio",
      demo: "https://bihun2.github.io"
    },
    {
      title: "Cooking App",
      description: "written in Flutter with Firebase Authentication and database.",
      image: "./images/project2.jpg",
      technologies: ["Flutter", "Firebase", "Dart", "Material Design"],
      github: "https://github.com/Bihun2/ecommerce-platform",
      demo: "https://ecommerce-demo.hasifaslam.com"
    },
    {
      title: "Full digital cluster dashboard",
      description: "Full digital cluster dashboard. C++ embedded project.",
      image: "./images/project3.jpg",
      technologies: ["TypeScript", "React", "Firebase", "Material UI", "Redux"],
      github: "https://github.com/Bihun2/task-management",
      demo: "https://task-app.hasifaslam.com"
    }
  ],
    // Site configuration
  siteConfig: {
    // Color theme options
    theme: {
      primary: "#121212",       // Dark background
      secondary: "#00d9ff",     // Bright cyan for accent
      text: "#a0a0a0",         // Muted text
      light: "#ffffff"         // White text
    },
    
    // Font options
    fonts: {
      sansSerif: "Inter, sans-serif",
      mono: "Fira Code, monospace"
    },
    
    // Animation settings
    animations: {
      enabled: true
    }
  }
};

export default config;
