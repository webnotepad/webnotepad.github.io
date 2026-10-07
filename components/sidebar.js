/**
 * WebNotePad — sidebar.js
 * Injects a fixed dynamic sidebar for the productive tools
 * Theme: Editorial / Ink-on-paper aesthetic
 */

(function () {
  // 1. Array list of tools organized by categories with colorful SVG icons
  const categories = [
    {
      name: "📝 Writing & Note-Taking",
      tools: [
        {
          name: "Notepad",
          url: "/#notepad",
          desc: "Write, edit and auto-save notes instantly.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round"/></svg>`
        },
        {
          name: "Diary",
          url: "/diary",
          desc: "Keep a private daily journal with dated entries.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="14" height="18" rx="2" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5"/><rect x="7" y="3" width="1.5" height="18" fill="#3B82F6"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#3B82F6" stroke-width="1.6" stroke-linecap="round"/></svg>`
        },
        {
          name: "Focus Writer",
          url: "/focus-writer",
          desc: "Minimalist writing mode with a zen focus.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#8B5CF6"/></svg>`
        },
        {
          name: "Typing Test",
          url: "/typing-test",
          desc: "Test your typing speed and accuracy in WPM.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>`
        },
        {
          name: "WordPad",
          url: "/wordpad",
          desc: "Rich text editor with fonts, colors, and export.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="17" r="3" fill="#22C55E" opacity="0.2"/></svg>`
        }
      ]
    },
    {
      name: "📊 Text Analysis & Manipulation",
      tools: [
        {
          name: "Case Converter",
          url: "/case-converter",
          desc: "Transform text to uppercase, lowercase, etc.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FFF7ED" stroke="#F97316" stroke-width="1.5"/><path d="M7 9v6M7 12h3M10 9v6M14 12l2-3 2 3M14 12v3M18 12v3" stroke="#F97316" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        },
        {
          name: "Word Counter",
          url: "/word-counter",
          desc: "Count words, characters, and sentences.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="#0EA5E9" stroke-width="1.7" stroke-linecap="round"/><circle cx="17" cy="17" r="4" fill="#0EA5E9" opacity="0.15"/></svg>`
        },
        {
          name: "Readability Analyzer",
          url: "/readability",
          desc: "Check reading ease and complexity scores.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6a8 8 0 0 1 16 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" fill="#F3E8FF" stroke="#A855F7" stroke-width="1.5"/><path d="M8 10h8M8 14h5" stroke="#A855F7" stroke-width="1.7" stroke-linecap="round"/></svg>`
        },
        {
          name: "Word Shuffler",
          url: "/word-shuffler",
          desc: "Randomize word order in any text.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="15" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="9" y="14" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><path d="M6 10v2a2 2 0 0 0 2 2h1M18 10v2a2 2 0 0 1-2 2h-1" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/></svg>`
        },
        {
          name: "Special Character Converter",
          url: "/special-character-converter",
          desc: "Convert umlauts, diacritics, and special characters.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#EAB308" stroke-width="1.5"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#EAB308" font-family="serif">ä</text></svg>`
        }
      ]
    },
    {
      name: "🧠 Idea Organization & Visualization",
      tools: [
        {
          name: "MindMap",
          url: "/mindmap",
          desc: "Visualize ideas and brainstorm interactively.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="#C7D2FE" stroke="#6366F1" stroke-width="1.5"/><circle cx="5" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="5" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><path d="M10 11L6.5 7.5M14 11l3.5-3.5M10 13l-3.5 3.5M14 13l3.5 3.5" stroke="#6366F1" stroke-width="1.4" stroke-linecap="round"/></svg>`
        },
        {
          name: "List Maker",
          url: "/list-maker",
          desc: "Create checklists and to-dos with ease.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="7" y="7" width="3" height="3" rx="0.5" fill="#16A34A"/><path d="M7.5 8.5l1 1 1.5-1.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/></svg>`
        }
      ]
    },
    {
      name: "🎲 Creativity & Randomization",
      tools: [
        {
          name: "Random Text",
          url: "/random-text",
          desc: "Generate placeholder paragraphs or words.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/><path d="M7 9h4M7 12h7M7 15h5M15 9h2M14 15h3" stroke="#DB2777" stroke-width="1.6" stroke-linecap="round"/></svg>`
        },
        {
          name: "Word Cloud Generator",
          url: "/word-cloud",
          desc: "Turn text into a beautiful visual word cloud.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 16a4 4 0 0 1 .5-8 5 5 0 0 1 9.5-1.5A4.5 4.5 0 0 1 18 16H6z" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5" stroke-linejoin="round"/><text x="12" y="14" text-anchor="middle" font-size="7" font-weight="bold" fill="#0284C7" font-family="sans-serif">abc</text></svg>`
        },
        {
          name: "Decision Maker",
          url: "/choice-maker",
          desc: "Spin a wheel or flip a coin to decide.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M12 12V3M12 12l7.5 4.5M12 12l-7.5 4.5" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#D97706"/></svg>`
        },
        {
          name: "Random Name Generator",
          url: "/random-name-generator",
          desc: "Generate random first, last, and full names.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M4 20a8 8 0 0 1 16 0" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/></svg>`
        }
      ]
    },
    {
      name: "🔍 Word & Puzzle Helpers",
      tools: [
        {
          name: "Word Finder",
          url: "/word-finder",
          desc: "Find words, solve anagrams, and discover terms.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" r="6.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.6"/><path d="M15.5 15.5L21 21" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>`
        },
        {
          name: "Crossword Solver",
          url: "/crossword-solver",
          desc: "Clue helper, word finder, and puzzle help.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="3" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="3" y="10" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="14" y="14" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="10" width="7" height="7" fill="#fff" stroke="#4F46E5" stroke-width="1.3"/></svg>`
        },
        {
          name: "Word Search Solver",
          url: "/word-search-solver",
          desc: "Word search solver, and word puzzle solver.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/><path d="M6 9h3M9 6v6M14 8h4M14 12h4M14 16h4M6 15h3M6 18h3" stroke="#9333EA" stroke-width="1.4" stroke-linecap="round"/></svg>`
        }
      ]
    },
    {
      name: "⏳ Productivity & Habit Management",
      tools: [
        {
          name: "Pomodoro Timer",
          url: "/pomodoro-timer",
          desc: "Stay focused with customizable intervals.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="13" r="8" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.6"/><path d="M12 13V8M12 13l3 2" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/><path d="M9 3h6" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/></svg>`
        },
        {
          name: "Habit Tracker",
          url: "/habit-tracker",
          desc: "Build streaks and track daily habits.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="17" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/><path d="M3 9h18" stroke="#10B981" stroke-width="1.5"/><path d="M7 2v4M17 2v4" stroke="#10B981" stroke-width="1.7" stroke-linecap="round"/><path d="M8 14l2 2 4-4" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        }
      ]
    },
    {
      name: "😊 Fun & Utilities",
      tools: [
        {
          name: "Emoji Picker",
          url: "/emoji-picker",
          desc: "Pick emojis, and copy emojis.",
          svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#FACC15" stroke-width="1.6"/><circle cx="9" cy="10" r="1.2" fill="#854D0E"/><circle cx="15" cy="10" r="1.2" fill="#854D0E"/><path d="M8 14c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" stroke="#854D0E" stroke-width="1.5" stroke-linecap="round"/></svg>`
        }
      ]
    }
  ];

  // 2. Newly added tools beside top advertisement
  const newLeftTools = [
    {
      name: "Invoice Generator",
      url: "/invoice-generator",
      desc: "Create & export PDF invoices.",
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M8 7h8M8 11h5M8 15h8" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="15" cy="11" r="1.5" fill="#D97706"/></svg>`
    },
    {
      name: "Click Speed Test",
      url: "/click-speed-test",
      desc: "Measure CPS speed test rate.",
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/><path d="M9 3h6" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/></svg>`
    },
    {
      name: "Text Diff",
      url: "/text-diff",
      desc: "Compare two texts line by line.",
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="8" height="16" rx="1.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><path d="M6 8h2M6 12h2M16 8h2M16 12h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`
    }
  ];

  const newRightTools = [
    {
      name: "Bionic Reader",
      url: "/bionic-reader",
      desc: "Faster text reading with bold cues.",
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 8h10M7 12h8M7 16h10" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round"/></svg>`
    },
    {
      name: "Teleprompter",
      url: "/teleprompter",
      desc: "Smooth auto-scrolling prompt text.",
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/><path d="M12 8v8M9 13l3 3 3-3" stroke="#0D9488" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
  ];

  // 3. Inject CSS Styles
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
      box-shadow: var(--shadow);
      cursor: pointer;
      border: 1px solid var(--paper-edge);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease, color 0.2s ease, box-shadow 0.3s ease;
      animation: attentionPulse 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
    }
    .tools-floating-trigger svg {
      width: 24px;
      height: 24px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.dark .tools-floating-trigger {
      background: var(--accent);
      color: var(--white);
    }
    .tools-floating-trigger:hover {
      transform: scale(1.08) rotate(15deg);
      background: var(--accent);
      color: var(--white);
      animation-play-state: paused;
      box-shadow: 0 8px 24px rgba(196, 86, 42, 0.3);
    }
    .tools-floating-trigger.active {
      transform: scale(0.9) rotate(-90deg);
      background: var(--paper-warm);
      color: var(--ink);
      animation: none;
      box-shadow: none;
    }
    .tools-floating-trigger.active svg {
      transform: rotate(90deg);
    }

    /* Fixed Sidebar — ~55vw on desktop */
    .tools-fixed-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 55vw;
      max-width: 100vw;
      min-width: 660px;
      height: 100vh;
      background: var(--paper);
      border-left: 1px solid var(--paper-edge);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      visibility: hidden;
    }
    .tools-fixed-sidebar.open {
      transform: translateX(0);
      visibility: visible;
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
      padding: 22px 32px;
      border-bottom: 1px solid var(--paper-edge);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--paper-warm);
      flex-shrink: 0;
    }
    .tools-sb-header h2 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--ink);
    }
    .tools-sb-header h2 em {
      font-style: italic;
      color: var(--accent);
    }
    .tools-sb-close {
      width: 34px;
      height: 34px;
      font-size: 1.05rem;
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

    /* ---- Top Section & Improved Spacing ---- */
    .tools-sb-top-section {
      flex-shrink: 0;
      padding: 18px 24px 16px;
      border-bottom: 1px solid var(--paper-edge);
      background: var(--paper);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .tools-sb-top-grid {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px; /* Increased desktop gap between ad and tool columns */
      width: 100%;
    }
    .tools-sb-side-tools {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      max-width: 160px;
    }
    .tools-sb-ad {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      margin: 0 4px; /* Extra margin around ad */
    }
    .tools-sb-ad-label {
      font-family: var(--font-display);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink-muted);
      opacity: 0.55;
    }
    .tools-sb-ad-frame {
      width: 300px;
      max-width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--paper-warm);
      border: 1px solid var(--paper-edge);
    }
    .tools-sb-ad-frame iframe,
    .tools-sb-ad-frame img,
    .tools-sb-ad-frame > div {
      max-width: 100%;
      border: 0;
      display: block;
    }

    /* Newly Added Badge & Items */
    .tools-sb-new-item {
      padding: 10px 8px 8px;
      border-radius: var(--radius);
      border: 1px solid var(--paper-edge);
      background: var(--paper-warm);
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 4px;
      position: relative;
      transition: all var(--transition);
    }
    .tools-sb-new-item:hover {
      background: var(--paper);
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .tools-sb-badge {
      position: absolute;
      top: -6px;
      right: 6px;
      background: #EF4444;
      color: #FFF;
      font-size: 0.52rem;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .tools-sb-new-item-icon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tools-sb-new-item-icon svg {
      width: 22px;
      height: 22px;
    }
    .tools-sb-new-item-name {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--ink);
      line-height: 1.1;
    }
    .tools-sb-new-item-desc {
      font-size: 0.58rem;
      color: var(--ink-muted);
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* In-feed ad slot — spans both category columns */
    .tools-sb-ad-infeed {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 16px 0;
      margin: 8px 0;
      border-top: 1px dashed var(--paper-edge);
      border-bottom: 1px dashed var(--paper-edge);
      min-height: 286px; /* Space reservation so lazy load doesn't collapse */
    }
    .tools-sb-ad-infeed .tools-sb-ad-label {
      align-self: center;
      text-align: center;
    }
    .tools-sb-ad-infeed .tools-sb-ad-frame {
      background: var(--paper);
    }

    /* Scrollable body — categories in TWO COLUMNS */
    .tools-sb-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 28px 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px 24px;
      align-content: start;
      overscroll-behavior: contain;
    }

    /* Category block */
    .tools-sb-category-block {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;
    }

    /* Category Section Headers */
    .tools-sb-category {
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--ink-muted);
      padding-bottom: 8px;
      border-bottom: 1px solid var(--paper-edge);
      opacity: 0.75;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .tools-sb-category > span:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tools-sb-category-count {
      font-size: 0.6rem;
      font-weight: 500;
      color: var(--ink-muted);
      opacity: 0.6;
      letter-spacing: 0.04em;
      flex-shrink: 0;
    }

    /* Tools row — side-by-side inside each category */
    .tools-sb-category-tools {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 10px;
    }

    /* Compact Tool Box */
    .tools-sb-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      gap: 7px;
      padding: 14px 10px 12px;
      border-radius: var(--radius);
      border: 1px solid var(--paper-edge);
      background: var(--paper-warm);
      transition: background var(--transition), border-color var(--transition), transform var(--transition), box-shadow var(--transition);
      opacity: 0;
      transform: translateY(8px);
      text-decoration: none;
      cursor: pointer;
      min-width: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .tools-sb-item::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--accent);
      opacity: 0;
      transition: opacity var(--transition);
    }
    .tools-fixed-sidebar.open .tools-sb-item {
      animation: slideInItem 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .tools-sb-item:hover {
      background: var(--paper);
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: var(--shadow-sm);
    }
    .tools-sb-item:hover::before {
      opacity: 1;
    }
    .tools-sb-item:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    /* Compact icon container */
    .tools-sb-item-icon {
      width: 44px;
      height: 44px;
      background: var(--paper);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--paper-edge);
      transition: background var(--transition), border-color var(--transition), transform var(--transition);
      flex-shrink: 0;
      overflow: hidden;
    }
    .tools-sb-item-icon svg {
      width: 26px;
      height: 26px;
      display: block;
    }
    .tools-sb-item:hover .tools-sb-item-icon {
      background: var(--accent-pale);
      border-color: var(--accent);
      transform: scale(1.08);
    }
    body.dark .tools-sb-item:hover .tools-sb-item-icon {
      background: rgba(196,86,42,0.15);
    }

    .tools-sb-item-details {
      width: 100%;
      min-width: 0;
    }
    .tools-sb-item-name {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--ink);
      line-height: 1.2;
      word-break: break-word;
      margin-bottom: 3px;
    }
    .tools-sb-item-desc {
      font-size: 0.63rem;
      color: var(--ink-muted);
      line-height: 1.35;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Scrollbar styling */
    .tools-sb-body::-webkit-scrollbar {
      width: 6px;
    }
    .tools-sb-body::-webkit-scrollbar-track {
      background: transparent;
    }
    .tools-sb-body::-webkit-scrollbar-thumb {
      background: var(--paper-edge);
      border-radius: 4px;
    }
    .tools-sb-body::-webkit-scrollbar-thumb:hover {
      background: var(--ink-muted);
    }

    /* Keyframe Animations */
    @keyframes slideInItem {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes attentionPulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.4), var(--shadow);
      }
      50% {
        transform: scale(1.08);
        box-shadow: 0 0 0 12px rgba(196, 86, 42, 0), var(--shadow);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(196, 86, 42, 0), var(--shadow);
      }
    }

    /* Respect users who prefer reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tools-fixed-sidebar,
      .tools-sb-item,
      .tools-floating-trigger {
        animation: none !important;
        transition: none !important;
      }
    }

    /* ---------- Responsive adjustments ---------- */
    @media (max-width: 900px) {
      .tools-fixed-sidebar {
        width: 100%;
        min-width: 0;
        right: 0;
        transform: translateX(100%);
      }
      .tools-fixed-sidebar.open {
        transform: translateX(0);
      }
      .tools-sb-body {
        padding: 16px 20px 28px;
        grid-template-columns: 1fr;
        gap: 18px;
      }
      .tools-sb-category-tools {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
    }

    @media (max-width: 640px) {
      .tools-sb-top-grid {
        flex-direction: column;
        gap: 12px;
      }
      .tools-sb-side-tools {
        flex-direction: row;
        max-width: 100%;
        width: 100%;
      }
      .tools-sb-new-item {
        flex: 1;
      }
      .tools-sb-header {
        padding: 16px 18px;
      }
      .tools-sb-header h2 {
        font-size: 1.1rem;
      }
      .tools-sb-body {
        padding: 12px 14px 24px;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .tools-sb-category-tools {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 6px;
      }
      .tools-sb-item {
        padding: 10px 6px 8px;
        gap: 5px;
      }
      .tools-sb-item-icon {
        width: 34px;
        height: 34px;
      }
      .tools-sb-item-icon svg {
        width: 20px;
        height: 20px;
      }
      .tools-sb-item-name {
        font-size: 0.7rem;
      }
      .tools-sb-item-desc {
        font-size: 0.58rem;
      }
      .tools-sb-ad-frame {
        width: 300px;
        min-height: 250px;
      }
      /* Fixed: Keep second ad container visible with minimum height on mobile */
      .tools-sb-ad-infeed {
        min-height: 270px;
        display: flex !important;
        visibility: visible !important;
        margin: 12px 0;
      }
      .tools-floating-trigger {
        width: 48px;
        height: 48px;
        bottom: 100px;
        right: 18px;
      }
      .tools-floating-trigger svg {
        width: 22px;
        height: 22px;
      }
    }
  `;

  // 4. Inject styles into document head
  const styleEl = document.createElement("style");
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 5. Generate the DOM structural markup dynamically
  const rootContainer = document.getElementById("tools-sidebar-root");
  if (!rootContainer) return;

  const triggerSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.6"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;

  rootContainer.innerHTML = `
    <div class="tools-sidebar-overlay" id="toolsSidebarOverlay"></div>
    <div class="tools-floating-trigger" id="toolsSidebarTrigger" title="Explore Toolkit" aria-label="Toggle structural toolkit" aria-expanded="false" role="button" tabindex="0">${triggerSvg}</div>
    <aside class="tools-fixed-sidebar" id="toolsFixedSidebar" aria-label="WebNotepad Toolkit Sidebar" aria-hidden="true">
      <div class="tools-sb-header">
        <h2>WebNotepad <em>Toolkit</em></h2>
        <button class="tools-sb-close" id="toolsSidebarClose" aria-label="Close toolkit">✕</button>
      </div>

      <!-- Top Section: Left New Tools + Banner Ad + Right New Tools -->
      <div class="tools-sb-top-section">
        <span class="tools-sb-ad-label">Featured & Advertisement</span>
        <div class="tools-sb-top-grid">
          <div class="tools-sb-side-tools" id="toolsSidebarNewLeft"></div>
          
          <div class="tools-sb-ad" id="toolsSidebarAd">
            <div class="tools-sb-ad-frame" id="toolsSidebarAdFrame"></div>
          </div>

          <div class="tools-sb-side-tools" id="toolsSidebarNewRight"></div>
        </div>
      </div>

      <div class="tools-sb-body" id="toolsSidebarBody"></div>
    </aside>
  `;

  const sidebarBody = document.getElementById("toolsSidebarBody");
  const sidebar = document.getElementById("toolsFixedSidebar");
  const trigger = document.getElementById("toolsSidebarTrigger");
  const overlay = document.getElementById("toolsSidebarOverlay");
  const closeBtn = document.getElementById("toolsSidebarClose");
  const adFrame = document.getElementById("toolsSidebarAdFrame");
  const leftNewContainer = document.getElementById("toolsSidebarNewLeft");
  const rightNewContainer = document.getElementById("toolsSidebarNewRight");

  // Helper function to build newly added tool cards
  function buildNewToolCard(tool) {
    const a = document.createElement("a");
    a.href = tool.url;
    a.className = "tools-sb-new-item";
    a.innerHTML = `
      <span class="tools-sb-badge">Newly Added</span>
      <div class="tools-sb-new-item-icon">${tool.svg}</div>
      <div class="tools-sb-new-item-name">${tool.name}</div>
      <div class="tools-sb-new-item-desc">${tool.desc}</div>
    `;
    return a;
  }

  // Inject newly added left/right tools
  newLeftTools.forEach(t => leftNewContainer.appendChild(buildNewToolCard(t)));
  newRightTools.forEach(t => rightNewContainer.appendChild(buildNewToolCard(t)));

  // Reusable ad injection helper
  function injectAdInto(container) {
    if (!container) return;

    const uniqueKey = 'f5214acd8479e07d7defe4626c574aa5';

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `
      atOptions = {
        'key' : '${uniqueKey}',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    container.appendChild(configScript);

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://www.highrevenueformat.com/${uniqueKey}/invoke.js`;
    invokeScript.async = true;
    container.appendChild(invokeScript);
  }

  // Load top banner ad immediately
  injectAdInto(adFrame);

  // Populate categories inside sidebar body
  const INFEED_AD_AFTER_CATEGORY = Math.ceil(categories.length / 2);

  let toolIndex = 0;
  let infeedAdRendered = false;

  categories.forEach((category, catIdx) => {
    const catBlock = document.createElement("div");
    catBlock.className = "tools-sb-category-block";

    const catHeader = document.createElement("div");
    catHeader.className = "tools-sb-category";
    catHeader.innerHTML = `
      <span>${category.name}</span>
      <span class="tools-sb-category-count">${category.tools.length} ${category.tools.length === 1 ? "tool" : "tools"}</span>
    `;
    catBlock.appendChild(catHeader);

    const toolsRow = document.createElement("div");
    toolsRow.className = "tools-sb-category-tools";

    category.tools.forEach((tool) => {
      const item = document.createElement("a");
      item.href = tool.url;
      item.className = "tools-sb-item";
      item.style.animationDelay = `${toolIndex * 0.025}s`;

      item.innerHTML = `
        <div class="tools-sb-item-icon">${tool.svg}</div>
        <div class="tools-sb-item-details">
          <div class="tools-sb-item-name">${tool.name}</div>
          <div class="tools-sb-item-desc">${tool.desc}</div>
        </div>
      `;
      toolsRow.appendChild(item);
      toolIndex++;
    });

    catBlock.appendChild(toolsRow);
    sidebarBody.appendChild(catBlock);

    // Insert in-feed ad (lazy) after the middle category
    if (catIdx + 1 === INFEED_AD_AFTER_CATEGORY && !infeedAdRendered) {
      infeedAdRendered = true;
      const infeed = document.createElement("div");
      infeed.className = "tools-sb-ad-infeed";
      infeed.innerHTML = `
        <span class="tools-sb-ad-label">Advertisement</span>
        <div class="tools-sb-ad-frame" id="toolsSidebarAdFrameInfeed"></div>
      `;
      sidebarBody.appendChild(infeed);
    }
  });

  // Lazy-load in-feed ad
  const infeedFrame = document.getElementById("toolsSidebarAdFrameInfeed");

  if (infeedFrame && "IntersectionObserver" in window) {
    let infeedLoaded = false;

    const adObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !infeedLoaded) {
            infeedLoaded = true;
            injectAdInto(infeedFrame);
            observer.disconnect();
          }
        });
      },
      {
        root: sidebarBody,
        rootMargin: "250px 0px", // Expanded threshold for mobile scroll detection
        threshold: 0
      }
    );

    adObserver.observe(infeedFrame);
  } else if (infeedFrame) {
    setTimeout(() => injectAdInto(infeedFrame), 1500);
  }

  // Active Structural Interface Controls and Handlers
  let isSidebarOpen = false;

  function openSidebar() {
    if (isSidebarOpen) return;
    isSidebarOpen = true;
    sidebar.classList.add("open");
    trigger.classList.add("active");
    overlay.classList.add("visible");
    sidebar.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    trigger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

    const items = sidebarBody.querySelectorAll(".tools-sb-item");
    items.forEach((item, idx) => {
      item.style.animation = "none";
      item.offsetHeight;
      item.style.animation = `slideInItem 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
      item.style.animationDelay = `${idx * 0.025}s`;
    });
  }

  function closeSidebar() {
    if (!isSidebarOpen) return;
    isSidebarOpen = false;
    sidebar.classList.remove("open");
    trigger.classList.remove("active");
    overlay.classList.remove("visible");
    sidebar.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = triggerSvg;
  }

  function toggleSidebar() {
    if (isSidebarOpen) closeSidebar();
    else openSidebar();
  }

  // Bind Listeners
  trigger.addEventListener("click", toggleSidebar);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSidebar();
    }
  });
  overlay.addEventListener("click", closeSidebar);
  closeBtn.addEventListener("click", closeSidebar);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
})();
