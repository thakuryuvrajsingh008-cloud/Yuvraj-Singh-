/* ============================================================
   AURORA STUDIOS — APPLICATION CONTROLLER (APP.JS)
   Main Interactive Controller, Filters, Modals, SEO & Forms
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initScrollReveals();
  initStatsCounter();
  initPortfolioGrid();
  initSkillsMatrix();
  initProjectModal();
  initContactForm();
  initCursorGlow();
});

/* ============================================================
   1. NAVBAR & MOBILE DRAWER
============================================================ */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        mobileDrawer.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      } else {
        mobileDrawer.classList.add('active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 180;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach((el) => {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        el.classList.add('active');
      });
    }
  });
}

/* ============================================================
   2. TYPEWRITER / CYCLING HEADLINE ANIMATION
============================================================ */
function initTypewriter() {
  const targetElement = document.getElementById('typewriterText');
  if (!targetElement) return;

  const phrases = [
    "WEB DEVELOPER",
    "AI AUTOMATION EXPERT",
    "CREATIVE DIGITAL SPECIALIST",
    "VOICE AI ARCHITECT",
    "HIGH-CONVERTING DESIGNER"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ============================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
============================================================ */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

/* ============================================================
   4. STATS NUMBER COUNTER
============================================================ */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((num) => observer.observe(num));
}

/* ============================================================
   5. PORTFOLIO GRID & CATEGORY FILTERING
============================================================ */
function initPortfolioGrid() {
  const grid = document.getElementById('portfolioProjectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!grid || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
      ? PORTFOLIO_PROJECTS 
      : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

    grid.innerHTML = filtered.map((project, idx) => `
      <article class="project-card reveal delay-${(idx % 3) + 1}" data-id="${project.id}">
        <div class="project-media-wrap">
          <img src="${project.image}" alt="${project.title} - ${project.subtitle}" class="project-img" loading="lazy">
          <div class="project-overlay">
            <span style="font-size: 0.85rem; font-weight: 600; color: #fff;">
              <i class="fa-solid fa-arrow-up-right-from-square" style="margin-right: 6px; color: var(--accent-cyan);"></i> Explore Case Study
            </span>
          </div>
          <span class="project-category-badge">${project.categoryLabel}</span>
        </div>
        <div class="project-body">
          <span class="project-number">PROJECT 0${idx + 1} &bull; ${project.client}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-footer">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              ${project.tags.slice(0, 2).map((t) => `<span class="feature-tag">${t}</span>`).join('')}
            </div>
            <button type="button" class="btn-view-project" data-project-id="${project.id}">
              Details <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    initScrollReveals();
  }

  renderProjects('all');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

/* ============================================================
   6. SKILLS MATRIX FILTERING
============================================================ */
function initSkillsMatrix() {
  const container = document.getElementById('skillsBadgeContainer');
  const tabs = document.querySelectorAll('.skill-tab-btn');
  if (!container || typeof SKILLS_DATA === 'undefined') return;

  function renderSkills(category = 'all') {
    const list = category === 'all'
      ? SKILLS_DATA.all
      : SKILLS_DATA.all.filter((s) => s.category === category);

    container.innerHTML = list.map((skill) => `
      <div class="skill-badge">
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
      </div>
    `).join('');
  }

  renderSkills('all');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.dataset.category);
    });
  });
}

/* ============================================================
   7. PROJECT CASE STUDY MODAL
============================================================ */
function initProjectModal() {
  const backdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('btnCloseProjectModal');
  const bodyEl = document.getElementById('projectModalBody');

  if (!backdrop || !bodyEl) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id], .project-card');
    if (trigger) {
      const id = trigger.dataset.projectId || trigger.dataset.id;
      const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
      if (project) {
        renderModalContent(project);
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  function renderModalContent(p) {
    bodyEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr; gap: 28px;">
        <div style="border-radius: var(--radius-lg); overflow: hidden; max-height: 420px; border: 1px solid var(--border-glass);">
          <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <span class="status-chip">${p.categoryLabel}</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">&bull; Client: ${p.client}</span>
          </div>

          <h2 style="font-size: 2.2rem; margin-bottom: 12px; color: #fff;">${p.title}</h2>
          <p style="font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 20px; font-weight: 600;">${p.subtitle}</p>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 28px;">${p.fullDescription}</p>

          <!-- Key Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px;">
            ${p.metrics.map((m) => `
              <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
                <p style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: #fff;">${m.value}</p>
                <p style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); text-transform: uppercase;">${m.label}</p>
              </div>
            `).join('')}
          </div>

          <!-- Deliverables -->
          <h4 style="font-size: 1.2rem; margin-bottom: 14px; color: #fff;">Key Deliverables & Features</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin-bottom: 32px;">
            ${p.deliverables.map((d) => `
              <li style="display: flex; align-items: center; gap: 10px; color: var(--text-secondary); font-size: 0.95rem;">
                <i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i> ${d}
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="https://wa.me/919761203713?text=Hi%20Yuvraj!%20I%20loved%20your%20case%20study%20for%20${encodeURIComponent(p.title)}.%20Let's%20build%20something%20similar!" target="_blank" class="btn-primary">
              <i class="fa-brands fa-whatsapp"></i> Discuss Similar Project
            </a>
            <a href="#contact" onclick="document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow='';" class="btn-secondary">
              Request Free Consultation
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function closeModal() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ============================================================
   8. CONTACT FORM SUBMISSION & WHATSAPP GENERATOR
============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMessage');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const business = document.getElementById('formBusiness').value.trim() || 'N/A';
    const service = document.getElementById('formService').value;
    const budget = document.getElementById('formBudget').value;
    const details = document.getElementById('formDetails').value.trim();

    if (!name || !email || !service || !details) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Build WhatsApp message payload
    const textLines = [
      `*New Project Enquiry — Aurora Studios*`,
      ``,
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      `🏢 *Business/Brand:* ${business}`,
      `🛠️ *Service Required:* ${service}`,
      `💰 *Estimated Budget:* ${budget}`,
      `📝 *Project Details:* ${details}`,
      ``,
      `_Sent via Aurora Studios Portfolio Contact Form_`
    ];

    const waUrl = `https://wa.me/919761203713?text=${encodeURIComponent(textLines.join('\n'))}`;

    showStatus('Opening WhatsApp with your project details... Thank you!', 'success');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 800);
  });

  function showStatus(msg, type) {
    if (!statusMsg) return;
    statusMsg.textContent = msg;
    statusMsg.style.display = 'block';
    statusMsg.style.color = type === 'success' ? '#34d399' : '#f87171';
    statusMsg.style.padding = '12px 18px';
    statusMsg.style.borderRadius = 'var(--radius-md)';
    statusMsg.style.background = type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(248, 113, 113, 0.1)';
    statusMsg.style.border = `1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`;
    statusMsg.style.marginTop = '16px';
  }
}

/* ============================================================
   9. AMBIENT CURSOR GLOW TRAIL
============================================================ */
function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow');
  if (!cursor || window.innerWidth < 992) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.transform = `translate(${cursorX - 225}px, ${cursorY - 225}px)`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();
}
