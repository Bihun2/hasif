// This file loads content from the configuration into the HTML
import config from './config.js';

/**
 * Updates the page content with data from the config file
 */
function loadContent() {
  // Update meta information
  document.title = `${config.name}'s Portfolio | ${config.title}`;
  document.querySelector('meta[name="description"]').setAttribute('content', `Portfolio website of ${config.name} - ${config.title}`);
  
  // Update header
  document.querySelector('header a.text-2xl').textContent = `${config.name.charAt(0)}.`;
  
  // Update hero section
  document.querySelector('#hero h1').textContent = config.name + '.';
  document.querySelector('#hero p:last-of-type').textContent = config.description;
  
  // Update about section
  const aboutParagraphs = document.querySelectorAll('#about p:not(:last-of-type)');
  config.about.bio.forEach((text, index) => {
    if (aboutParagraphs[index]) {
      aboutParagraphs[index].textContent = text;
    }
  });
  
  // Update skills
  const skillsList = document.querySelector('#about ul.grid');
  skillsList.innerHTML = '';
  config.about.skills.forEach(skill => {
    const li = document.createElement('li');
    li.className = 'flex items-center';
    li.innerHTML = `<i class="fas fa-caret-right text-secondary mr-2"></i> ${skill}`;
    skillsList.appendChild(li);
  });
  
  // Update experience
  const tabNav = document.querySelector('.tab-nav');
  const tabContent = document.querySelector('.tab-content');
  
  // Clear existing tabs
  tabNav.innerHTML = '';
  tabContent.innerHTML = '';
  
  // Add new tabs based on config
  config.experience.forEach((job, index) => {
    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.className = `tab-btn w-full text-left pl-4 py-3 ${index === 0 ? 'active border-l-2 border-secondary -ml-0.5' : ''}`;
    tabButton.setAttribute('data-tab', `tab${index + 1}`);
    tabButton.textContent = job.company;
    tabNav.appendChild(tabButton);
    
    // Create tab panel
    const tabPanel = document.createElement('div');
    tabPanel.id = `tab${index + 1}`;
    tabPanel.className = `tab-panel ${index === 0 ? 'active' : 'hidden'}`;
    
    tabPanel.innerHTML = `
      <h3 class="text-xl font-bold mb-1">${job.position} <span class="text-secondary">@ ${job.company}</span></h3>
      <p class="text-sm text-text mb-4 font-mono">${job.period}</p>
      
      <ul class="space-y-4">
        ${job.duties.map(duty => `
          <li class="flex">
            <i class="fas fa-caret-right text-secondary mt-1.5 mr-2 flex-shrink-0"></i>
            <span>${duty}</span>
          </li>
        `).join('')}
      </ul>
    `;
    
    tabContent.appendChild(tabPanel);
  });
  
  // Add tab click event listeners
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'border-l-2', 'border-secondary', '-ml-0.5'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active', 'border-l-2', 'border-secondary', '-ml-0.5');
      document.getElementById(button.getAttribute('data-tab')).classList.remove('hidden');
    });
  });
  
  // Update projects
  const projectsContainer = document.querySelector('#projects .grid');
  projectsContainer.innerHTML = '';
  
  config.projects.forEach((project, index) => {
    const isEven = index % 2 === 0;
    const projectElement = document.createElement('div');
    projectElement.className = 'card relative overflow-hidden group';
    
    projectElement.innerHTML = `
      <div class="flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8">
        <div class="md:w-2/5 overflow-hidden rounded-lg">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        
        <div class="md:w-3/5">
          <div class="flex items-center mb-2">
            <h3 class="text-xl font-bold mr-auto">Featured Project</h3>
            <div class="flex space-x-4">
              <a href="${project.github}" class="text-light hover:text-secondary" aria-label="GitHub repository" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
              <a href="${project.demo}" class="text-light hover:text-secondary" aria-label="Live demo" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
          
          <h4 class="text-2xl font-bold mb-4">${project.title}</h4>
          <p class="mb-6">${project.description}</p>
          
          <ul class="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-text">
            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
  
  // Update social links
  const contactSocials = document.querySelector('#contact .flex.justify-center');
  contactSocials.innerHTML = '';
  
  if (config.social.github) {
    const github = document.createElement('a');
    github.href = config.social.github;
    github.className = 'text-text hover:text-secondary';
    github.setAttribute('aria-label', 'GitHub');
    github.innerHTML = '<i class="fab fa-github"></i>';
    github.target = '_blank';
    github.rel = 'noopener noreferrer';
    contactSocials.appendChild(github);
  }
  
  if (config.social.linkedin) {
    const linkedin = document.createElement('a');
    linkedin.href = config.social.linkedin;
    linkedin.className = 'text-text hover:text-secondary';
    linkedin.setAttribute('aria-label', 'LinkedIn');
    linkedin.innerHTML = '<i class="fab fa-linkedin-in"></i>';
    linkedin.target = '_blank';
    linkedin.rel = 'noopener noreferrer';
    contactSocials.appendChild(linkedin);
  }
  
  if (config.social.twitter) {
    const twitter = document.createElement('a');
    twitter.href = config.social.twitter;
    twitter.className = 'text-text hover:text-secondary';
    twitter.setAttribute('aria-label', 'Twitter');
    twitter.innerHTML = '<i class="fab fa-twitter"></i>';
    twitter.target = '_blank';
    twitter.rel = 'noopener noreferrer';
    contactSocials.appendChild(twitter);
  }
  
  if (config.social.instagram) {
    const instagram = document.createElement('a');
    instagram.href = config.social.instagram;
    instagram.className = 'text-text hover:text-secondary';
    instagram.setAttribute('aria-label', 'Instagram');
    instagram.innerHTML = '<i class="fab fa-instagram"></i>';
    instagram.target = '_blank';
    instagram.rel = 'noopener noreferrer';
    contactSocials.appendChild(instagram);
  }
  
  // Update footer
  document.querySelector('footer p:first-of-type').textContent = `Designed & Built by ${config.name}`;
  
  // Set theme colors from config
  const root = document.documentElement;
  root.style.setProperty('--color-primary', config.siteConfig.theme.primary);
  root.style.setProperty('--color-secondary', config.siteConfig.theme.secondary);
  root.style.setProperty('--color-text', config.siteConfig.theme.text);
  root.style.setProperty('--color-light', config.siteConfig.theme.light);
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', loadContent);

export default loadContent;
