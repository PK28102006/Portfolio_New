document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const menuBtn = document.getElementById('menu-btn');
    const drawerClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const drawerLinks = document.querySelectorAll('.mobile-links a');

    function toggleDrawer(open = true) {
        if (open) {
            mobileDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        } else {
            mobileDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', () => toggleDrawer(true));
    if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    // ==========================================================================
    // 2. STICKY GLASS NAVBAR & ACTIVE NAV SPIED SCROLLING
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-menu a');
    const mobileNavLinks = document.querySelectorAll('.mobile-links a');

    function spyScroll() {
        // Sticky Navbar shrink
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Section highlighting
        const scrollY = window.pageYOffset + 200; // Offset for header

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Highlight desktop link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                // Highlight mobile link
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', spyScroll);
    spyScroll(); // Trigger initially



    // ==========================================================================
    // 4. DYNAMIC 3D HOVER TILT INTERACTION
    // ==========================================================================
    const tiltElements = document.querySelectorAll('.project-card, .skills-card-compact, .info-stat-card, .coding-dashboard');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            
            // X and Y cursor coords relative to element dimensions
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Normalize inputs between -0.5 and 0.5
            const xPercent = (x / rect.width) - 0.5;
            const yPercent = (y / rect.height) - 0.5;
            
            // Define rotation intensity (e.g. max 12 degrees)
            const rotateX = (-yPercent * 12).toFixed(2);
            const rotateY = (xPercent * 12).toFixed(2);
            
            // Apply 3D transformations and scale slightly
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'transform 0.08s ease';
        });

        el.addEventListener('mouseleave', () => {
            // Reset transforms with a smooth snap transition
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });



    // ==========================================================================
    // 6. PROJECTS GRID CATEGORY FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show matching cards with a slick fade transition
                    card.classList.remove('filtered-out');
                    card.style.animation = 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                } else {
                    // Hide non-matching cards
                    card.classList.add('filtered-out');
                }
            });
        });
    });

    // ==========================================================================
    // 7. INTERACTIVE CONTACT FORM WITH FEEDBACK MOCKUP
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = 'Sending Message... <i class="fas fa-spinner fa-spin"></i>';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            // Simulate form submission latency
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                submitBtn.innerHTML = originalBtnHtml;

                // Show dynamic success banner
                formStatus.textContent = 'Thank you! Your message was sent successfully. Poovendrakumar will get back to you shortly.';
                formStatus.className = 'form-status success';
                
                // Clear input elements
                contactForm.reset();

                // Clear success indicator after 6 seconds
                setTimeout(() => {
                    formStatus.style.animation = 'fadeIn 0.4s ease reverse';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 400);
                }, 6000);

            }, 1800);
        });
    }

    // ==========================================================================
    // 8. SCROLL REVEAL TRIGGERS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.08
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 9. TYPING HEADLINE EFFECT
    // ==========================================================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Computer Science Student", "Front-end Developer", "Programmer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2200); // Display fully typed word for a pause
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Short delay before next word starts
            } else {
                const speed = isDeleting ? 60 : 120; // Deletes faster than types
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ==========================================================================
    // ==========================================================================
    // 10. HIGH-PERFORMANCE INTERACTIVE NODE NETWORK CANVAS (REMOVED FOR CLEAN STATIC DESIGN)
    // ==========================================================================

});
