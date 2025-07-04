// DOM Elements
const slides = document.querySelectorAll('.slides');
const indicators = document.querySelectorAll('.indicator');
const cursorTrail = document.querySelector('.cursor-trail');
const dessertCards = document.querySelectorAll('.dessert-card');
const quickAddButtons = document.querySelectorAll('.quick-add');

// Global Variables
let currentSlide = 0;
let slideInterval;
let cart = [];

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeCursorTrail();
    initializeScrollAnimations();
    initializeCartSystem();
    showWelcomeMessage();
    initializeParallaxEffects();
});

// Slideshow Functionality
function initializeSlideshow() {
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 4000);
    
    // Add click listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetSlideInterval();
        });
    });
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlideDisplay();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlideDisplay();
}

function updateSlideDisplay() {
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// Cursor Trail Effect
function initializeCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    dessertCards.forEach(card => observer.observe(card));
    
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => observer.observe(header));
}

// Cart System
function initializeCartSystem() {
    quickAddButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const card = e.target.closest('.dessert-card');
    const productName = card.querySelector('h3').textContent;
    const productPrice = card.querySelector('.price').textContent;
    const productFlavor = card.dataset.flavor;
    
    const product = {
        name: productName,
        price: productPrice,
        flavor: productFlavor,
        id: Date.now() + Math.random()
    };
    
    cart.push(product);
    
    showAddToCartAnimation(e.target);
    updateCartCount();
    showCartNotification(productName);
}

function showAddToCartAnimation(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Added!';
    button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #ff6b9d, #4ecdc4)';
    }, 1500);
}

function updateCartCount() {
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');
    cartLinks.forEach(link => {
        const existingBadge = link.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        if (cart.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = cart.length;
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ff6b9d;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                animation: bounce 0.5s ease;
            `;
            link.style.position = 'relative';
            link.appendChild(badge);
        }
    });
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🛒</span>
            <span class="notification-text">${productName} added to cart!</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Welcome Message
function showWelcomeMessage() {
    setTimeout(() => {
        const welcomeModal = document.createElement('div');
        welcomeModal.className = 'welcome-modal';
        welcomeModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Welcome to Sweet Matcha! 🍃</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Discover our handcrafted desserts infused with premium matcha. Each bite is a journey of flavor and artistry!</p>
                    <div class="modal-emojis">🧁 🍩 🍦 🧇</div>
                </div>
                <div class="modal-footer">
                    <button class="modal-cta" onclick="scrollToSection('desserts'); closeWelcomeModal();">
                        Explore Our Desserts
                    </button>
                </div>
            </div>
        `;
        
        welcomeModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContentStyle = `
            background: white;
            border-radius: 25px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const modalContent = welcomeModal.querySelector('.modal-content');
        modalContent.style.cssText = modalContentStyle;
        
        document.body.appendChild(welcomeModal);
        
        setTimeout(() => {
            welcomeModal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 100);
        
        const closeBtn = welcomeModal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeWelcomeModal);
        
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                closeWelcomeModal();
            }
        });
        
        // Auto close after 10 seconds
        setTimeout(closeWelcomeModal, 10000);
    }, 2000);
}

function closeWelcomeModal() {
    const modal = document.querySelector('.welcome-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Parallax Effects
function initializeParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Card Hover Effects
dessertCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Dynamic Background Color Change
function changeBackgroundColor() {
    const colors = [
        'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #fd79a8 50%, #e17055 75%, #00b894 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #ffeaa7 50%, #fab1a0 75%, #fd79a8 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #ffeaa7 50%, #a8edea 75%, #fed6e3 100%)',
        'linear-gradient(135deg, #89f7fe 0%, #66a6ff 25%, #ff9a9e 50%, #fecfef 75%, #a8edea 100%)'
    ];
    
    let colorIndex = 0;
    setInterval(() => {
        document.body.style.background = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 20000);
}

// Initialize color changing
changeBackgroundColor();

// Performance optimization - debounce scroll events
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

// Optimized scroll handler
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Header transparency effect
    const header = document.querySelector('.glass-header');
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.25)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add some extra interactive elements
document.addEventListener('click', (e) => {
    // Create click ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,107,157,0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        animation: ripple 0.6s ease-out;
        z-index: 9999;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
});

// Add ripple animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #4a6741;
        font-size: 1.5rem;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: #ff6b9d;
    }
    
    .modal-body p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .modal-emojis {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
    
    .modal-cta {
        background: linear-gradient(45deg, #ff6b9d, #4ecdc4);
        border: none;
        color: white;
        font-weight: 600;
        padding: 1rem 2rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
    }
    
    .modal-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
    }
`;
document.head.appendChild(style);