/**
 * WebNotePad — Header Component (Colorful Edition)
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

  // ── Desktop nav SVG icons ──
  const NAV_ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 3l9 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-5.5h4V21h3.5a1 1 0 0 0 1-1V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    diary: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="15" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3v18" stroke="currentColor" stroke-width="1.8"/><path d="M11 8h5M11 12h5M11 16h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    mindmap: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.8"/><circle cx="5" cy="6" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="6" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="5" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><path d="M10 11L6.2 7.2M14 11l3.8-3.8M10 13l-3.8 3.8M14 13l3.8 3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><rect x="7" y="7" width="3" height="3" rx="0.5" stroke="currentColor" stroke-width="1.4"/><path d="M7.6 8.5l1 1 1.6-1.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    allTools: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
    games: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="6" y1="11" x2="10" y2="11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="8" y1="9" x2="8" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="15" cy="12" r="0.9" fill="currentColor"/><circle cx="18" cy="10" r="0.9" fill="currentColor"/></svg>`
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
      <div class="container header-inner">
        <a href="/" class="header-logo" aria-label="WebNotePad Home">
          <span class="logo-badge">✎</span>
          <span class="logo-text">Notepad<span class="logo-accent">Online</span></span>
        </a>

        <nav class="header-nav" aria-label="Main navigation">
          <a href="/" class="nav-link nav-link-icon nav-home">${NAV_ICONS.home}<span>Home</span></a>                
          <a href="/diary" class="nav-link nav-link-icon nav-diary">${NAV_ICONS.diary}<span>Diary</span></a>          
          <a href="/list-maker" class="nav-link nav-link-icon nav-list">${NAV_ICONS.list}<span>List Maker</span></a>
          <a href="/all-tools" class="nav-link nav-link-cta nav-link-blink nav-link-icon">${NAV_ICONS.allTools}<span>All Tools</span></a>
          <a href="/games" class="nav-link nav-link-icon nav-games">${NAV_ICONS.games}<span>Games</span></a>
          <a href="/blog" class="nav-link nav-blog">Blog</a>
          <a href="/about" class="nav-link nav-about">About</a>   
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
        const targetPrefix = e.target.value;
        window.location.href = getLocalizedUrl(targetPrefix);
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

    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdownBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const content = btn.nextElementSibling;
        if (content) {
          content.classList.toggle('show');
          btn.setAttribute('aria-expanded', content.classList.contains('show'));
          if (btn.textContent.includes('▼')) {
            btn.textContent = btn.textContent.replace('▼', '▲');
          } else if (btn.textContent.includes('▲')) {
            btn.textContent = btn.textContent.replace('▲', '▼');
          }
        }
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
            } else if (link.classList) {
              link.classList.remove('active-nav');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => observer.observe(s));

    // ── Styles ──
    const style = document.createElement('style');
    style.textContent = `
      /* =========================================
         COLORFUL HEADER STYLES
         ========================================= */
      
      .site-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        height: var(--app-header-h);
        background: linear-gradient(135deg, #ffffff 0%, #fef9f3 50%, #fdf2eb 100%);
        border-bottom: 2px solid transparent;
        border-image: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981) 1;
        display: flex;
        align-items: center;
        backdrop-filter: blur(12px);
        transition: background var(--transition), border-color var(--transition);
        box-shadow: 0 2px 20px rgba(196, 86, 42, 0.08);
      }

      body.dark .site-header {
        background: linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #1e1e3a 100%);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
      }

      /* ── Logo with colorful badge ── */
      .header-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-display);
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--ink);
        letter-spacing: -0.02em;
        text-decoration: none;
      }

      .logo-badge {
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6);
        color: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        flex-shrink: 0;
      }

      .header-logo:hover .logo-badge {
        transform: rotate(-8deg) scale(1.08);
        box-shadow: 0 6px 20px rgba(236, 72, 153, 0.45);
      }

      .logo-text {
        color: var(--ink);
        transition: color 0.2s ease;
      }

      .logo-accent {
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
      }

      /* ── Nav links with colorful hover ── */
      .header-nav {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .nav-link {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--ink-muted);
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      .nav-link:hover {
        color: var(--ink);
        background: transparent;
        transform: translateY(-1px);
      }

      /* Individual nav link hover colors */
      .nav-home:hover { color: #3b82f6; background: rgba(59, 130, 246, 0.08); }
      .nav-diary:hover { color: #8b5cf6; background: rgba(139, 92, 246, 0.08); }
      .nav-list:hover { color: #10b981; background: rgba(16, 185, 129, 0.08); }
      .nav-games:hover { color: #ec4899; background: rgba(236, 72, 153, 0.08); }
      .nav-blog:hover { color: #f59e0b; background: rgba(245, 158, 11, 0.08); }
      .nav-about:hover { color: #06b6d4; background: rgba(6, 182, 212, 0.08); }

      /* ── Icon nav links ── */
      .header-nav .nav-link-icon {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .header-nav .nav-link-icon svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform 0.25s ease;
        color: inherit;
      }

      .header-nav .nav-link-icon:hover svg {
        transform: scale(1.15) rotate(-3deg);
      }

      /* ── All Tools CTA — vibrant gradient pill ── */
      .header-nav .nav-link-cta {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 14px;
        border-radius: 100px;
        background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
        color: #ffffff !important;
        font-weight: 600;
        font-size: 0.78rem;
        line-height: 1.15;
        border: none;
        white-space: nowrap;
        transition: all 0.25s ease;
        box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
      }

      .header-nav .nav-link-cta:hover {
        background: linear-gradient(135deg, #db2777 0%, #7c3aed 100%);
        color: #ffffff !important;
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 6px 20px rgba(236, 72, 153, 0.45);
      }

      .header-nav .nav-link-cta.active-nav {
        background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
        color: #ffffff !important;
      }

      .header-nav .nav-link-cta svg {
        width: 12px;
        height: 12px;
        color: #ffffff;
      }

      .nav-link-blink {
        animation: allToolsBlink 2s ease-in-out infinite;
      }

      @keyframes allToolsBlink {
        0%, 100% {
          box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
        }
        50% {
          box-shadow: 0 2px 20px rgba(236, 72, 153, 0.6), 0 0 0 4px rgba(236, 72, 153, 0.1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-link-blink { animation: none; }
        .header-logo:hover .logo-badge { transform: none; }
        .header-nav .nav-link-icon:hover svg { transform: none; }
      }

      /* ── Header right area ── */
      .header-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* ── Language selector ── */
      .lang-selector-wrapper {
        display: inline-flex;
        align-items: center;
        margin-right: 4px;
      }

      .lang-select {
        background-color: #ffffff;
        color: var(--ink);
        border: 2px solid #e8e2d6;
        border-radius: 8px;
        padding: 5px 10px;
        font-size: 0.85rem;
        font-family: inherit;
        cursor: pointer;
        outline: none;
        width: auto;
        transition: all 0.25s ease;
      }

      .lang-select:hover, .lang-select:focus {
        border-color: #8b5cf6;
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
      }

      body.dark .lang-select {
        background-color: #2a2a3e;
        color: var(--ink);
        border-color: #3a3a4e;
      }

      body.dark .lang-select:hover,
      body.dark .lang-select:focus {
        border-color: #a78bfa;
      }

      /* ── Dark mode toggle button ── */
      .header-dark-btn {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: var(--ink-muted);
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border: 2px solid #f59e0b;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
      }

      .header-dark-btn:hover {
        transform: rotate(15deg) scale(1.1);
        box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
        border-color: #d97706;
      }

      body.dark .header-dark-btn {
        background: linear-gradient(135deg, #312e81, #1e1b4b);
        border-color: #6366f1;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }

      body.dark .header-dark-btn:hover {
        box-shadow: 0 4px 16px rgba(99, 102, 241, 0.5);
      }

      /* ── CTA button — vibrant gradient ── */
      .header-cta {
        background: linear-gradient(135deg, #f59e0b, #ec4899);
        color: #ffffff;
        font-size: 0.875rem;
        font-weight: 700;
        padding: 9px 20px;
        border-radius: 10px;
        transition: all 0.25s ease;
        box-shadow: 0 3px 14px rgba(236, 72, 153, 0.3);
        border: none;
        letter-spacing: 0.01em;
      }

      .header-cta:hover {
        background: linear-gradient(135deg, #d97706, #db2777);
        transform: translateY(-2px);
        box-shadow: 0 6px 22px rgba(236, 72, 153, 0.5);
        color: #ffffff;
      }

      body.dark .header-cta {
        background: linear-gradient(135deg, #f59e0b, #ec4899);
        color: #ffffff;
      }

      /* ── Hamburger ── */
      .hamburger {
        display: none;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: var(--ink);
        border-radius: 10px;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border: 2px solid #f59e0b;
        transition: all 0.25s ease;
      }

      .hamburger:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
      }

      /* ── Mobile nav ── */
      .mobile-nav {
        display: none;
        position: fixed;
        top: var(--app-header-h);
        left: 0;
        right: 0;
        background: linear-gradient(180deg, #ffffff 0%, #fef9f3 100%);
        border-bottom: 2px solid transparent;
        border-image: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981) 1;
        padding: 16px 24px 24px;
        flex-direction: column;
        gap: 4px;
        z-index: 999;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        max-height: calc(100vh - var(--app-header-h));
        overflow-y: auto;
      }

      body.dark .mobile-nav {
        background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%);
      }

      .mobile-nav.open {
        display: flex;
      }

      .mobile-nav .nav-link {
        font-size: 1rem;
        padding: 10px 12px;
        border-radius: 8px;
      }

      .mobile-nav .nav-link:hover {
        background: rgba(139, 92, 246, 0.08);
      }

      /* Mobile dropdown */
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
        border-radius: 8px;
      }

      .mobile-dropdown-btn:hover {
        color: #8b5cf6;
        background: rgba(139, 92, 246, 0.06);
      }

      .mobile-dropdown-content {
        display: none;
        flex-direction: column;
        background-color: var(--paper-warm);
        border-radius: 8px;
        margin: 4px 0;
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
        color: #8b5cf6;
      }

      body.dark .mobile-dropdown-btn {
        color: var(--ink);
      }

      body.dark .mobile-dropdown-btn:hover {
        color: #a78bfa;
      }

      body.dark .mobile-dropdown-content {
        background-color: #2a2a3e;
      }

      body.dark .mobile-dropdown-content a {
        color: var(--ink);
      }

      body.dark .mobile-dropdown-content a:hover {
        color: #a78bfa;
      }

      /* ── Responsive ── */
      @media (max-width: 1100px) {
        .header-nav .nav-link-icon span {
          display: none;
        }
        .header-nav .nav-link-icon {
          padding: 8px 10px;
        }
        .header-nav .nav-link-cta span {
          display: inline;
        }
      }

      @media (max-width: 768px) {
        .header-inner {
          padding: 0 8px;
        }
        .header-logo {
          gap: 6px;
        }
        .logo-badge {
          width: 32px;
          height: 32px;
          font-size: 1rem;
        }
        .logo-text {
          font-size: 0.9rem;
        }
        .header-nav {
          display: none;
        }
        .hamburger {
          display: flex;
        }
        .lang-select {
          width: 42px;
          padding: 4px 4px;
          font-size: 1rem;
          text-align: center;
        }
        .header-cta {
          padding: 7px 14px;
          font-size: 0.78rem;
        }
        .nav-link-blink {
          animation: none;
        }
        .header-nav .nav-link-icon svg {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .logo-text {
          font-size: 0.8rem;
        }
        .logo-badge {
          width: 28px;
          height: 28px;
          font-size: 0.9rem;
        }
        .header-dark-btn {
          width: 34px;
          height: 34px;
          font-size: 0.95rem;
        }
        .header-cta {
          display: none;
        }
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
