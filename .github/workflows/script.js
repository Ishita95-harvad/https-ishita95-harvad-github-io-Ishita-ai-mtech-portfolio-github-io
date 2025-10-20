// Main application script
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all functionality
    initThemeSystem();
    initSmoothScrolling();
    initProjectModals();
    initLoadingStates();
    initAccessibility();
    initPerformance();
});

// Theme Management System
function initThemeSystem() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const html = document.documentElement;

    // Get saved theme or use system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme
    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeButton(theme);
        dispatchThemeChangeEvent(theme);
    };

    // Update theme button text
    const updateThemeButton = (theme) => {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i> Light Mode' 
                : '<i class="fas fa-moon"></i> Dark Mode';
        }
    };

    // Dispatch custom event for theme change
    const dispatchThemeChangeEvent = (theme) => {
        const event = new CustomEvent('themeChanged', { 
            detail: { theme } 
        });
        document.dispatchEvent(event);
    };

    // Initialize theme
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    
    if (themeToggle) {
        themeToggle.checked = preferredTheme === 'dark';
    }

    // Toggle theme on switch change
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            
            if (themeToggle) {
                themeToggle.checked = newTheme === 'dark';
            }
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            if (themeToggle) {
                themeToggle.checked = newTheme === 'dark';
            }
        }
    });
}

// Smooth Scrolling System
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.hero')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        });
    });
}

// Project Modals System
function initProjectModals() {
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Project data for modals
    const projectData = {
        'career-campus': {
            title: '📑 Career Campus',
            image: 'https://source.unsplash.com/800x400/?career,technology,office',
            description: 'Career Campus is an AI-powered HR resume analysis system that provides personalized feedback to job seekers. The system uses advanced NLP techniques to analyze resume content, structure, and keyword optimization, providing actionable insights to improve job application success rates.',
            features: [
                'Automated resume scoring and feedback system',
                'Industry-specific keyword optimization analysis',
                'ATS (Applicant Tracking System) compatibility checking',
                'Personalized improvement suggestions based on job role',
                'Real-time collaboration features for career coaches',
                'Multi-language resume support'
            ],
            technologies: ['Python', 'Firebase', 'NLP', 'LLM', 'React', 'Node.js', 'TensorFlow'],
            links: {
                demo: '#',
                github: 'https://github.com/ishita95haravad/career-campus',
                case: '#'
            }
        },
        'legal-jet': {
            title: '⚖️ Legal Jet',
            image: 'https://source.unsplash.com/800x400/?law,documents,legal',
            description: 'Legal Jet revolutionizes legal document analysis by leveraging Google\'s Gemini AI with a sophisticated RAG (Retrieval-Augmented Generation) architecture. The system can process complex legal documents, extract key information, and provide comprehensive analysis and summaries.',
            features: [
                'Automated legal document classification and categorization',
                'Key clause extraction and risk assessment',
                'Compliance checking against regulatory frameworks',
                'Natural language query interface for document search',
                'Multi-document comparison and analysis',
                'Secure document processing with encryption'
            ],
            technologies: ['Gemini AI', 'RAG', 'Python', 'NLP', 'FastAPI', 'Vector Databases', 'Docker'],
            links: {
                demo: '#',
                github: 'https://github.com/ishita95haravad/legal-jet',
                case: '#'
            }
        },
        'renewable-forecasting': {
            title: '⚡ Renewable Forecasting',
            image: 'https://source.unsplash.com/800x400/?solar,energy,wind',
            description: 'Advanced energy prediction system utilizing LSTM networks and Facebook Prophet models for accurate renewable energy source forecasting. Helps energy providers optimize grid management and resource allocation.',
            features: [
                'Multi-model forecasting with LSTM and Prophet integration',
                'Real-time weather data integration for improved accuracy',
                'Anomaly detection in energy production patterns',
                'Predictive maintenance scheduling for energy assets',
                'Dashboard for energy production visualization',
                'API for third-party system integration'
            ],
            technologies: ['LSTM', 'Prophet', 'Python', 'Time-Series', 'TensorFlow', 'Pandas', 'Matplotlib'],
            links: {
                demo: '#',
                github: 'https://github.com/ishita95haravad/renewable-forecasting',
                case: '#'
            }
        },
        'ai-chat-assistant': {
            title: '🤖 AI Chat Assistant',
            image: 'https://source.unsplash.com/800x400/?ai,chatbot,technology',
            description: 'Intelligent conversational AI assistant with custom knowledge base using RAG architecture. Provides personalized responses and can be integrated with various business systems for enhanced customer support.',
            features: [
                'Context-aware conversation management',
                'Custom knowledge base integration with RAG',
                'Multi-language support and translation',
                'Sentiment analysis for customer interactions',
                'Integration with popular messaging platforms',
                'Analytics dashboard for conversation metrics'
            ],
            technologies: ['LLM', 'RAG', 'Python', 'NLP', 'FastAPI', 'React', 'WebSockets'],
            links: {
                demo: '#',
                github: 'https://github.com/ishita95haravad/ai-chat-assistant',
                case: '#'
            }
        },
        'medical-image-analysis': {
            title: '🧬 Medical Image Analysis',
            image: 'https://source.unsplash.com/800x400/?medical,technology,health',
            description: 'Deep learning system for automated medical diagnosis with 98% accuracy using advanced CNN architectures. Assists healthcare professionals in early disease detection and diagnosis.',
            features: [
                'High-accuracy disease detection from medical images',
                'Support for multiple imaging modalities (X-ray, MRI, CT)',
                'Real-time processing for emergency cases',
                'Explainable AI with heatmap visualization',
                'HIPAA compliant data processing',
                'Integration with hospital management systems'
            ],
            technologies: ['CNN', 'PyTorch', 'Computer Vision', 'OpenCV', 'DICOM', 'TensorFlow'],
            links: {
                demo: '#',
                github: 'https://github.com/ishita95haravad/medical-image-analysis',
                case: '#'
            }
        }
    };

    // Open modal function
    const openModal = (projectId) => {
        const project = projectData[projectId];
        if (!project) return;

        const modal = createModal(project, projectId);
        document.body.appendChild(modal);
        
        // Show modal with animation
        requestAnimationFrame(() => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) closeBtn.focus();
        });

        // Add event listeners for this modal
        bindModalEvents(modal);
    };

    // Create modal HTML
    const createModal = (project, projectId) => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = `${projectId}-modal`;
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `${projectId}-title`);

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="${projectId}-title">${project.title}</h2>
                    <button class="close-btn" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${project.image}" alt="${project.title}" class="modal-image" loading="lazy">
                    <p class="modal-description">${project.description}</p>
                    
                    <div class="modal-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="modal-links">
                        <a href="${project.links.demo}" class="btn" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.links.github}" class="btn" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="${project.links.case}" class="btn" target="_blank" rel="noopener">
                            <i class="fas fa-file-alt"></i> Case Study
                        </a>
                    </div>
                </div>
            </div>
        `;

        return modal;
    };

    // Bind modal events
    const bindModalEvents = (modal) => {
        const closeBtn = modal.querySelector('.close-btn');
        
        const closeModal = () => {
            modal.style.animation = 'modalSlideOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 250);
        };

        // Close button
        closeBtn.addEventListener('click', closeModal);

        // Click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });

        // Focus trap
        trapFocus(modal);
    };

    // Focus trap for accessibility
    const trapFocus = (modal) => {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    };

    // Add click events to view project buttons
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close all modals when clicking close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: flex"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Loading States Management
function initLoadingStates() {
    // Add loading state to buttons
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn, .btn-outline')) {
            const button = e.target;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            button.classList.add('loading');
            
            // Reset after 2 seconds (simulate loading)
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('loading');
            }, 2000);
        }
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Accessibility Features
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id
    const mainContent = document.querySelector('main') || document.querySelector('.projects');
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // Enhanced focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // ARIA live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
}

// Performance Optimizations
function initPerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations
            animateOnScroll();
        }, 100);
    });

    // Preload critical images
    const criticalImages = [
        'https://github.com/ishita95haravad.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .section-title');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Utility Functions
const utils = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeSystem,
        initSmoothScrolling,
        initProjectModals,
        utils
    };
}
