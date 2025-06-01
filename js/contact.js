/**
 * Contact form handler
 * This script handles the submission of the contact form
 */

export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // In a real implementation, you would send this data to a server
        // For now, we'll simulate a successful submission
        
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        formStatus.classList.remove('hidden');
        formSuccess.classList.remove('hidden');
        formError.classList.add('hidden');
        
        // Reset the form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.classList.add('hidden');
          formSuccess.classList.add('hidden');
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        formStatus.classList.remove('hidden');
        formError.classList.remove('hidden');
        formSuccess.classList.add('hidden');
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          formStatus.classList.add('hidden');
          formError.classList.add('hidden');
        }, 5000);
      } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
}
