// Enhanced JavaScript for multi-section landing page
// Handles smooth scrolling and form UX

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced site loaded!');
    
    // Smooth scrolling for navigation links and CTA buttons
    initSmoothScrolling();
    
    // Enhanced form UX
    initFormUX();
    
    // Keep existing container animation
    initContainerAnimation();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Handle all anchor links that point to sections on the same page
    const scrollLinks = document.querySelectorAll('a[href^="#"], .cta-button, .nav-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            let targetId;
            
            // Handle different types of links
            if (href && href.startsWith('#')) {
                targetId = href;
            } else if (this.textContent.includes('Explore Features') || this.classList.contains('features-btn')) {
                targetId = '#features';
            } else if (this.textContent.includes('Get in Touch') || this.classList.contains('contact-btn')) {
                targetId = '#contact';
            }
            
            if (targetId) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Form UX enhancements
function initFormUX() {
    const contactForm = document.querySelector('#contact-form, .contact-form, form');
    
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('button[type="submit"], input[type="submit"], .submit-btn');
    const nameField = contactForm.querySelector('input[name="name"], #name');
    const emailField = contactForm.querySelector('input[name="email"], #email');
    const subjectField = contactForm.querySelector('input[name="subject"], #subject');
    const messageField = contactForm.querySelector('textarea[name="message"], #message');
    
    // Real-time validation
    if (nameField) addFieldValidation(nameField, 'Please enter your name');
    if (emailField) addEmailValidation(emailField);
    if (subjectField) addFieldValidation(subjectField, 'Please enter a subject');
    if (messageField) addFieldValidation(messageField, 'Please enter your message');
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        if (!validateForm(contactForm)) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Disable submit button and show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        // Simulate form submission (replace with actual Cloudflare form handling)
        setTimeout(() => {
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }, 1500);
    });
}

// Field validation helper
function addFieldValidation(field, errorMessage) {
    field.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showFieldError(this, errorMessage);
        } else {
            clearFieldError(this);
        }
    });
    
    field.addEventListener('input', function() {
        if (this.value.trim()) {
            clearFieldError(this);
        }
    });
}

// Email validation helper
function addEmailValidation(emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    emailField.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showFieldError(this, 'Please enter your email address');
        } else if (!emailRegex.test(this.value)) {
            showFieldError(this, 'Please enter a valid email address');
        } else {
            clearFieldError(this);
        }
    });
    
    emailField.addEventListener('input', function() {
        if (this.value.trim() && emailRegex.test(this.value)) {
            clearFieldError(this);
        }
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required], input[name="name"], input[name="email"], textarea[name="message"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
        } else if (field.type === 'email' && !emailRegex.test(field.value)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field-specific error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.style.borderColor = '#e74c3c';
    field.parentNode.appendChild(errorDiv);
}

// Clear field-specific error
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Show general message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.style.padding = '12px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.marginTop = '15px';
    messageDiv.style.fontWeight = '500';
    messageDiv.textContent = message;
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    const contactForm = document.querySelector('#contact-form, .contact-form, form');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
}

// Keep existing container animation
function initContainerAnimation() {
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        // Fade in animation
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add click interaction to the heading
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}
