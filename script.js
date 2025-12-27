// ============================================
// PORTFOLIO - CONSOLIDATED JAVASCRIPT
// ============================================

// ============================================
// THEME TOGGLE - Light/Dark Mode
// ============================================

function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);

  // Update toggle button icon
  updateThemeIcon(themeToggle, currentTheme);

  themeToggle.addEventListener('click', function () {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'midnight' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(themeToggle, newTheme);

    console.log('Theme switched to:', newTheme);
  });
}

function updateThemeIcon(button, theme) {
  if (theme === 'light') {
    // Show Moon icon (to switch to dark)
    button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    // Show Sun icon (to switch to light)
    button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  const cursorSpotlight = document.querySelector('[data-cursor-spotlight]');

  if (!cursorDot || !cursorOutline || !cursorSpotlight) return;

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let outlineX = 0, outlineY = 0;
  let spotlightX = 0, spotlightY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    spotlightX += (mouseX - spotlightX) * 0.05;
    spotlightY += (mouseY - spotlightY) * 0.05;

    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    cursorSpotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Cursor interactions
  const interactables = document.querySelectorAll('a, button, .demo-card, .persona-card');
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
}

// ============================================
// LIVE DEMOS - Iframe Handling
// ============================================

function handleIframeLoad(projectId) {
  const iframe = document.querySelector(`iframe[data-project="${projectId}"]`);
  const skeleton = document.getElementById(`skeleton-${projectId}`);
  const fallback = document.getElementById(`fallback-${projectId}`);

  console.log(`Iframe loaded: ${projectId}`);

  if (iframe && skeleton) {
    // Hide skeleton
    skeleton.classList.add('hidden');
    // Show iframe
    iframe.classList.add('loaded');
    iframe.style.opacity = '1';
    iframe.style.zIndex = '2';
  }

  // Make sure fallback stays hidden
  if (fallback) {
    fallback.classList.add('hidden');
  }
}

function handleIframeError(projectId) {
  const skeleton = document.getElementById(`skeleton-${projectId}`);
  const fallback = document.getElementById(`fallback-${projectId}`);
  const iframe = document.querySelector(`iframe[data-project="${projectId}"]`);

  if (skeleton && fallback && iframe) {
    skeleton.classList.add('hidden');
    iframe.style.display = 'none';
    fallback.classList.remove('hidden');
  }
}

function scrollToCaseNotes(projectId) {
  const caseNotes = document.getElementById(`notes-${projectId}`);

  if (caseNotes) {
    const isHidden = caseNotes.classList.contains('hidden');

    if (isHidden) {
      caseNotes.classList.remove('hidden');
      setTimeout(() => {
        caseNotes.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      caseNotes.classList.add('hidden');
    }
  }
}

function initLiveDemos() {
  // Preview toggle
  const previewToggle = document.getElementById('previewToggle');
  if (previewToggle) {
    const toggleOptions = previewToggle.querySelectorAll('.toggle-option');
    const previewContainers = document.querySelectorAll('.demo-preview-container');

    toggleOptions.forEach(option => {
      option.addEventListener('click', function () {
        const mode = this.getAttribute('data-mode');
        toggleOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        previewContainers.forEach(container => {
          container.classList.remove('desktop-mode', 'mobile-mode');
          container.classList.add(`${mode}-mode`);
        });
      });
    });
  }

  // DISABLED: Auto-detection was hiding working iframes
  // // Check for blocked iframes
  //   const iframes = document.querySelectorAll('.demo-iframe');
  //   iframes.forEach(iframe => {
  //     const projectId = iframe.getAttribute('data-project');
  //     setTimeout(() => {
  //       try {
  //         const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  //         if (!iframe.classList.contains('loaded')) {
  //           if (iframe.contentWindow.length === 0) {
  //             handleIframeError(projectId);
  //           }
  //         }
  //       } catch (e) {
  //         handleIframeError(projectId);
  //       }
  //     }, 5000);
  //   });
}

// ============================================
// CHATBOT - Beauty Salon Assistant
// ============================================

const SALON_ASSISTANT = {
  name: "Beauty Salon Assistant",
  responses: {
    greeting: [
      "Hello! Welcome to our salon. How can I assist you today?",
      "Hi there! I'm here to help with any questions about our services.",
      "Welcome! What would you like to know about our salon?"
    ],
    booking: [
      "I'd be happy to help you book an appointment! We have availability throughout the week. What day works best for you?",
      "Great! Let me help you schedule that. What service are you interested in?",
      "Perfect! I can check our calendar. What time of day do you prefer?"
    ],
    services: [
      "We offer haircuts, coloring, styling, treatments, and spa services. Which one interests you?",
      "Our most popular services are haircuts, highlights, balayage, and keratin treatments. Would you like details on any of these?",
      "We have a full range of hair and beauty services. What are you looking for specifically?"
    ],
    pricing: [
      "Our haircut prices start at $50, coloring from $80, and treatments from $60. Prices vary based on hair length and service complexity.",
      "I can provide pricing information! What service are you interested in?",
      "Our pricing is competitive and varies by service. Would you like a detailed price list?"
    ],
    hours: [
      "We're open Monday-Saturday 9am-7pm, and Sunday 10am-5pm.",
      "Our salon hours are 9am-7pm on weekdays, and 10am-5pm on Sundays. We're closed on major holidays.",
      "You can visit us Monday through Saturday 9am-7pm, or Sunday 10am-5pm."
    ],
    default: [
      "I'm here to help! You can ask me about booking appointments, our services, pricing, or opening hours.",
      "That's a great question! For detailed information, feel free to call us or visit in person. Is there anything else I can help with?",
      "I'd be happy to assist! What would you like to know about our salon services?"
    ]
  }
};

function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const typingIndicator = document.getElementById('typingIndicator');

  if (!input || !chatBody) return;

  const message = input.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);

  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Show typing indicator
  if (typingIndicator) {
    typingIndicator.classList.remove('hidden');
  }

  // Bot response
  setTimeout(() => {
    if (typingIndicator) {
      typingIndicator.classList.add('hidden');
    }

    const response = generateResponse(message);
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = response;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

function generateResponse(message) {
  const msg = message.toLowerCase();

  if (msg.match(/hello|hi|hey|good morning|good afternoon/)) {
    return getRandomResponse(SALON_ASSISTANT.responses.greeting);
  }
  if (msg.match(/book|appointment|schedule|reservation/)) {
    return getRandomResponse(SALON_ASSISTANT.responses.booking);
  }
  if (msg.match(/service|haircut|color|treatment|what do you/)) {
    return getRandomResponse(SALON_ASSISTANT.responses.services);
  }
  if (msg.match(/price|cost|how much|pricing/)) {
    return getRandomResponse(SALON_ASSISTANT.responses.pricing);
  }
  if (msg.match(/hours|open|when|time/)) {
    return getRandomResponse(SALON_ASSISTANT.responses.hours);
  }
  if (msg.match(/thank|thanks/)) {
    return "You're welcome! Let me know if you need anything else. 😊";
  }

  return getRandomResponse(SALON_ASSISTANT.responses.default);
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function resetChat() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) {
    chatBody.innerHTML = `
      <div class="message bot">
        👋 Hi! I'm your Beauty Salon Assistant. I can help you with:
        <br>• Booking appointments
        <br>• Service information
        <br>• Pricing and packages
        <br>• Opening hours
        <br><br>How can I help you today?
      </div>
    `;
  }
}

function initChatbot() {
  const sendBtn = document.getElementById('sendBtn');
  const chatInput = document.getElementById('chatInput');

  if (sendBtn) {
    sendBtn.addEventListener('click', function (e) {
      e.preventDefault();
      sendMessage();
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}



// Portrait fade-in on scroll
function initPortraitFadeIn() {
  const portrait = document.querySelector('.about-portrait');
  if (!portrait) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(portrait);
}



// Fill chat input with suggested prompt
function fillPrompt(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = text;
    input.focus();
  }
}





// ============================================
// LANGUAGE TOGGLE - English/Georgian
// ============================================

function initLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  const body = document.body;

  if (!langToggle) {
    console.warn('Language toggle button not found');
    return;
  }

  // Get saved language or default to English
  const currentLang = localStorage.getItem('language') || 'en';
  setLanguage(currentLang);

  // Toggle on click
  langToggle.addEventListener('click', function () {
    const currentLang = body.getAttribute('data-lang') || 'en';
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  });
}

function setLanguage(lang) {
  const body = document.body;
  const langEn = document.querySelector('.lang-en');
  const langFr = document.querySelector('.lang-fr');

  // Set body attribute
  body.setAttribute('data-lang', lang);

  // Save preference
  localStorage.setItem('language', lang);

  // Update toggle button
  if (langEn && langFr) {
    langEn.classList.remove('active');
    langFr.classList.remove('active');

    if (lang === 'en') {
      langEn.classList.add('active');
    } else if (lang === 'fr') {
      langFr.classList.add('active');
    }
  }

  console.log('Language set to:', lang);
}

// ============================================
// INITIALIZE ALL ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('Initializing portfolio...');

  initLanguageToggle();

  initThemeToggle();
  initCustomCursor();
  initLiveDemos();
  initChatbot();


  initPortraitFadeIn();
  console.log('Portfolio initialized successfully');
});
