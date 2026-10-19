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

  // ── Desktop nav SVG icons ──
  const NAV_ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 3l9 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-5.5h4V21h3.5a1 1 0 0 0 1-1V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    diary: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="15" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3v18" stroke="currentColor" stroke-width="1.8"/><path d="M11 8h5M11 12h5M11 16h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    mindmap: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.8"/><circle cx="5" cy="6" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="6" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="5" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><path d="M10 11L6.2 7.2M14 11l3.8-3.8M10 13l-3.8 3.8M14 13l3.8 3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><rect x="7" y="7" width="3" height="3" rx="0.5" stroke="currentColor" stroke-width="1.4"/><path d="M7.6 8.5l1 1 1.6-1.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    allTools: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
    games: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="6" y1="11" x2="10" y2="11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="8" y1="9" x2="8" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="15" cy="12" r="0.9" fill="currentColor"/><circle cx="18" cy="10" r="0.9" fill="currentColor"/></svg>`
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
      name: "📄 PDF Tools",
      tools: [
        { name: "PDF Merger", url: "/pdf-merger", desc: "Combine multiple PDFs", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><rect x="9" y="7" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><path d="M6 7h4M6 10h4M6 13h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/><path d="M12 11h4M12 14h4M12 17h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "PDF Splitter", url: "/pdf-splitter", desc: "Split & extract pages", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M10.5 5v14" stroke="#A78BFA" stroke-width="1.4" stroke-dasharray="2 3" stroke-linecap="round"/><path d="M4 8h5M4 12h5M4 16h5M15 8h5M15 12h5M15 16h5" stroke="#7C3AED" stroke-width="1.2" stroke-linecap="round"/></svg>` },
        { name: "Image to PDF", url: "/image-to-pdf", desc: "Convert images to PDF", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="13" height="15" rx="1.5" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><circle cx="7" cy="8" r="1.5" fill="#14B8A6" stroke="#0D9488" stroke-width="1"/><path d="M3 14l4-3 3 2.5 4-4 2 2" stroke="#0D9488" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18 9l2 2-2 2M18 15l2 2-2 2" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 11h-3M20 17h-3" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round"/></svg>` }
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
      name: "🧮 Calculators",
      tools: [
        { name: "Typing Test", url: "/typing-test", desc: "WPM & accuracy test", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Sleep Calculator", url: "/sleep-calculator", desc: "Best bedtime & wake-up", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#DDD6FE" stroke="#6D28D9" stroke-width="1.6" stroke-linejoin="round"/><circle cx="17" cy="8" r="1" fill="#6D28D9"/><circle cx="19" cy="11" r="0.8" fill="#6D28D9"/></svg>` },
        { name: "Roof Pitch Calculator", url: "/roof-pitch-calculator", desc: "Slope, angle, rise & run", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 18L12 6l9 12H3z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 6v12" stroke="#D97706" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M3 18h18" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Percentage Calculator", url: "/percentage-calculator", desc: "% of, change & reverse", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><circle cx="17" cy="17" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><path d="M19 5L5 19" stroke="#0E7490" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Age Calculator", url: "/age-calculator", desc: "Exact age in y/m/d", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 10h18M8 3v4M16 3v4" stroke="#7C3AED" stroke-width="1.6" stroke-linecap="round"/><path d="M8 14h2v2H8zM14 14h2v2h-2z" fill="#7C3AED"/></svg>` },
        { name: "BMI Calculator", url: "/bmi-calculator", desc: "Body Mass Index & category", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><path d="M12 6v6l3.5 2" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#0D9488"/></svg>` },
        { name: "Fuel Cost Calculator", url: "/fuel-cost-calculator", desc: "Trip fuel cost estimate", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="12" height="16" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/><path d="M4 8h12" stroke="#2563EB" stroke-width="1.5"/><path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" stroke="#2563EB" stroke-width="1.5" fill="none"/><path d="M7 12h6M7 15h4" stroke="#2563EB" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Paint Calculator", url: "/paint-calculator", desc: "Paint needed per room", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="14" height="12" rx="2" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/><rect x="6" y="4" width="10" height="4" rx="1" fill="none" stroke="#EA580C" stroke-width="1.5"/><path d="M4 12h14" stroke="#EA580C" stroke-width="1.4"/><path d="M8 16h6" stroke="#EA580C" stroke-width="1.6" stroke-linecap="round"/></svg>` }
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

  // ── Move PDF Tools to the second row ──
  const pdfCategoryIndex = toolCategories.findIndex(cat => cat.name.includes("PDF Tools"));
  if (pdfCategoryIndex !== -1) {
    const [pdfCategory] = toolCategories.splice(pdfCategoryIndex, 1);
    toolCategories.splice(1, 0, pdfCategory);
  }

  // ── Games catalog ──
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

  const headerHTML = `
    <header class="site-header" id="siteHeader" role="banner">
      <div class="container header-inner">
        <a href="/" class="header-logo" aria-label="WebNotePad Home">
          <img src="/logo.png" alt="WebNotePad Logo" class="logo-image" width="34" height="34" />
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
      <a href="/diary" class="nav-link">🔄 Diary</a>
      <a href="/mindmap" class="nav-link">👥 MindMap</a>
      <a href="/list-maker" class="nav-link">❓ List Maker</a>
      <a href="/games" class="nav-link">🎮 Games</a>
      <a href="/about" class="nav-link">ℹ️ About</a>
      <a href="/blog" class="nav-link">📝 Blog</a>      
      <a href="/#notepad" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Notepad→</a>
    </nav>
  `;

  // ── Inject the 300x250 ad directly below the header (outside header) ──
  function injectHeaderAd() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    // Prevent duplicate injection if initHeader runs more than once
    if (document.getElementById('header-ad-slot')) return;

    // Wrapper placed as a sibling AFTER <header>, so it's outside the header
    const adWrap = document.createElement('div');
    adWrap.id = 'header-ad-slot';
    adWrap.className = 'header-ad-slot';
    adWrap.setAttribute('aria-label', 'Advertisement');

    // Inner 300x250 container that the ad script will target
    const adBox = document.createElement('div');
    adBox.id = 'header-ad-300x250';
    adBox.className = 'header-ad-box';
    adBox.style.width = '300px';
    adBox.style.height = '250px';
    adWrap.appendChild(adBox);

    // Insert the slot right after the header element (outside of it)
    header.insertAdjacentElement('afterend', adWrap);

    // Configure the ad options expected by the remote script
    window.atOptions = {
      key: 'f5214acd8479e07d7defe4626c574aa5',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };

    // Load the ad script dynamically into the 300x250 box
    const adScript = document.createElement('script');
    adScript.src = 'https://bauval.org/22/f5214acd8479e07d7defe4626c574aa5';
    adScript.async = true;
    adBox.appendChild(adScript);

    // Styles for the ad slot (centered, subtle separator, responsive)
    const adStyle = document.createElement('style');
    adStyle.textContent = `
      .header-ad-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 16px;
        background: var(--paper-warm, transparent);
        border-bottom: 1px solid var(--paper-edge, #e5e5e5);
        min-height: 250px;
        box-sizing: border-box;
        width: 100%;
      }
      .header-ad-box {
        max-width: 100%;
        overflow: hidden;
      }
      .header-ad-box iframe {
        display: block;
        border: 0;
      }
      @media (max-width: 340px) {
        .header-ad-slot { padding: 8px; min-height: auto; }
      }
      body.dark .header-ad-slot {
        background: var(--paper-warm, #1a1a1a);
        border-color: var(--paper-edge, #333);
      }
    `;
    document.head.appendChild(adStyle);
  }

  function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;
    root.innerHTML = headerHTML;

    // Inject the 300x250 ad right below the header (outside header)
    injectHeaderAd();

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

      /* ── Desktop nav links with icons ── */
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
        /* Preserve monochrome currentColor for desktop nav icons */
        color: inherit;
      }
      .header-nav .nav-link-icon:hover svg {
        transform: scale(1.1);
      }

      /* ── All Tools CTA button (compact landscape pill) ── */
      .header-nav .nav-link-cta {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 10px;
        border-radius: 100px;
        background: var(--accent);
        color: #ffffff !important;
        font-weight: 600;
        font-size: 0.78rem;
        line-height: 1.15;
        border: 1px solid var(--accent);
        white-space: nowrap;
        transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
      }
      .header-nav .nav-link-cta:hover {
        background: var(--accent-light, #e8714a);
        border-color: var(--accent-light, #e8714a);
        color: #ffffff !important;
        transform: translateY(-1px);
      }
      .header-nav .nav-link-cta.active-nav {
        background: var(--accent);
        color: #ffffff !important;
      }
      .header-nav .nav-link-cta svg {
        width: 12px;
        height: 12px;
        color: #ffffff;
      }

      .nav-link-blink {
        animation: allToolsBlink 1.6s ease-in-out infinite;
      }
      @keyframes allToolsBlink {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.6);
          opacity: 1;
        }
        50% {
          box-shadow: 0 0 0 6px rgba(196, 86, 42, 0);
          opacity: 0.82;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-link-blink { animation: none; }
      }

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
      /* Preserve the inline SVG colors (fill/stroke attributes) */
      .mobile-tool-icon svg {
        width: 20px;
        height: 20px;
        display: block;
        overflow: visible;
        /* Do NOT set fill or stroke here — inline attributes must win */
        color: initial;
      }
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

      @media (max-width: 768px) {
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
        .nav-link-blink { animation: none; }
        .header-nav .nav-link-icon svg { display: none; }
      }

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
