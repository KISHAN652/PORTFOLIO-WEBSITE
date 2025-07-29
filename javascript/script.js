/**
 * Portfolio Main Script
 * Enhanced with modern JavaScript features and best practices
 */

// DOM Elements
const DOM = {
  menuToggle: document.getElementById('menuToggle'),
  navMenu: document.getElementById('navMenu'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  body: document.body,
  navLinks: document.querySelectorAll('#navMenu ul li a'),
  themeToggle: document.querySelector('.theme-toggle'),
  contactForm: document.getElementById('contactForm'),
  currentYear: document.getElementById('currentYear'),
  scrollToTopBtn: document.createElement('button'),
  loader: document.createElement('div'),
};

// State Management
const state = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  menuOpen: false,
  lastScrollPosition: 0,
};

// Initialize the application
const init = () => {
  setupLoader();
  setCurrentYear();
  setupEventListeners();
  setupScrollToTopButton();
  initializeTheme();
  setupIntersectionObserver();
  setupFormValidation();
};

// Setup page loader
const setupLoader = () => {
  DOM.loader.className = 'page-loader';
  DOM.loader.innerHTML = `
    <div class="loader-spinner"></div>
    <p class="loader-text">Loading Portfolio...</p>
  `;
  document.body.prepend(DOM.loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      DOM.loader.style.opacity = '0';
      setTimeout(() => DOM.loader.remove(), 500);
    }, 1000);
  });
};

// Set current year in footer
const setCurrentYear = () => {
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
};

// Setup all event listeners
const setupEventListeners = () => {
  // Menu toggle
  DOM.menuToggle?.addEventListener('click', toggleMenu);
  
  // Dark mode toggle
  DOM.darkModeToggle?.addEventListener('click', toggleDarkMode);
  DOM.themeToggle?.addEventListener('click', toggleDarkMode);
  
  // Close menu when clicking on nav links
  DOM.navLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Contact form submission
  DOM.contactForm?.addEventListener('submit', handleFormSubmit);
};

// Initialize theme based on localStorage or prefers-color-scheme
const initializeTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (state.darkMode || (localStorage.getItem('darkMode') === null && prefersDark)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

// Toggle dark mode
const toggleDarkMode = () => {
  state.darkMode = !state.darkMode;
  
  if (state.darkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
  
  // Save preference to localStorage
  localStorage.setItem('darkMode', state.darkMode);
};

const enableDarkMode = () => {
  DOM.body.classList.add('dark-mode');
  DOM.body.setAttribute('data-theme', 'dark');
  DOM.darkModeToggle.textContent = '☀️';
  document.documentElement.style.colorScheme = 'dark';
};

const disableDarkMode = () => {
  DOM.body.classList.remove('dark-mode');
  DOM.body.setAttribute('data-theme', 'light');
  DOM.darkModeToggle.textContent = '🌙';
  document.documentElement.style.colorScheme = 'light';
};

// Menu functions
const toggleMenu = () => {
  state.menuOpen = !state.menuOpen;
  DOM.navMenu.classList.toggle('open', state.menuOpen);
  DOM.menuToggle.setAttribute('aria-expanded', state.menuOpen);
  DOM.menuToggle.textContent = state.menuOpen ? '✖' : '☰';
  
  // Disable scroll when menu is open
  document.body.style.overflow = state.menuOpen ? 'hidden' : '';
};

const closeMenu = () => {
  state.menuOpen = false;
  DOM.navMenu.classList.remove('open');
  DOM.menuToggle.setAttribute('aria-expanded', 'false');
  DOM.menuToggle.textContent = '☰';
  document.body.style.overflow = '';
};

// Scroll functions
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  
  // Show/hide scroll to top button
  if (currentScrollPosition > 300) {
    DOM.scrollToTopBtn.classList.add('show');
  } else {
    DOM.scrollToTopBtn.classList.remove('show');
  }
  
  // Header shadow on scroll
  if (currentScrollPosition > 50) {
    document.querySelector('header').classList.add('scrolled');
  } else {
    document.querySelector('header').classList.remove('scrolled');
  }
  
  state.lastScrollPosition = currentScrollPosition;
};

const setupScrollToTopButton = () => {
  DOM.scrollToTopBtn.className = 'scroll-to-top';
  DOM.scrollToTopBtn.innerHTML = '↑';
  DOM.scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(DOM.scrollToTopBtn);
  
  DOM.scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Intersection Observer for animations
const setupIntersectionObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
  });
};

// Form handling
const setupFormValidation = () => {
  if (!DOM.contactForm) return;
  
  const inputs = DOM.contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      if (e.target.validity.valid) {
        e.target.classList.remove('invalid');
      } else {
        e.target.classList.add('invalid');
      }
    });
  });
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Disable submit button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
    // In a real implementation, you would send the form data to a server
    // This is a mock implementation for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showToast('Message sent successfully!', 'success');
    form.reset();
  } catch (error) {
    // Show error message
    showToast('Failed to send message. Please try again.', 'error');
    console.error('Form submission error:', error);
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
};

// Toast notification system
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize the app when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
