/**
 * WebNotePad — Header Component
 * Injected into #header-root on DOMContentLoaded
 */
(function () {
  const headerHTML = `
    <header class="site-header" id="siteHeader" role="banner">
      <div class="container header-inner">
        <a href="/" class="header-logo" aria-label="WebNotePad Home">
          <div class="logo-mark" aria-hidden="true">NP</div>
          <span>Notepad Online</span> 
        </a>

        <nav class="header-nav" aria-label="Main navigation">
          <a href="/#notepad" class="nav-link">Notepad</a>                
          <a href="/diary" class="nav-link">Diary</a>
          <a href="/mindmap" class="nav-link">MindMap</a>
          <a href="/list-maker" class="nav-link">List Maker</a>
          <div class="dropdown">
            <button class="dropdown-btn nav-link">More ▼</button>
            <div class="dropdown-content">
              <a href="/case-converter" class="dropdown-item">Case Converter</a>
              <a href="/random-text" class="dropdown-item">Random Text</a>
              <a href="/word-shuffler" class="dropdown-item">Word Shuffler</a>              
              <a href="/pomodoro-timer" class="dropdown-item">Pomodoro Timer</a>
              <a href="/habit-tracker" class="dropdown-item">Habit Tracker</a>
              <a href="/choice-maker" class="dropdown-item">Decision Maker</a>
              <a href="/study-planner" class="dropdown-item">Study Planner</a>
              <a href="/all-tools" class="dropdown-item">All Tools</a>
            </div>
          </div>    
          <a href="/blog" class="nav-link">Blog</a>
          <a href="/about" class="nav-link">About</a>   
        </nav>

        <div class="header-right">
          <button class="header-dark-btn" id="headerDarkBtn" aria-label="Toggle dark mode" title="Toggle dark mode">
            🌙
          </button>
          <a href="/#notepad" class="header-cta">Notepad→</a>
          <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
            ☰
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      <a href="/#notepad" class="nav-link">📝 Notepad</a>
      <div class="mobile-dropdown">
        <button class="mobile-dropdown-btn">📁 More ▼</button>
        <div class="mobile-dropdown-content">
          <a href="/case-converter" class="nav-link" style="padding-left: 32px;">• Case Converter</a>
          <a href="/random-text" class="nav-link" style="padding-left: 32px;">• Random Text</a>
          <a href="/word-shuffler" class="nav-link" style="padding-left: 32px;">• Word Shuffler</a>          
          <a href="/pomodoro-timer" class="nav-link" style="padding-left: 32px;">• Pomodoro Timer</a>
          <a href="/habit-tracker" class="nav-link" style="padding-left: 32px;">• Habit Tracker</a>
          <a href="/choice-maker" class="nav-link" style="padding-left: 32px;">• Decision Maker</a>
          <a href="/study-planner" class="nav-link" style="padding-left: 32px;">• Study Planner</a>
          <a href="/all-tools" class="nav-link" style="padding-left: 32px;">• All Tools</a>
        </div>
      </div>      
      <a href="diary" class="nav-link">🔄 Diary</a>
      <a href="mindmap" class="nav-link">👥 MindMap</a>
      <a href="list-maker" class="nav-link">❓ List Maker</a>
      <a href="/about" class="nav-link">ℹ️ About</a>
      <a href="/blog" class="nav-link">📝 Blog</a>      
      <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Notepad→</a>
    </nav>
  `;

  function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;
    root.innerHTML = headerHTML;

    // Dark mode toggle (header button)
    const headerDarkBtn = document.getElementById('headerDarkBtn');
    if (headerDarkBtn) {
      headerDarkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        headerDarkBtn.textContent = isDark ? '☀️' : '🌙';
        headerDarkBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        localStorage.setItem('webnotepad_dark', isDark ? '1' : '0');
        // Also sync editor dark button if present
        const editorDarkBtn = document.getElementById('darkModeBtn');
        if (editorDarkBtn) editorDarkBtn.textContent = isDark ? '☀️' : '🌙';
      });
    }

    // Dropdown menu functionality (desktop)
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownBtn && dropdownContent) {
      dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdownContent.classList.toggle('show');
        dropdownBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
          dropdownContent.classList.remove('show');
          dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Close dropdown on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
          dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Mobile dropdown menu functionality
    const mobileDropdownBtn = document.querySelector('.mobile-dropdown-btn');
    const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');
    if (mobileDropdownBtn && mobileDropdownContent) {
      mobileDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileDropdownContent.classList.toggle('show');
        mobileDropdownBtn.setAttribute('aria-expanded', mobileDropdownContent.classList.contains('show'));
      });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.textContent = isOpen ? '✕' : '☰';
      });
      // Close on nav link click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.textContent = '☰';
        });
      });
    }

    // Restore dark mode preference
    if (localStorage.getItem('webnotepad_dark') === '1') {
      document.body.classList.add('dark');
      if (headerDarkBtn) headerDarkBtn.textContent = '☀️';
    }

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav .nav-link, .dropdown-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            if (link.classList && link.classList.contains('dropdown-item')) {
              // Skip dropdown items for active highlighting
              return;
            }
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active-nav');
            } else if (link.classList) {
              link.classList.remove('active-nav');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => observer.observe(s));

    // Add CSS for dropdown styling - FIXED with proper dark mode variables
    const style = document.createElement('style');
    style.textContent = `
      /* Desktop Dropdown */
      .dropdown {
        position: relative;
        display: inline-block;
      }
      
      .dropdown-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
      }
      
      .dropdown-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--paper);
        min-width: 180px;
        box-shadow: var(--shadow);
        border-radius: 8px;
        border: 1px solid var(--paper-edge);
        z-index: 1000;
        overflow: hidden;
      }
      
      .dropdown-content.show {
        display: block;
        animation: fadeIn 0.2s ease;
      }
      
      .dropdown-item {
        display: block;
        padding: 10px 16px;
        text-decoration: none;
        color: var(--ink);
        font-size: 0.875rem;
        font-weight: 500;
        transition: background 0.2s, color 0.2s;
      }
      
      .dropdown-item:hover {
        background-color: var(--paper-warm);
        color: var(--accent);
      }
      
      /* Mobile Dropdown */
      .mobile-dropdown {
        width: 100%;
      }
      
      .mobile-dropdown-btn {
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: 12px 20px;
        font-size: 1rem;
        cursor: pointer;
        color: var(--ink);
        font-family: var(--font-body);
        transition: color 0.2s;
      }
      
      .mobile-dropdown-btn:hover {
        color: var(--accent);
      }
      
      .mobile-dropdown-content {
        display: none;
        flex-direction: column;
        background-color: var(--paper-warm);
      }
      
      .mobile-dropdown-content.show {
        display: flex;
      }
      
      .mobile-dropdown-content a {
        display: block;
        color: var(--ink);
        transition: color 0.2s;
      }
      
      .mobile-dropdown-content a:hover {
        color: var(--accent);
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Dark mode support for dropdowns */
      body.dark .dropdown-content {
        background-color: var(--paper);
        border-color: var(--paper-edge);
      }
      
      body.dark .dropdown-item {
        color: var(--ink);
      }
      
      body.dark .dropdown-item:hover {
        background-color: var(--paper-warm);
        color: var(--accent);
      }
      
      body.dark .mobile-dropdown-btn {
        color: var(--ink);
      }
      
      body.dark .mobile-dropdown-btn:hover {
        color: var(--accent);
      }
      
      body.dark .mobile-dropdown-content {
        background-color: var(--paper-warm);
      }
      
      body.dark .mobile-dropdown-content a {
        color: var(--ink);
      }
      
      body.dark .mobile-dropdown-content a:hover {
        color: var(--accent);
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
