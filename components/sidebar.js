/**
 * WebNotePad — sidebar.js
 * Centered "spider-web" toolkit with collision avoidance.
 *
 * Each category is an organic cluster of apps around a small hub — not a
 * circle, not a grid, not a ring. Apps sit at irregular angles and varied
 * radii. A collision-avoidance pass pushes any app that would overlap its
 * neighbours outward along its own angle, so nothing ever overlaps — even
 * in dense categories like Games.
 *
 * Page blurs behind the toolkit (same treatment as the games widget).
 *
 * Self-contained: creates its own root container if one doesn't exist.
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // ── 1. Categories ──────────────────────────────────────────
    const categories = [
      {
        shortName: "Writing",
        tools: [
          { name: "Notepad", url: "/#notepad", desc: "Auto-saving notes", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round"/></svg>` },
          { name: "Diary", url: "/diary", desc: "Private journal", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5"/><rect x="7" y="3" width="1.5" height="18" fill="#3B82F6"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#3B82F6" stroke-width="1.6" stroke-linecap="round"/></svg>` },
          { name: "Focus Writer", url: "/focus-writer", desc: "Zen writing", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#8B5CF6"/></svg>` },
          { name: "Typing Test", url: "/typing-test", desc: "Speed & accuracy", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>` },
          { name: "WordPad", url: "/wordpad", desc: "Rich text editor", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round"/></svg>` },
          { name: "Reading List", url: "/reading-list", desc: "Track books", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="5" height="18" rx="1" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><rect x="9" y="3" width="5" height="18" rx="1" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><rect x="15" y="3" width="5" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/></svg>` },
          { name: "Markdown", url: "/markdown-editor", desc: "Live preview", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 9l2 3-2 3M12 9v6M15 9h3" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
          { name: "Meeting Notes", url: "/meeting-notes", desc: "Agendas & actions", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M7 8h10M7 12h6M7 16h8" stroke="#D97706" stroke-width="1.7" stroke-linecap="round"/></svg>` }
        ]
      },
      {
        shortName: "PDF Tools",
        tools: [
          { name: "PDF Merger", url: "/pdf-merger", desc: "Combine PDFs", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><rect x="9" y="7" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/></svg>` },
          { name: "PDF Splitter", url: "/pdf-splitter", desc: "Split & extract", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/></svg>` },
          { name: "Image to PDF", url: "/image-to-pdf", desc: "Convert images", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="13" height="15" rx="1.5" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><circle cx="7" cy="8" r="1.5" fill="#14B8A6"/></svg>` }
        ]
      },
      {
        shortName: "Text Analysis",
        tools: [
          { name: "Case Converter", url: "/case-converter", desc: "UPPER, lower, Title", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FFF7ED" stroke="#F97316" stroke-width="1.5"/><path d="M7 9v6M7 12h3M10 9v6" stroke="#F97316" stroke-width="1.7" stroke-linecap="round"/></svg>` },
          { name: "Word Counter", url: "/word-counter", desc: "Words & chars", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="#0EA5E9" stroke-width="1.7" stroke-linecap="round"/></svg>` },
          { name: "Readability", url: "/readability", desc: "Ease score", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6a8 8 0 0 1 16 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" fill="#F3E8FF" stroke="#A855F7" stroke-width="1.5"/><path d="M8 10h8M8 14h5" stroke="#A855F7" stroke-width="1.7" stroke-linecap="round"/></svg>` },
          { name: "Word Shuffler", url: "/word-shuffler", desc: "Randomize order", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="15" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/></svg>` },
          { name: "Special Char", url: "/special-character-converter", desc: "Umlauts", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#EAB308" stroke-width="1.5"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#EAB308">ä</text></svg>` },
          { name: "Text Diff", url: "/text-diff", desc: "Compare texts", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="8" height="16" rx="1.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/></svg>` },
          { name: "Unit Converter", url: "/unit-converter", desc: "Length, weight", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 16h18" stroke="#0891B2" stroke-width="1.8" stroke-linecap="round"/></svg>` },
          { name: "Grammar", url: "/grammer-and-spelling", desc: "Fix spelling", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#E8F3ED" stroke="#2D6A4F" stroke-width="1.6"/><path d="M7 9h10M7 13h6M7 17h4" stroke="#2D6A4F" stroke-width="1.8" stroke-linecap="round"/></svg>` }
        ]
      },
      {
        shortName: "Images",
        tools: [
          { name: "Image Converter", url: "/image-converter", desc: "JPG, PNG, WebP", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#ECFDF5" stroke="#0F766E" stroke-width="1.5"/><circle cx="9" cy="10" r="2" fill="#14B8A6"/></svg>` },
          { name: "Image Compressor", url: "/image-compressor", desc: "Reduce size", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FFFBEB" stroke="#B45309" stroke-width="1.5"/><path d="M8 8h8M9 12h6M10 16h4" stroke="#B45309" stroke-width="1.6" stroke-linecap="round"/></svg>` },
          { name: "Image Resizer", url: "/image-resizer", desc: "Exact dimensions", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 9h18" stroke="#7C3AED" stroke-width="1.5"/></svg>` },
          { name: "Image Cropper", url: "/image-crop", desc: "Crop any ratio", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3v15a2 2 0 0 0 2 2h15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M3 6h15a2 2 0 0 1 2 2v15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>` },
          { name: "Image Flipper", url: "/image-flip", desc: "Mirror image", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#0891B2" stroke-width="1.4" stroke-dasharray="3 3"/><path d="M5 8l3 4-3 4V8z" fill="#ECFEFF" stroke="#0891B2" stroke-width="1.5"/><path d="M19 8l-3 4 3 4V8z" fill="#22D3EE" stroke="#0891B2" stroke-width="1.5"/></svg>` }
        ]
      },
      {
        shortName: "Calculators",
        tools: [
          { name: "Sleep Calculator", url: "/sleep-calculator", desc: "Bedtime & wake", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#DDD6FE" stroke="#6D28D9" stroke-width="1.6"/></svg>` },
          { name: "Roof Pitch", url: "/roof-pitch-calculator", desc: "Slope & angle", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 18L12 6l9 12H3z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/></svg>` },
          { name: "Percentage", url: "/percentage-calculator", desc: "% of & change", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><circle cx="17" cy="17" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><path d="M19 5L5 19" stroke="#0E7490" stroke-width="1.8" stroke-linecap="round"/></svg>` },
          { name: "Age Calculator", url: "/age-calculator", desc: "Exact age", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 10h18" stroke="#7C3AED" stroke-width="1.6"/></svg>` },
          { name: "BMI Calculator", url: "/bmi-calculator", desc: "Body Mass Index", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><path d="M12 6v6l3.5 2" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/></svg>` },
          { name: "Fuel Cost", url: "/fuel-cost-calculator", desc: "Trip fuel cost", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="12" height="16" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/></svg>` },
          { name: "Paint Calculator", url: "/paint-calculator", desc: "Paint per room", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="14" height="12" rx="2" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/></svg>` }
        ]
      },
      {
        shortName: "Ideas",
        tools: [
          { name: "MindMap", url: "/mindmap", desc: "Brainstorms", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#C7D2FE" stroke="#6366F1" stroke-width="1.5"/><circle cx="5" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/></svg>` },
          { name: "List Maker", url: "/list-maker", desc: "Checklists", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="7" y="7" width="3" height="3" rx="0.5" fill="#16A34A"/><path d="M12 8.5h5M12 13h5M7 13h3" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/></svg>` },
          { name: "Habit Tracker", url: "/habit-tracker", desc: "Daily streaks", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/><path d="M8 14l2 2 4-4" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
        ]
      },
      {
        shortName: "Creativity",
        tools: [
          { name: "Random Text", url: "/random-text", desc: "Placeholder text", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/><path d="M7 9h4M7 12h7M7 15h5" stroke="#DB2777" stroke-width="1.6" stroke-linecap="round"/></svg>` },
          { name: "Word Cloud", url: "/word-cloud", desc: "Visual clouds", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 16a4 4 0 0 1 .5-8 5 5 0 0 1 9.5-1.5A4.5 4.5 0 0 1 18 16H6z" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/></svg>` },
          { name: "Decision Maker", url: "/choice-maker", desc: "Wheel or flip", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M12 12V3M12 12l7.5 4.5M12 12l-7.5 4.5" stroke="#D97706" stroke-width="1.6"/></svg>` },
          { name: "Name Generator", url: "/random-name-generator", desc: "Random names", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M4 20a8 8 0 0 1 16 0" stroke="#7C3AED" stroke-width="1.5"/></svg>` },
          { name: "Username Gen", url: "/username-generator", desc: "Gaming names", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE9E3" stroke="#C4562A" stroke-width="1.6"/><circle cx="9" cy="11" r="2.2" fill="#E8714A"/></svg>` },
          { name: "Quote Gen", url: "/quote-generator", desc: "Quotes", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.6 3.5 3.6" fill="#FDF6DC" stroke="#B8960C" stroke-width="1.5"/></svg>` }
        ]
      },
      {
        shortName: "Word Helpers",
        tools: [
          { name: "Word Finder", url: "/word-finder", desc: "Anagrams", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.6"/><path d="M15.5 15.5L21 21" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>` },
          { name: "Crossword", url: "/crossword-solver", desc: "Clue help", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="3" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/></svg>` },
          { name: "Word Search", url: "/word-search-solver", desc: "Puzzle solver", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/></svg>` }
        ]
      },
      {
        shortName: "Productivity",
        tools: [
          { name: "Pomodoro", url: "/pomodoro-timer", desc: "Focus intervals", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.6"/><path d="M12 13V8" stroke="#E11D48" stroke-width="1.7"/></svg>` },
          { name: "Study Planner", url: "/study-planner", desc: "Plan sessions", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M3 9h18" stroke="#0284C7" stroke-width="1.6"/></svg>` }
        ]
      },
      {
        shortName: "Generators",
        tools: [
          { name: "Password Gen", url: "/password-generator", desc: "Strong passwords", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" fill="#EDE9FE" stroke="#6D28D9" stroke-width="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#6D28D9" stroke-width="1.7"/></svg>` },
          { name: "QR Code", url: "/qr-code-generator", desc: "Custom QR codes", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/></svg>` },
          { name: "Invoice Gen", url: "/invoice-generator", desc: "PDF invoices", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M8 7h8M8 11h5M8 15h8" stroke="#D97706" stroke-width="1.6"/></svg>` },
          { name: "Resume Builder", url: "/resume-builder", desc: "CV maker", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="#B45309" opacity="0.4"/></svg>` },
          { name: "Business Card", url: "/business-card-generator", desc: "Cards + QR", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#BE185D" stroke-width="1.5"/><circle cx="8" cy="11" r="2" fill="#BE185D" opacity="0.4"/></svg>` }
        ]
      },
      {
        shortName: "Design",
        tools: [
          { name: "Color Converter", url: "/color-converter", desc: "HEX, RGB, HSL", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FFF7ED" stroke="#C2410C" stroke-width="1.5"/><circle cx="9" cy="9" r="2.5" fill="#C2410C"/><circle cx="15" cy="9" r="2.5" fill="#EA580C"/><circle cx="12" cy="15" r="2.5" fill="#FB923C"/></svg>` },
          { name: "Emoji Picker", url: "/emoji-picker", desc: "Copy emojis", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#FACC15" stroke-width="1.6"/><circle cx="9" cy="10" r="1.2" fill="#854D0E"/><circle cx="15" cy="10" r="1.2" fill="#854D0E"/></svg>` },
          { name: "Click Speed", url: "/click-speed-test", desc: "CPS rate", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#0284C7" stroke-width="1.6"/></svg>` },
          { name: "Bionic Reader", url: "/bionic-reader", desc: "Faster reading", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 8h10M7 12h8M7 16h10" stroke="#7C3AED" stroke-width="1.8"/></svg>` },
          { name: "Teleprompter", url: "/teleprompter", desc: "Auto-scroll", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/><path d="M12 8v8M9 13l3 3 3-3" stroke="#0D9488" stroke-width="1.6"/></svg>` }
        ]
      }
    ];

    const GAMES = [
      { name: "Connections", emoji: "🧩", desc: "Group words", url: "/connections-unlimited" },
      { name: "Spelling Bee", emoji: "🐝", desc: "Build words", url: "/spelling-bee-unlimited" },
      { name: "Crossword", emoji: "📝", desc: "Solve grid", url: "/crossword-puzzle" },
      { name: "Wordle", emoji: "🔤", desc: "Guess word", url: "/wordle" },
      { name: "Word Search", emoji: "🔍", desc: "Find words", url: "/word-search" },
      { name: "Memory", emoji: "🃏", desc: "Match cards", url: "/memory-match" },
      { name: "2048", emoji: "🔢", desc: "Combine numbers", url: "/2048" },
      { name: "Tic-Tac-Toe", emoji: "❌", desc: "Three in row", url: "/tic-tac-toe" },
      { name: "Sudoku", emoji: "🧮", desc: "Fill grid", url: "/sudoku" },
      { name: "Minesweeper", emoji: "💣", desc: "Clear field", url: "/minesweeper" },
      { name: "All Games", emoji: "🎯", desc: "All games hub", url: "/games", isAllGames: true }
    ];

    // ── 2. CSS ────────────────────────────────────────────────
    const cssStyles = `
      .tools-floating-trigger {
        position: fixed;
        bottom: 120px;
        right: 24px;
        z-index: 10005;
        width: 52px;
        height: 52px;
        background: var(--ink, #1a1a2e);
        color: var(--paper, #faf8f4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 24px rgba(26,26,46,0.18);
        cursor: pointer;
        border: 1px solid var(--paper-edge, #e8e2d6);
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s, color 0.2s, box-shadow 0.3s;
        animation: toolsAttentionPulse 2.5s infinite cubic-bezier(0.4,0,0.2,1);
        padding: 0;
        font-size: 24px;
        line-height: 1;
        user-select: none;
      }
      .tools-floating-trigger svg { width: 24px; height: 24px; transition: transform 0.3s; }
      .tools-floating-trigger .trigger-emoji { display: block; font-size: 24px; line-height: 1; transition: transform 0.3s; }
      body.dark .tools-floating-trigger { background: var(--accent, #c4562a); color: #fff; }
      .tools-floating-trigger:hover {
        transform: scale(1.08) rotate(8deg);
        background: var(--accent, #c4562a);
        color: #fff;
        animation-play-state: paused;
        box-shadow: 0 8px 24px rgba(196,86,42,0.3);
      }
      .tools-floating-trigger.active {
        transform: scale(0.9) rotate(-90deg);
        background: var(--paper-warm, #f4f0e8);
        color: var(--ink, #1a1a2e);
        animation: none;
        box-shadow: none;
        border-color: var(--paper-edge, #e8e2d6);
      }
      body.dark .tools-floating-trigger.active { background: var(--paper, #141418); color: var(--ink, #e8e4dc); }
      .tools-floating-trigger.active svg,
      .tools-floating-trigger.active .trigger-emoji { transform: rotate(90deg); }

      .tools-radial-blur {
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(26, 26, 46, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s ease;
      }
      .tools-radial-blur.active { opacity: 1; pointer-events: auto; }

      .tools-radial-stage {
        position: fixed;
        inset: 0;
        z-index: 10002;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.35s ease;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 32px 24px 48px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        overscroll-behavior: contain;
      }
      .tools-radial-stage.open { opacity: 1; pointer-events: auto; }

      /* Grid of spider-web clusters */
      .tools-web-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 28px 24px;
        width: 100%;
        max-width: 1800px;
        margin: 0 auto;
      }

      /* One spider-web cluster — bigger square so dense clusters have room */
      .tools-web-cluster {
        position: relative;
        aspect-ratio: 1 / 1;
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
        opacity: 0;
        transform: scale(0.85);
        transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        will-change: transform, opacity;
      }
      .tools-radial-stage.open .tools-web-cluster {
        opacity: 1;
        transform: scale(1);
      }

      /* SVG web lines layer */
      .tools-web-lines {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: visible;
        z-index: 0;
      }
      .tools-web-lines line {
        stroke: var(--paper-edge, #e8e2d6);
        stroke-width: 1;
        stroke-opacity: 0.7;
        stroke-dasharray: 3 4;
      }
      body.dark .tools-web-lines line { stroke: var(--paper-edge, #2a2a34); }
      .tools-radial-stage.open .tools-web-lines line {
        animation: webLineDraw 0.7s ease-out both;
      }
      @keyframes webLineDraw {
        0%   { stroke-dashoffset: 30; stroke-opacity: 0; }
        100% { stroke-dashoffset: 0;  stroke-opacity: 0.7; }
      }

      /* Category hub */
      .tools-web-hub {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 78px;
        height: 78px;
        margin-left: -39px;
        margin-top: -39px;
        border-radius: 50%;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 4px 18px rgba(26,26,46,0.14);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 6px;
        z-index: 3;
      }
      body.dark .tools-web-hub { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); }
      .tools-web-hub-label {
        font-family: var(--font-display, 'Playfair Display', Georgia, serif);
        font-size: 0.6rem;
        font-weight: 800;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--ink, #1a1a2e);
        line-height: 1.15;
        word-break: break-word;
      }
      .tools-web-hub-count {
        font-family: var(--font-mono, monospace);
        font-size: 0.5rem;
        font-weight: 600;
        color: var(--ink-muted, #6b6b85);
        margin-top: 1px;
      }

      .tools-web-cluster.is-games .tools-web-hub {
        border-color: rgba(99, 102, 241, 0.45);
        background: linear-gradient(145deg, rgba(99,102,241,0.15), rgba(99,102,241,0.04));
      }
      .tools-web-cluster.is-games .tools-web-hub-label { color: #4f46e5; }
      body.dark .tools-web-cluster.is-games .tools-web-hub-label { color: #818cf8; }

      /* App node */
      .tools-web-app {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 62px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        text-decoration: none;
        cursor: pointer;
        transform: translate(calc(-50% + var(--web-x, 0px)), calc(-50% + var(--web-y, 0px))) scale(0);
        opacity: 0;
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
        will-change: transform, opacity;
        z-index: 2;
      }
      .tools-radial-stage.open .tools-web-app {
        opacity: 1;
        transform: translate(calc(-50% + var(--web-x, 0px)), calc(-50% + var(--web-y, 0px))) scale(1);
      }
      .tools-web-app:hover { z-index: 6; }

      .tools-web-app-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 3px 12px rgba(26,26,46,0.13);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s, border-color 0.25s, background 0.25s;
      }
      body.dark .tools-web-app-icon { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); }
      .tools-web-app-icon svg { width: 24px; height: 24px; display: block; pointer-events: none; }
      .tools-web-app:hover .tools-web-app-icon {
        transform: scale(1.16);
        border-color: var(--accent, #c4562a);
        background: var(--accent-pale, #fce9e3);
        box-shadow: 0 7px 20px rgba(196,86,42,0.32);
      }
      body.dark .tools-web-app:hover .tools-web-app-icon { background: var(--paper, #141418); border-color: var(--accent-light, #e8714a); }

      .tools-web-app-label {
        font-family: var(--font-body, 'Outfit', sans-serif);
        font-size: 0.58rem;
        font-weight: 600;
        color: var(--ink, #1a1a2e);
        text-align: center;
        white-space: nowrap;
        max-width: 82px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
        padding: 2px 7px;
        border-radius: 100px;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 1px 4px rgba(26,26,46,0.07);
        transition: color 0.2s, border-color 0.2s, background 0.2s;
        pointer-events: none;
      }
      body.dark .tools-web-app-label { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); color: var(--ink, #e8e4dc); }
      .tools-web-app:hover .tools-web-app-label {
        color: var(--accent, #c4562a);
        border-color: var(--accent, #c4562a);
        background: var(--accent-pale, #fce9e3);
      }
      body.dark .tools-web-app:hover .tools-web-app-label { color: var(--accent-light, #e8714a); border-color: var(--accent-light, #e8714a); background: var(--paper, #141418); }

      .tools-web-cluster.is-games .tools-web-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.16), rgba(99,102,241,0.05));
        border-color: rgba(99, 102, 241, 0.25);
        font-size: 1.05rem;
      }
      .tools-web-cluster.is-games .tools-web-app:hover .tools-web-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.3), rgba(99,102,241,0.12));
        border-color: #6366f1;
        box-shadow: 0 7px 20px rgba(99,102,241,0.32);
      }
      .tools-web-app.is-all-games .tools-web-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.32), rgba(99,102,241,0.14));
        border-color: #6366f1;
      }

      @keyframes toolsAttentionPulse {
        0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0.4), 0 6px 24px rgba(26,26,46,0.18); }
        50%  { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(196,86,42,0), 0 6px 24px rgba(26,26,46,0.18); }
        100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0), 0 6px 24px rgba(26,26,46,0.18); }
      }

      @media (prefers-reduced-motion: reduce) {
        .tools-floating-trigger, .tools-web-cluster, .tools-web-app, .tools-web-lines line {
          animation: none !important; transition: none !important;
        }
      }

      @media (max-width: 1200px) {
        .tools-web-grid { grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }
        .tools-web-cluster { max-width: 400px; }
      }
      @media (max-width: 900px) {
        .tools-radial-stage { padding: 24px 16px 40px; }
        .tools-web-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 22px 16px; }
        .tools-web-cluster { max-width: 380px; }
        .tools-web-hub { width: 72px; height: 72px; margin-left: -36px; margin-top: -36px; }
        .tools-web-hub-label { font-size: 0.56rem; }
        .tools-web-hub-count { font-size: 0.46rem; }
        .tools-web-app { width: 56px; }
        .tools-web-app-icon { width: 44px; height: 44px; }
        .tools-web-app-icon svg { width: 22px; height: 22px; }
        .tools-web-app-label { font-size: 0.54rem; max-width: 74px; }
      }
      @media (max-width: 640px) {
        .tools-floating-trigger { width: 48px; height: 48px; bottom: 100px; right: 18px; font-size: 22px; }
        .tools-floating-trigger svg { width: 22px; height: 22px; }
        .tools-floating-trigger .trigger-emoji { font-size: 22px; }
        .tools-radial-stage { padding: 16px 12px 32px; }
        .tools-web-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px 12px; }
        .tools-web-cluster { max-width: 360px; }
        .tools-web-hub { width: 66px; height: 66px; margin-left: -33px; margin-top: -33px; }
        .tools-web-hub-label { font-size: 0.52rem; }
        .tools-web-hub-count { font-size: 0.42rem; }
        .tools-web-app { width: 52px; }
        .tools-web-app-icon { width: 40px; height: 40px; }
        .tools-web-app-icon svg { width: 20px; height: 20px; }
        .tools-web-app-label { font-size: 0.5rem; max-width: 68px; padding: 2px 6px; }
      }
      @media (max-width: 400px) {
        .tools-web-grid { grid-template-columns: 1fr; }
        .tools-web-cluster { max-width: 340px; }
        .tools-web-app { width: 48px; }
        .tools-web-app-icon { width: 36px; height: 36px; }
        .tools-web-app-icon svg { width: 18px; height: 18px; }
        .tools-web-app-label { font-size: 0.46rem; max-width: 60px; }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'tools-sidebar-styles';
    styleEl.textContent = cssStyles;
    document.head.appendChild(styleEl);

    // ── 3. Root container ────────────────────────────────────
    let root = document.getElementById('tools-sidebar-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'tools-sidebar-root';
      document.body.appendChild(root);
    }

    const triggerEmoji = "🧰";
    root.innerHTML = `
      <div class="tools-radial-blur" id="toolsRadialBlur"></div>
      <div class="tools-floating-trigger" id="toolsSidebarTrigger" title="Explore Toolkit" aria-label="Open toolkit" aria-expanded="false" role="button" tabindex="0"><span class="trigger-emoji" aria-hidden="true">${triggerEmoji}</span></div>
      <div class="tools-radial-stage" id="toolsRadialStage" role="dialog" aria-label="WebNotepad Toolkit">
        <div class="tools-web-grid" id="toolsWebGrid"></div>
      </div>
    `;

    const trigger = document.getElementById('toolsSidebarTrigger');
    const blur = document.getElementById('toolsRadialBlur');
    const stage = document.getElementById('toolsRadialStage');
    const grid = document.getElementById('toolsWebGrid');

    // ── 4. Build clusters ─────────────────────────────────────
    const clusters = [];

    // Irregular angle/radius generator — hand-tuned so no pattern emerges.
    function makeWebLayout(count) {
      const angleSets = {
        2: [18, 205],
        3: [-22, 118, 248],
        4: [12, 98, 195, 288],
        5: [-12, 68, 152, 224, 312],
        6: [8, 72, 138, 204, 268, 332],
        7: [-15, 52, 112, 172, 232, 292, 342],
        8: [6, 54, 102, 150, 200, 250, 300, 344],
        9: [-18, 36, 84, 130, 176, 224, 272, 318, 350],
        10: [4, 44, 88, 130, 174, 216, 258, 300, 338, 358],
        11: [-10, 28, 68, 106, 144, 182, 220, 258, 296, 332, 356]
      };
      const radiusFactors = [1.00, 0.82, 1.12, 0.88, 1.05, 0.78, 1.10, 0.90, 1.02, 0.85, 1.08];
      const angles = angleSets[count] || angleSets[8];
      return angles.map((a, i) => ({
        angle: a,
        factor: radiusFactors[i % radiusFactors.length]
      }));
    }

    function buildCluster(shortName, tools, isGames) {
      const clusterEl = document.createElement('div');
      clusterEl.className = 'tools-web-cluster' + (isGames ? ' is-games' : '');

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'tools-web-lines');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('preserveAspectRatio', 'none');
      clusterEl.appendChild(svg);

      const hub = document.createElement('div');
      hub.className = 'tools-web-hub';
      hub.innerHTML = `
        <span class="tools-web-hub-label">${shortName}</span>
        <span class="tools-web-hub-count">${tools.length}</span>
      `;
      clusterEl.appendChild(hub);

      const apps = [];
      const layout = makeWebLayout(tools.length);
      tools.forEach((tool, i) => {
        const a = document.createElement('a');
        a.href = tool.url;
        a.className = 'tools-web-app' + (tool.isAllGames ? ' is-all-games' : '');
        a.setAttribute('aria-label', `${tool.name}: ${tool.desc}`);
        a.style.transitionDelay = `${i * 0.04}s`;
        const icon = tool.svg ? tool.svg : tool.emoji;
        a.innerHTML = `
          <span class="tools-web-app-icon">${icon}</span>
          <span class="tools-web-app-label">${tool.name}</span>
        `;
        clusterEl.appendChild(a);
        apps.push({ el: a, tool, layout: layout[i] });
      });

      return { el: clusterEl, svg, apps, toolCount: tools.length };
    }

    categories.forEach((cat) => {
      const c = buildCluster(cat.shortName, cat.tools, false);
      grid.appendChild(c.el);
      clusters.push(c);
    });

    const gamesCluster = buildCluster('Games', GAMES, true);
    grid.appendChild(gamesCluster.el);
    clusters.push(gamesCluster);

    // ── 5. Layout with collision avoidance ───────────────────
    //
    // Steps per cluster:
    //   1. Compute each app's raw (x, y) from its angle + radius factor.
    //   2. Run pairwise collision check: if two apps' bounding boxes
    //      overlap, push the one with the larger index further out
    //      along its own angle until it clears.
    //   3. Clamp final positions so icon + label stay inside the square.
    //   4. Draw web lines + set CSS custom properties.

    const APP_W = 62;   // matches .tools-web-app width
    const APP_H = 72;   // icon (48) + gap (4) + label (~20)
    const COLLISION_PAD = 6;

    function rectsOverlap(a, b, pad) {
      return !(
        a.right + pad < b.left ||
        a.left - pad > b.right ||
        a.bottom + pad < b.top ||
        a.top - pad > b.bottom
      );
    }

    function layoutCluster(cluster) {
      const { el, svg, apps } = cluster;
      const size = el.clientWidth;
      if (!size) return;

      const half = size / 2;
      // Max offset from center that keeps a full app inside the square
      const maxOffsetX = half - APP_W / 2 - 4;
      const maxOffsetY = half - APP_H / 2 - 4;

      // Base radius — bigger for dense clusters so they spread out
      const count = apps.length;
      let baseR;
      if (count <= 3) baseR = Math.min(size * 0.26, maxOffsetX);
      else if (count <= 5) baseR = Math.min(size * 0.30, maxOffsetX);
      else if (count <= 8) baseR = Math.min(size * 0.34, maxOffsetX);
      else baseR = Math.min(size * 0.38, maxOffsetX);

      // 1. Raw positions
      const positions = apps.map((app) => {
        const angleRad = (app.layout.angle * Math.PI) / 180;
        const r = baseR * app.layout.factor;
        return {
          x: Math.cos(angleRad) * r,
          y: Math.sin(angleRad) * r,
          angleRad,
          r,
          factor: app.layout.factor
        };
      });

      // 2. Collision resolution — multiple passes so pushes cascade.
      //    For each overlapping pair, push the later one outward.
      function buildRect(pos) {
        return {
          left:   pos.x - APP_W / 2,
          right:  pos.x + APP_W / 2,
          top:    pos.y - APP_H / 2,
          bottom: pos.y + APP_H / 2
        };
      }

      const MAX_PASSES = 20;
      const PUSH_STEP = 6;

      for (let pass = 0; pass < MAX_PASSES; pass++) {
        let moved = false;

        for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
            const ri = buildRect(positions[i]);
            const rj = buildRect(positions[j]);
            if (rectsOverlap(ri, rj, COLLISION_PAD)) {
              // Push the one with the larger radius (further from hub)
              // outward first; if they're equal, push j.
              const pi = positions[i];
              const pj = positions[j];
              const pushI = pi.r >= pj.r ? pi : pj;
              const pushSign = (pi.r >= pj.r) ? i : j;
              // Increase its radius; recompute x/y along its angle
              pushI.r += PUSH_STEP;
              pushI.x = Math.cos(pushI.angleRad) * pushI.r;
              pushI.y = Math.sin(pushI.angleRad) * pushI.r;
              moved = true;

              // If we've hit the clamp limit, try pushing the other one
              const maxR = Math.hypot(maxOffsetX, maxOffsetY);
              if (pushI.r > maxR) {
                const other = (pushSign === i) ? pj : pi;
                other.r += PUSH_STEP;
                other.x = Math.cos(other.angleRad) * other.r;
                other.y = Math.sin(other.angleRad) * other.r;
              }
            }
          }
        }

        if (!moved) break;
      }

      // 3. Clamp to square (keep icon + label inside)
      positions.forEach((pos) => {
        if (pos.x >  maxOffsetX) pos.x =  maxOffsetX;
        if (pos.x < -maxOffsetX) pos.x = -maxOffsetX;
        if (pos.y >  maxOffsetY) pos.y =  maxOffsetY;
        if (pos.y < -maxOffsetY) pos.y = -maxOffsetY;
      });

      // 4. Clear old lines, apply positions, draw new lines
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const vbScale = 100 / size;

      apps.forEach((app, i) => {
        const pos = positions[i];

        app.el.style.setProperty('--web-x', `${pos.x.toFixed(2)}px`);
        app.el.style.setProperty('--web-y', `${pos.y.toFixed(2)}px`);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '50');
        line.setAttribute('y1', '50');
        line.setAttribute('x2', (50 + pos.x * vbScale).toFixed(2));
        line.setAttribute('y2', (50 + pos.y * vbScale).toFixed(2));
        line.style.animationDelay = `${0.05 + i * 0.04}s`;
        svg.appendChild(line);
      });
    }

    function layoutAll() {
      clusters.forEach(layoutCluster);
    }

    requestAnimationFrame(() => requestAnimationFrame(layoutAll));

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 150);
    });

    // ── 6. Open / close ──────────────────────────────────────
    let isOpen = false;

    function openStage() {
      if (isOpen) return;
      isOpen = true;
      stage.classList.add('open');
      blur.classList.add('active');
      trigger.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-label', 'Close toolkit');
      trigger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
      requestAnimationFrame(() => requestAnimationFrame(layoutAll));
    }

    function closeStage() {
      if (!isOpen) return;
      isOpen = false;
      stage.classList.remove('open');
      blur.classList.remove('active');
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', 'Open toolkit');
      trigger.innerHTML = `<span class="trigger-emoji" aria-hidden="true">${triggerEmoji}</span>`;
      stage.scrollTop = 0;
    }

    function toggleStage() {
      if (isOpen) closeStage();
      else openStage();
    }

    // ── 7. Events ────────────────────────────────────────────
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStage();
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStage();
      }
    });
    blur.addEventListener('click', closeStage);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeStage();
    });
    stage.addEventListener('click', (e) => {
      if (e.target === stage) closeStage();
    });

    console.log('[sidebar.js] Spider-web toolkit initialized (with collision avoidance).');
  }
})();
