document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle smooth scrolling for in-page anchors
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Update active class
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // Else let normal navigation happen for hrefs like "shop.html"
        });
    });

    // --- Dynamic Particle Background Generation ---
    const particleBg = document.querySelector('.particle-bg');
    if (particleBg) {
        const numParticles = 30;
        const particleEmojis = ['🍰', '🍩', '🍪', '🍮', '🍦', '🍓', '🍵', '🍫', '🌸', '✨', '💖', '🍬', '🧁'];

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.animationDelay = `-${Math.random() * 10}s`;
            particle.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
            particle.style.opacity = `${Math.random() * 0.5 + 0.4}`;
            particleBg.appendChild(particle);
        }
    }

    // --- Mouse Parallax Effect for Hero Section ---
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        const floatingElements = heroSection.querySelector('.floating-elements');

        if (heroContent && floatingElements) {
            heroSection.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

                heroContent.style.transform = `translate(-${xAxis / 2}px, -${yAxis / 2}px)`;
                floatingElements.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
            });

            heroSection.addEventListener('mouseleave', () => {
                heroContent.style.transform = `translate(0, 0)`;
                floatingElements.style.transform = `translate(0, 0)`;
            });
        }
    }

    // --- Newsletter Form Submission (using custom modal) ---
    const newsletterForm = document.getElementById('newsletterForm');
    const messageModal = document.getElementById('messageModal');
    
    if (newsletterForm && messageModal) {
        const modalMessage = messageModal.querySelector('.modal-message');
        const modalIcon = messageModal.querySelector('.modal-icon');
        const closeButton = messageModal.querySelector('.close-button');

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value;

            if (email && modalMessage && modalIcon) {
                // Simulate API call or data storage
                console.log(`Subscribing email: ${email}`);
                modalIcon.textContent = '🎉';
                modalMessage.textContent = `Thank you for subscribing, ${email}! You'll receive our sweet updates soon.`;
                emailInput.value = ''; // Clear the input field
            } else if (modalMessage && modalIcon) {
                modalIcon.textContent = '⚠️';
                modalMessage.textContent = 'Please enter a valid email address to subscribe.';
            }
            messageModal.style.display = 'flex';
        });

        // Close modal when clicking on the close button
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                messageModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === messageModal) {
                messageModal.style.display = 'none';
            }
        });
    }

    // --- Product "Add to Cart" Button ---
    document.querySelectorAll('.product-button').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            if (!productCard) return;

            // Get product details from data attributes
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;

            if (!productName || !productPrice) {
                console.error('Product data missing');
                return;
            }

            // Add to cart using CartManager
            const item = {
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage || '',
                category: 'featured'
            };

            // Check if addToCart function exists (from cart.js)
            if (typeof addToCart === 'function') {
                const success = addToCart(item);
                
                if (success) {
                    // Show success modal
                    const messageModal = document.getElementById('messageModal');
                    if (messageModal) {
                        const modalIcon = messageModal.querySelector('.modal-icon');
                        const modalMessage = messageModal.querySelector('.modal-message');
                        
                        if (modalIcon && modalMessage) {
                            modalIcon.textContent = '🛒';
                            modalMessage.textContent = `${productName} has been added to your cart!`;
                            messageModal.style.display = 'flex';
                        }
                    }
                }
            } else {
                console.error('addToCart function not found. Make sure cart.js is loaded.');
            }
        });
    });
});