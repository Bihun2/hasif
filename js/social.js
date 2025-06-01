/**
 * Social media floating sidebar for desktop view
 * This adds a vertical bar with social media icons that follows the scroll
 */

export function initSocialSidebar() {
  // Create the social sidebar element
  const sidebar = document.createElement('div');
  sidebar.className = 'fixed left-8 bottom-0 hidden lg:flex flex-col items-center z-30';
  sidebar.setAttribute('data-animate', '');
  sidebar.setAttribute('data-animation-type', 'fadeIn');
    // Create social links
  const socialLinks = [
    { icon: 'fa-github', url: 'https://github.com/Bihun2' },
    { icon: 'fa-linkedin-in', url: 'https://www.linkedin.com/in/hasif-aslam-84b7b9305/' },
    { icon: 'fa-whatsapp', url: 'https://wa.me/60175095708' }
  ];
  
  // Add social links to the sidebar
  const socialList = document.createElement('div');
  socialList.className = 'flex flex-col space-y-6 after:content-[""] after:block after:w-px after:h-24 after:mx-auto after:bg-text';
  
  // Create links
  socialLinks.forEach(social => {
    const link = document.createElement('a');
    link.href = social.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'text-text hover:text-secondary transition-all duration-300 transform hover:-translate-y-1';
    link.innerHTML = `<i class="fab ${social.icon} text-lg"></i>`;
    
    socialList.appendChild(link);
  });
  
  // Add social list to sidebar
  sidebar.appendChild(socialList);
  
  // Add sidebar to the body
  document.body.appendChild(sidebar);
  
  // Add email link on right side
  const emailSidebar = document.createElement('div');
  emailSidebar.className = 'fixed right-8 bottom-0 hidden lg:flex flex-col items-center z-30';
  emailSidebar.setAttribute('data-animate', '');
  emailSidebar.setAttribute('data-animation-type', 'fadeIn');
    // Create email link
  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:hasifaslam@gmail.com';
  emailLink.className = 'font-mono text-text hover:text-secondary transition-all duration-300 transform hover:-translate-y-1 tracking-wider';
  emailLink.style.writingMode = 'vertical-rl';
  emailLink.textContent = 'hasifaslam@gmail.com';
  
  // Create vertical line
  const verticalLine = document.createElement('div');
  verticalLine.className = 'w-px h-24 bg-text mt-6';
  
  // Add email link and line to the sidebar
  emailSidebar.appendChild(emailLink);
  emailSidebar.appendChild(verticalLine);
  
  // Add email sidebar to the body
  document.body.appendChild(emailSidebar);
}
