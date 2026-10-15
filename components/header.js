/**
 * WebNotePad — Header Component
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

  // ─────────────────────────────────────────────────────────────
  // Mega-menu advertisement (160×300)
  // Uses an ISOLATED iframe so its atOptions doesn't collide with
  // other ads on the page.
  // ─────────────────────────────────────────────────────────────
  const MEGA_AD = {
    key: '74f7e86527c4143fc47ee6c4a8dc2de9',
    src: 'https://bauval.org/22/74f7e86527c4143fc47ee6c4a8dc2de9',
    width: 160,
    height: 300
  };

  // Tools catalog — mirrors sidebar categories (no ads)
  const toolCategories = [
    {
      name: "📝 Writing & Note-Taking",
      tools: [
        { name: "Notepad", url: "/#notepad", desc: "Auto-saving notes", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Diary", url: "/diary", desc: "Private daily journal", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5"/><rect x="7" y="3" width="1.5" height="18" fill="#3B82F6"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#3B82F6" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Focus Writer", url: "/focus-writer", desc: "Zen writing mode", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#8B5CF6"/></svg>` },
        { name: "Typing Test", url: "/typing-test", desc: "Speed & accuracy WPM", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "WordPad", url: "/wordpad", desc: "Rich text editor", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="17" r="3" fill="#22C55E" opacity="0.2"/></svg>` },
        { name: "Reading List", url: "/reading-list", desc: "Track books you read", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="5" height="18" rx="1" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><rect x="9" y="3" width="5" height="18" rx="1" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><rect x="15" y="3" width="5" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/><path d="M5 7h1M11 7h1M17 7h1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "Markdown Editor", url: "/markdown-editor", desc: "Live Markdown preview", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 9l2 3-2 3M12 9v6M15 9h3" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Meeting Notes", url: "/meeting-notes", desc: "Agendas & action items", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M7 8h10M7 12h6M7 16h8" stroke="#D97706" stroke-width="1.7" stroke-linecap="round"/><circle cx="16" cy="12" r="1.5" fill="#D97706"/></svg>` }
      ]
    },
    {
      name: "📊 Text Analysis",
      tools: [
        { name: "Case Converter", url: "/case-converter", desc: "UPPER, lower, Title", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FFF7ED" stroke="#F97316" stroke-width="1.5"/><path d="M7 9v6M7 12h3M10 9v6M14 12l2-3 2 3M14 12v3M18 12v3" stroke="#F97316" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Word Counter", url: "/word-counter", desc: "Words, chars, sentences", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="#0EA5E9" stroke-width="1.7" stroke-linecap="round"/><circle cx="17" cy="17" r="4" fill="#0EA5E9" opacity="0.15"/></svg>` },
        { name: "Readability", url: "/readability", desc: "Reading ease score", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6a8 8 0 0 1 16 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" fill="#F3E8FF" stroke="#A855F7" stroke-width="1.5"/><path d="M8 10h8M8 14h5" stroke="#A855F7" stroke-width="1.7" stroke-linecap="round"/></svg>` },
        { name: "Word Shuffler", url: "/word-shuffler", desc: "Randomize word order", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="15" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="9" y="14" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><path d="M6 10v2a2 2 0 0 0 2 2h1M18 10v2a2 2 0 0 1-2 2h-1" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Special Char", url: "/special-character-converter", desc: "Umlauts & diacritics", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#EAB308" stroke-width="1.5"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#EAB308" font-family="serif">ä</text></svg>` },
        { name: "Text Diff", url: "/text-diff", desc: "Compare two texts", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="8" height="16" rx="1.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><path d="M6 8h2M6 12h2M16 8h2M16 12h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "Unit Converter", url: "/unit-converter", desc: "Length, weight, data…", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 16h18" stroke="#0891B2" stroke-width="1.8" stroke-linecap="round"/><path d="M6 5v6M10 5v6M14 5v6M18 5v6M6 13v6M10 13v6M14 13v6M18 13v6" stroke="#0891B2" stroke-width="1.4" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🖼️ Image Editing",
      tools: [
        { name: "Image Converter", url: "/image-converter", desc: "JPG, PNG, WebP convert", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#ECFDF5" stroke="#0F766E" stroke-width="1.5"/><circle cx="9" cy="10" r="2" fill="#14B8A6" stroke="#0F766E" stroke-width="1.2"/><path d="M3 17l5-4 3 3 5-5 5 6" stroke="#0F766E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6l2 2-2 2" stroke="#0F766E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Image Compressor", url: "/image-compressor", desc: "Reduce file size 90%", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FFFBEB" stroke="#B45309" stroke-width="1.5"/><path d="M8 8h8M9 12h6M10 16h4" stroke="#B45309" stroke-width="1.6" stroke-linecap="round"/><path d="M17 4l-3 3M17 20l-3-3" stroke="#F59E0B" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Image Resizer", url: "/image-resizer", desc: "Exact dimensions or %", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 9h18" stroke="#7C3AED" stroke-width="1.5"/><path d="M6 13h5M6 16h9" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/><path d="M17 13l-2 2M17 13l2 2M17 13v4" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Image Cropper", url: "/image-crop", desc: "Crop to any ratio", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3v15a2 2 0 0 0 2 2h15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M3 6h15a2 2 0 0 1 2 2v15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/><rect x="8" y="8" width="8" height="8" fill="#EFF6FF" stroke="#60A5FA" stroke-width="1.4"/></svg>` },
        { name: "Image Flipper", url: "/image-flip", desc: "Mirror horizontal/vertical", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#0891B2" stroke-width="1.4" stroke-dasharray="3 3"/><path d="M5 8l3 4-3 4V8z" fill="#ECFEFF" stroke="#0891B2" stroke-width="1.5" stroke-linejoin="round"/><path d="M19 8l-3 4 3 4V8z" fill="#22D3EE" stroke="#0891B2" stroke-width="1.5" stroke-linejoin="round"/></svg>` }
      ]
    },
    {
      name: "📄 PDF Tools",
      tools: [
        { name: "PDF Merger", url: "/pdf-merger", desc: "Combine multiple PDFs", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><rect x="9" y="7" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><path d="M6 7h4M6 10h4M6 13h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/><path d="M12 11h4M12 14h4M12 17h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "PDF Splitter", url: "/pdf-splitter", desc: "Split & extract pages", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M10.5 5v14" stroke="#A78BFA" stroke-width="1.4" stroke-dasharray="2 3" stroke-linecap="round"/><path d="M4 8h5M4 12h5M4 16h5M15 8h5M15 12h5M15 16h5" stroke="#7C3AED" stroke-width="1.2" stroke-linecap="round"/></svg>` },
        { name: "Image to PDF", url: "/image-to-pdf", desc: "Convert images to PDF", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="13" height="15" rx="1.5" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><circle cx="7" cy="8" r="1.5" fill="#14B8A6" stroke="#0D9488" stroke-width="1"/><path d="M3 14l4-3 3 2.5 4-4 2 2" stroke="#0D9488" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18 9l2 2-2 2M18 15l2 2-2 2" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 11h-3M20 17h-3" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🧠 Ideas & Lists",
      tools: [
        { name: "MindMap", url: "/mindmap", desc: "Visual brainstorms", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#C7D2FE" stroke="#6366F1" stroke-width="1.5"/><circle cx="5" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="5" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><path d="M10 11L6.5 7.5M14 11l3.5-3.5M10 13l-3.5 3.5M14 13l3.5 3.5" stroke="#6366F1" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "List Maker", url: "/list-maker", desc: "Checklists & to-dos", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="7" y="7" width="3" height="3" rx="0.5" fill="#16A34A"/><path d="M7.5 8.5l1 1 1.5-1.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Habit Tracker", url: "/habit-tracker", desc: "Build daily streaks", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/><path d="M3 9h18" stroke="#10B981" stroke-width="1.5"/><path d="M7 2v4M17 2v4" stroke="#10B981" stroke-width="1.7" stroke-linecap="round"/><path d="M8 14l2 2 4-4" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
      ]
    },
    {
      name: "🎲 Creativity",
      tools: [
        { name: "Random Text", url: "/random-text", desc: "Placeholder paragraphs", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/><path d="M7 9h4M7 12h7M7 15h5M15 9h2M14 15h3" stroke="#DB2777" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Word Cloud", url: "/word-cloud", desc: "Visual word clouds", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 16a4 4 0 0 1 .5-8 5 5 0 0 1 9.5-1.5A4.5 4.5 0 0 1 18 16H6z" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5" stroke-linejoin="round"/><text x="12" y="14" text-anchor="middle" font-size="7" font-weight="bold" fill="#0284C7" font-family="sans-serif">abc</text></svg>` },
        { name: "Decision Maker", url: "/choice-maker", desc: "Wheel or coin flip", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M12 12V3M12 12l7.5 4.5M12 12l-7.5 4.5" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#D97706"/></svg>` },
        { name: "Name Generator", url: "/random-name-generator", desc: "Random names", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M4 20a8 8 0 0 1 16 0" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🔍 Word Helpers",
      tools: [
        { name: "Word Finder", url: "/word-finder", desc: "Anagrams & terms", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.6"/><path d="M15.5 15.5L21 21" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>` },
        { name: "Crossword", url: "/crossword-solver", desc: "Clue & puzzle help", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="3" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="3" y="10" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="14" y="14" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="10" width="7" height="7" fill="#fff" stroke="#4F46E5" stroke-width="1.3"/></svg>` },
        { name: "Word Search", url: "/word-search-solver", desc: "Puzzle solver", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/><path d="M6 9h3M9 6v6M14 8h4M14 12h4M14 16h4M6 15h3M6 18h3" stroke="#9333EA" stroke-width="1.4" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "⏳ Productivity",
      tools: [
        { name: "Pomodoro", url: "/pomodoro-timer", desc: "Focus intervals", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.6"/><path d="M12 13V8M12 13l3 2" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/><path d="M9 3h6" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/></svg>` },
        { name: "Study Planner", url: "/study-planner", desc: "Plan study sessions", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M3 9h18M7 2v4M17 2v4" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/><path d="M8 13h3M8 17h5M14 13h3" stroke="#0284C7" stroke-width="1.4" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🔐 Generators",
      tools: [
        { name: "Password Gen", url: "/password-generator", desc: "Strong passwords", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" fill="#EDE9FE" stroke="#6D28D9" stroke-width="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#6D28D9" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="15" r="1.5" fill="#6D28D9"/><path d="M12 16.5v2" stroke="#6D28D9" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "QR Code", url: "/qr-code-generator", desc: "Custom QR codes", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="5" y="5" width="3" height="3" fill="#0E7490"/><rect x="16" y="5" width="3" height="3" fill="#0E7490"/><rect x="5" y="16" width="3" height="3" fill="#0E7490"/><path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM19 19h2v2h-2z" fill="#0E7490"/></svg>` },
        { name: "Invoice Gen", url: "/invoice-generator", desc: "PDF invoices", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M8 7h8M8 11h5M8 15h8" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="15" cy="11" r="1.5" fill="#D97706"/></svg>` },
        { name: "Resume Builder", url: "/resume-builder", desc: "CV & resume PDF maker", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="#B45309" opacity="0.35" stroke="#B45309" stroke-width="1.2"/><path d="M7 15h10M7 18h7" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/><path d="M8 13c0-1.5 1.8-2.5 4-2.5s4 1 4 2.5" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Business Card", url: "/business-card-generator", desc: "Cards with QR codes", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#BE185D" stroke-width="1.5"/><circle cx="8" cy="11" r="2" fill="#BE185D" opacity="0.4" stroke="#BE185D" stroke-width="1.1"/><path d="M6 15h5M12 10h6M12 13h6M12 16h3" stroke="#BE185D" stroke-width="1.5" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🎨 Design & Fun",
      tools: [
        { name: "Color Converter", url: "/color-converter", desc: "HEX, RGB, HSL, CMYK", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FFF7ED" stroke="#C2410C" stroke-width="1.5"/><circle cx="9" cy="9" r="2.5" fill="#C2410C"/><circle cx="15" cy="9" r="2.5" fill="#EA580C"/><circle cx="12" cy="15" r="2.5" fill="#FB923C"/></svg>` },
        { name: "Emoji Picker", url: "/emoji-picker", desc: "Copy emojis fast", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#FACC15" stroke-width="1.6"/><circle cx="9" cy="10" r="1.2" fill="#854D0E"/><circle cx="15" cy="10" r="1.2" fill="#854D0E"/><path d="M8 14c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" stroke="#854D0E" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Click Speed", url: "/click-speed-test", desc: "Measure CPS rate", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/><path d="M9 3h6" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Bionic Reader", url: "/bionic-reader", desc: "Faster reading", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 8h10M7 12h8M7 16h10" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Teleprompter", url: "/teleprompter", desc: "Auto-scroll text", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/><path d="M12 8v8M9 13l3 3 3-3" stroke="#0D9488" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
      ]
    }
  ];

  // ── Games catalog — mirrors social-share widget GAMES list ──
  const GAMES = [
    { id: 'connections-unlimited', name: 'Connections Unlimited', emoji: '🧩', desc: 'Group 16 words into 4 categories', url: '/connections-unlimited' },
    { id: 'spelling-bee', name: 'Spelling Bee Unlimited', emoji: '🐝', desc: 'Build words from 7 letters', url: '/spelling-bee-unlimited' },
    { id: 'crossword-puzzle', name: 'Crossword Puzzle', emoji: '📝', desc: 'Solve interactive crossword grids', url: '/crossword-puzzle' },
    { id: 'wordle', name: 'Wordle', emoji: '🔤', desc: 'Guess the 5-letter word', url: '/wordle' },
    { id: 'word-search', name: 'Word Search', emoji: '🔍', desc: 'Find hidden words in a grid', url: '/word-search' },
    { id: 'memory-match', name: 'Memory Match', emoji: '🃏', desc: 'Flip and match the cards', url: '/memory-match' },
    { id: '2048', name: '2048', emoji: '🔢', desc: 'Slide to combine numbers', url: '/2048' },
    { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', emoji: '❌', desc: 'Three in a row wins', url: '/tic-tac-toe' },
    { id: 'sudoku', name: 'Sudoku', emoji: '🧮', desc: 'Fill the grid with digits', url: '/sudoku' },
    { id: 'minesweeper', name: 'Minesweeper', emoji: '💣', desc: 'Clear the minefield', url: '/minesweeper' }
  ];

  // Helper function to resolve localized URLs based on current location
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

  // Detect current active language prefix
  const currentPath = window.location.pathname;
  const activeLangCode = languages.find(l => l.code !== 'en' && currentPath.startsWith(`/${l.code}`))?.code || 'en';

  // Generate options for desktop select
  const desktopOptions = languages.map(lang => {
    const isSelected = lang.code === activeLangCode ? 'selected' : '';
    return `<option value="${lang.prefix}" ${isSelected}>${lang.label}</option>`;
  }).join('');

  // Generate links for mobile language list
  const mobileLangLinks = languages.map(lang => {
    const targetUrl = getLocalizedUrl(lang.prefix);
    const activeClass = lang.code === activeLangCode ? 'font-weight: bold; color: var(--accent);' : '';
    return `<a href="${targetUrl}" class="nav-link" style="padding-left: 32px; ${activeClass}">• ${lang.label}</a>`;
  }).join('');

  // ── Build mega-menu markup (desktop) with ad column inserted after category 3 ──
  const AD_INSERT_AFTER_INDEX = 2; // 0-based index of the category after which to insert the ad
  let megaMenuColsHTML = '';
  toolCategories.forEach((category, idx) => {
    megaMenuColsHTML += `
      <div class="mega-col">
        <div class="mega-col-title">${category.name}</div>
        <div class="mega-col-tools">
          ${category.tools.map(tool => `
            <a href="${tool.url}" class="mega-tool">
              <span class="mega-tool-icon">${tool.svg}</span>
              <span class="mega-tool-text">
                <span class="mega-tool-name">${tool.name}</span>
                <span class="mega-tool-desc">${tool.desc}</span>
              </span>
            </a>
          `).join('')}
        </div>
      </div>
    `;

    if (idx === AD_INSERT_AFTER_INDEX) {
      megaMenuColsHTML += `
        <div class="mega-col mega-col-ad" aria-label="Advertisement">
          <div class="mega-col-title mega-col-title-ad">Sponsored</div>
          <div class="mega-ad-slot" id="megaAdSlot">
            <div class="mega-ad-placeholder">Loading ad…</div>
          </div>
        </div>
      `;
    }
  });

  megaMenuColsHTML += `
    <div class="mega-col mega-col-games">
      <div class="mega-col-title">🎮 Games</div>
      <div class="mega-col-tools">
        ${GAMES.map(game => `
          <a href="${game.url}" class="mega-tool mega-tool-game">
            <span class="mega-tool-icon mega-tool-icon-game">${game.emoji}</span>
            <span class="mega-tool-text">
              <span class="mega-tool-name">${game.name}</span>
              <span class="mega-tool-desc">${game.desc}</span>
            </span>
          </a>
        `).join('')}
        <a href="/games" class="mega-tool mega-tool-all-games">
          <span class="mega-tool-icon mega-tool-icon-game">🎯</span>
          <span class="mega-tool-text">
            <span class="mega-tool-name">All Games</span>
            <span class="mega-tool-desc">See every game in one hub</span>
          </span>
        </a>
      </div>
    </div>
  `;

  const megaMenuHTML = megaMenuColsHTML;

  // ── Build mobile accordion markup (NO AD on mobile) ──
  const mobileToolsHTML = toolCategories.map((category, idx) => `
    <div class="mobile-tools-group">
      <button class="mobile-tools-toggle" data-target="mob-tools-${idx}" aria-expanded="false">
        <span>${category.name}</span>
        <span class="mobile-tools-chevron">▼</span>
      </button>
      <div class="mobile-tools-panel" id="mob-tools-${idx}">
        ${category.tools.map(tool => `
          <a href="${tool.url}" class="mobile-tool-link">
            <span class="mobile-tool-icon">${tool.svg}</span>
            <span class="mobile-tool-text">
              <span class="mobile-tool-name">${tool.name}</span>
              <span class="mobile-tool-desc">${tool.desc}</span>
            </span>
          </a>
        `).join('')}
      </div>
    </div>
  `).join('') + `
    <div class="mobile-tools-group mobile-tools-group-games">
      <button class="mobile-tools-toggle" data-target="mob-tools-games" aria-expanded="false">
        <span>🎮 Games</span>
        <span class="mobile-tools-chevron">▼</span>
      </button>
      <div class="mobile-tools-panel" id="mob-tools-games">
        ${GAMES.map(game => `
          <a href="${game.url}" class="mobile-tool-link">
            <span class="mobile-tool-icon mobile-tool-icon-game">${game.emoji}</span>
            <span class="mobile-tool-text">
              <span class="mobile-tool-name">${game.name}</span>
              <span class="mobile-tool-desc">${game.desc}</span>
            </span>
          </a>
        `).join('')}
        <a href="/games" class="mobile-tool-link mobile-tool-all-games">
          <span class="mobile-tool-icon mobile-tool-icon-game">🎯</span>
          <span class="mobile-tool-text">
            <span class="mobile-tool-name">All Games</span>
            <span class="mobile-tool-desc">See every game in one hub</span>
          </span>
        </a>
      </div>
    </div>
  `;

  // NOTE: "All Tools" is now a direct link to /all-tools.html.
  // The mega-menu markup (megaMenuHTML) is no longer rendered, but
  // its variable declaration is kept above for minimal diff / reuse.
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
          <a href="/all-tools" class="nav-link nav-link-all-tools" id="allToolsNavBtn">All Tools</a>
          <a href="/games" class="nav-link">Games</a>
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
      <div class="mobile-dropdown">
        <button class="mobile-dropdown-btn">📁 All Tools ▼</button>
        <div class="mobile-dropdown-content mobile-tools-list">
          ${mobileToolsHTML}
        </div>
      </div>      
      <a href="/diary" class="nav-link">🔄 Diary</a>
      <a href="/mindmap" class="nav-link">👥 MindMap</a>
      <a href="/list-maker" class="nav-link">❓ List Maker</a>
      <a href="/games" class="nav-link">🎮 Games</a>
      <a href="/about" class="nav-link">ℹ️ About</a>
      <a href="/blog" class="nav-link">📝 Blog</a>      
      <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Notepad→</a>
    </nav>
  `;

  // ── Ad injection via isolated iframe (160×300) ──
  // Using an iframe isolates the ad's `atOptions` global from the parent page,
  // preventing collisions with other Adsterra slots on the same page.
  // (Kept for reference / potential reuse elsewhere; the mega-menu ad
  //  is not rendered now that "All Tools" is a plain link.)
  function injectMegaAd() {
    const adSlot = document.getElementById('megaAdSlot');
    if (!adSlot) return;

    // Clear placeholder / previous content
    adSlot.innerHTML = '';

    const adHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${MEGA_AD.width},height=${MEGA_AD.height}">
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: ${MEGA_AD.width}px;
    height: ${MEGA_AD.height}px;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  iframe, img, ins { max-width: ${MEGA_AD.width}px; max-height: ${MEGA_AD.height}px; border: 0; display: block; }
  #fallback {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 10px;
    color: #9ca3af;
    text-align: center;
    padding: 8px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div id="fallback">Advertisement</div>
  <script>
    atOptions = {
      'key' : '${MEGA_AD.key}',
      'format' : 'iframe',
      'height' : ${MEGA_AD.height},
      'width' : ${MEGA_AD.width},
      'params' : {}
    };
  <\/script>
  <script src="${MEGA_AD.src}"><\/script>
  <script>
    // Hide the fallback if the ad rendered
    setTimeout(function() {
      var fallback = document.getElementById('fallback');
      if (fallback && (document.querySelector('iframe') || document.querySelector('img'))) {
        fallback.style.display = 'none';
      }
    }, 1500);
  <\/script>
</body>
</html>`;

    const iframe = document.createElement('iframe');
    iframe.width = String(MEGA_AD.width);
    iframe.height = String(MEGA_AD.height);
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.style.width = MEGA_AD.width + 'px';
    iframe.style.height = MEGA_AD.height + 'px';
    iframe.style.maxWidth = '100%';
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('title', 'Advertisement');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
    iframe.srcdoc = adHtml;

    adSlot.appendChild(iframe);
  }

  function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;
    root.innerHTML = headerHTML;

    // ── "All Tools" nav button: navigate to /all-tools.html (no dropdown) ──
    const allToolsNavBtn = document.getElementById('allToolsNavBtn');
    if (allToolsNavBtn) {
      allToolsNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/all-tools';
      });
      allToolsNavBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = '/all-tools';
        }
      });
    }

    // Language switch handler
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.addEventListener('change', (e) => {
        const targetPrefix = e.target.value;
        window.location.href = getLocalizedUrl(targetPrefix);
      });
    }

    // Dark mode toggle
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

    // ── Mobile dropdown toggles ──
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

    // ── Mobile inner accordion toggles (per category + Games) ──
    const mobileToolsToggles = document.querySelectorAll('.mobile-tools-toggle');
    mobileToolsToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = toggle.getAttribute('data-target');
        const panel = document.getElementById(targetId);
        if (!panel) return;
        const isOpen = panel.classList.contains('show');
        panel.classList.toggle('show', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
        const chevron = toggle.querySelector('.mobile-tools-chevron');
        if (chevron) chevron.textContent = !isOpen ? '▲' : '▼';
      });
    });

    // ── Hamburger menu ──
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
      /* Language Switcher */
      .lang-selector-wrapper {
        display: inline-flex;
        align-items: center;
        margin-right: 8px;
      }
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

      /* ── "All Tools" highlight button (blinks + colored) ── */
      .nav-link-all-tools {
        background: var(--accent);
        color: #fff !important;
        font-weight: 700 !important;
        border: 1px solid var(--accent);
        border-radius: 100px;
        padding: 4px 14px !important;
        box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.45);
        animation: allToolsBlink 1.8s ease-in-out infinite;
        transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        text-decoration: none;
      }
      .nav-link-all-tools:hover {
        background: var(--accent-hover, #d46a3a);
        color: #fff !important;
        transform: translateY(-1px) scale(1.04);
        animation-play-state: paused;
        box-shadow: 0 6px 18px rgba(196, 86, 42, 0.5);
      }
      .nav-link-all-tools:active {
        transform: translateY(0) scale(0.98);
      }
      .nav-link-all-tools:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
      }
      body.dark .nav-link-all-tools {
        background: var(--accent);
        color: #fff !important;
        border-color: var(--accent);
      }

      @keyframes allToolsBlink {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.5),
                      0 0 0 0 rgba(196, 86, 42, 0.25);
          opacity: 1;
        }
        50% {
          box-shadow: 0 0 0 6px rgba(196, 86, 42, 0),
                      0 0 0 14px rgba(196, 86, 42, 0);
          opacity: 0.82;
        }
      }

      /* ── Desktop Mega-Menu (kept for backward compatibility) ── */
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

      .mega-menu {
        display: none;
        position: absolute;
        top: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(1200px, 96vw);
        max-height: 78vh;
        overflow-y: auto;
        background-color: var(--paper);
        border: 1px solid var(--paper-edge);
        border-radius: 16px;
        box-shadow: 0 24px 60px -12px rgba(0,0,0,0.22), 0 6px 18px -6px rgba(0,0,0,0.08);
        z-index: 1200;
        padding: 22px 22px 18px;
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      .mega-menu.show {
        display: block;
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      .mega-menu::before {
        content: "";
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 14px;
        height: 14px;
        background: var(--paper);
        border-left: 1px solid var(--paper-edge);
        border-top: 1px solid var(--paper-edge);
      }

      /* ── 5-column grid ── */
      .mega-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 20px 20px;
        align-items: start;
      }

      .mega-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }
      .mega-col-title {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ink-muted);
        padding-bottom: 8px;
        border-bottom: 1px solid var(--paper-edge);
        opacity: 0.8;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .mega-col-tools {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      /* ── Advertisement column (160×300) ── */
      .mega-col-ad {
        align-items: center;
      }
      .mega-col-title-ad {
        color: var(--ink-muted);
        opacity: 0.5;
        letter-spacing: 0.12em;
        align-self: stretch;
      }
      .mega-ad-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 300px;
        max-width: 100%;
        overflow: hidden;
        border-radius: 8px;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        position: relative;
        margin: 0 auto;
      }
      .mega-ad-slot > iframe,
      .mega-ad-slot > div,
      .mega-ad-slot > img {
        max-width: 100%;
        display: block;
      }
      .mega-ad-placeholder {
        font-size: 0.7rem;
        color: var(--ink-muted);
        opacity: 0.4;
        font-family: 'DM Mono', 'Courier New', monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .mega-tool {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 8px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--ink);
        transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
        min-width: 0;
      }
      .mega-tool:hover {
        background: var(--paper-warm);
        color: var(--accent);
        transform: translateX(2px);
      }
      .mega-tool-icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--paper-warm);
        border-radius: 7px;
        border: 1px solid var(--paper-edge);
      }
      .mega-tool-icon svg { width: 18px; height: 18px; display: block; }
      .mega-tool:hover .mega-tool-icon { background: var(--paper); border-color: var(--accent); }

      .mega-tool-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.2;
      }
      .mega-tool-name {
        font-size: 0.82rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mega-tool-desc {
        font-size: 0.68rem;
        color: var(--ink-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ── Games column styling ── */
      .mega-col-games .mega-col-title {
        color: #4f46e5;
      }
      body.dark .mega-col-games .mega-col-title {
        color: #818cf8;
      }
      .mega-tool-game .mega-tool-icon-game {
        background: linear-gradient(145deg, rgba(99, 102, 241, 0.18), rgba(99, 102, 241, 0.08));
        border-color: rgba(99, 102, 241, 0.25);
        font-size: 1rem;
      }
      .mega-tool-game:hover .mega-tool-icon-game {
        background: linear-gradient(145deg, rgba(99, 102, 241, 0.32), rgba(99, 102, 241, 0.16));
        border-color: #6366f1;
      }
      .mega-tool-all-games {
        margin-top: 4px;
        border-top: 1px dashed var(--paper-edge);
        padding-top: 10px;
        color: #4f46e5;
        font-weight: 600;
      }
      .mega-tool-all-games:hover {
        color: #4338ca;
      }
      body.dark .mega-tool-all-games {
        color: #818cf8;
      }
      body.dark .mega-tool-all-games:hover {
        color: #a5b4fc;
      }

      /* Dark mode for mega-menu */
      body.dark .mega-menu {
        background-color: var(--paper);
        border-color: var(--paper-edge);
        box-shadow: 0 24px 60px -12px rgba(0,0,0,0.6);
      }
      body.dark .mega-menu::before {
        background: var(--paper);
        border-color: var(--paper-edge);
      }
      body.dark .mega-col-title { color: var(--ink-muted); }
      body.dark .mega-tool { color: var(--ink); }
      body.dark .mega-tool:hover { background: var(--paper-warm); color: var(--accent); }
      body.dark .mega-tool-icon { background: var(--paper-warm); border-color: var(--paper-edge); }
      body.dark .mega-ad-slot { background: var(--paper-warm); border-color: var(--paper-edge); }

      /* ── Mobile Dropdown ── */
      .mobile-dropdown { width: 100%; }
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
      .mobile-dropdown-btn:hover { color: var(--accent); }
      .mobile-dropdown-content {
        display: none;
        flex-direction: column;
        background-color: var(--paper-warm);
      }
      .mobile-dropdown-content.show { display: flex; }
      .mobile-dropdown-content a {
        display: block;
        color: var(--ink);
        transition: color 0.2s;
      }
      .mobile-dropdown-content a:hover { color: var(--accent); }

      /* ── Mobile All-Tools accordion ── */
      .mobile-tools-list {
        padding: 4px 0 8px;
        background: var(--paper-warm) !important;
      }
      .mobile-tools-group {
        border-bottom: 1px solid var(--paper-edge);
      }
      .mobile-tools-group:last-child { border-bottom: none; }

      .mobile-tools-toggle {
        width: 100%;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px 12px 28px;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--ink);
        font-family: var(--font-body);
        cursor: pointer;
        text-align: left;
        gap: 8px;
      }
      .mobile-tools-toggle:hover { color: var(--accent); }
      .mobile-tools-chevron {
        font-size: 0.7rem;
        opacity: 0.6;
        transition: transform 0.2s ease;
      }
      .mobile-tools-panel {
        display: none;
        flex-direction: column;
        padding: 2px 0 8px;
        background: var(--paper);
      }
      .mobile-tools-panel.show { display: flex; }

      .mobile-tool-link {
        display: flex !important;
        align-items: center;
        gap: 10px;
        padding: 9px 20px 9px 32px !important;
        text-decoration: none;
        color: var(--ink) !important;
        transition: background 0.15s, color 0.15s;
      }
      .mobile-tool-link:hover {
        background: var(--paper-warm);
        color: var(--accent) !important;
      }
      .mobile-tool-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }
      .mobile-tool-icon svg { width: 20px; height: 20px; display: block; }
      .mobile-tool-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.2;
      }
      .mobile-tool-name {
        font-size: 0.85rem;
        font-weight: 500;
      }
      .mobile-tool-desc {
        font-size: 0.68rem;
        color: var(--ink-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Games group on mobile */
      .mobile-tools-group-games .mobile-tools-toggle { color: #4f46e5; }
      body.dark .mobile-tools-group-games .mobile-tools-toggle { color: #818cf8; }
      .mobile-tool-all-games {
        border-top: 1px dashed var(--paper-edge);
        margin-top: 4px;
        color: #4f46e5 !important;
        font-weight: 600;
      }
      body.dark .mobile-tool-all-games {
        color: #818cf8 !important;
      }

      body.dark .mobile-tools-toggle { color: var(--ink); }
      body.dark .mobile-tools-panel { background: var(--paper); }
      body.dark .mobile-tool-link { color: var(--ink) !important; }
      body.dark .mobile-tool-link:hover { background: var(--paper-warm); color: var(--accent) !important; }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* ── Responsive ── */
      @media (max-width: 1100px) {
        .mega-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .mega-menu { width: min(1000px, 96vw); }
      }

      @media (max-width: 900px) {
        .mega-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .mega-menu { width: min(850px, 96vw); }
      }

      @media (max-width: 768px) {
        /* Hide desktop mega dropdown on mobile — mobile nav handles it */
        .header-nav .dropdown { display: none; }

        /* Ensure the ad column is completely hidden on mobile */
        .mega-col-ad { display: none !important; }

        .header-inner { padding: 0 8px; }
        .header-logo { gap: 6px; }
        .header-logo span {
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .logo-image { width: 26px; height: 26px; }
        .lang-select {
          width: 38px;
          padding: 2px 2px;
          font-size: 1rem;
        }

        /* Keep the All Tools button visible + compact on mobile */
        .nav-link-all-tools {
          padding: 3px 10px !important;
          font-size: 0.8rem;
        }
      }

      @media (max-width: 480px) {
        .mega-menu { padding: 16px; }
        .mega-grid { grid-template-columns: 1fr; }
        .mega-col-ad { display: none !important; }
      }

      /* Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .nav-link-all-tools {
          animation: none !important;
          transition: none !important;
        }
      }

      /* Dark mode support for other dropdowns */
      body.dark .mobile-dropdown-btn { color: var(--ink); }
      body.dark .mobile-dropdown-btn:hover { color: var(--accent); }
      body.dark .mobile-dropdown-content { background-color: var(--paper-warm); }
      body.dark .mobile-dropdown-content a { color: var(--ink); }
      body.dark .mobile-dropdown-content a:hover { color: var(--accent); }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
