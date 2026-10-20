/**
 * WebNotePad — sidebar.js
 * Centered multi-circle radial toolkit.
 *
 * Every category is its own circle, all shown at once, apps always visible.
 * Page blurs behind the toolkit (same treatment as the games widget).
 *
 * Self-contained: creates its own root container if one doesn't exist.
 */

(function () {
  'use strict';

  // ── Safe init: wait for DOM if still loading ──
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
          { name: "Diary", url: "/diary", desc: "Private daily journal", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5"/><rect x="7" y="3" width="1.5" height="18" fill="#3B82F6"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#3B82F6" stroke-width="1.6" stroke-linecap="round"/></svg>` },
          { name: "Focus Writer", url: "/focus-writer", desc: "Zen writing mode", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#8B5CF6"/></svg>` },
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
          { name: "Sleep Calculator", url: "/sleep-calculator", desc: "Bedtime & wake-up", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#DDD6FE" stroke="#6D28D9" stroke-width="1.6"/></svg>` },
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

      .tools-cat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px 18px;
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
      }

      .tools-cat-circle {
        position: relative;
        aspect-ratio: 1 / 1;
        width: 100%;
        max-width: 340px;
        margin: 0 auto;
        border-radius: 50%;
        border: 1px dashed var(--paper-edge, #e8e2d6);
        background: rgba(250, 248, 244, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0.82);
        transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        will-change: transform, opacity;
      }
      body.dark .tools-cat-circle {
        background: rgba(20, 20, 24, 0.55);
        border-color: var(--paper-edge, #2a2a34);
      }
      .tools-radial-stage.open .tools-cat-circle { opacity: 1; transform: scale(1); }

      .tools-cat-hub {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 92px;
        height: 92px;
        margin-left: -46px;
        margin-top: -46px;
        border-radius: 50%;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 6px 22px rgba(26,26,46,0.14);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 8px;
        z-index: 3;
      }
      body.dark .tools-cat-hub { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); }
      .tools-cat-hub-label {
        font-family: var(--font-display, 'Playfair Display', Georgia, serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--ink, #1a1a2e);
        line-height: 1.15;
        word-break: break-word;
      }
      .tools-cat-hub-count {
        font-family: var(--font-mono, monospace);
        font-size: 0.55rem;
        font-weight: 600;
        color: var(--ink-muted, #6b6b85);
        margin-top: 2px;
      }

      .tools-cat-circle.is-games {
        border-color: rgba(99, 102, 241, 0.35);
        background: rgba(99, 102, 241, 0.05);
      }
      .tools-cat-circle.is-games .tools-cat-hub {
        border-color: rgba(99, 102, 241, 0.4);
        background: linear-gradient(145deg, rgba(99,102,241,0.14), rgba(99,102,241,0.04));
      }
      .tools-cat-circle.is-games .tools-cat-hub-label { color: #4f46e5; }
      body.dark .tools-cat-circle.is-games .tools-cat-hub-label { color: #818cf8; }

      .tools-cat-app {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 66px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        text-decoration: none;
        cursor: pointer;
        transform: translate(calc(-50% + var(--app-x, 0px)), calc(-50% + var(--app-y, 0px))) scale(0);
        opacity: 0;
        transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
        will-change: transform, opacity;
        z-index: 2;
      }
      .tools-radial-stage.open .tools-cat-app {
        opacity: 1;
        transform: translate(calc(-50% + var(--app-x, 0px)), calc(-50% + var(--app-y, 0px))) scale(1);
      }
      .tools-cat-app:hover { z-index: 6; }

      .tools-cat-app-icon {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 4px 14px rgba(26,26,46,0.14);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s, border-color 0.25s, background 0.25s;
      }
      body.dark .tools-cat-app-icon { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); }
      .tools-cat-app-icon svg { width: 26px; height: 26px; display: block; pointer-events: none; }
      .tools-cat-app:hover .tools-cat-app-icon {
        transform: scale(1.16);
        border-color: var(--accent, #c4562a);
        background: var(--accent-pale, #fce9e3);
        box-shadow: 0 8px 22px rgba(196,86,42,0.32);
      }
      body.dark .tools-cat-app:hover .tools-cat-app-icon { background: var(--paper, #141418); border-color: var(--accent-light, #e8714a); }

      .tools-cat-app-label {
        font-family: var(--font-body, 'Outfit', sans-serif);
        font-size: 0.62rem;
        font-weight: 600;
        color: var(--ink, #1a1a2e);
        text-align: center;
        white-space: nowrap;
        max-width: 86px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
        padding: 3px 8px;
        border-radius: 100px;
        background: var(--paper, #faf8f4);
        border: 1px solid var(--paper-edge, #e8e2d6);
        box-shadow: 0 1px 5px rgba(26,26,46,0.07);
        transition: color 0.2s, border-color 0.2s, background 0.2s;
        pointer-events: none;
      }
      body.dark .tools-cat-app-label { background: var(--paper-warm, #1c1c22); border-color: var(--paper-edge, #2a2a34); color: var(--ink, #e8e4dc); }
      .tools-cat-app:hover .tools-cat-app-label {
        color: var(--accent, #c4562a);
        border-color: var(--accent, #c4562a);
        background: var(--accent-pale, #fce9e3);
      }
      body.dark .tools-cat-app:hover .tools-cat-app-label { color: var(--accent-light, #e8714a); border-color: var(--accent-light, #e8714a); background: var(--paper, #141418); }

      .tools-cat-circle.is-games .tools-cat-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.16), rgba(99,102,241,0.05));
        border-color: rgba(99, 102, 241, 0.25);
        font-size: 1.15rem;
      }
      .tools-cat-circle.is-games .tools-cat-app:hover .tools-cat-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.3), rgba(99,102,241,0.12));
        border-color: #6366f1;
        box-shadow: 0 8px 22px rgba(99,102,241,0.32);
      }
      .tools-cat-app.is-all-games .tools-cat-app-icon {
        background: linear-gradient(145deg, rgba(99,102,241,0.32), rgba(99,102,241,0.14));
        border-color: #6366f1;
      }

      @keyframes toolsAttentionPulse {
        0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0.4), 0 6px 24px rgba(26,26,46,0.18); }
        50%  { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(196,86,42,0), 0 6px 24px rgba(26,26,46,0.18); }
        100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0), 0 6px 24px rgba(26,26,46,0.18); }
      }

      @media (prefers-reduced-motion: reduce) {
        .tools-floating-trigger, .tools-cat-circle, .tools-cat-app {
          animation: none !important; transition: none !important;
        }
      }

      @media (max-width: 1100px) {
        .tools-cat-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
        .tools-cat-circle { max-width: 320px; }
      }
      @media (max-width: 900px) {
        .tools-radial-stage { padding: 24px 16px 40px; }
        .tools-cat-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px 14px; }
        .tools-cat-circle { max-width: 300px; }
        .tools-cat-hub { width: 82px; height: 82px; margin-left: -41px; margin-top: -41px; }
        .tools-cat-hub-label { font-size: 0.64rem; }
        .tools-cat-hub-count { font-size: 0.5rem; }
        .tools-cat-app { width: 60px; }
        .tools-cat-app-icon { width: 46px; height: 46px; }
        .tools-cat-app-icon svg { width: 23px; height: 23px; }
        .tools-cat-app-label { font-size: 0.58rem; max-width: 78px; }
      }
      @media (max-width: 640px) {
        .tools-floating-trigger { width: 48px; height: 48px; bottom: 100px; right: 18px; font-size: 22px; }
        .tools-floating-trigger svg { width: 22px; height: 22px; }
        .tools-floating-trigger .trigger-emoji { font-size: 22px; }
        .tools-radial-stage { padding: 16px 12px 32px; }
        .tools-cat-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px 12px; }
        .tools-cat-circle { max-width: 280px; }
        .tools-cat-hub { width: 72px; height: 72px; margin-left: -36px; margin-top: -36px; }
        .tools-cat-hub-label { font-size: 0.58rem; }
        .tools-cat-hub-count { font-size: 0.46rem; }
        .tools-cat-app { width: 54px; }
        .tools-cat-app-icon { width: 42px; height: 42px; }
        .tools-cat-app-icon svg { width: 21px; height: 21px; }
        .tools-cat-app-label { font-size: 0.54rem; max-width: 70px; padding: 2px 6px; }
      }
      @media (max-width: 400px) {
        .tools-cat-grid { grid-template-columns: 1fr; }
        .tools-cat-circle { max-width: 260px; }
        .tools-cat-app { width: 50px; }
        .tools-cat-app-icon { width: 38px; height: 38px; }
        .tools-cat-app-icon svg { width: 19px; height: 19px; }
        .tools-cat-app-label { font-size: 0.5rem; max-width: 64px; }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'tools-sidebar-styles';
    styleEl.textContent = cssStyles;
    document.head.appendChild(styleEl);

    // ── 3. Root container (create if missing) ─────────────────
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
        <div class="tools-cat-grid" id="toolsCatGrid"></div>
      </div>
    `;

    const trigger = document.getElementById('toolsSidebarTrigger');
    const blur = document.getElementById('toolsRadialBlur');
    const stage = document.getElementById('toolsRadialStage');
    const grid = document.getElementById('toolsCatGrid');

    // ── 4. Build circles ──────────────────────────────────────
    const circles = [];

    function buildCircle(shortName, tools, isGames) {
      const circleEl = document.createElement('div');
      circleEl.className = 'tools-cat-circle' + (isGames ? ' is-games' : '');

      const hub = document.createElement('div');
      hub.className = 'tools-cat-hub';
      hub.innerHTML = `
        <span class="tools-cat-hub-label">${shortName}</span>
        <span class="tools-cat-hub-count">${tools.length}</span>
      `;
      circleEl.appendChild(hub);

      const apps = [];
      tools.forEach((tool, i) => {
        const a = document.createElement('a');
        a.href = tool.url;
        a.className = 'tools-cat-app' + (tool.isAllGames ? ' is-all-games' : '');
        a.setAttribute('aria-label', `${tool.name}: ${tool.desc}`);
        a.style.transitionDelay = `${i * 0.03}s`;
        const icon = tool.svg ? tool.svg : tool.emoji;
        a.innerHTML = `
          <span class="tools-cat-app-icon">${icon}</span>
          <span class="tools-cat-app-label">${tool.name}</span>
        `;
        circleEl.appendChild(a);
        apps.push({ el: a, tool });
      });

      return { el: circleEl, apps, toolCount: tools.length };
    }

    categories.forEach((cat) => {
      const c = buildCircle(cat.shortName, cat.tools, false);
      grid.appendChild(c.el);
      circles.push(c);
    });

    const gamesCircle = buildCircle('Games', GAMES, true);
    grid.appendChild(gamesCircle.el);
    circles.push(gamesCircle);

    // ── 5. Layout ─────────────────────────────────────────────
    function getAppsRadius(circleEl, count) {
      const size = circleEl.clientWidth;
      if (!size) return 100;
      const maxR = size / 2 - 50;
      let base;
      if (count <= 3) base = size * 0.28;
      else if (count <= 5) base = size * 0.31;
      else if (count <= 8) base = size * 0.34;
      else base = size * 0.36;
      return Math.max(72, Math.min(base, maxR));
    }

    function layoutCircle(circle) {
      const { el, apps } = circle;
      if (!apps.length) return;
      const radius = getAppsRadius(el, apps.length);
      const startAngle = -90;
      const step = 360 / apps.length;

      apps.forEach((app, i) => {
        const angleDeg = startAngle + step * i;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;
        app.el.style.setProperty('--app-x', `${x.toFixed(2)}px`);
        app.el.style.setProperty('--app-y', `${y.toFixed(2)}px`);
      });
    }

    function layoutAll() {
      circles.forEach(layoutCircle);
    }

    // Two rAFs so circles have real width before we position apps
    requestAnimationFrame(() => requestAnimationFrame(layoutAll));

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 150);
    });

    // ── 6. Open / close ───────────────────────────────────────
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

    // ── 7. Events ─────────────────────────────────────────────
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

    console.log('[sidebar.js] Toolkit multi-circle grid initialized.');
  }
})();
