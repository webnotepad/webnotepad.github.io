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
          <div class="dropdown">
            <button class="dropdown-btn nav-link">More ▼</button>
            <div class="dropdown-content">
              <a href="/case-converter" class="dropdown-item">Case Converter</a>
              <a href="/random-text" class="dropdown-item">Random Text</a>
              <a href="/word-shuffler" class="dropdown-item">Word Shuffler</a>
            </div>
          </div>          
          <a href="/diary" class="nav-link">Diary</a>
          <a href="/mindmap" class="nav-link">MindMap</a>
          <a href="/list-maker" class="nav-link">List Maker</a>
          <a href="/blog" class="nav-link">Blog</a>
          <a href="/about" class="nav-link">About</a>  
        </nav>

        <div class="header-right">
          <button class="header-dark-btn" id="headerDarkBtn" aria-label="Toggle dark mode" title="Toggle dark mode">
            🌙
          </button>
          <a href="/#notepad" class="header-cta">Open Notepad →</a>
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
        </div>
      </div>      
      <a href="diary" class="nav-link">🔄 Diary</a>
      <a href="mindmap" class="nav-link">👥 MindMap</a>
      <a href="list-maker" class="nav-link">❓ List Maker</a>
      <a href="/about" class="nav-link">ℹ️ About</a>
      <a href="/blog" class="nav-link">📝 Blog</a>
      <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Open Notepad →</a>
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

    // Add CSS for dropdown styling
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
        background-color: var(--bg-secondary, #fff);
        min-width: 180px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        border-radius: 8px;
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
        color: var(--text-primary, #333);
        transition: background 0.2s;
      }
      
      .dropdown-item:hover {
        background-color: var(--bg-hover, #f0f0f0);
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
        font-size: 16px;
        cursor: pointer;
        color: inherit;
        font-family: inherit;
      }
      
      .mobile-dropdown-content {
        display: none;
        flex-direction: column;
        background-color: var(--bg-tertiary, rgba(0,0,0,0.05));
      }
      
      .mobile-dropdown-content.show {
        display: flex;
      }
      
      .mobile-dropdown-content a {
        display: block;
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
      
      /* Dark mode support */
      body.dark .dropdown-content {
        background-color: #2d2d2d;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
      }
      
      body.dark .dropdown-item:hover {
        background-color: #3d3d3d;
      }
      
      body.dark .mobile-dropdown-content {
        background-color: rgba(255,255,255,0.05);
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
