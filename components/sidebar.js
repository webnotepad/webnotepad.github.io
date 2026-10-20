/**
 * WebNotePad — sidebar.js
 * Injects a CENTERED radial toolkit where EVERY category is its own circle,
 * all shown at once. Apps are always visible (never hidden behind an expand
 * toggle) and sized up so names are easy to read.
 *
 * The page blurs behind the whole toolkit, matching the games widget.
 *
 * Theme: Editorial / Ink-on-paper aesthetic
 */

(function () {
  // 1. Categories with colorful SVG icons
  const categories = [
    {
      name: "📝 Writing & Note-Taking",
      shortName: "Writing",
      tools: [
        { name: "Notepad", url: "/#notepad", desc: "Auto-saving notes", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Diary", url: "/diary", desc: "Private daily journal", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="14" height="18" rx="2" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5"/><rect x="7" y="3" width="1.5" height="18" fill="#3B82F6"/><path d="M11 8h5M11 12h5M11 16h3" stroke="#3B82F6" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Focus Writer", url: "/focus-writer", desc: "Zen writing mode", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#8B5CF6"/></svg>` },
        { name: "Typing Test", url: "/typing-test", desc: "Speed & accuracy WPM", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "WordPad", url: "/wordpad", desc: "Rich text editor", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="17" r="3" fill="#22C55E" opacity="0.2"/></svg>` },
        { name: "Reading List", url: "/reading-list", desc: "Track books you read", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="5" height="18" rx="1" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><rect x="9" y="3" width="5" height="18" rx="1" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><rect x="15" y="3" width="5" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/><path d="M5 7h1M11 7h1M17 7h1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "Markdown", url: "/markdown-editor", desc: "Live Markdown preview", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 9l2 3-2 3M12 9v6M15 9h3" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Meeting Notes", url: "/meeting-notes", desc: "Agendas & action items", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M7 8h10M7 12h6M7 16h8" stroke="#D97706" stroke-width="1.7" stroke-linecap="round"/><circle cx="16" cy="12" r="1.5" fill="#D97706"/></svg>` }
      ]
    },
    {
      name: "📄 PDF Tools",
      shortName: "PDF Tools",
      tools: [
        { name: "PDF Merger", url: "/pdf-merger", desc: "Combine multiple PDFs", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><rect x="9" y="7" width="10" height="14" rx="1.5" fill="#FFF1F2" stroke="#BE123C" stroke-width="1.5"/><path d="M6 7h4M6 10h4M6 13h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/><path d="M12 11h4M12 14h4M12 17h4" stroke="#BE123C" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "PDF Splitter", url: "/pdf-splitter", desc: "Split & extract pages", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M10.5 5v14" stroke="#A78BFA" stroke-width="1.4" stroke-dasharray="2 3" stroke-linecap="round"/><path d="M4 8h5M4 12h5M4 16h5M15 8h5M15 12h5M15 16h5" stroke="#7C3AED" stroke-width="1.2" stroke-linecap="round"/></svg>` },
        { name: "Image to PDF", url: "/image-to-pdf", desc: "Convert images to PDF", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="13" height="15" rx="1.5" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><circle cx="7" cy="8" r="1.5" fill="#14B8A6" stroke="#0D9488" stroke-width="1"/><path d="M3 14l4-3 3 2.5 4-4 2 2" stroke="#0D9488" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18 9l2 2-2 2M18 15l2 2-2 2" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 11h-3M20 17h-3" stroke="#0D9488" stroke-width="1.5" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "📊 Text Analysis",
      shortName: "Text Analysis",
      tools: [
        { name: "Case Converter", url: "/case-converter", desc: "UPPER, lower, Title", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FFF7ED" stroke="#F97316" stroke-width="1.5"/><path d="M7 9v6M7 12h3M10 9v6M14 12l2-3 2 3M14 12v3M18 12v3" stroke="#F97316" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Word Counter", url: "/word-counter", desc: "Words, chars, sentences", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="#0EA5E9" stroke-width="1.7" stroke-linecap="round"/><circle cx="17" cy="17" r="4" fill="#0EA5E9" opacity="0.15"/></svg>` },
        { name: "Readability", url: "/readability", desc: "Reading ease score", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6a8 8 0 0 1 16 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" fill="#F3E8FF" stroke="#A855F7" stroke-width="1.5"/><path d="M8 10h8M8 14h5" stroke="#A855F7" stroke-width="1.7" stroke-linecap="round"/></svg>` },
        { name: "Word Shuffler", url: "/word-shuffler", desc: "Randomize word order", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="15" y="4" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><rect x="9" y="14" width="6" height="6" rx="1" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/><path d="M6 10v2a2 2 0 0 0 2 2h1M18 10v2a2 2 0 0 1-2 2h-1" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Special Char", url: "/special-character-converter", desc: "Umlauts & diacritics", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#EAB308" stroke-width="1.5"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#EAB308" font-family="serif">ä</text></svg>` },
        { name: "Text Diff", url: "/text-diff", desc: "Compare two texts", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="8" height="16" rx="1.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/><path d="M6 8h2M6 12h2M16 8h2M16 12h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "Unit Converter", url: "/unit-converter", desc: "Length, weight, data…", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h18M3 16h18" stroke="#0891B2" stroke-width="1.8" stroke-linecap="round"/><path d="M6 5v6M10 5v6M14 5v6M18 5v6M6 13v6M10 13v6M14 13v6M18 13v6" stroke="#0891B2" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "Grammar", url: "/grammer-and-spelling", desc: "Fix spelling & grammar", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#E8F3ED" stroke="#2D6A4F" stroke-width="1.6"/><path d="M7 9h10M7 13h6M7 17h4" stroke="#2D6A4F" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="15" r="2.5" fill="#52B788" stroke="#2D6A4F" stroke-width="1.2"/><path d="M16.2 15l0.7 0.7 1.4-1.4" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
      ]
    },
    {
      name: "🖼️ Image Editing",
      shortName: "Images",
      tools: [
        { name: "Image Converter", url: "/image-converter", desc: "JPG, PNG, WebP convert", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#ECFDF5" stroke="#0F766E" stroke-width="1.5"/><circle cx="9" cy="10" r="2" fill="#14B8A6" stroke="#0F766E" stroke-width="1.2"/><path d="M3 17l5-4 3 3 5-5 5 6" stroke="#0F766E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6l2 2-2 2" stroke="#0F766E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Image Compressor", url: "/image-compressor", desc: "Reduce file size 90%", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FFFBEB" stroke="#B45309" stroke-width="1.5"/><path d="M8 8h8M9 12h6M10 16h4" stroke="#B45309" stroke-width="1.6" stroke-linecap="round"/><path d="M17 4l-3 3M17 20l-3-3" stroke="#F59E0B" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Image Resizer", url: "/image-resizer", desc: "Exact dimensions or %", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 9h18" stroke="#7C3AED" stroke-width="1.5"/><path d="M6 13h5M6 16h9" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/><path d="M17 13l-2 2M17 13l2 2M17 13v4" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Image Cropper", url: "/image-crop", desc: "Crop to any ratio", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v15a2 2 0 0 0 2 2h15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M3 6h15a2 2 0 0 1 2 2v15" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" fill="none"/><rect x="8" y="8" width="8" height="8" fill="#EFF6FF" stroke="#60A5FA" stroke-width="1.4"/></svg>` },
        { name: "Image Flipper", url: "/image-flip", desc: "Mirror horizontal/vertical", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="#0891B2" stroke-width="1.4" stroke-dasharray="3 3"/><path d="M5 8l3 4-3 4V8z" fill="#ECFEFF" stroke="#0891B2" stroke-width="1.5" stroke-linejoin="round"/><path d="M19 8l-3 4 3 4V8z" fill="#22D3EE" stroke="#0891B2" stroke-width="1.5" stroke-linejoin="round"/></svg>` }
      ]
    },
    {
      name: "🧮 Calculators",
      shortName: "Calculators",
      tools: [
        { name: "Typing Test", url: "/typing-test", desc: "WPM & accuracy test", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#EC4899" stroke-width="1.5"/><path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M6 13h1M9 13h1M12 13h1M15 13h1M18 13h1M7 16h10" stroke="#EC4899" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Sleep Calculator", url: "/sleep-calculator", desc: "Best bedtime & wake-up", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#DDD6FE" stroke="#6D28D9" stroke-width="1.6" stroke-linejoin="round"/><circle cx="17" cy="8" r="1" fill="#6D28D9"/><circle cx="19" cy="11" r="0.8" fill="#6D28D9"/></svg>` },
        { name: "Roof Pitch", url: "/roof-pitch-calculator", desc: "Slope, angle, rise & run", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 18L12 6l9 12H3z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 6v12" stroke="#D97706" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M3 18h18" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Percentage", url: "/percentage-calculator", desc: "% of, change & reverse", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><circle cx="17" cy="17" r="2.5" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><path d="M19 5L5 19" stroke="#0E7490" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Age Calculator", url: "/age-calculator", desc: "Exact age in y/m/d", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M3 10h18M8 3v4M16 3v4" stroke="#7C3AED" stroke-width="1.6" stroke-linecap="round"/><path d="M8 14h2v2H8zM14 14h2v2h-2z" fill="#7C3AED"/></svg>` },
        { name: "BMI Calculator", url: "/bmi-calculator", desc: "Body Mass Index", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><path d="M12 6v6l3.5 2" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#0D9488"/></svg>` },
        { name: "Fuel Cost", url: "/fuel-cost-calculator", desc: "Trip fuel cost estimate", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="12" height="16" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/><path d="M4 8h12" stroke="#2563EB" stroke-width="1.5"/><path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" stroke="#2563EB" stroke-width="1.5" fill="none"/><path d="M7 12h6M7 15h4" stroke="#2563EB" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Paint Calculator", url: "/paint-calculator", desc: "Paint per room", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="14" height="12" rx="2" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/><rect x="6" y="4" width="10" height="4" rx="1" fill="none" stroke="#EA580C" stroke-width="1.5"/><path d="M4 12h14" stroke="#EA580C" stroke-width="1.4"/><path d="M8 16h6" stroke="#EA580C" stroke-width="1.6" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🧠 Ideas & Lists",
      shortName: "Ideas",
      tools: [
        { name: "MindMap", url: "/mindmap", desc: "Visual brainstorms", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="#C7D2FE" stroke="#6366F1" stroke-width="1.5"/><circle cx="5" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="6" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="5" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><circle cx="19" cy="18" r="2" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.3"/><path d="M10 11L6.5 7.5M14 11l3.5-3.5M10 13l-3.5 3.5M14 13l3.5 3.5" stroke="#6366F1" stroke-width="1.4" stroke-linecap="round"/></svg>` },
        { name: "List Maker", url: "/list-maker", desc: "Checklists & to-dos", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><rect x="7" y="7" width="3" height="3" rx="0.5" fill="#16A34A"/><path d="M7.5 8.5l1 1 1.5-1.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5h5M12 13h5M7 13h3M7 17h3M12 17h5" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Habit Tracker", url: "/habit-tracker", desc: "Build daily streaks", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="17" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/><path d="M3 9h18" stroke="#10B981" stroke-width="1.5"/><path d="M7 2v4M17 2v4" stroke="#10B981" stroke-width="1.7" stroke-linecap="round"/><path d="M8 14l2 2 4-4" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
      ]
    },
    {
      name: "🎲 Creativity",
      shortName: "Creativity",
      tools: [
        { name: "Random Text", url: "/random-text", desc: "Placeholder paragraphs", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/><path d="M7 9h4M7 12h7M7 15h5M15 9h2M14 15h3" stroke="#DB2777" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Word Cloud", url: "/word-cloud", desc: "Visual word clouds", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 16a4 4 0 0 1 .5-8 5 5 0 0 1 9.5-1.5A4.5 4.5 0 0 1 18 16H6z" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5" stroke-linejoin="round"/><text x="12" y="14" text-anchor="middle" font-size="7" font-weight="bold" fill="#0284C7" font-family="sans-serif">abc</text></svg>` },
        { name: "Decision Maker", url: "/choice-maker", desc: "Wheel or coin flip", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M12 12V3M12 12l7.5 4.5M12 12l-7.5 4.5" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#D97706"/></svg>` },
        { name: "Name Generator", url: "/random-name-generator", desc: "Random names", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M4 20a8 8 0 0 1 16 0" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Username Gen", url: "/username-generator", desc: "Gaming & social names", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE9E3" stroke="#C4562A" stroke-width="1.6"/><circle cx="9" cy="11" r="2.2" fill="#E8714A" stroke="#C4562A" stroke-width="1.2"/><path d="M5.5 16c0.4-1.6 1.8-2.5 3.5-2.5s3.1 0.9 3.5 2.5" stroke="#C4562A" stroke-width="1.4" stroke-linecap="round"/><path d="M14 10h5M14 13h5M14 16h3" stroke="#C4562A" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Quote Gen", url: "/quote-generator", desc: "Motivational quotes", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.6 3.5 3.6 1.5 0 2.5-0.8 3-2.2V20c0 1.1-0.9 2-2 2" fill="#FDF6DC" stroke="#B8960C" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M18 6c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.6 3.5 3.6 1.5 0 2.5-0.8 3-2.2V20c0 1.1-0.9 2-2 2" fill="#FDF6DC" stroke="#B8960C" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🔍 Word Helpers",
      shortName: "Word Helpers",
      tools: [
        { name: "Word Finder", url: "/word-finder", desc: "Anagrams & terms", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" r="6.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.6"/><path d="M15.5 15.5L21 21" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>` },
        { name: "Crossword", url: "/crossword-solver", desc: "Clue & puzzle help", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="3" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="3" y="10" width="7" height="7" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="14" y="14" width="7" height="7" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="10" y="10" width="7" height="7" fill="#fff" stroke="#4F46E5" stroke-width="1.3"/></svg>` },
        { name: "Word Search", url: "/word-search-solver", desc: "Puzzle solver", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/><path d="M6 9h3M9 6v6M14 8h4M14 12h4M14 16h4M6 15h3M6 18h3" stroke="#9333EA" stroke-width="1.4" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "⏳ Productivity",
      shortName: "Productivity",
      tools: [
        { name: "Pomodoro", url: "/pomodoro-timer", desc: "Focus intervals", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="13" r="8" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.6"/><path d="M12 13V8M12 13l3 2" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/><path d="M9 3h6" stroke="#E11D48" stroke-width="1.7" stroke-linecap="round"/></svg>` },
        { name: "Study Planner", url: "/study-planner", desc: "Plan study sessions", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="17" rx="2" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M3 9h18M7 2v4M17 2v4" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/><path d="M8 13h3M8 17h5M14 13h3" stroke="#0284C7" stroke-width="1.4" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🔐 Generators",
      shortName: "Generators",
      tools: [
        { name: "Password Gen", url: "/password-generator", desc: "Strong passwords", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="16" height="10" rx="2" fill="#EDE9FE" stroke="#6D28D9" stroke-width="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#6D28D9" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="15" r="1.5" fill="#6D28D9"/><path d="M12 16.5v2" stroke="#6D28D9" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "QR Code", url: "/qr-code-generator", desc: "Custom QR codes", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" fill="#CFFAFE" stroke="#0E7490" stroke-width="1.5"/><rect x="5" y="5" width="3" height="3" fill="#0E7490"/><rect x="16" y="5" width="3" height="3" fill="#0E7490"/><rect x="5" y="16" width="3" height="3" fill="#0E7490"/><path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM19 19h2v2h-2z" fill="#0E7490"/></svg>` },
        { name: "Invoice Gen", url: "/invoice-generator", desc: "PDF invoices", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M8 7h8M8 11h5M8 15h8" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/><circle cx="15" cy="11" r="1.5" fill="#D97706"/></svg>` },
        { name: "Resume Builder", url: "/resume-builder", desc: "CV & resume PDF maker", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="#B45309" opacity="0.35" stroke="#B45309" stroke-width="1.2"/><path d="M7 15h10M7 18h7" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/><path d="M8 13c0-1.5 1.8-2.5 4-2.5s4 1 4 2.5" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Business Card", url: "/business-card-generator", desc: "Cards with QR codes", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FCE7F3" stroke="#BE185D" stroke-width="1.5"/><circle cx="8" cy="11" r="2" fill="#BE185D" opacity="0.4" stroke="#BE185D" stroke-width="1.1"/><path d="M6 15h5M12 10h6M12 13h6M12 16h3" stroke="#BE185D" stroke-width="1.5" stroke-linecap="round"/></svg>` }
      ]
    },
    {
      name: "🎨 Design & Fun",
      shortName: "Design",
      tools: [
        { name: "Color Converter", url: "/color-converter", desc: "HEX, RGB, HSL, CMYK", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FFF7ED" stroke="#C2410C" stroke-width="1.5"/><circle cx="9" cy="9" r="2.5" fill="#C2410C"/><circle cx="15" cy="9" r="2.5" fill="#EA580C"/><circle cx="12" cy="15" r="2.5" fill="#FB923C"/></svg>` },
        { name: "Emoji Picker", url: "/emoji-picker", desc: "Copy emojis fast", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FEF9C3" stroke="#FACC15" stroke-width="1.6"/><circle cx="9" cy="10" r="1.2" fill="#854D0E"/><circle cx="15" cy="10" r="1.2" fill="#854D0E"/><path d="M8 14c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" stroke="#854D0E" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { name: "Click Speed", url: "/click-speed-test", desc: "Measure CPS rate", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/><path d="M9 3h6" stroke="#0284C7" stroke-width="1.6" stroke-linecap="round"/></svg>` },
        { name: "Bionic Reader", url: "/bionic-reader", desc: "Faster reading", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#EDE9FE" stroke="#7C3AED" stroke-width="1.5"/><path d="M7 8h10M7 12h8M7 16h10" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round"/></svg>` },
        { name: "Teleprompter", url: "/teleprompter", desc: "Auto-scroll text", svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/><path d="M12 8v8M9 13l3 3 3-3" stroke="#0D9488" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
      ]
    }
  ];

  // Games catalog
  const GAMES = [
    { name: "Connections", emoji: "🧩", desc: "Group 16 words", url: "/connections-unlimited" },
    { name: "Spelling Bee", emoji: "🐝", desc: "Build from 7 letters", url: "/spelling-bee-unlimited" },
    { name: "Crossword", emoji: "📝", desc: "Solve the grid", url: "/crossword-puzzle" },
    { name: "Wordle", emoji: "🔤", desc: "Guess the word", url: "/wordle" },
    { name: "Word Search", emoji: "🔍", desc: "Find hidden words", url: "/word-search" },
    { name: "Memory", emoji: "🃏", desc: "Match the cards", url: "/memory-match" },
    { name: "2048", emoji: "🔢", desc: "Combine numbers", url: "/2048" },
    { name: "Tic-Tac-Toe", emoji: "❌", desc: "Three in a row", url: "/tic-tac-toe" },
    { name: "Sudoku", emoji: "🧮", desc: "Fill the grid", url: "/sudoku" },
    { name: "Minesweeper", emoji: "💣", desc: "Clear the field", url: "/minesweeper" },
    { name: "All Games", emoji: "🎯", desc: "See every game", url: "/games", isAllGames: true }
  ];

  // Move PDF Tools to second slot
  const pdfIdx = categories.findIndex(c => c.name.includes("PDF Tools"));
  if (pdfIdx !== -1) {
    const [pdf] = categories.splice(pdfIdx, 1);
    categories.splice(1, 0, pdf);
  }

  // 2. CSS
  const cssStyles = `
    /* ============================================================
       FLOATING TRIGGER
       ============================================================ */
    .tools-floating-trigger {
      position: fixed;
      bottom: 120px;
      right: 24px;
      z-index: 10005;
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
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background 0.2s ease, color 0.2s ease, box-shadow 0.3s ease;
      animation: attentionPulse 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
      font-size: 24px;
      line-height: 1;
      user-select: none;
    }
    .tools-floating-trigger svg {
      width: 24px;
      height: 24px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .tools-floating-trigger .trigger-emoji {
      display: block;
      font-size: 24px;
      line-height: 1;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.dark .tools-floating-trigger {
      background: var(--accent);
      color: var(--white);
    }
    .tools-floating-trigger:hover {
      transform: scale(1.08) rotate(8deg);
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
      border-color: var(--paper-edge);
    }
    body.dark .tools-floating-trigger.active {
      background: var(--paper);
      color: var(--ink);
    }
    .tools-floating-trigger.active svg,
    .tools-floating-trigger.active .trigger-emoji {
      transform: rotate(90deg);
    }

    /* ============================================================
       BLUR OVERLAY — same treatment as the games widget
       ============================================================ */
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
    .tools-radial-blur.active {
      opacity: 1;
      pointer-events: auto;
    }

    /* ============================================================
       FULL-SCREEN STAGE — the toolkit canvas
       ============================================================ */
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
    .tools-radial-stage.open {
      opacity: 1;
      pointer-events: auto;
    }

    /* Grid of category circles */
    .tools-cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px 18px;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
    }

    /* ============================================================
       ONE CATEGORY CIRCLE
       ============================================================ */
    .tools-cat-circle {
      position: relative;
      aspect-ratio: 1 / 1;
      width: 100%;
      max-width: 340px;
      margin: 0 auto;
      /* Subtle dashed ring to suggest the circle boundary */
      border-radius: 50%;
      border: 1px dashed var(--paper-edge);
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
      border-color: var(--paper-edge);
    }
    .tools-radial-stage.open .tools-cat-circle {
      opacity: 1;
      transform: scale(1);
    }

    /* Center hub — category name */
    .tools-cat-hub {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 92px;
      height: 92px;
      margin-left: -46px;
      margin-top: -46px;
      border-radius: 50%;
      background: var(--paper);
      border: 1px solid var(--paper-edge);
      box-shadow: 0 6px 22px rgba(26, 26, 46, 0.14);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px;
      z-index: 3;
    }
    body.dark .tools-cat-hub {
      background: var(--paper-warm);
      border-color: var(--paper-edge);
    }
    .tools-cat-hub-label {
      font-family: var(--font-display);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--ink);
      line-height: 1.15;
      word-break: break-word;
    }
    .tools-cat-hub-count {
      font-family: var(--font-mono);
      font-size: 0.55rem;
      font-weight: 600;
      color: var(--ink-muted);
      margin-top: 2px;
      letter-spacing: 0.03em;
    }

    /* Games hub accent */
    .tools-cat-circle.is-games {
      border-color: rgba(99, 102, 241, 0.35);
      background: rgba(99, 102, 241, 0.05);
    }
    .tools-cat-circle.is-games .tools-cat-hub {
      border-color: rgba(99, 102, 241, 0.4);
      background: linear-gradient(145deg, rgba(99, 102, 241, 0.14), rgba(99, 102, 241, 0.04));
    }
    .tools-cat-circle.is-games .tools-cat-hub-label {
      color: #4f46e5;
    }
    body.dark .tools-cat-circle.is-games .tools-cat-hub-label {
      color: #818cf8;
    }

    /* ============================================================
       APP — always visible around the category hub
       ============================================================ */
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
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
                  opacity 0.35s ease;
      will-change: transform, opacity;
      z-index: 2;
    }
    .tools-radial-stage.open .tools-cat-app {
      opacity: 1;
      transform: translate(calc(-50% + var(--app-x, 0px)), calc(-50% + var(--app-y, 0px))) scale(1);
    }
    .tools-cat-app:hover { z-index: 6; }

    /* Circular icon bubble — bigger for readability */
    .tools-cat-app-icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper);
      border: 1px solid var(--paper-edge);
      box-shadow: 0 4px 14px rgba(26, 26, 46, 0.14);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.25s ease,
                  border-color 0.25s ease,
                  background 0.25s ease;
    }
    body.dark .tools-cat-app-icon {
      background: var(--paper-warm);
      border-color: var(--paper-edge);
    }
    .tools-cat-app-icon svg {
      width: 26px;
      height: 26px;
      display: block;
      pointer-events: none;
    }
    .tools-cat-app:hover .tools-cat-app-icon {
      transform: scale(1.16);
      border-color: var(--accent);
      background: var(--accent-pale);
      box-shadow: 0 8px 22px rgba(196, 86, 42, 0.32);
    }
    body.dark .tools-cat-app:hover .tools-cat-app-icon {
      background: var(--paper);
      border-color: var(--accent-light);
    }

    /* Always-visible label pill — bigger font */
    .tools-cat-app-label {
      font-family: var(--font-body);
      font-size: 0.62rem;
      font-weight: 600;
      color: var(--ink);
      text-align: center;
      white-space: nowrap;
      max-width: 86px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
      padding: 3px 8px;
      border-radius: 100px;
      background: var(--paper);
      border: 1px solid var(--paper-edge);
      box-shadow: 0 1px 5px rgba(26, 26, 46, 0.07);
      transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      pointer-events: none;
    }
    body.dark .tools-cat-app-label {
      background: var(--paper-warm);
      border-color: var(--paper-edge);
      color: var(--ink);
    }
    .tools-cat-app:hover .tools-cat-app-label {
      color: var(--accent);
      border-color: var(--accent);
      background: var(--accent-pale);
    }
    body.dark .tools-cat-app:hover .tools-cat-app-label {
      color: var(--accent-light);
      border-color: var(--accent-light);
      background: var(--paper);
    }

    /* Games apps accent */
    .tools-cat-circle.is-games .tools-cat-app-icon {
      background: linear-gradient(145deg, rgba(99, 102, 241, 0.16), rgba(99, 102, 241, 0.05));
      border-color: rgba(99, 102, 241, 0.25);
      font-size: 1.15rem;
    }
    .tools-cat-circle.is-games .tools-cat-app:hover .tools-cat-app-icon {
      background: linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.12));
      border-color: #6366f1;
      box-shadow: 0 8px 22px rgba(99, 102, 241, 0.32);
    }
    .tools-cat-app.is-all-games .tools-cat-app-icon {
      background: linear-gradient(145deg, rgba(99, 102, 241, 0.32), rgba(99, 102, 241, 0.14));
      border-color: #6366f1;
    }

    /* ============================================================
       KEYFRAMES
       ============================================================ */
    @keyframes attentionPulse {
      0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.4), var(--shadow); }
      50%  { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(196, 86, 42, 0), var(--shadow); }
      100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196, 86, 42, 0), var(--shadow); }
    }

    @media (prefers-reduced-motion: reduce) {
      .tools-floating-trigger,
      .tools-cat-circle,
      .tools-cat-app {
        animation: none !important;
        transition: none !important;
      }
    }

    /* ============================================================
       RESPONSIVE
       ============================================================ */
    @media (max-width: 1100px) {
      .tools-cat-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
      .tools-cat-circle { max-width: 320px; }
    }
    @media (max-width: 900px) {
      .tools-radial-stage { padding: 24px 16px 40px; }
      .tools-cat-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 18px 14px;
      }
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
      .tools-floating-trigger {
        width: 48px; height: 48px; bottom: 100px; right: 18px; font-size: 22px;
      }
      .tools-floating-trigger svg { width: 22px; height: 22px; }
      .tools-floating-trigger .trigger-emoji { font-size: 22px; }

      .tools-radial-stage { padding: 16px 12px 32px; }
      .tools-cat-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 14px 12px;
      }
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
      .tools-cat-grid {
        grid-template-columns: 1fr;
      }
      .tools-cat-circle { max-width: 260px; }
      .tools-cat-app { width: 50px; }
      .tools-cat-app-icon { width: 38px; height: 38px; }
      .tools-cat-app-icon svg { width: 19px; height: 19px; }
      .tools-cat-app-label { font-size: 0.5rem; max-width: 64px; }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // =========================================================
  // DOM
  // =========================================================

  const rootContainer = document.getElementById("tools-sidebar-root");
  if (!rootContainer) return;

  const triggerEmoji = "🧰";

  rootContainer.innerHTML = `
    <div class="tools-radial-blur" id="toolsRadialBlur"></div>
    <div class="tools-floating-trigger" id="toolsSidebarTrigger" title="Explore Toolkit" aria-label="Open toolkit" aria-expanded="false" role="button" tabindex="0"><span class="trigger-emoji" aria-hidden="true">${triggerEmoji}</span></div>
    <div class="tools-radial-stage" id="toolsRadialStage" role="dialog" aria-label="WebNotepad Toolkit">
      <div class="tools-cat-grid" id="toolsCatGrid"></div>
    </div>
  `;

  const trigger = document.getElementById("toolsSidebarTrigger");
  const blur = document.getElementById("toolsRadialBlur");
  const stage = document.getElementById("toolsRadialStage");
  const grid = document.getElementById("toolsCatGrid");

  // =========================================================
  // BUILD ALL CATEGORY CIRCLES
  // =========================================================

  // Store references for relayout on resize/open
  const circles = []; // { el, apps: [{el, tool}], toolCount }

  function buildCategoryCircle(category, isGames) {
    const circleEl = document.createElement("div");
    circleEl.className = "tools-cat-circle" + (isGames ? " is-games" : "");

    // Center hub
    const hub = document.createElement("div");
    hub.className = "tools-cat-hub";
    const toolCount = category.tools ? category.tools.length : category.length;
    hub.innerHTML = `
      <span class="tools-cat-hub-label">${category.shortName}</span>
      <span class="tools-cat-hub-count">${toolCount}</span>
    `;
    circleEl.appendChild(hub);

    // Apps
    const tools = isGames ? category : category.tools;
    const apps = [];
    tools.forEach((tool, i) => {
      const a = document.createElement("a");
      a.href = tool.url;
      a.className = "tools-cat-app" + (tool.isAllGames ? " is-all-games" : "");
      a.setAttribute("aria-label", `${tool.name}: ${tool.desc}`);
      a.style.transitionDelay = `${i * 0.03}s`;
      const iconContent = tool.svg ? tool.svg : tool.emoji;
      a.innerHTML = `
        <span class="tools-cat-app-icon">${iconContent}</span>
        <span class="tools-cat-app-label">${tool.name}</span>
      `;
      circleEl.appendChild(a);
      apps.push({ el: a, tool });
    });

    return { el: circleEl, apps, toolCount };
  }

  // Add all tool categories
  categories.forEach((category) => {
    const circle = buildCategoryCircle(category, false);
    grid.appendChild(circle.el);
    circles.push(circle);
  });

  // Add games circle
  const gamesCircle = buildCategoryCircle(
    { shortName: "Games", tools: GAMES },
    true
  );
  grid.appendChild(gamesCircle.el);
  circles.push(gamesCircle);

  // =========================================================
  // RADIAL LAYOUT
  // =========================================================

  /**
   * Radius for a category circle's apps. The circle is square; we
   * size the ring as a fraction of the rendered width, clamped so
   * labels never leave the dashed boundary.
   */
  function getAppsRadius(circleEl, count) {
    const size = circleEl.clientWidth;
    if (!size) return 100;
    // Reserve ~50px from the edge for icon + label breathing room
    const maxR = size / 2 - 50;
    let base;
    if (count <= 3) base = size * 0.28;
    else if (count <= 5) base = size * 0.31;
    else if (count <= 8) base = size * 0.34;
    else base = size * 0.36;
    return Math.max(72, Math.min(base, maxR));
  }

  function layoutCircle(circle) {
    const { el, apps, toolCount } = circle;
    if (!apps.length) return;
    const radius = getAppsRadius(el, apps.length);
    const startAngle = -90;
    const step = 360 / apps.length;

    apps.forEach((app, i) => {
      const angleDeg = startAngle + step * i;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      app.el.style.setProperty("--app-x", `${x.toFixed(2)}px`);
      app.el.style.setProperty("--app-y", `${y.toFixed(2)}px`);
    });
  }

  function layoutAll() {
    circles.forEach(layoutCircle);
  }

  // Initial layout — deferred until elements have width
  requestAnimationFrame(() => {
    requestAnimationFrame(layoutAll);
  });

  // Relayout on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutAll, 150);
  });

  // =========================================================
  // OPEN / CLOSE
  // =========================================================

  let isOpen = false;

  function openStage() {
    if (isOpen) return;
    isOpen = true;
    stage.classList.add("open");
    blur.classList.add("active");
    trigger.classList.add("active");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", "Close toolkit");
    trigger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

    // Recompute layout once the stage is visible with real dimensions
    requestAnimationFrame(() => {
      requestAnimationFrame(layoutAll);
    });
  }

  function closeStage() {
    if (!isOpen) return;
    isOpen = false;
    stage.classList.remove("open");
    blur.classList.remove("active");
    trigger.classList.remove("active");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", "Open toolkit");
    trigger.innerHTML = `<span class="trigger-emoji" aria-hidden="true">${triggerEmoji}</span>`;
    stage.scrollTop = 0;
  }

  function toggleStage() {
    if (isOpen) closeStage();
    else openStage();
  }

  // =========================================================
  // EVENTS
  // =========================================================

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleStage();
  });
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleStage();
    }
  });

  blur.addEventListener("click", closeStage);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeStage();
  });

  // Click outside (on blur area) closes; clicks on apps are normal links
  stage.addEventListener("click", (e) => {
    if (e.target === stage) closeStage();
  });

  console.log("Toolkit multi-circle radial grid initialized.");
})();
