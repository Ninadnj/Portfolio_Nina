document.addEventListener('DOMContentLoaded', () => {
    // Custom Fluid Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const cursorSpotlight = document.querySelector('[data-cursor-spotlight]');

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let spotlightX = 0;
    let spotlightY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Smooth lerp (0.1 = slow/fluid, 0.2 = faster)
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;

        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        spotlightX += (mouseX - spotlightX) * 0.05; // Very slow/fluid spotlight
        spotlightY += (mouseY - spotlightY) * 0.05;

        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
        cursorSpotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Cursor Interactions
    const interactables = document.querySelectorAll('a, button, .persona-card, .workflow-item');
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
            cursorOutline.style.borderColor = 'var(--micro-accent)';
            cursorDot.style.opacity = '0';
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--text-color)';
            cursorDot.style.opacity = '1';
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'midnight' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'midnight') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn-modern, .cta-btn, .details-link, .theme-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

    // Hover Effects on Buttons/Links for Cursor
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksNodes = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksNodes.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerText;

            btn.innerText = 'Sent!';
            btn.style.background = '#2ecc71';

            // Simulation of sending
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.background = ''; // reset to default
            }, 3000);

            alert('Thank you! I will get back to you with a solution shortly.');
        });
    }

    // Scroll Animations (Intersection Observer with Stagger)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger effect
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .portfolio-card, .workflow-grid-layout, .container > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Embedded Chat Logic
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatReset = document.getElementById('chat-reset');

    const N8N_WEBHOOK_URL = ''; // USER: Add your n8n webhook URL here

    const PERSONAS = [
        {
            id: 'receptionist',
            name: 'Receptionist',
            icon: 'fa-cut',
            desc: 'Salon booking & support',
            bootMsg: 'Hello! I am Steven Salon\'s virtual receptionist. How can I help you book today?',
            prompt: 'I want to book a haircut.'
        },
        {
            id: 'manager',
            name: 'Booking Manager',
            icon: 'fa-calendar-check',
            desc: 'Availability & scheduling',
            bootMsg: 'Booking Manager here. I can help you check slots and confirm schedules.',
            prompt: 'Check availability for Friday.'
        },
        {
            id: 'support',
            name: 'AI Support',
            icon: 'fa-headset',
            desc: 'Technical help & FAQs',
            bootMsg: 'AI Support online. Describe your issue and I will provide solutions.',
            prompt: 'How do I change my booking?'
        }
    ];

    let currentPersona = null;

    function initChat() {
        chatMessages.innerHTML = '';
        chatInput.placeholder = "Select a persona above...";
        chatInput.disabled = true;

        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'message bot';
        welcomeMsg.innerHTML = '<p>Welcome! Choose a persona to begin the live demo experience.</p>';
        chatMessages.appendChild(welcomeMsg);

        const selectionContainer = document.createElement('div');
        selectionContainer.className = 'persona-selection-container';

        PERSONAS.forEach(p => {
            const card = document.createElement('div');
            card.className = 'persona-card';
            card.innerHTML = `
                <i class="fas ${p.icon}"></i>
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
            `;
            card.onclick = () => selectPersona(p);
            selectionContainer.appendChild(card);
        });

        chatMessages.appendChild(selectionContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function selectPersona(persona) {
        currentPersona = persona;
        chatMessages.innerHTML = '';
        addMessage(persona.bootMsg, 'bot');

        chatInput.disabled = false;
        chatInput.placeholder = `Message ${persona.name}...`;
        chatInput.focus();
    }

    if (chatMessages) {
        initChat();
    }

    if (chatReset) {
        chatReset.addEventListener('click', () => {
            initChat();
            currentPersona = null;
        });
    }

    // Send Message
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message && currentPersona) {
            handleUserMessage(message);
        }
    });

    async function handleUserMessage(message) {
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        showTyping(true);

        try {
            if (N8N_WEBHOOK_URL) {
                // Real N8N Call
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message,
                        persona: currentPersona.id,
                        timestamp: new Date().toISOString()
                    })
                });
                const data = await response.json();
                showTyping(false);
                addMessage(data.output || "I've received your data via n8n!", 'bot');
            } else {
                // Simulated Reply
                setTimeout(() => {
                    showTyping(false);
                    addMessage(`I am the ${currentPersona.name} Agent. Wire me to n8n to handle this live!`, 'bot');
                }, 1500);
            }
        } catch (error) {
            console.error('N8N Error:', error);
            showTyping(false);
            addMessage("Error connecting to automation server.", 'bot');
        }
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping(show) {
        if (show) {
            typingIndicator.classList.remove('hidden');
        } else {
            typingIndicator.classList.add('hidden');
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    // Project Index Hover Reveal + interactive behavior
    const projectItems = document.querySelectorAll('.project-item');
    const hoverReveal = document.getElementById('hover-reveal');
    const hoverRevealImg = document.getElementById('hover-reveal-img');
    const demoToggle = document.getElementById('demo-mode-toggle');
    const panelOverlay = document.getElementById('project-panel-overlay');
    const panelClose = document.getElementById('project-panel-close');
    const panelTitle = document.getElementById('project-panel-title');
    const panelProblem = document.getElementById('project-panel-problem');
    const panelSolution = document.getElementById('project-panel-solution');
    const panelLive = document.getElementById('project-panel-live');
    const panelLink = document.getElementById('project-panel-link');

    let demoInterval = null;
    let activeProjectIndex = 0;

    if (projectItems.length > 0 && hoverReveal && hoverRevealImg) {
        let mouseX = 0;
        let mouseY = 0;
        let revealX = 0;
        let revealY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow logic for hover reveal
        function followMouse() {
            const ease = 0.1;
            revealX += (mouseX - revealX) * ease;
            revealY += (mouseY - revealY) * ease;

            hoverReveal.style.left = `${revealX}px`;
            hoverReveal.style.top = `${revealY}px`;

            requestAnimationFrame(followMouse);
        }
        followMouse();

        function setActiveProject(index) {
            projectItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('project-active');
                } else {
                    item.classList.remove('project-active');
                }
            });
            activeProjectIndex = index;
        }

        function openProjectPanel(item) {
            if (!panelOverlay) return;
            const title = item.dataset.title || item.querySelector('.project-title')?.textContent || '';
            const problem = item.dataset.problem || '';
            const solution = item.dataset.solution || '';
            const live = item.dataset.live || '';
            const visitLink = item.querySelector('.visit-link');

            panelTitle.textContent = title;
            panelProblem.textContent = problem;
            panelSolution.textContent = solution;
            panelLive.textContent = live;
            if (visitLink && visitLink.href) {
                panelLink.href = visitLink.href;
            }

            panelOverlay.classList.add('is-open');
            panelOverlay.setAttribute('aria-hidden', 'false');
        }

        function closeProjectPanel() {
            if (!panelOverlay) return;
            panelOverlay.classList.remove('is-open');
            panelOverlay.setAttribute('aria-hidden', 'true');
        }

        projectItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                const imgName = item.getAttribute('data-image');
                hoverRevealImg.setAttribute('data-image', imgName);

                hoverRevealImg.style.backgroundImage = '';
                // Since actual images failed generation, we rely on the [data-image] CSS gradients.

                hoverReveal.classList.add('active');
                setActiveProject(index);

                // Scale cursor
                if (cursorOutline && cursorDot) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(0)';
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                }
            });

            item.addEventListener('mouseleave', () => {
                hoverReveal.classList.remove('active');

                if (cursorOutline && cursorDot) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });

            item.addEventListener('click', (e) => {
                // Check if 'Demo Site' text/area was clicked
                if (e.target.closest('.project-action') || e.target.closest('.project-cta-inline')) {
                    const link = item.querySelector('.visit-link');
                    if (link && link.href && link.href !== '#' && !link.href.endsWith('#')) {
                        window.open(link.href, '_blank');
                        return; // Stop here, don't open panel
                    }
                }

                e.preventDefault();
                openProjectPanel(item);
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    openProjectPanel(item);
                }
            });
        });

        // Panel interactions
        if (panelOverlay) {
            panelOverlay.addEventListener('click', (e) => {
                if (e.target === panelOverlay) {
                    closeProjectPanel();
                }
            });
        }

        if (panelClose) {
            panelClose.addEventListener('click', () => {
                closeProjectPanel();
            });
        }

        // Keyboard navigation for projects & panel ESC
        window.addEventListener('keydown', (e) => {
            const key = e.key;

            if (key === 'Escape') {
                closeProjectPanel();
                return;
            }

            if (!projectItems.length) return;

            if (key === 'ArrowRight' || key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (activeProjectIndex + 1) % projectItems.length;
                setActiveProject(nextIndex);
                projectItems[nextIndex].focus();
            }

            if (key === 'ArrowLeft' || key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (activeProjectIndex - 1 + projectItems.length) % projectItems.length;
                setActiveProject(prevIndex);
                projectItems[prevIndex].focus();
            }
        });

        // Demo mode rotation
        function startDemoMode() {
            if (demoInterval || !projectItems.length) return;
            let index = 0;
            setActiveProject(index);
            demoInterval = setInterval(() => {
                index = (index + 1) % projectItems.length;
                setActiveProject(index);
                projectItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 3000);
        }

        function stopDemoMode() {
            if (demoInterval) {
                clearInterval(demoInterval);
                demoInterval = null;
            }
        }

        if (demoToggle) {
            demoToggle.addEventListener('click', () => {
                const isActive = demoToggle.getAttribute('aria-pressed') === 'true';
                const nextState = !isActive;
                demoToggle.setAttribute('aria-pressed', String(nextState));
                if (nextState) {
                    startDemoMode();
                } else {
                    stopDemoMode();
                }
            });
        }

        const projectIndexContainer = document.querySelector('.project-index');
        if (projectIndexContainer) {
            projectIndexContainer.addEventListener('mouseenter', () => {
                stopDemoMode();
            });
            projectIndexContainer.addEventListener('mouseleave', () => {
                if (demoToggle && demoToggle.getAttribute('aria-pressed') === 'true') {
                    startDemoMode();
                }
            });

            // Wheel navigation between projects (vertical timeline feel)
            projectIndexContainer.addEventListener(
                'wheel',
                (e) => {
                    if (!projectItems.length) return;
                    e.preventDefault();
                    const direction = e.deltaY > 0 ? 1 : -1;
                    const nextIndex =
                        (activeProjectIndex + direction + projectItems.length) % projectItems.length;
                    setActiveProject(nextIndex);
                    projectItems[nextIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                },
                { passive: false }
            );
        }
    }
});
