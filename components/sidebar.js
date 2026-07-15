/**
 * WebNotePad — sidebar.js
 * Injects a fixed dynamic sidebar for the 15 productive tools
 * Theme: Editorial / Ink-on-paper aesthetic
 * Updated: Category-wise organization
 */

(function () {
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

  // Flatten tools for any potential use
  const allTools = categories.flatMap(cat => cat.tools);

  // 2. Inject CSS Styles with category enhancements
  const cssStyles = `
    /* Floating Launch Trigger Button */
    .tools-floating-trigger {
      position: fixed;
      bottom: 120px;
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

    /* Fixed Sidebar Layout Container */
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

    /* Dimmed Background Backdrop Overlay */
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

    /* Sidebar Header Details */
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

    /* Scrollable items menu wrapper */
    .tools-sb-body {
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Category Section Headers */
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

    /* Single Tool Items Card Styling & Animation */
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

    /* Category item count badge */
    .tools-sb-category-count {
      font-size: 0.6rem;
      font-weight: 400;
      color: var(--ink-muted);
      opacity: 0.5;
      margin-left: 6px;
    }

    /* Scrollbar styling */
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

    /* Keyframe Animations */
    @keyframes slideInItem {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Responsive adjustments */
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

  // 3. Inject styles into document head
  const styleEl = document.createElement("style");
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 4. Generate the complete DOM structural markup dynamically
  const rootContainer = document.getElementById("tools-sidebar-root");
  if (!rootContainer) return;

  // Render the floating toggle switch, backdrop container, and sidebar dashboard
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

  // 5. Populate list items with categories and staggered animations
  let toolIndex = 0;

  categories.forEach((category) => {
    // Add category header
    const catHeader = document.createElement("div");
    catHeader.className = "tools-sb-category";
    catHeader.textContent = category.name;
    sidebarBody.appendChild(catHeader);

    // Add tools under this category
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

  // 6. Active Structural Interface Controls and Handlers
  function toggleSidebar() {
    const isOpen = sidebar.classList.toggle("open");
    trigger.classList.toggle("active", isOpen);
    overlay.classList.toggle("visible", isOpen);
    trigger.innerHTML = isOpen ? "✕" : "🧰";

    // Re-trigger animations when opening
    if (isOpen) {
      const items = sidebarBody.querySelectorAll(".tools-sb-item");
      items.forEach((item, idx) => {
        item.style.animation = "none";
        item.offsetHeight; // trigger reflow
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

  // Bind Listeners
  trigger.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", closeSidebar);
  closeBtn.addEventListener("click", closeSidebar);

  // Close interface gracefully via the Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
})();
