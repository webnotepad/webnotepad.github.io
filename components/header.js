/**
 * WebNotePad — Header Component (Professional + Colored SVG Icons)
 * Injected into #header-root on DOMContentLoaded
 */
(function () {
  // Configured supported languages with concise flag labels for the desktop selector
  const languages = [
    { code: 'en', label: '🇬🇧 English', flag: '🇬🇧', prefix: '' },
    { code: 'nl', label: '🇳🇱 Dutch', flag: '🇳🇱', prefix: '/nl' },
    { code: 'de', label: '🇩🇪 German', flag: '🇩🇪', prefix: '/de' },
    { code: 'fr', label: '🇫🇷 French', flag: '🇫🇷', prefix: '/fr' },
    { code: 'da', label: '🇩🇰 Danish', flag: '🇩🇰', prefix: '/da' },
    { code: 'fi', label: '🇫🇮 Finnish', flag: '🇫🇮', prefix: '/fi' },
    { code: 'sv', label: '🇸🇪 Swedish', flag: '🇸🇪', prefix: '/sv' },
    { code: 'pl', label: '🇵🇱 Polish', flag: '🇵🇱', prefix: '/pl' }
  ];

  // ── Desktop nav SVG icons (each with its own color) ──
  const NAV_ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 3l9 7.5" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-5.5h4V21h3.5a1 1 0 0 0 1-1V9.5" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    diary: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="15" height="18" rx="2" stroke="#8B5CF6" stroke-width="1.8"/><path d="M7.5 3v18" stroke="#8B5CF6" stroke-width="1.8"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#8B5CF6" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    mindmap: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.6" stroke="#0EA5E9" stroke-width="1.8"/><circle cx="5" cy="6" r="1.8" stroke="#0EA5E9" stroke-width="1.6"/><circle cx="19" cy="6" r="1.8" stroke="#0EA5E9" stroke-width="1.6"/><circle cx="5" cy="18" r="1.8" stroke="#0EA5E9" stroke-width="1.6"/><circle cx="19" cy="18" r="1.8" stroke="#0EA5E9" stroke-width="1.6"/><path d="M10 11L6.2 7.2M14 11l3.8-3.8M10 13l-3.8 3.8M14 13l3.8 3.8" stroke="#0EA5E9" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#10B981" stroke-width="1.8"/><rect x="7" y="7" width="3" height="3" rx="0.5" stroke="#10B981" stroke-width="1.4"/><path d="M7.6 8.5l1 1 1.6-1.6" stroke="#10B981" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    allTools: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="1.7"/></svg>`,
    games: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" stroke="#EC4899" stroke-width="1.8" stroke-linejoin="round"/><line x1="6" y1="11" x2="10" y2="11" stroke="#EC4899" stroke-width="1.8" stroke-linecap="round"/><line x1="8" y1="9" x2="8" y2="13" stroke="#EC4899" stroke-width="1.8" stroke-linecap="round"/><circle cx="15" cy="12" r="0.9" fill="#EC4899"/><circle cx="18" cy="10" r="0.9" fill="#EC4899"/></svg>`
  };

  function getLocalizedUrl(targetPrefix) {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const knownPrefixes = languages.map(l => l.code);
    if (pathSegments.length > 0 && knownPrefixes.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    const relativePath = pathSegments.join('/');
    return targetPrefix ? `${targetPrefix}/${relativePath}` : `/${relativePath}`;
  }

  const currentPath = window.location.pathname;
  const activeLangCode = languages.find(l => l.code !== 'en' && currentPath.startsWith(`/${l.code}`))?.code || 'en';

  const desktopOptions = languages.map(lang => {
    const isSelected = lang.code === activeLangCode ? 'selected' : '';
    return `<option value="${lang.prefix}" ${isSelected}>${lang.label}</option>`;
  }).join('');

  const mobileLangLinks = languages.map(lang => {
    const targetUrl = getLocalizedUrl(lang.prefix);
    const activeClass = lang.code === activeLangCode ? 'font-weight: bold; color: var(--accent);' : '';
    return `<a href="${targetUrl}" class="nav-link" style="padding-left: 32px; ${activeClass}">• ${lang.label}</a>`;
  }).join('');

  const headerHTML = `
    <header class="site-header" id="siteHeader" role="banner">
      <div class="header-bg" aria-hidden="true">
        <span class="header-orb header-orb--1"></span>
        <span class="header-orb header-orb--2"></span>
        <span class="header-orb header-orb--3"></span>
        <span class="header-orb header-orb--4"></span>
      </div>
      <div class="container header-inner">
        <a href="/" class="header-logo" aria-label="WebNotePad Home">
          <img src="/logo.png" alt="" class="logo-image" width="34" height="34" />
          <span>Notepad Online</span>
        </a>

        <nav class="header-nav" aria-label="Main navigation">
          <a href="/" class="nav-link nav-link-icon">${NAV_ICONS.home}<span>Home</span></a>
          <a href="/diary" class="nav-link nav-link-icon">${NAV_ICONS.diary}<span>Diary</span></a>
          <a href="/list-maker" class="nav-link nav-link-icon">${NAV_ICONS.list}<span>List Maker</span></a>
          <a href="/all-tools" class="nav-link nav-link-cta nav-link-blink nav-link-icon">${NAV_ICONS.allTools}<span>All Tools</span></a>
          <a href="/games" class="nav-link nav-link-icon">${NAV_ICONS.games}<span>Games</span></a>
          <a href="/blog" class="nav-link">Blog</a>
          <a href="/about" class="nav-link">About</a>
        </nav>

        <div class="header-right">
          <div class="lang-selector-wrapper">
            <select id="languageSelect" class="lang-select flag-only" aria-label="Select Language">
              ${desktopOptions}
            </select>
          </div>
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
      <a href="/" class="nav-link">📝 Home</a>
      <div class="mobile-dropdown">
        <button class="mobile-dropdown-btn">🌐 Language ▼</button>
        <div class="mobile-dropdown-content">
          ${mobileLangLinks}
        </div>
      </div>
      <a href="/all-tools" class="nav-link">📁 All Tools</a>
      <a href="/diary" class="nav-link">📔 Diary</a>
      <a href="/mindmap" class="nav-link">🧠 MindMap</a>
      <a href="/list-maker" class="nav-link">✅ List Maker</a>
      <a href="/games" class="nav-link">🎮 Games</a>
      <a href="/about" class="nav-link">ℹ️ About</a>
      <a href="/blog" class="nav-link">📝 Blog</a>
      <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Notepad→</a>
    </nav>
  `;

  function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;
    root.innerHTML = headerHTML;

    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.addEventListener('change', (e) => {
        window.location.href = getLocalizedUrl(e.target.value);
      });
    }

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

    document.querySelectorAll('.mobile-dropdown-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const content = btn.nextElementSibling;
        if (!content) return;
        const willOpen = !content.classList.contains('show');
        content.classList.toggle('show', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
        btn.textContent = willOpen ? '🌐 Language ▲' : '🌐 Language ▼';
      });
    });

    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.textContent = isOpen ? '✕' : '☰';
      });
      mobileNav.querySelectorAll('a.nav-link, a.btn').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.textContent = '☰';
        });
      });
    }

    if (localStorage.getItem('webnotepad_dark') === '1') {
      document.body.classList.add('dark');
      if (headerDarkBtn) headerDarkBtn.textContent = '☀️';
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active-nav');
            } else {
              link.classList.remove('active-nav');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => observer.observe(s));

    const style = document.createElement('style');
    style.textContent = `
      /* =========================================
         HEADER — professional, muted, with
         a soft colorful "aurora" backdrop
         + colored SVG nav icons
         ========================================= */

      .site-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        height: var(--app-header-h);
        background: var(--paper);
        border-bottom: 1px solid var(--paper-edge);
        display: flex;
        align-items: center;
        transition: background var(--transition), border-color var(--transition);
        overflow: hidden;
        isolation: isolate;
      }

      /* ── Colorful background layer (soft aurora orbs) ── */
      .header-bg {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
      }

      .header-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(48px);
        opacity: 0.55;
        will-change: transform;
      }

      .header-orb--1 {
        width: 320px; height: 320px;
        top: -140px; left: -80px;
        background: radial-gradient(circle, rgba(196, 86, 42, 0.35) 0%, rgba(196, 86, 42, 0) 70%);
        animation: orbDrift1 22s ease-in-out infinite alternate;
      }
      .header-orb--2 {
        width: 280px; height: 280px;
        top: -120px; left: 30%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(139, 92, 246, 0) 70%);
        animation: orbDrift2 26s ease-in-out infinite alternate;
      }
      .header-orb--3 {
        width: 300px; height: 300px;
        top: -150px; right: 24%;
        background: radial-gradient(circle, rgba(45, 106, 79, 0.30) 0%, rgba(45, 106, 79, 0) 70%);
        animation: orbDrift3 24s ease-in-out infinite alternate;
      }
      .header-orb--4 {
        width: 340px; height: 340px;
        top: -160px; right: -100px;
        background: radial-gradient(circle, rgba(184, 150, 12, 0.32) 0%, rgba(184, 150, 12, 0) 70%);
        animation: orbDrift4 28s ease-in-out infinite alternate;
      }

      @keyframes orbDrift1 {
        0%   { transform: translate3d(0, 0, 0) scale(1); }
        100% { transform: translate3d(30px, 18px, 0) scale(1.08); }
      }
      @keyframes orbDrift2 {
        0%   { transform: translate3d(0, 0, 0) scale(1); }
        100% { transform: translate3d(-26px, 14px, 0) scale(1.06); }
      }
      @keyframes orbDrift3 {
        0%   { transform: translate3d(0, 0, 0) scale(1); }
        100% { transform: translate3d(22px, -12px, 0) scale(1.07); }
      }
      @keyframes orbDrift4 {
        0%   { transform: translate3d(0, 0, 0) scale(1); }
        100% { transform: translate3d(-30px, 16px, 0) scale(1.05); }
      }

      @media (prefers-reduced-motion: reduce) {
        .header-orb { animation: none; }
      }

      body.dark .header-bg { opacity: 0.45; }
      body.dark .header-orb { filter: blur(56px); }

      /* ── Layout ── */
      .header-inner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 24px;
      }

      .header-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--ink);
        letter-spacing: -0.02em;
        white-space: nowrap;
      }
      .logo-image { flex-shrink: 0; }

      /* ── Nav links — clean & muted ── */
      .header-nav {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .nav-link {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--ink-muted);
        padding: 6px 12px;
        border-radius: var(--radius);
        transition: color var(--transition), background var(--transition);
        white-space: nowrap;
      }
      .nav-link:hover { color: var(--ink); background: rgba(26, 26, 46, 0.06); }
      body.dark .nav-link:hover { background: rgba(232, 228, 220, 0.08); }

      .nav-link.active-nav { color: var(--accent); font-weight: 600; }

      /* ── Colored SVG icons ── */
      .header-nav .nav-link-icon {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .header-nav .nav-link-icon svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform 0.2s ease;
        /* Do NOT set color here — inline stroke colors must win */
      }
      .header-nav .nav-link-icon:hover svg {
        transform: scale(1.12);
      }

      /* The "All Tools" icon is white — keep it white */
      .header-nav .nav-link-cta svg { color: #ffffff; }

      /* ── All Tools pill ── */
      .header-nav .nav-link-cta {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 12px;
        border-radius: 100px;
        background: var(--accent);
        color: #ffffff !important;
        font-weight: 600;
        font-size: 0.78rem;
        line-height: 1.15;
        border: 1px solid var(--accent);
        white-space: nowrap;
        transition: background var(--transition), box-shadow var(--transition), transform var(--transition);
        box-shadow: 0 1px 4px rgba(196, 86, 42, 0.18);
      }
      .header-nav .nav-link-cta:hover {
        background: var(--accent-light, #e8714a);
        border-color: var(--accent-light, #e8714a);
        color: #ffffff !important;
        transform: translateY(-1px);
        box-shadow: 0 3px 10px rgba(196, 86, 42, 0.28);
      }
      .header-nav .nav-link-cta.active-nav {
        background: var(--accent);
        color: #ffffff !important;
      }
      .header-nav .nav-link-cta svg { width: 12px; height: 12px; }

      .nav-link-blink { animation: allToolsBlink 2.4s ease-in-out infinite; }
      @keyframes allToolsBlink {
        0%, 100% { box-shadow: 0 1px 4px rgba(196, 86, 42, 0.18); }
        50%      { box-shadow: 0 1px 10px rgba(196, 86, 42, 0.32); }
      }
      @media (prefers-reduced-motion: reduce) { .nav-link-blink { animation: none; } }

      /* ── Right side controls ── */
      .header-right { display: flex; align-items: center; gap: 10px; }

      .lang-selector-wrapper { display: inline-flex; align-items: center; margin-right: 4px; }
      .lang-select {
        background-color: var(--paper);
        color: var(--ink);
        border: 1px solid var(--paper-edge);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 0.875rem;
        font-family: inherit;
        cursor: pointer;
        outline: none;
        width: auto;
        transition: border-color 0.2s, background-color 0.2s, color 0.2s;
      }
      .lang-select:hover, .lang-select:focus { border-color: var(--accent); }
      body.dark .lang-select {
        background-color: var(--paper);
        color: var(--ink);
        border-color: var(--paper-edge);
      }

      .header-dark-btn {
        width: 36px; height: 36px;
        border-radius: var(--radius);
        display: flex; align-items: center; justify-content: center;
        font-size: 1rem;
        color: var(--ink-muted);
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        transition: all var(--transition);
      }
      .header-dark-btn:hover { color: var(--ink); background: var(--paper-edge); }

      .header-cta {
        background: var(--ink);
        color: var(--paper);
        font-size: 0.875rem;
        font-weight: 600;
        padding: 8px 18px;
        border-radius: var(--radius);
        transition: background var(--transition), transform var(--transition);
        white-space: nowrap;
      }
      .header-cta:hover { background: var(--accent); color: #fff; transform: translateY(-1px); }
      body.dark .header-cta { background: var(--accent); color: var(--white); }
      body.dark .header-cta:hover { background: var(--accent-light); }

      .hamburger {
        display: none;
        width: 36px; height: 36px;
        align-items: center; justify-content: center;
        font-size: 1.25rem;
        color: var(--ink);
        border-radius: var(--radius);
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
      }

      /* ── Mobile nav ── */
      .mobile-nav {
        display: none;
        position: fixed;
        top: var(--app-header-h);
        left: 0; right: 0;
        background: var(--paper);
        border-bottom: 1px solid var(--paper-edge);
        padding: 16px 24px 24px;
        flex-direction: column;
        gap: 4px;
        z-index: 999;
        box-shadow: var(--shadow);
        max-height: calc(100vh - var(--app-header-h));
        overflow-y: auto;
      }
      .mobile-nav.open { display: flex; }
      .mobile-nav .nav-link { font-size: 1rem; padding: 10px 12px; }

      .mobile-dropdown { width: 100%; }
      .mobile-dropdown-btn {
        background: none; border: none; width: 100%;
        text-align: left; padding: 12px 20px;
        font-size: 1rem; cursor: pointer; color: var(--ink);
        font-family: var(--font-body); transition: color 0.2s;
      }
      .mobile-dropdown-btn:hover { color: var(--accent); }
      .mobile-dropdown-content {
        display: none; flex-direction: column;
        background-color: var(--paper-warm);
      }
      .mobile-dropdown-content.show { display: flex; }
      .mobile-dropdown-content a { display: block; color: var(--ink); transition: color 0.2s; }
      .mobile-dropdown-content a:hover { color: var(--accent); }

      body.dark .mobile-dropdown-btn { color: var(--ink); }
      body.dark .mobile-dropdown-btn:hover { color: var(--accent); }
      body.dark .mobile-dropdown-content { background-color: var(--paper-warm); }
      body.dark .mobile-dropdown-content a { color: var(--ink); }
      body.dark .mobile-dropdown-content a:hover { color: var(--accent); }

      /* ── Responsive ── */
      @media (max-width: 1100px) {
        .header-nav .nav-link-icon span { display: none; }
        .header-nav .nav-link-cta span { display: inline; }
      }

      @media (max-width: 768px) {
        .header-inner { padding: 0 8px; }
        .header-logo { gap: 6px; }
        .header-logo span { font-size: 0.85rem; font-weight: 600; white-space: nowrap; }
        .logo-image { width: 26px; height: 26px; }
        .header-nav { display: none; }
        .hamburger { display: flex; }
        .lang-select { width: 38px; padding: 2px 2px; font-size: 1rem; }
        .nav-link-blink { animation: none; }
        .header-nav .nav-link-icon svg { display: none; }
        .header-orb { filter: blur(40px); opacity: 0.4; }
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
