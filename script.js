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

    // ==========================================================================
    // ==========================================================================
    // 11. DYNAMIC CERTIFICATE LIGHTBOX MODAL (INTERNSHIP, NPTEL, SQL, IIT, SOLOLEARN, UDEMY, & GUVI)
    // ==========================================================================
    const viewCertBtn = document.getElementById('view-cert-btn');
    const nptelCertBtn = document.getElementById('nptel-cert-btn');
    const sqlCertBtn = document.getElementById('sql-cert-btn');
    const iitCertBtn = document.getElementById('iit-cert-btn');
    const sololearnCertBtn = document.getElementById('sololearn-cert-btn');
    const udemyCertBtn = document.getElementById('udemy-cert-btn');
    const guviCertBtn = document.getElementById('guvi-cert-btn');
    const certModal = document.getElementById('cert-modal');
    const certModalClose = document.getElementById('cert-modal-close');
    const certModalContent = document.getElementById('cert-modal-content');

    if (certModal && certModalContent) {
        const closeModal = () => {
            certModal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock background scrolling
            certModalContent.innerHTML = ''; // Clear container
        };

        const openCertificate = (type, source, altText, labels = []) => {
            // Check if mobile for PDF viewing
            if (type === 'pdf' && window.innerWidth <= 768) {
                window.open(source, '_blank');
                return;
            }

            // Clear container
            certModalContent.innerHTML = '';

            if (type === 'image') {
                const img = document.createElement('img');
                img.src = source;
                img.alt = altText;
                img.className = 'cert-modal-image';
                certModalContent.appendChild(img);
            } else if (type === 'pdf') {
                const iframe = document.createElement('iframe');
                iframe.src = source;
                iframe.className = 'cert-modal-pdf';
                certModalContent.appendChild(iframe);
            } else if (type === 'multi') {
                const sliderContainer = document.createElement('div');
                sliderContainer.className = 'cert-slider-container';

                const img = document.createElement('img');
                img.src = source[0];
                img.alt = altText[0];
                img.className = 'cert-slider-image';
                sliderContainer.appendChild(img);

                const controls = document.createElement('div');
                controls.className = 'cert-slider-controls';

                source.forEach((src, idx) => {
                    const btn = document.createElement('button');
                    btn.className = `cert-slider-btn ${idx === 0 ? 'active' : ''}`;
                    btn.textContent = labels[idx] || `Page ${idx + 1}`;
                    btn.addEventListener('click', () => {
                        // Smooth fade transition
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.src = src;
                            img.alt = altText[idx] || 'Certificate';
                            img.style.opacity = '1';
                        }, 200);

                        // Update active state
                        controls.querySelectorAll('.cert-slider-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    });
                    controls.appendChild(btn);
                });

                sliderContainer.appendChild(controls);
                certModalContent.appendChild(sliderContainer);
            }

            certModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        };

        if (viewCertBtn) {
            viewCertBtn.addEventListener('click', () => {
                openCertificate('image', 'Internship_certificate.jpeg', 'Full Stack MERN Internship Certificate');
            });
        }

        if (nptelCertBtn) {
            nptelCertBtn.addEventListener('click', () => {
                openCertificate('image', 'NPTEL_Certificate.png', 'Design Thinking NPTEL Certificate');
            });
        }

        if (sqlCertBtn) {
            sqlCertBtn.addEventListener('click', () => {
                openCertificate('multi', 
                    ['SQL_Basic_Certificate.png', 'SQL_Intermediate_Certificate.png'], 
                    ['SQL Basic HackerRank Certificate', 'SQL Intermediate HackerRank Certificate'],
                    ['Basic', 'Intermediate']
                );
            });
        }

        if (iitCertBtn) {
            iitCertBtn.addEventListener('click', () => {
                openCertificate('multi', 
                    ['IIT__Bombay_C.png', 'IIT_Bombay_Cpp.png'], 
                    ['IIT Bombay C Certificate', 'IIT Bombay C++ Certificate'],
                    ['C', 'C++']
                );
            });
        }

        if (sololearnCertBtn) {
            sololearnCertBtn.addEventListener('click', () => {
                openCertificate('multi', 
                    ['Solo_learn_C.jpg', 'Solo_learn_java.jpg'], 
                    ['SoloLearn C Certificate', 'SoloLearn Java Certificate'],
                    ['C', 'Java']
                );
            });
        }

        if (udemyCertBtn) {
            udemyCertBtn.addEventListener('click', () => {
                openCertificate('image', 'Data_Structures_udemy.jpg', 'Data Structures Udemy Certificate');
            });
        }

        if (guviCertBtn) {
            guviCertBtn.addEventListener('click', () => {
                openCertificate('image', 'HTML_CSS_GUVI.jpg', 'HTML & CSS GUVI Certificate');
            });
        }

        if (certModalClose) {
            certModalClose.addEventListener('click', closeModal);
        }

        // Close on overlay backdrop click
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });

        // Close on Escape keyboard key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

});

