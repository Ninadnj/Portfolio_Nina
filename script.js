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
  const notes = document.getElementById(`notes-${projectId}`);
  if (!notes) return;

  // Toggle visibility
  const isHidden = notes.classList.contains('hidden');

  // Close all other case notes first (optional, but cleaner)
  document.querySelectorAll('.case-notes').forEach(node => {
    node.classList.add('hidden');
  });

  if (isHidden) {
    notes.classList.remove('hidden');
    // Smooth scroll to the notes
    notes.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

const PORTFOLIO_ASSISTANT = {
  name: "Nina's Assistant",
  responses: {
    greeting: [
      "Hello! I'm Nina's AI assistant. How can I help you regarding her work or services?",
      "Hi there! I can answer questions about Nina's projects, skills, or how to get in touch.",
      "Welcome! Ask me anything about Nina's portfolio or automation services."
    ],
    services: [
      "Nina specializes in building custom web applications, AI-powered automation workflows (n8n), and premium digital experiences.",
      "She builds intelligent systems—from booking platforms to content repurposing engines using AI and modern web tech.",
      "Her main services include: 1. Custom Web Development 2. AI Automation Workflows 3. System Architecture Design."
    ],
    projects: [
      "You can see several live demos above, including the AlpineStay luxury booking platform and the MR Studio salon system.",
      "Check out the 'Selected Projects' section to see the AlpineStay booking platform and other live demos.",
      "Nina has built booking systems, portfolio sites, and automation implementations. Scroll up to 'Web Apps' to explore them."
    ],
    contact: [
      "You can reach Nina via email at ninodoinjashvili@gmail.com, on WhatsApp, or through LinkedIn.",
      "Ready to collaborate? Click the 'Start a Project' button or email ninodoinjashvili@gmail.com.",
      "The best way to get in touch is via the contact options below—Email, WhatsApp, or LinkedIn."
    ],
    tech: [
      "Nina works with a modern stack: HTML/CSS (Vanilla & Tailwind), JavaScript, React, Node.js, and n8n for automation.",
      "For automations, she uses n8n and LLMs. For web, she focuses on clean, performant code using React or Vanilla JS."
    ],
    pricing: [
      "Each project is unique. Please reach out directly to discuss your specific needs and get a custom quote.",
      "Pricing depends on the scope and complexity of the system. Contact Nina to discuss your requirements."
    ],
    default: [
      "I'm here to help! You can ask about Nina's services, view her tech stack, or ask how to contact her.",
      "I can tell you about Nina's previous work, her coding skills, or how to start a new project with her.",
      "Feel free to ask about web development, AI automations, or how to get in touch."
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

  // Send to n8n Webhook
  console.log('Sending to webhook:', message);

  // Note: Ensure your n8n workflow is Active or you are clicking "Execute Workflow"
  fetch('https://n8n.ninadnj.me/webhook/portfolio-chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ chatInput: message })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Webhook response:', data);
      if (typingIndicator) typingIndicator.classList.add('hidden');

      // Check for various common n8n return formats
      const botResponse = data.output || data.response || data.text || (data[0] && data[0].output) || generateResponse(message);

      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';
      botMsg.innerHTML = botResponse;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    })
    .catch(error => {
      console.warn('Webhook connection failed, falling back to local:', error);
      if (typingIndicator) typingIndicator.classList.add('hidden');

      // Fallback to local logic on error
      const response = generateResponse(message);
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';
      botMsg.innerHTML = response;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateResponse(message) {
  const msg = message.toLowerCase();

  if (msg.match(/hello|hi|hey|good morning|good afternoon/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.greeting);
  }
  if (msg.match(/service|build|make|offer|do|what can you/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.services);
  }
  if (msg.match(/project|work|portfolio|demo|app/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.projects);
  }
  if (msg.match(/contact|email|reach|hire|touch/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.contact);
  }
  if (msg.match(/tech|stack|language|code|tool|react|node|n8n/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.tech);
  }
  if (msg.match(/price|cost|how much|rate/)) {
    return getRandomResponse(PORTFOLIO_ASSISTANT.responses.pricing);
  }
  if (msg.match(/thank/)) {
    return "You're welcome. Let me know if you have other questions about the work.";
  }

  return getRandomResponse(PORTFOLIO_ASSISTANT.responses.default);
}

function resetChat() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) {
    chatBody.innerHTML = `
      <div class="message bot">
        <div class="message-content">
          Hello. I am Nina's AI Assistant. I can help you with:
          <br>• Project inquiries
          <br>• Technical skills & Services
          <br>• Contact information
          <br><br>How can I assist you today?
        </div>
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

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    });
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

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initMobileMenu();
  initThemeToggle();
  initLiveDemos();
  initChatbot();
  initPortraitFadeIn();
});
