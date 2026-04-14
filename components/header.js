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
          <span>WebNotePad</span>
        </a>

        <nav class="header-nav" aria-label="Main navigation">
          <a href="/#notepad" class="nav-link">Notepad</a>
          <a href="/#features" class="nav-link">Features</a>
          <a href="/#how-it-works" class="nav-link">How it works</a>
          <a href="/#use-cases" class="nav-link">Use Cases</a>
          <a href="/#faq" class="nav-link">FAQ</a>
          <a href="/about" class="nav-link">About</a>          
        </nav>

        <div class="header-right">
          <button class="header-dark-btn" id="headerDarkBtn" aria-label="Toggle dark mode" title="Toggle dark mode">
            🌙
          </button>
          <a href="#notepad" class="header-cta">Open Notepad →</a>
          <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
            ☰
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      <a href="#notepad" class="nav-link">📝 Notepad</a>
      <a href="#features" class="nav-link">⚡ Features</a>
      <a href="#how-it-works" class="nav-link">🔄 How it works</a>
      <a href="#use-cases" class="nav-link">👥 Use Cases</a>
      <a href="#faq" class="nav-link">❓ FAQ</a>
      <a href="#about" class="nav-link">ℹ️ About</a>
      <a href="#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Open Notepad →</a>
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
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active-nav', link.getAttribute('href') === '#' + entry.target.id);
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
