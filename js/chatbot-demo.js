/* ============================================================
   AURORA STUDIOS — AI AGENT DEMO SIMULATOR (CHATBOT-DEMO.JS)
   Interactive Conversational Sandbox for Website Visitors
============================================================ */

class AuroraChatbotDemo {
  constructor() {
    this.messagesContainer = document.getElementById('chatbotMessages');
    this.inputField = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('btnSendChat');
    this.quickPrompts = document.querySelectorAll('.quick-prompt-btn');

    if (!this.messagesContainer || !this.inputField) return;

    this.knowledgeBase = {
      services: "At Aurora Studios, Yuvraj offers: 🚀 Modern Web & Web App Development, 🤖 Custom AI Chatbots, 📞 AI Calling/Voice Agents, ⚡ Workflow Automations (Make/Zapier/CRM), 🎬 Viral Video Editing & UGC Reels, and 🎨 High-CTR Thumbnail & Post Design.",
      pricing: "Pricing depends on project scope and deliverables. Web development starts from competitive agency packages, and AI automation workflows are tailored to your business ROI. You can get an instant custom quote using our contact form below or on WhatsApp (+91 9761203713)!",
      calling: "Our AI Voice Calling Agents are human-grade voice AI bots capable of handling both inbound customer inquiries and outbound lead qualification calls, booking live Google Calendar appointments, and transcribing conversations directly into your CRM.",
      websites: "We build ultra-fast, modern, responsive websites and web applications tailored for conversion. Check out our featured work above including The Waffle Paradise Cafe, Ace Factor Fitness, and Fitless 2 Fitness!",
      contact: "You can reach Yuvraj directly via WhatsApp/Phone at +91 9761203713, email at thakuryuvrajsingh008@gmail.com, or through LinkedIn. Based in Aligarh, UP, serving global clients!",
      default: "That sounds like a great project! Yuvraj specializes in combining web development, creative design, and AI automation to help brands scale fast. Would you like to schedule a quick 15-minute discovery call or discuss project requirements?"
    };

    this.init();
  }

  init() {
    this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSendMessage();
    });

    this.quickPrompts.forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim().replace(/^"|"$/g, '');
        this.inputField.value = text;
        this.handleSendMessage();
      });
    });
  }

  handleSendMessage() {
    const text = this.inputField.value.trim();
    if (!text) return;

    // Add User Message Bubble
    this.addBubble(text, 'user');
    this.inputField.value = '';
    this.inputField.focus();

    // Show Typing Indicator
    this.showTypingIndicator();

    // Generate Response
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.matchResponse(text);
      this.addBubble(response, 'bot');
    }, 900);
  }

  matchResponse(text) {
    const query = text.toLowerCase();
    if (query.includes('service') || query.includes('what do you do') || query.includes('help')) {
      return this.knowledgeBase.services;
    }
    if (query.includes('cost') || query.includes('price') || query.includes('budget') || query.includes('charge')) {
      return this.knowledgeBase.pricing;
    }
    if (query.includes('call') || query.includes('voice') || query.includes('phone') || query.includes('agent')) {
      return this.knowledgeBase.calling;
    }
    if (query.includes('website') || query.includes('web dev') || query.includes('portfolio') || query.includes('sample')) {
      return this.knowledgeBase.websites;
    }
    if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('number')) {
      return this.knowledgeBase.contact;
    }
    return this.knowledgeBase.default;
  }

  addBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'botTypingIndicator';
    typing.className = 'chat-bubble bot';
    typing.innerHTML = '<span style="opacity:0.6;"><i class="fa-solid fa-ellipsis fa-fade"></i> Aurora AI is typing...</span>';
    this.messagesContainer.appendChild(typing);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const typing = document.getElementById('botTypingIndicator');
    if (typing) typing.remove();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuroraChatbotDemo();
});
