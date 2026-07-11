/**
 * WebNotePad — sidebar.js
 * Injects a fixed dynamic sidebar for the 15 productive tools
 * Theme: Editorial / Ink-on-paper aesthetic
 */

(function () {
  // 1. Array list of all 15 productive tools matching the exact layout and icons
  const toolsList = [
    { name: "Notepad", icon: "📝", url: "/#notepad", desc: "Write, edit and auto-save notes instantly." },
    { name: "Diary", icon: "📖", url: "/diary", desc: "Keep a private daily journal with dated entries." },
    { name: "MindMap", icon: "🧠", url: "/mindmap", desc: "Visualize ideas and brainstorm interactively." },
    { name: "List Maker", icon: "✅", url: "/list-maker", desc: "Create checklists and to-dos with ease." },
    { name: "Case Converter", icon: "🔤", url: "/case-converter", desc: "Transform text to uppercase, lowercase, etc." },
    { name: "Random Text", icon: "🎲", url: "/random-text", desc: "Generate placeholder paragraphs or words." },
    { name: "Word Shuffler", icon: "🔀", url: "/word-shuffler", desc: "Randomize word order in any text." },
    { name: "Word Cloud Generator", icon: "☁️", url: "/word-cloud", desc: "Turn text into a beautiful visual word cloud." },
    { name: "Readability Analyzer", icon: "📊", url: "/readability", desc: "Check reading ease and complexity scores." },
    { name: "Focus Writer", icon: "🎯", url: "/focus-writer", desc: "Minimalist writing mode with a zen focus." },
    { name: "Pomodoro Timer", icon: "🍅", url: "/pomodoro-timer", desc: "Stay focused with customizable intervals." },
    { name: "Habit Tracker", icon: "📅", url: "/habit-tracker", desc: "Build streaks and track daily habits." },
    { name: "Decision Maker", icon: "⚖️", url: "/choice-maker", desc: "Spin a wheel or flip a coin to decide." },
    { name: "Word Finder", icon: "🔍", url: "/word-finder", desc: "Find words, solve anagrams, and discover terms." },
    { name: "Word Counter", icon: "📊", url: "/word-counter", desc: "Count words, characters, and sentences." }
  ];

  // 2. Inject CSS Styles to perfectly match theme parameters and handle matching transitions
  const cssStyles = `
    /* Floating Launch Trigger Button */
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
    }
    .tools-sb-close:hover {
      color: var(--ink);
      background: var(--paper-edge);
    }

    /* Scrollable items menu wrapper */
    .tools-sb-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Single Tool Items Card Styling & Animation */
    .tools-sb-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 14px;
      border-radius: var(--radius);
      border: 1px solid transparent;
      background: transparent;
      transition: all var(--transition);
      opacity: 0;
      transform: translateX(20px);
    }
    .tools-fixed-sidebar.open .tools-sb-item {
      animation: slideInItem 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .tools-sb-item:hover {
      background: var(--paper-warm);
      border-color: var(--paper-edge);
      transform: translateY(-2px);
    }
    .tools-sb-item-icon {
      font-size: 1.3rem;
      width: 38px;
      height: 38px;
      background: var(--paper-warm);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--paper-edge);
      transition: background var(--transition);
    }
    .tools-sb-item:hover .tools-sb-item-icon {
      background: var(--accent-pale);
    }
    body.dark .tools-sb-item:hover .tools-sb-item-icon {
      background: rgba(196,86,42,0.15);
    }
    .tools-sb-item-details {
      flex: 1;
    }
    .tools-sb-item-name {
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 2px;
    }
    .tools-sb-item-desc {
      font-size: 0.78rem;
      color: var(--ink-muted);
      line-height: 1.4;
    }

    /* Keyframe Animations */
    @keyframes slideInItem {
      to {
        opacity: 1;
        transform: translateX(0);
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

  // Populate list items with structural offsets for sequence animation cascading
  toolsList.forEach((tool, idx) => {
    const itemA = document.createElement("a");
    itemA.href = tool.url;
    itemA.className = "tools-sb-item";
    itemA.style.animationDelay = `${idx * 0.03}s`; // Micro-staggered sequence

    itemA.innerHTML = `
      <div class="tools-sb-item-icon">${tool.icon}</div>
      <div class="tools-sb-item-details">
        <div class="tools-sb-item-name">${tool.name}</div>
        <div class="tools-sb-item-desc">${tool.desc}</div>
      </div>
    `;
    sidebarBody.appendChild(itemA);
  });

  // 5. Active Structural Interface Controls and Handlers
  function toggleSidebar() {
    const isOpen = sidebar.classList.toggle("open");
    trigger.classList.toggle("active", isOpen);
    overlay.classList.toggle("visible", isOpen);
    trigger.innerHTML = isOpen ? "✕" : "🧰";
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
