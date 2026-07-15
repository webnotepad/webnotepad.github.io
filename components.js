/**
 * WebNotePad — Combined Components
 * Includes: Header + Footer + Sidebar
 * Injected into #header-root, #footer-root, #tools-sidebar-root
 */

(function() {
  'use strict';

  // =============================================
  // PART 1: HEADER COMPONENT
  // =============================================
  function initHeader() {
    const headerHTML = `
      <header class="site-header" id="siteHeader" role="banner">
        <div class="container header-inner">
          <a href="/" class="header-logo" aria-label="WebNotePad Home">
            <img src="/logo.png" alt="WebNotePad Logo" class="logo-image" width="34" height="34" />
            <span>Notepad Online</span> 
          </a>

          <nav class="header-nav" aria-label="Main navigation">
            <a href="/" class="nav-link">Home</a>                
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
        <a href="/" class="nav-link">📝 Home</a>
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
        <a href="/diary" class="nav-link">📖 Diary</a>
        <a href="/mindmap" class="nav-link">🧠 MindMap</a>
        <a href="/list-maker" class="nav-link">✅ List Maker</a>
        <a href="/about" class="nav-link">ℹ️ About</a>
        <a href="/blog" class="nav-link">📝 Blog</a>      
        <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Notepad→</a>
      </nav>
    `;

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
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }
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

  // =============================================
  // PART 2: FOOTER COMPONENT
  // =============================================
  function initFooter() {
    const year = new Date().getFullYear();

    const footerHTML = `
      <footer class="site-footer" id="siteFooter" role="contentinfo">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">✦ Notepad Online</div>
              <p>The cleanest free online notepad. Write, save and organize your notes instantly in your browser — no signup, no ads, no complexity. Your thoughts, always safe.</p>
            </div>
            <div class="footer-col">
              <h4>Notepad</h4>
              <ul>
                <li><a href="/#notepad">Open Editor</a></li>
                <li><a href="/#features">Features</a></li>
                <li><a href="/#how-it-works">How It Works</a></li>
                <li><a href="/#use-cases">Use Cases</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Resources</h4>
              <ul>              
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Use</a></li>
                <li><a href="/diary">Online Diary</a></li>
                <li><a href="/mindmap">MindMap Online</a></li>
                <li><a href="/list-maker">List Maker</a></li>
              </ul>
            </div>          
            <div class="footer-col">
              <h4>More</h4>
              <ul>
                <li><a href="/case-converter">Case Converter</a></li>
                <li><a href="/random-text">Random Text</a></li>
                <li><a href="/word-shuffler">Shuffle Words</a></li>              
                <li><a href="/habit-tracker">Habit Tracker</a></li> 
                <li><a href="/pomodoro-timer">Pomodoro Timer</a></li>
                <li><a href="/choice-maker">Decision Maker</a></li>
                <li><a href="/study-planner">Study Planner</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span class="footer-copy">© ${year} WebNotePad · webnotepad.github.io · Free Online Notepad</span>
            <div class="footer-links">           
              <a href="sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    const root = document.getElementById('footer-root');
    if (!root) return;
    root.innerHTML = footerHTML;
  }

  // =============================================
  // PART 3: SIDEBAR COMPONENT
  // =============================================
  function initSidebar() {
    // 1. Array list of tools organized by categories
    const categories = [
      {
        name: "📝 Writing & Note-Taking",
        tools: [
          { name: "Notepad", icon: "📝", url: "/#notepad", desc: "Write, edit and auto-save notes instantly." },
          { name: "Diary", icon: "📖", url: "/diary", desc: "Keep a private daily journal with dated entries." },
          { name: "Focus Writer", icon: "🎯", url: "/focus-writer", desc: "Minimalist writing mode with a zen focus." }
        ]
      },
      {
        name: "📊 Text Analysis & Manipulation",
        tools: [
          { name: "Case Converter", icon: "🔤", url: "/case-converter", desc: "Transform text to uppercase, lowercase, etc." },
          { name: "Word Counter", icon: "📊", url: "/word-counter", desc: "Count words, characters, and sentences." },
          { name: "Readability Analyzer", icon: "📊", url: "/readability", desc: "Check reading ease and complexity scores." },
          { name: "Word Shuffler", icon: "🔀", url: "/word-shuffler", desc: "Randomize word order in any text." }
        ]
      },
      {
        name: "🧠 Idea Organization & Visualization",
        tools: [
          { name: "MindMap", icon: "🧠", url: "/mindmap", desc: "Visualize ideas and brainstorm interactively." },
          { name: "List Maker", icon: "✅", url: "/list-maker", desc: "Create checklists and to-dos with ease." }
        ]
      },
      {
        name: "🎲 Creativity & Randomization",
        tools: [
          { name: "Random Text", icon: "🎲", url: "/random-text", desc: "Generate placeholder paragraphs or words." },
          { name: "Word Cloud Generator", icon: "☁️", url: "/word-cloud", desc: "Turn text into a beautiful visual word cloud." },
          { name: "Decision Maker", icon: "⚖️", url: "/choice-maker", desc: "Spin a wheel or flip a coin to decide." }
        ]
      },
      {
        name: "🔍 Word & Puzzle Helpers",
        tools: [
          { name: "Word Finder", icon: "🔍", url: "/word-finder", desc: "Find words, solve anagrams, and discover terms." },
          { name: "Crossword Solver", icon: "🔠", url: "/crossword-solver", desc: "Clue helper, word finder, and puzzle help." },
          { name: "Word Search Solver", icon: "🕵🏻", url: "/word-search-solver", desc: "Word search solver, and word puzzle solver." }
        ]
      },
      {
        name: "⏳ Productivity & Habit Management",
        tools: [
          { name: "Pomodoro Timer", icon: "🍅", url: "/pomodoro-timer", desc: "Stay focused with customizable intervals." },
          { name: "Habit Tracker", icon: "📅", url: "/habit-tracker", desc: "Build streaks and track daily habits." }
        ]
      },
      {
        name: "😊 Fun & Utilities",
        tools: [
          { name: "Emoji Picker", icon: "🙂", url: "/emoji-picker", desc: "Pick emojis, and copy emojis." }
        ]
      }
    ];

    // 2. Inject CSS Styles
    const cssStyles = `
      .tools-floating-trigger {
        position: fixed;
        bottom: 50px;
        right: 24px;
        z-index: 9999;
        width: 52px;
        height: 52px;
        background: var(--ink);
        color: var(--paper);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        box-shadow: var(--shadow);
        cursor: pointer;
        border: 1px solid var(--paper-edge);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease, color 0.2s ease;
      }
      body.dark .tools-floating-trigger {
        background: var(--accent);
        color: var(--white);
      }
      .tools-floating-trigger:hover {
        transform: scale(1.08) rotate(15deg);
        background: var(--accent);
        color: var(--white);
      }
      .tools-floating-trigger.active {
        transform: scale(0.9) rotate(-90deg);
        background: var(--paper-warm);
        color: var(--ink);
      }
      .tools-fixed-sidebar {
        position: fixed;
        top: 0;
        right: -340px;
        width: 320px;
        height: 100vh;
        background: var(--paper);
        border-left: 1px solid var(--paper-edge);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .tools-fixed-sidebar.open {
        right: 0;
      }
      .tools-sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(26, 26, 46, 0.4);
        backdrop-filter: blur(4px);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      body.dark .tools-sidebar-overlay {
        background: rgba(0, 0, 0, 0.6);
      }
      .tools-sidebar-overlay.visible {
        opacity: 1;
        pointer-events: auto;
      }
      .tools-sb-header {
        padding: 20px 24px;
        border-bottom: 1px solid var(--paper-edge);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--paper-warm);
        flex-shrink: 0;
      }
      .tools-sb-header h2 {
        font-family: var(--font-display);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--ink);
      }
      .tools-sb-header h2 em {
        font-style: italic;
        color: var(--accent);
      }
      .tools-sb-close {
        width: 32px;
        height: 32px;
        font-size: 1rem;
        color: var(--ink-muted);
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--transition);
        background: none;
        border: none;
      }
      .tools-sb-close:hover {
        color: var(--ink);
        background: var(--paper-edge);
      }
      .tools-sb-body {
        flex: 1;
        overflow-y: auto;
        padding: 12px 16px 24px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tools-sb-category {
        font-family: var(--font-display);
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ink-muted);
        padding: 16px 6px 6px 6px;
        border-bottom: 1px solid var(--paper-edge);
        margin-top: 4px;
        opacity: 0.7;
      }
      .tools-sb-category:first-of-type {
        padding-top: 6px;
      }
      .tools-sb-item {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 10px 12px;
        border-radius: var(--radius);
        border: 1px solid transparent;
        background: transparent;
        transition: all var(--transition);
        opacity: 0;
        transform: translateX(20px);
        text-decoration: none;
        cursor: pointer;
      }
      .tools-fixed-sidebar.open .tools-sb-item {
        animation: slideInItem 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      .tools-sb-item:hover {
        background: var(--paper-warm);
        border-color: var(--paper-edge);
        transform: translateY(-1px);
      }
      .tools-sb-item-icon {
        font-size: 1.2rem;
        width: 34px;
        height: 34px;
        background: var(--paper-warm);
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--paper-edge);
        transition: background var(--transition);
        flex-shrink: 0;
      }
      .tools-sb-item:hover .tools-sb-item-icon {
        background: var(--accent-pale);
      }
      body.dark .tools-sb-item:hover .tools-sb-item-icon {
        background: rgba(196,86,42,0.15);
      }
      .tools-sb-item-details {
        flex: 1;
        min-width: 0;
      }
      .tools-sb-item-name {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--ink);
        margin-bottom: 1px;
      }
      .tools-sb-item-desc {
        font-size: 0.74rem;
        color: var(--ink-muted);
        line-height: 1.3;
      }
      .tools-sb-category-count {
        font-size: 0.6rem;
        font-weight: 400;
        color: var(--ink-muted);
        opacity: 0.5;
        margin-left: 6px;
      }
      .tools-sb-body::-webkit-scrollbar {
        width: 4px;
      }
      .tools-sb-body::-webkit-scrollbar-track {
        background: transparent;
      }
      .tools-sb-body::-webkit-scrollbar-thumb {
        background: var(--paper-edge);
        border-radius: 4px;
      }
      @keyframes slideInItem {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @media (max-width: 480px) {
        .tools-fixed-sidebar {
          width: 100%;
          right: -100%;
        }
        .tools-fixed-sidebar.open {
          right: 0;
        }
        .tools-sb-header h2 {
          font-size: 1rem;
        }
        .tools-sb-item {
          padding: 8px 10px;
        }
        .tools-sb-item-name {
          font-size: 0.82rem;
        }
      }
    `;

    const styleEl = document.createElement("style");
    styleEl.textContent = cssStyles;
    document.head.appendChild(styleEl);

    const rootContainer = document.getElementById("tools-sidebar-root");
    if (!rootContainer) return;

    rootContainer.innerHTML = `
      <div class="tools-sidebar-overlay" id="toolsSidebarOverlay"></div>
      <div class="tools-floating-trigger" id="toolsSidebarTrigger" title="Explore Toolkit" aria-label="Toggle structural toolkit">🧰</div>
      <aside class="tools-fixed-sidebar" id="toolsFixedSidebar" aria-label="WebNotepad Toolkit Sidebar">
        <div class="tools-sb-header">
          <h2>WebNotepad <em>Toolkit</em></h2>
          <button class="tools-sb-close" id="toolsSidebarClose" aria-label="Close toolkit">✕</button>
        </div>
        <div class="tools-sb-body" id="toolsSidebarBody"></div>
      </aside>
    `;

    const sidebarBody = document.getElementById("toolsSidebarBody");
    const sidebar = document.getElementById("toolsFixedSidebar");
    const trigger = document.getElementById("toolsSidebarTrigger");
    const overlay = document.getElementById("toolsSidebarOverlay");
    const closeBtn = document.getElementById("toolsSidebarClose");

    let toolIndex = 0;

    categories.forEach((category) => {
      const catHeader = document.createElement("div");
      catHeader.className = "tools-sb-category";
      catHeader.textContent = category.name;
      sidebarBody.appendChild(catHeader);

      category.tools.forEach((tool) => {
        const item = document.createElement("a");
        item.href = tool.url;
        item.className = "tools-sb-item";
        item.style.animationDelay = `${toolIndex * 0.025}s`;

        item.innerHTML = `
          <div class="tools-sb-item-icon">${tool.icon}</div>
          <div class="tools-sb-item-details">
            <div class="tools-sb-item-name">${tool.name}</div>
            <div class="tools-sb-item-desc">${tool.desc}</div>
          </div>
        `;
        sidebarBody.appendChild(item);
        toolIndex++;
      });
    });

    function toggleSidebar() {
      const isOpen = sidebar.classList.toggle("open");
      trigger.classList.toggle("active", isOpen);
      overlay.classList.toggle("visible", isOpen);
      trigger.innerHTML = isOpen ? "✕" : "🧰";

      if (isOpen) {
        const items = sidebarBody.querySelectorAll(".tools-sb-item");
        items.forEach((item, idx) => {
          item.style.animation = "none";
          item.offsetHeight;
          item.style.animation = `slideInItem 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
          item.style.animationDelay = `${idx * 0.025}s`;
        });
      }
    }

    function closeSidebar() {
      sidebar.classList.remove("open");
      trigger.classList.remove("active");
      overlay.classList.remove("visible");
      trigger.innerHTML = "🧰";
    }

    trigger.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", closeSidebar);
    closeBtn.addEventListener("click", closeSidebar);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSidebar();
    });
  }

  // =============================================
  // INITIALIZATION
  // =============================================
  function initAll() {
    initHeader();
    initFooter();
    initSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
