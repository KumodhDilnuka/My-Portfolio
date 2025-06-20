// Mobile Navigation Toggle with enhanced accessibility
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Dark Mode Theme Toggle
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);
        
        // Set up theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            
            // Keyboard support
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button aria-label
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const newLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            themeToggle.setAttribute('aria-label', newLabel);
            themeToggle.setAttribute('title', newLabel);
        }

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a202c' : '#667eea');
        }

        console.log(`🎨 Theme switched to: ${theme}`);
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        
        // Add switching animation class for light bulb effect
        if (themeToggle) {
            themeToggle.classList.add('switching');
        }
        
        // Create light flash effect during transition
        this.createLightFlash();
        
        // Change theme after brief delay for dramatic effect
        setTimeout(() => {
            const newTheme = this.theme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            
            // Remove animation class after transition
            setTimeout(() => {
                if (themeToggle) {
                    themeToggle.classList.remove('switching');
                }
            }, 800);
        }, 150);
    }
    
    createLightFlash() {
        // Create a temporary light flash overlay
        const flash = document.createElement('div');
        flash.className = 'theme-flash';
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.theme === 'light' 
                ? 'radial-gradient(circle at center, rgba(33, 33, 33, 0.8) 0%, rgba(0, 0, 0, 0.3) 70%)' 
                : 'radial-gradient(circle at center, rgba(255, 235, 59, 0.4) 0%, rgba(255, 255, 255, 0.1) 70%)'
            };
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s ease;
        `;
        
        document.body.appendChild(flash);
        
        // Animate flash effect
        requestAnimationFrame(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(flash)) {
                        document.body.removeChild(flash);
                    }
                }, 400);
            }, 200);
        });
    }

    getTheme() {
        return this.theme;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Enhanced navigation toggle with ARIA support
function toggleNavigation() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleNavigation);

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleNavigation();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        toggleNavigation();
    }
});

// Keyboard navigation support
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNavigation();
    }
});

// Debounce function to improve performance
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

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero text
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Information Technology Undergraduate',
    'Aspiring Full-Stack Developer',
    'MERN Stack Enthusiast',
    'Database Management Expert',
    'Python & Java Developer',
    'Problem Solver & Innovator'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        currentCharIndex--;
    } else {
        currentCharIndex++;
    }
    
    typingText.textContent = currentPhrase.substring(0, currentCharIndex);
    
    let timeout = 100;
    
    if (isDeleting) {
        timeout = 50;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        timeout = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        timeout = 500;
    }
    
    setTimeout(typeAnimation, timeout);
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeAnimation, 1000);
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// Intersection Observer for animations - improved performance
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Navbar background change on scroll - throttled for better performance
const handleNavbarScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    const isScrolled = window.scrollY > 100;
    
    if (isScrolled) {
        navbar.style.background = 'var(--nav-bg-scroll)';
        navbar.style.boxShadow = 'var(--shadow)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}, 16);

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Check for successful form submission (when redirected back from Formspree)
document.addEventListener('DOMContentLoaded', function() {
    // Check if URL contains success parameter or if coming back from Formspree
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' || document.referrer.includes('formspree.io')) {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        // Clear the form if it still has data
        const form = document.getElementById('contact-form');
        if (form) {
            form.reset();
        }
        // Clean up the URL
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
    }
});

// Contact Form Handling with mailto backup
document.getElementById('contact-form').addEventListener('submit', function(event) {
    const submitBtn = document.getElementById('submit-btn');
    const form = event.target;
    
    // Get form data for validation
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        event.preventDefault();
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        event.preventDefault();
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Show notification for mailto action
    showNotification('Opening your email client...', 'info');
    
    // Let the mailto action proceed naturally
    setTimeout(() => {
        showNotification('If your email client didn\'t open, please email me directly at kumodhdilnuka285@gmail.com', 'info');
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: 'Poppins', sans-serif;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position - throttled
    const handleBackToTopScroll = throttle(() => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    }, 16);
    
    window.addEventListener('scroll', handleBackToTopScroll, { passive: true });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize back to top button
createBackToTopButton();

// Improved parallax effect for hero section - throttled and optimized
const handleParallaxScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight * 1.5) {
        // Only apply parallax effect while hero is visible
        const parallaxSpeed = scrolled * 0.3;
        hero.style.transform = `translate3d(0, ${parallaxSpeed}px, 0)`;
    }
}, 16);

// Use RAF for smoother animations
let ticking = false;
const handleParallaxRAF = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight * 1.5) {
                const parallaxSpeed = scrolled * 0.3;
                hero.style.transform = `translate3d(0, ${parallaxSpeed}px, 0)`;
            }
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', handleParallaxRAF, { passive: true });

// Active navigation link highlighting - optimized
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

const handleNavLinkScroll = throttle(updateActiveNavLink, 100);
window.addEventListener('scroll', handleNavLinkScroll, { passive: true });

// Enhanced Performance Monitoring and Loading
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
    }

    mark(label) {
        this.metrics[label] = performance.now() - this.startTime;
        console.log(`⚡ ${label}: ${this.metrics[label].toFixed(2)}ms`);
    }

    logMetrics() {
        console.table(this.metrics);
        if ('web-vitals' in window) {
            // Log Web Vitals if available
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        }
    }
}

const perfMonitor = new PerformanceMonitor();

// Enhanced Image Lazy Loading with Intersection Observer
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Apply lazy loading to images (except hero image)
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration for PWA - GitHub Pages Compatible
async function registerServiceWorker() {
    if ('serviceWorker' in navigator && 'https:' === location.protocol) {
        try {
            // Get the base path for GitHub Pages compatibility
            const basePath = window.location.pathname.replace(/\/[^\/]*$/, '') || '';
            const swPath = `${basePath}/sw.js`;
            
            const registration = await navigator.serviceWorker.register(swPath, {
                scope: `${basePath}/`
            });
            
            console.log('🔧 Service Worker registered successfully:', registration);
            
            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        console.log('🔄 New service worker available');
                        if (confirm('New version available! Reload to update?')) {
                            window.location.reload();
                        }
                    }
                });
            });
            
        } catch (error) {
            console.log('❌ Service Worker registration failed:', error);
        }
    } else if ('http:' === location.protocol) {
        console.log('⚠️ Service Worker requires HTTPS. Not registering on HTTP.');
    }
}

// Critical Resource Preloading
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
        { href: 'style.css', as: 'style' }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = () => {
                link.rel = 'stylesheet';
            };
        }
        document.head.appendChild(link);
    });
}

// Enhanced Animation Controller
class AnimationController {
    constructor() {
        this.observedElements = new Set();
        this.initializeObserver();
    }

    initializeObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    triggerAnimation(element) {
        // Add visible class for fade/slide animations
        element.classList.add('visible');

        // Handle stagger animations
        if (element.classList.contains('skill-category')) {
            const staggerItems = element.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }

        // Handle project cards stagger
        if (element.classList.contains('projects-grid')) {
            const projectCards = element.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in-up', 'visible');
                }, index * 150);
            });
        }
    }

    observe(element) {
        if (!this.observedElements.has(element)) {
            this.observer.observe(element);
            this.observedElements.add(element);
        }
    }
}

// Loading Animation Controller
function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        setTimeout(() => {
            spinner.classList.add('hidden');
            setTimeout(() => {
                spinner.remove();
            }, 500);
        }, 1000);
    }
}

// Initialize all animations and features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    perfMonitor.mark('DOM Content Loaded');

    // Prevent flash of unstyled content during theme initialization
    document.body.classList.add('no-transition');
    
    // Remove no-transition class after a brief delay
    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 100);

    // Initialize animation controller
    const animationController = new AnimationController();

    // Setup enhanced animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up').forEach(el => {
        animationController.observe(el);
    });

    // Observe skill categories for stagger effect
    document.querySelectorAll('.skill-category').forEach(category => {
        animationController.observe(category);
    });

    // Observe projects grid for stagger effect
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        animationController.observe(projectsGrid);
    }

    // Add floating animation to hero image
    const heroImage = document.querySelector('.image-placeholder');
    if (heroImage) {
        heroImage.classList.add('floating');
    }

    // Add pulse animation to social links
    document.querySelectorAll('.social-links a').forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = `pulse 2s ease-in-out infinite ${index * 0.2}s`;
        }, 2000);
    });

    // Setup lazy loading
    setupLazyLoading();
    
    // Add initial animation classes with intersection observer
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const heroContent = document.querySelector('.hero-content');
                    const heroImage = document.querySelector('.hero-image');
                    
                    if (heroContent) heroContent.classList.add('slide-in-left', 'visible');
                    if (heroImage) heroImage.classList.add('slide-in-right', 'visible');
                }, 300);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Register service worker
    registerServiceWorker();
    
    perfMonitor.mark('Initialization Complete');
});

// Performance metrics on page load
window.addEventListener('load', () => {
    perfMonitor.mark('Page Fully Loaded');
    
    // Log performance metrics after a short delay
    setTimeout(() => {
        perfMonitor.logMetrics();
        console.log('🚀 Portfolio loaded successfully with enhanced performance!');
        
        // Hide loading spinner after everything is loaded
        hideLoadingSpinner();
    }, 1000);
});

// Handle visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations and reduce activity when tab is hidden
        document.body.classList.add('hidden');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('hidden');
    }
});