// Digital Hub - Main JavaScript File
// Enhanced functionality with email integration

// Configuration
const CONFIG = {
    emailTarget: 'charles@stjosephsttid.ac.ke',
    emailService: 'https://formspree.io/f/YOUR_FORM_ID', // Fallback option
    emailjsServiceId: 'service_zkqz97o', // Your EmailJS service ID
    emailjsTemplateId: 'YOUR_TEMPLATE_ID', // You'll need to create a template
    animationDuration: 600,
    scrollOffset: 80
};

// DOM Elements
const elements = {
    mobileMenuBtn: null,
    mobileMenu: null,
    addProgramModal: null,
    addProgramForm: null,
    contactForm: null
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupIntersectionObserver();
    setupFormHandling();
    console.log('Digital Hub initialized successfully!');
    
    // Initialize carousel
    initializeCarousel();
    
    // Initialize hero carousel
    initializeHeroCarousel();
    
    // Initialize activity carousels
    initializeActivityCarousels();
});

// Multi-Carousel functionality for Digital Hub activities
const carousels = {
    programs: { currentSlide: 0, totalSlides: 10 },
    facilities: { currentSlide: 0, totalSlides: 8 },
    success: { currentSlide: 0, totalSlides: 8 }
};

// Auto-slide functionality for all carousels
const autoSlideIntervals = {};

function updateActivityCarousel(carouselType) {
    const carousel = carousels[carouselType];
    const carouselTrack = document.getElementById(`${carouselType}CarouselTrack`);
    const indicators = document.querySelectorAll(`#${carouselType}Carousel .carousel-indicators button`);
    
    if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${carousel.currentSlide * 100}%)`;
    }
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === carousel.currentSlide) {
            indicator.classList.add('active');
            indicator.style.backgroundColor = '#3B82F6';
        } else {
            indicator.classList.remove('active');
            indicator.style.backgroundColor = '#9CA3AF';
        }
    });
}

function nextSlideActivity(carouselType) {
    const carousel = carousels[carouselType];
    carousel.currentSlide = (carousel.currentSlide + 1) % carousel.totalSlides;
    updateActivityCarousel(carouselType);
}

function previousSlideActivity(carouselType) {
    const carousel = carousels[carouselType];
    carousel.currentSlide = (carousel.currentSlide - 1 + carousel.totalSlides) % carousel.totalSlides;
    updateActivityCarousel(carouselType);
}

function goToSlideActivity(carouselType, slideIndex) {
    const carousel = carousels[carouselType];
    carousel.currentSlide = slideIndex;
    updateActivityCarousel(carouselType);
}

// Global functions for HTML onclick handlers
function nextSlide(carouselType) {
    if (carouselType) {
        nextSlideActivity(carouselType);
    } else {
        // Original carousel functionality for backwards compatibility
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
}

function previousSlide(carouselType) {
    if (carouselType) {
        previousSlideActivity(carouselType);
    } else {
        // Original carousel functionality for backwards compatibility
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
}

function goToSlide(carouselType, slideIndex) {
    if (typeof carouselType === 'string' && typeof slideIndex === 'number') {
        goToSlideActivity(carouselType, slideIndex);
    } else {
        // Original carousel functionality for backwards compatibility
        currentSlide = carouselType; // carouselType is actually slideIndex in this case
        updateCarousel();
    }
}

// Initialize auto-slide for all activity carousels
function initializeActivityAutoSlide() {
    Object.keys(carousels).forEach(carouselType => {
        // Clear existing interval if any
        if (autoSlideIntervals[carouselType]) {
            clearInterval(autoSlideIntervals[carouselType]);
        }
        
        // Set auto-slide interval
        autoSlideIntervals[carouselType] = setInterval(() => {
            nextSlideActivity(carouselType);
        }, 7000); // Slide every 7 seconds
        
        // Pause auto-slide on hover
        const carouselContainer = document.getElementById(`${carouselType}Carousel`);
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideIntervals[carouselType]);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                autoSlideIntervals[carouselType] = setInterval(() => {
                    nextSlideActivity(carouselType);
                }, 7000);
            });
        }
    });
}

// Initialize all activity carousels on page load
function initializeActivityCarousels() {
    Object.keys(carousels).forEach(carouselType => {
        updateActivityCarousel(carouselType);
    });
    initializeActivityAutoSlide();
}

// Carousel functionality
let currentSlide = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;
let autoSlideTimer = null;

function initializeCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    indicators = document.querySelectorAll('.carousel-indicator');
    totalSlides = slides.length;

    if (totalSlides === 0) {
        console.log('No carousel found');
        return;
    }

    // Set up navigation buttons
    const nextBtn = document.querySelector('.carousel-next');
    const prevBtn = document.querySelector('.carousel-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);

    // Set up indicator buttons
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Initialize carousel
    updateCarousel();

    // Auto-advance carousel every 8 seconds
    startAutoSlide();

    // Pause auto-advance on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleCarouselKeyboard);
    
    console.log(`Carousel initialized with ${totalSlides} slides`);
}

function updateCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) return;
    
    const translateX = -currentSlide * 100;
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing timer
    if (totalSlides > 1) {
        autoSlideTimer = setInterval(nextSlide, 8000);
    }
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

function handleCarouselKeyboard(e) {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
    }
}

// Hero Carousel functionality
let heroCurrentSlide = 0;
let heroSlides = [];
let heroContentSlides = [];
let heroTotalSlides = 0;
let heroAutoSlideTimer = null;

function initializeHeroCarousel() {
    heroSlides = document.querySelectorAll('.hero-slide');
    heroContentSlides = document.querySelectorAll('.hero-content-slide');
    heroTotalSlides = heroSlides.length;

    if (heroTotalSlides === 0) {
        console.log('No hero carousel found');
        return;
    }

    // Initialize hero carousel
    updateHeroCarousel();

    // Auto-advance hero carousel every 5 seconds
    startHeroAutoSlide();

    // Pause auto-advance on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopHeroAutoSlide);
        heroCarousel.addEventListener('mouseleave', startHeroAutoSlide);
    }
    
    console.log(`Interactive hero carousel initialized with ${heroTotalSlides} slides - auto-sliding with content sync`);
}

function updateHeroCarousel() {
    // Update background slides
    heroSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === heroCurrentSlide);
    });
    
    // Update content slides with smooth transition
    heroContentSlides.forEach((contentSlide, index) => {
        contentSlide.classList.toggle('active', index === heroCurrentSlide);
    });
}

function heroCarouselNext() {
    heroCurrentSlide = (heroCurrentSlide + 1) % heroTotalSlides;
    updateHeroCarousel();
}

function startHeroAutoSlide() {
    stopHeroAutoSlide(); // Clear any existing timer
    if (heroTotalSlides > 1) {
        heroAutoSlideTimer = setInterval(heroCarouselNext, 5000); // 5 seconds per slide
    }
}

function stopHeroAutoSlide() {
    if (heroAutoSlideTimer) {
        clearInterval(heroAutoSlideTimer);
        heroAutoSlideTimer = null;
    }
}

// Initialize DOM elements
function initializeElements() {
    elements.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    elements.mobileMenu = document.getElementById('mobile-menu');
    elements.addProgramModal = document.getElementById('addProgramModal');
    elements.addProgramForm = document.getElementById('addProgramForm');
    elements.contactForm = document.querySelector('#contact form');
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Add program form submission
    if (elements.addProgramForm) {
        elements.addProgramForm.addEventListener('submit', handleAddProgram);
    }

    // Contact form submission
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactForm);
    }

    // Close modal when clicking outside
    if (elements.addProgramModal) {
        elements.addProgramModal.addEventListener('click', function(e) {
            if (e.target === elements.addProgramModal) {
                closeAddProgramModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    if (elements.mobileMenu) {
        elements.mobileMenu.classList.toggle('hidden');
        
        // Update aria-expanded for accessibility
        const isExpanded = !elements.mobileMenu.classList.contains('hidden');
        elements.mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    }
}

// Handle navigation link clicks
function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    scrollToSection(targetId);
    
    // Close mobile menu if open
    if (elements.mobileMenu && !elements.mobileMenu.classList.contains('hidden')) {
        elements.mobileMenu.classList.add('hidden');
        elements.mobileMenuBtn.setAttribute('aria-expanded', false);
    }
}

// Intersection Observer for fade-in animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger custom animation events
                entry.target.dispatchEvent(new CustomEvent('elementVisible'));
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Form handling setup
function setupFormHandling() {
    // Add form validation
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

// Input validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Clear previous validation
    clearValidationError(e);
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showValidationError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showValidationError(input, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        showValidationError(input, 'This field is required');
        return false;
    }
    
    return true;
}

// Show validation error
function showValidationError(input, message) {
    input.classList.add('border-red-500');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Clear validation error
function clearValidationError(e) {
    const input = e.target;
    input.classList.remove('border-red-500');
    
    const errorMsg = input.parentNode.querySelector('.validation-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const inputs = e.target.querySelectorAll('.form-input');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        await sendEmail(data);
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
    } catch (error) {
        console.error('Email sending failed:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Send email function
async function sendEmail(formData) {
    // Prepare email data
    const emailData = {
        to: CONFIG.emailTarget,
        subject: `New Contact Form Submission - Digital Hub`,
        message: `
New contact form submission from Digital Hub:

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Age Group: ${formData.ageGroup || 'Not specified'}

Message:
${formData.message || 'No message provided'}

Submitted on: ${new Date().toLocaleString()}
        `.trim()
    };
    
    // Method 1: Using EmailJS (recommended)
    if (typeof emailjs !== 'undefined') {
        return await sendEmailWithEmailJS(emailData, formData);
    }
    
    // Method 2: Using Formspree (fallback)
    return await sendEmailWithFormspree(formData);
}

// Send email using EmailJS
async function sendEmailWithEmailJS(emailData, formData) {
    try {
        const response = await emailjs.send(
            CONFIG.emailjsServiceId, // Using your service ID: service_zkqz97o
            CONFIG.emailjsTemplateId, // You need to create a template in EmailJS
            {
                to_email: CONFIG.emailTarget,
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                age_group: formData.ageGroup,
                message: formData.message,
                subject: 'New Contact Form Submission - Digital Hub'
            }
        );
        
        if (response.status === 200) {
            return Promise.resolve();
        } else {
            throw new Error('EmailJS failed');
        }
    } catch (error) {
        throw error;
    }
}

// Send email using Formspree (fallback)
async function sendEmailWithFormspree(formData) {
    const response = await fetch(CONFIG.emailService, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Age Group: ${formData.ageGroup}
Message: ${formData.message}
            `
        })
    });
    
    if (!response.ok) {
        throw new Error('Formspree submission failed');
    }
    
    return response.json();
}

// Add Program Modal Functions
let currentProgramType = '';

function showAddProgramModal(type) {
    currentProgramType = type;
    if (elements.addProgramModal) {
        elements.addProgramModal.classList.remove('hidden');
        elements.addProgramModal.classList.add('flex');
        
        // Focus the first input for accessibility
        const firstInput = elements.addProgramModal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeAddProgramModal() {
    if (elements.addProgramModal) {
        elements.addProgramModal.classList.add('hidden');
        elements.addProgramModal.classList.remove('flex');
        
        if (elements.addProgramForm) {
            elements.addProgramForm.reset();
        }
    }
}

// Handle add program form submission
function handleAddProgram(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('programName')?.trim();
    const description = formData.get('programDescription')?.trim();
    const emoji = formData.get('programEmoji')?.trim() || '📚';
    const level = formData.get('programLevel')?.trim();

    if (name && description && level) {
        addNewProgramCard(name, description, emoji, level, currentProgramType);
        closeAddProgramModal();
        showNotification('Program added successfully!', 'success');
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// Add new program card
function addNewProgramCard(name, description, emoji, level, type) {
    const colors = [
        'card-emerald',
        'card-violet', 
        'card-amber',
        'card-rose',
        'card-sky'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCard = document.createElement('div');
    newCard.className = `program-card ${randomColor}`;
    newCard.innerHTML = `
        <div class="text-4xl mb-4">${emoji}</div>
        <h4 class="text-2xl font-bold mb-3">${name}</h4>
        <p class="mb-4">${description}</p>
        <div class="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <span class="font-semibold">${level}</span>
        </div>
    `;

    // Add entrance animation
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(20px)';

    // Find the appropriate section and insert before the "Add New" button
    const targetSection = type === 'kids' ? 
        document.querySelector('#programs .card-grid:first-of-type') : 
        document.querySelector('#programs .card-grid:last-of-type');
    
    const addButton = targetSection?.querySelector('.bg-gray-100');
    if (targetSection && addButton) {
        targetSection.insertBefore(newCard, addButton);
        
        // Animate in
        setTimeout(() => {
            newCard.style.transition = 'all 0.5s ease';
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-black');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-2 text-lg leading-none" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 50);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        if (elements.addProgramModal && !elements.addProgramModal.classList.contains('hidden')) {
            closeAddProgramModal();
        }
    }
    
    // Navigate sections with arrow keys (when not in form fields)
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        const sections = ['home', 'programs', 'about', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    }
}

// Get current section based on scroll position
function getCurrentSection() {
    const sections = ['home', 'programs', 'about', 'contact'];
    const scrollPosition = window.scrollY + CONFIG.scrollOffset;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    
    return 'home';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.showAddProgramModal = showAddProgramModal;
window.closeAddProgramModal = closeAddProgramModal;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        showAddProgramModal,
        closeAddProgramModal,
        showNotification
    };
}
