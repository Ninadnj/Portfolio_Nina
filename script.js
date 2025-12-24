

// ============================================
// THEME TOGGLE - Light/Dark Mode
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  // Update toggle button icon
  if (themeToggle) {
    updateThemeIcon(themeToggle, currentTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'midnight' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(themeToggle, newTheme);
      
      console.log('Theme switched to:', newTheme);
    });
  }
});

function updateThemeIcon(button, theme) {
  if (theme === 'light') {
    button.innerHTML = '🌙'; // Moon for dark mode option
  } else {
    button.innerHTML = '☀️'; // Sun for light mode option
  }
}

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

    

// ============================================
// LIVE DEMOS FUNCTIONALITY
// ============================================

// Handle iframe load success
function handleIframeLoad(projectId) {
  const iframe = document.querySelector(`iframe[data-project="${projectId}"]`);
  const skeleton = document.getElementById(`skeleton-${projectId}`);
  
  if (iframe && skeleton) {
    // Hide skeleton
    skeleton.classList.add('hidden');
    // Show iframe
    iframe.classList.add('loaded');
  }
}

// Handle iframe load error (X-Frame-Options blocked)
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

// Preview mode toggle (Desktop/Mobile)

// Explicit send button click handler
document.addEventListener('DOMContentLoaded', function() {
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function(e) {
      e.preventDefault();
      sendMessage();
    });
  }
  
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

      });
    });
  }
});

// Scroll to case notes
function scrollToCaseNotes(projectId) {
  const caseNotes = document.getElementById(`notes-${projectId}`);
  
  if (caseNotes) {
    // Toggle visibility
    const isHidden = caseNotes.classList.contains('hidden');
    
    if (isHidden) {
      caseNotes.classList.remove('hidden');
      
      // Scroll to it smoothly
      setTimeout(() => {
        caseNotes.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    } else {
      caseNotes.classList.add('hidden');
    }
  }
}

// Detect if iframe is blocked by checking after a timeout
document.addEventListener('DOMContentLoaded', function() {
  const iframes = document.querySelectorAll('.demo-iframe');
  
  iframes.forEach(iframe => {
    const projectId = iframe.getAttribute('data-project');
    
    // Set a timeout to check if iframe loaded
    setTimeout(() => {
      try {
        // Try to access iframe content (will fail if blocked)
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // If we can't access it or it's still loading, check visibility
        if (!iframe.classList.contains('loaded')) {
          // Check if iframe has actually loaded content
          if (iframe.contentWindow.length === 0) {
            handleIframeError(projectId);
          }
        }
      } catch (e) {
        // Cross-origin error - iframe is blocked
        handleIframeError(projectId);
      }
    }, 5000); // Wait 5 seconds before checking
  });
});

// Add keyboard navigation for demo cards
document.addEventListener('DOMContentLoaded', function() {
  const demoButtons = document.querySelectorAll('.btn-demo');
  
  demoButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});


// ============================================
// CHATBOT FUNCTIONALITY - Beauty Salon Assistant
// ============================================

// Salon Assistant Persona
const SALON_ASSISTANT = {
  name: "Beauty Salon Assistant",
  bootMsg: "👋 Hi! I'm your Beauty Salon Assistant. I can help you with booking appointments, service information, pricing, and opening hours. How can I help you today?",
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

// Send message function
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
  
  // Clear input
  input.value = '';
  
  // Scroll to bottom
  chatBody.scrollTop = chatBody.scrollHeight;
  
  // Show typing indicator
  if (typingIndicator) {
    typingIndicator.classList.remove('hidden');
  }
  
  // Simulate bot response delay
  setTimeout(() => {
    if (typingIndicator) {
      typingIndicator.classList.add('hidden');
    }
    
    // Generate response
    const response = generateResponse(message);
    
    // Add bot message
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = response;
    chatBody.appendChild(botMsg);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

// Generate response based on message
function generateResponse(message) {
  const msg = message.toLowerCase();
  
  // Check for keywords
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
  
  // Default response
  return getRandomResponse(SALON_ASSISTANT.responses.default);
}

// Get random response from array
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Reset chat
function resetChat() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) {
    chatBody.innerHTML = `
      <div class="message bot">
        ${SALON_ASSISTANT.bootMsg}
      </div>
    `;
  }
}

// Enable Enter key to send
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});
