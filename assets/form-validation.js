// form-validation.js

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      clearErrors();
      
      if (validateForm(contactForm)) {
        showSuccessMessage();
      }
    });
  }
  
  function validateForm(form) {
    let isValid = true;
    
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const messageField = form.querySelector('[name="message"]');
    
    if (!validateRequired(nameField)) isValid = false;
    if (!validateRequired(emailField)) isValid = false;
    if (!validateRequired(messageField)) isValid = false;
    
    if (emailField.value && !validateEmail(emailField.value)) {
      showError(emailField, 'Please enter a valid email address');
      isValid = false;
    }
    
    return isValid;
  }
  
   validateRequired(field) {
    if (!field.value.trim()) {
      showError(field, `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`);
      return false;
    }
    return true;
  }
  
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function showError(field, message) {
    // Find or create error element
    let errorElement = field.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.classList.add('error');
  }
  
  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');
    
    errorMessages.forEach(element => {
      element.parentElement.removeChild(element);
    });
    
    errorFields.forEach(field => {
      field.classList.remove('error');
    });
  }
  
  function showSuccessMessage() {
    const form = document.querySelector('.contact-form');
    form.innerHTML = '<div class="success-message">Thank you for your thoughtful message! I\'ll get back to you soon.</div>';
  }
});
