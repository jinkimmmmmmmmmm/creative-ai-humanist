/**
 * Creative AI Humanist - Personal Branding Landing Page Logic
 * Interactive Features: Smooth Navigation, Workflow Tabs, Modal & Inquiries, Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWorkflowTabs();
  initFormsAndModals();
  initScrollAnimations();
});

/* ==========================================================================
   Navigation Bar Behavior
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow & blur on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Workflow Interactive Tabs
   ========================================================================== */
function initWorkflowTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.workflow-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content active state
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetId) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   Forms, Inquiries & Toast Notifications
   ========================================================================== */
function initFormsAndModals() {
  const leadForm = document.getElementById('leadMagnetForm');
  const inquiryForm = document.getElementById('inquiryForm');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = leadForm.querySelector('input[type="email"]').value;
      const btn = leadForm.querySelector('button[type="submit"]');

      if (!email) return;

      btn.disabled = true;
      btn.innerText = '전송 중...';

      setTimeout(() => {
        showToast('✨ 가이드북 신청이 완료되었습니다! 입력하신 이메일로 전송되었습니다.');
        leadForm.reset();
        btn.disabled = false;
        btn.innerText = '무료 가이드북 즉시 받기';
      }, 1000);
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiryName').value;
      const email = document.getElementById('inquiryEmail').value;
      const btn = inquiryForm.querySelector('button[type="submit"]');

      if (!name || !email) return;

      btn.disabled = true;
      btn.innerText = '접수 중...';

      setTimeout(() => {
        showToast(`🤝 ${name} 님의 출강/협업 문의가 성공적으로 접수되었습니다. 24시간 내 연락드리겠습니다.`);
        inquiryForm.reset();
        btn.disabled = false;
        btn.innerText = '출강 및 협업 제안서 보내기';
      }, 1200);
    });
  }
}

/* Show Floating Toast Notification */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">✦</span>
    <span class="toast-message">${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   Subtle Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.pillar-card, .program-mini-card, .review-card, .featured-program-card').forEach(el => {
    observer.observe(el);
  });
}
