        document.addEventListener('DOMContentLoaded', () => {
            // --- Navbar Scroll Effect ---
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // --- Smooth Scrolling for Navigation Links ---
            document.querySelectorAll('.nav-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Optional: Remove active class from all and add to clicked
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // --- Dynamic Particle Background Generation ---
            const particleBg = document.querySelector('.particle-bg');
            const numParticles = 30; // Increased for more particles
            const particleEmojis = ['🍰', '🍩', '🍪', '🍮', '🍦', '🍓', '🍵', '🍫', '🌸', '✨', '💖', '🍬', '🧁']; // Added more emojis

            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle');
                particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
                particle.style.left = `${Math.random() * 100}vw`;
                particle.style.top = `${Math.random() * 100}vh`;
                particle.style.animationDelay = `-${Math.random() * 10}s`; // Randomize start times
                particle.style.fontSize = `${Math.random() * 1 + 0.5}rem`; // Randomize size
                particle.style.opacity = `${Math.random() * 0.5 + 0.4}`; // Randomize opacity
                particleBg.appendChild(particle);
            }

            // --- Mouse Parallax Effect for Hero Section ---
            const heroSection = document.getElementById('hero');
            const heroContent = heroSection.querySelector('.hero-content');
            const floatingElements = heroSection.querySelector('.floating-elements');

            heroSection.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25; // Adjust divisor for intensity
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

                heroContent.style.transform = `translate(-${xAxis / 2}px, -${yAxis / 2}px)`; // Content moves less
                floatingElements.style.transform = `translate(${xAxis}px, ${yAxis}px)`; // Floating elements move more
            });

            heroSection.addEventListener('mouseleave', () => {
                // Reset on mouse leave
                heroContent.style.transform = `translate(0, 0)`;
                floatingElements.style.transform = `translate(0, 0)`;
            });


            // --- Newsletter Form Submission (using custom modal instead of alert) ---
            const newsletterForm = document.getElementById('newsletterForm');
            const messageModal = document.getElementById('messageModal');
            const modalMessage = messageModal.querySelector('.modal-message');
            const modalIcon = messageModal.querySelector('.modal-icon');
            const closeButton = messageModal.querySelector('.close-button');

            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent default form submission

                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value;

                if (email) {
                    // Simulate API call or data storage
                    console.log(`Subscribing email: ${email}`);
                    modalIcon.textContent = '�';
                    modalMessage.textContent = `Thank you for subscribing, ${email}! You'll receive our sweet updates soon.`;
                    emailInput.value = ''; // Clear the input field
                } else {
                    modalIcon.textContent = '⚠️';
                    modalMessage.textContent = 'Please enter a valid email address to subscribe.';
                }
                messageModal.style.display = 'flex'; // Show the modal
            });

            // Close modal when clicking on the close button
            closeButton.addEventListener('click', () => {
                messageModal.style.display = 'none';
            });

            // Close modal when clicking outside of the modal content
            window.addEventListener('click', (event) => {
                if (event.target == messageModal) {
                    messageModal.style.display = 'none';
                }
            });

            // --- Product "Add to Cart" Button (Placeholder functionality) ---
            document.querySelectorAll('.product-button').forEach(button => {
                button.addEventListener('click', function() {
                    const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
                    modalIcon.textContent = '🛒';
                    modalMessage.textContent = `${productTitle} has been added to your cart!`;
                    messageModal.style.display = 'flex'; // Show the modal
                });
            });
        });