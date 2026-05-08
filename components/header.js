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
          
          <div class="header-dropdown" id="moreDropdown">
            <button class="nav-link dropdown-trigger" aria-haspopup="true" aria-expanded="false">
              More <span class="chevron">▾</span>
            </button>
            <div class="dropdown-menu">
              <a href="/case-converter" class="dropdown-item">Case Converter</a>
              <a href="/random-text" class="dropdown-item">Random Text</a>
              <a href="/word-shuffler" class="dropdown-item">Word Shuffler</a>
            </div>
          </div>
          <a href="/#features" class="nav-link">Features</a>
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
      
      <a href="/case-converter" class="nav-link">🔠 Case Converter</a>
      <a href="/random-text" class="nav-link">🎲 Random Text</a>
      <a href="/word-shuffler" class="nav-link">🔀 Word Shuffler</a>

      <a href="/#features" class="nav-link">⚡ Features</a>
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

    // Dropdown Logic
    const dropdown = document.getElementById('moreDropdown');
    if (dropdown) {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('active');
        trigger.setAttribute('aria-expanded', isOpen);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      });
    }

    // Dark mode toggle (header button)
    const headerDarkBtn = document.getElementById('headerDarkBtn');
    if (headerDarkBtn) {
      headerDarkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        headerDarkBtn.textContent = isDark ? '☀️' : '🌙';
        headerDarkBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        localStorage.setItem('webnotepad_dark', isDark ? '1' : '0');
        const editorDarkBtn = document.getElementById('darkModeBtn');
        if (editorDarkBtn) editorDarkBtn.textContent = isDark ? '☀️' : '🌙';
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
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            if (link.getAttribute('href')) {
              link.classList.toggle('active-nav', link.getAttribute('href') === '#' + entry.target.id);
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
