/**
 * social-share.js
 * Floating social share widget + floating games widget.
 *
 * Both menus now open as a CENTERED radial circle in the middle of the screen.
 * Each item shows its label underneath the icon at all times (not just on hover).
 * The page blurs behind the menu. Entrance is staggered + springy.
 *
 * Theme: Editorial / Ink-on-paper aesthetic
 * Handle for follow widget: @webnotepad
 */

(function () {
  'use strict';

  // ---- SVG Icons ----
  const ICONS = {
    pinterest: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.398.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.748-1.378l-.744 2.803c-.267 1.029-.984 2.316-1.462 3.103 1.104.332 2.276.516 3.501.516 6.62 0 11.989-5.369 11.989-11.987C23.989 5.367 18.621 0 12.017 0z"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    threads: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.257 3.332c-2.548.03-4.902.916-6.279 2.935-1.533 2.248-1.78 5.252-1.117 7.92.422 1.713 1.164 3.138 2.244 4.14 1.099 1.02 2.51 1.628 4.155 1.678 2.052.063 3.697-.586 5.177-1.822 1.545-1.29 2.492-3.304 2.848-5.607.267-1.727.254-3.448-.03-5.113-.328-1.923-1.209-3.338-2.515-4.142-1.272-.783-2.83-1.083-4.483-.99zm-1.636 2.566c2.836-.12 4.938 1.164 5.234 4.058.13 1.285.084 2.604-.213 3.902-.285 1.247-.753 2.21-1.502 2.93-1.017.977-2.32 1.402-3.818 1.35-1.608-.055-2.786-.686-3.587-1.584-.799-.898-1.197-2.084-1.332-3.39-.134-1.307-.052-2.552.259-3.685.48-1.757 1.554-2.99 2.96-3.58zm2.957 2.232c-1.402.015-2.467 1.013-2.848 2.43-.38 1.413-.216 2.979.314 3.916.53.937 1.274 1.393 2.174 1.372.902-.021 1.594-.512 2.084-1.434.49-.922.674-2.172.46-3.361-.214-1.19-.708-1.985-1.415-2.324-.415-.198-.845-.308-1.194-.316.113-.124.227-.231.392-.321.793-.433 1.643-.459 2.513-.267.396.087.772.228 1.132.407l.475-2.208c-.464-.221-.963-.39-1.494-.495-.832-.163-1.688-.15-2.548.062-.86.212-1.64.635-2.278 1.3-.638.665-1.104 1.48-1.405 2.422-.3.943-.407 1.92-.371 2.862.036.941.177 1.832.471 2.568.295.735.696 1.315 1.239 1.687.543.371 1.15.545 1.825.53.675-.015 1.28-.218 1.814-.678.534-.46.966-1.14 1.296-2.026.33-.886.49-1.934.452-2.973-.038-1.04-.292-1.897-.762-2.49-.47-.594-1.077-.866-1.81-.877z"/></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    share: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,

    reddit: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.313 3.516 8.484l-2.36 2.36c-.297.297-.087.805.335.805H12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.01 6.947c.87 0 1.577.707 1.577 1.577 0 .87-.707 1.577-1.577 1.577-.87 0-1.577-.707-1.577-1.577 0-.87.707-1.577 1.577-1.577zm-10.02 0c.87 0 1.577.707 1.577 1.577 0 .87-.707 1.577-1.577 1.577-.87 0-1.577-.707-1.577-1.577 0-.87.707-1.577 1.577-1.577zM12 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-5.304 5.07c.306.306.306.803 0 1.108-.306.306-.803.306-1.108 0-.306-.306-.306-.803 0-1.108.306-.306.803-.306 1.108 0zm10.608 0c.306.306.306.803 0 1.108-.306.306-.803.306-1.108 0-.306-.306-.306-.803 0-1.108.306-.306.803-.306 1.108 0zM12 18c-1.657 0-3-.895-3-2s1.343-2 3-2 3 .895 3 2-1.343 2-3 2z"/></svg>`,

    joystick: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 5h12a4 4 0 0 1 4 4v3a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V9a4 4 0 0 1 4-4z"/>
      <path d="M6 11h2M7 10v2" stroke-width="1.8"/>
      <circle cx="16.5" cy="10" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="11.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="11.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="16.5" cy="13" r="0.75" fill="currentColor" stroke="none"/>
    </svg>`,

    gameIcons: {
      puzzle: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a2 2 0 0 1 4 0v1h3a2 2 0 0 1 2 2v3h1a2 2 0 0 1 0 4h-1v3a2 2 0 0 1-2 2h-3v1a2 2 0 0 1-4 0v-1H7a2 2 0 0 1-2-2v-3H4a2 2 0 0 1 0-4h1V6a2 2 0 0 1 2-2h3V3z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
      bee: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 4v8l-7 4-7-4V7l7-4z" fill="#FEF3C7" stroke="#EAB308" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 7l3.5 2v4L12 15l-3.5-2V9L12 7z" fill="#FDE68A" stroke="#EAB308" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
      crossword: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="6" height="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="9" y="3" width="6" height="6" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="15" y="3" width="6" height="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="3" y="9" width="6" height="6" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/><rect x="9" y="9" width="6" height="6" fill="#fff" stroke="#4F46E5" stroke-width="1.3"/><rect x="15" y="9" width="6" height="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="3" y="15" width="6" height="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="9" y="15" width="6" height="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.3"/><rect x="15" y="15" width="6" height="6" fill="#4F46E5" stroke="#4F46E5" stroke-width="1.3"/></svg>`,
      letterTile: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/><path d="M9 9l3 6 3-6" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      search: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" r="6.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.6"/><path d="M15.5 15.5L21 21" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>`,
      cards: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="10" height="14" rx="1.5" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" transform="rotate(-8 10 11)"/><rect x="10" y="6" width="10" height="14" rx="1.5" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/><path d="M15 13c0-1.5-2-2.5-2-2.5S11 11.5 11 13a2 2 0 0 0 4 0z" fill="#DB2777"/></svg>`,
      number: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><path d="M8 9h2v6M14 9h2l-2 6M16 9h1" stroke="#D97706" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      xox: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="1.4"/><path d="M7 7l4 4M11 7l-4 4" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2.5" stroke="#2563EB" stroke-width="2" fill="none"/></svg>`,
      sudoku: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.5"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="#0D9488" stroke-width="1.2"/><rect x="6" y="6" width="3" height="3" fill="#0D9488"/><rect x="12" y="12" width="3" height="3" fill="#0D9488"/><rect x="15" y="6" width="3" height="3" fill="#5EEAD4"/></svg>`,
      bomb: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="14" r="6" fill="#1F2937" stroke="#111827" stroke-width="1.5"/><circle cx="9" cy="12" r="1.5" fill="#6B7280"/><path d="M15 9l2-2M17 7l1 1M17 7l-1 1" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round"/><path d="M16 6l1-1" stroke="#F59E0B" stroke-width="1.6" stroke-linecap="round"/></svg>`,
      box: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><path d="M4 12h16M12 4v16" stroke="#7C3AED" stroke-width="1.2" stroke-dasharray="2 2"/><circle cx="4" cy="4" r="1.5" fill="#A78BFA"/><circle cx="20" cy="4" r="1.5" fill="#A78BFA"/><circle cx="4" cy="20" r="1.5" fill="#A78BFA"/><circle cx="20" cy="20" r="1.5" fill="#A78BFA"/></svg>`,
      calculator: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/><rect x="7" y="6" width="10" height="3" rx="0.5" fill="#BFDBFE" stroke="#2563EB" stroke-width="1"/><circle cx="8" cy="13" r="1" fill="#2563EB"/><circle cx="12" cy="13" r="1" fill="#2563EB"/><circle cx="16" cy="13" r="1" fill="#2563EB"/><circle cx="8" cy="17" r="1" fill="#2563EB"/><circle cx="12" cy="17" r="1" fill="#2563EB"/><circle cx="16" cy="17" r="1" fill="#2563EB"/></svg>`,
      multiWord: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="8" height="8" rx="1.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.4"/><rect x="13" y="4" width="8" height="8" rx="1.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.4"/><rect x="3" y="14" width="8" height="8" rx="1.5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.4"/><rect x="13" y="14" width="8" height="8" rx="1.5" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.4"/></svg>`
    }
  };

  // ---- Configuration ----
  const SOCIAL_PLATFORMS = [
    {
      id: 'pinterest',
      label: 'Pinterest',
      icon: ICONS.pinterest,
      getUrl: () =>
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(document.title)}`,
    },
    {
      id: 'x',
      label: 'X',
      icon: ICONS.x,
      getUrl: () =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: ICONS.linkedin,
      getUrl: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    },
    {
      id: 'threads',
      label: 'Threads',
      icon: ICONS.threads,
      getUrl: () =>
        `https://www.threads.net/intent/post?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`,
    },
  ];

  const COPY_ITEM = { id: 'copy', label: 'Copy Link', icon: ICONS.link };

  // ---- Follow Configuration ----
  const FOLLOW_HANDLE = '@webnotepad';
  const FOLLOW_PLATFORMS = [
    { id: 'pinterest', label: 'Pinterest', icon: ICONS.pinterest, url: 'https://pinterest.com/webnotepad' },
    { id: 'x', label: 'X', icon: ICONS.x, url: 'https://x.com/webnotepad' },
    { id: 'reddit', label: 'Reddit', icon: ICONS.reddit, url: 'https://reddit.com/user/webnotepad' },
  ];

  // ---- Games Configuration ----
  const GAMES = [
    { id: 'quordle-unlimited', label: 'Quordle', icon: ICONS.gameIcons.multiWord, description: 'Solve four 5-letter words', url: '/quordle-unlimited' },
    { id: 'dordle-unlimited', label: 'Dordle', icon: ICONS.gameIcons.multiWord, description: 'Guess two words', url: '/dordle-unlimited' },
    { id: 'nerdle-unlimited', label: 'Nerdle', icon: ICONS.gameIcons.calculator, description: 'Hidden math equation', url: '/nerdle-unlimited' },
    { id: 'letter-boxed-unlimited', label: 'Letter Boxed', icon: ICONS.gameIcons.box, description: 'Connect the letters', url: '/letter-boxed-unlimited' },
    { id: 'connections-unlimited', label: 'Connections', icon: ICONS.gameIcons.puzzle, description: 'Group the words', url: '/connections-unlimited' },
    { id: 'spelling-bee', label: 'Spelling Bee', icon: ICONS.gameIcons.bee, description: 'Build from 7 letters', url: '/spelling-bee-unlimited' },
    { id: 'crossword-puzzle', label: 'Crossword', icon: ICONS.gameIcons.crossword, description: 'Solve the grid', url: '/crossword-puzzle' },
    { id: 'wordle', label: 'Wordle', icon: ICONS.gameIcons.letterTile, description: 'Guess the word', url: '/wordle' },
    { id: 'word-search', label: 'Word Search', icon: ICONS.gameIcons.search, description: 'Find hidden words', url: '/word-search' },
    { id: 'memory-match', label: 'Memory', icon: ICONS.gameIcons.cards, description: 'Match the cards', url: '/memory-match' },
    { id: '2048', label: '2048', icon: ICONS.gameIcons.number, description: 'Combine numbers', url: '/2048' },
    { id: 'tic-tac-toe', label: 'Tic-Tac-Toe', icon: ICONS.gameIcons.xox, description: 'Three in a row', url: '/tic-tac-toe' },
    { id: 'sudoku', label: 'Sudoku', icon: ICONS.gameIcons.sudoku, description: 'Fill the grid', url: '/sudoku' },
    { id: 'minesweeper', label: 'Minesweeper', icon: ICONS.gameIcons.bomb, description: 'Clear the field', url: '/minesweeper' }
  ];

  // ---- Helper: toast ----
  function showToast(message, duration = 2000) {
    const toast = document.getElementById('socialToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ---- Inject CSS ----
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* ============================================================
       SHARED TRIGGER STYLES
       ============================================================ */
    .social-floating-trigger,
    .games-floating-trigger {
      position: fixed;
      right: 24px;
      z-index: 10005;
      width: 42px;
      height: 42px;
      background: var(--ink, #1a1a2e);
      color: var(--paper, #faf8f4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow, 0 6px 24px rgba(26,26,46,0.12));
      cursor: pointer;
      border: 1px solid var(--paper-edge, #e8e2d6);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background 0.2s ease,
                  color 0.2s ease,
                  box-shadow 0.3s ease;
      user-select: none;
    }
    .social-floating-trigger { bottom: 68px; animation: socialPulse 3s infinite cubic-bezier(0.4, 0, 0.2, 1); }
    .games-floating-trigger  { bottom: 182px; animation: gamesPulse 3s infinite cubic-bezier(0.4, 0, 0.2, 1); }

    .social-floating-trigger svg,
    .games-floating-trigger svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
    }
    .social-floating-trigger svg { width: 18px; height: 18px; }
    .games-floating-trigger svg  { width: 20px; height: 20px; }
    .social-floating-trigger:hover svg { transform: scale(1.1); }
    .games-floating-trigger:hover svg  { transform: scale(1.12) rotate(-6deg); }

    body.dark .social-floating-trigger,
    body.dark .games-floating-trigger {
      background: var(--accent, #c4562a);
      color: var(--white, #ffffff);
    }
    .social-floating-trigger:hover,
    .games-floating-trigger:hover {
      transform: scale(1.08) rotate(8deg);
      background: var(--accent, #c4562a);
      color: var(--white, #ffffff);
      animation-play-state: paused;
      box-shadow: 0 8px 24px rgba(196, 86, 42, 0.3);
    }
    .social-floating-trigger.active,
    .games-floating-trigger.active {
      transform: scale(0.9) rotate(-90deg);
      background: var(--paper-warm, #f4f0e8);
      color: var(--ink, #1a1a2e);
      animation: none;
      box-shadow: none;
      border-color: var(--paper-edge, #e8e2d6);
    }
    body.dark .social-floating-trigger.active,
    body.dark .games-floating-trigger.active {
      background: var(--paper, #141418);
      color: var(--ink, #e8e4dc);
      border-color: var(--paper-edge, #2a2a34);
    }

    @keyframes socialPulse {
      0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0.25), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
      50%  { transform: scale(1.06); box-shadow: 0 0 0 12px rgba(196,86,42,0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
      100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
    }
    @keyframes gamesPulse {
      0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0.25), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
      50%  { transform: scale(1.06); box-shadow: 0 0 0 14px rgba(196,86,42,0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
      100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(196,86,42,0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12)); }
    }

    /* ============================================================
       BLUR OVERLAY
       ============================================================ */
    .radial-blur-overlay {
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
    .radial-blur-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    /* ============================================================
       CENTERED RADIAL MENU (shared)
       ============================================================ */
    .radial-menu {
      position: fixed;
      left: 50%;
      top: 50%;
      width: 0;
      height: 0;
      z-index: 10002;
      pointer-events: none;
      opacity: 0;
      /* Centered anchor point */
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    }
    .radial-menu.open {
      opacity: 1;
    }

    /* Center hub — a subtle ring that anchors the circle visually */
    .radial-menu::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 76px;
      height: 76px;
      margin-left: -38px;
      margin-top: -38px;
      border-radius: 50%;
      border: 1px dashed var(--paper-edge, #e8e2d6);
      background: var(--paper, #faf8f4);
      box-shadow: 0 6px 24px rgba(26,26,46,0.12);
      opacity: 0;
      transform: scale(0.6);
      transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
    }
    .radial-menu.open::before {
      opacity: 1;
      transform: scale(1);
    }
    body.dark .radial-menu::before {
      background: var(--paper-warm, #1c1c22);
      border-color: var(--paper-edge, #2a2a34);
    }

    /* Center label inside the hub */
    .radial-menu-hub-label {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-display, 'Playfair Display', Georgia, serif);
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-muted, #6b6b85);
      opacity: 0;
      transition: opacity 0.35s ease 0.15s;
      pointer-events: none;
      text-align: center;
      line-height: 1.2;
      z-index: 2;
    }
    .radial-menu.open .radial-menu-hub-label {
      opacity: 1;
    }
    body.dark .radial-menu-hub-label {
      color: var(--ink-muted, #8a8678);
    }

    /* ============================================================
       RADIAL ITEM (shared)
       ============================================================ */
    .radial-item {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      cursor: pointer;
      pointer-events: auto;
      background: none;
      border: none;
      padding: 0;
      /* Closed: collapsed at center */
      transform: translate(0, 0) scale(0);
      opacity: 0;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                  opacity 0.3s ease;
      will-change: transform, opacity;
    }
    .radial-menu.open .radial-item {
      opacity: 1;
      transform: translate(var(--radial-x, 0px), var(--radial-y, 0px)) scale(1);
    }

    /* The circular icon bubble */
    .radial-icon {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper, #faf8f4);
      border: 1px solid var(--paper-edge, #e8e2d6);
      box-shadow: 0 4px 16px rgba(26, 26, 46, 0.15);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.25s ease,
                  border-color 0.25s ease,
                  background 0.25s ease;
    }
    body.dark .radial-icon {
      background: var(--paper-warm, #1c1c22);
      border-color: var(--paper-edge, #2a2a34);
    }
    .radial-icon svg {
      width: 24px;
      height: 24px;
      display: block;
      pointer-events: none;
    }
    .radial-item:hover .radial-icon {
      transform: scale(1.14);
      border-color: var(--accent, #c4562a);
      background: var(--accent-pale, #fce9e3);
      box-shadow: 0 8px 28px rgba(196, 86, 42, 0.35);
    }
    body.dark .radial-item:hover .radial-icon {
      background: var(--paper, #141418);
      border-color: var(--accent-light, #e8714a);
    }

    /* Always-visible label under each icon */
    .radial-item-label {
      font-family: var(--font-body, 'Outfit', sans-serif);
      font-size: 0.62rem;
      font-weight: 600;
      color: var(--ink, #1a1a2e);
      text-align: center;
      white-space: nowrap;
      max-width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
      padding: 3px 7px;
      border-radius: 100px;
      background: var(--paper, #faf8f4);
      border: 1px solid var(--paper-edge, #e8e2d6);
      box-shadow: 0 2px 8px rgba(26, 26, 46, 0.08);
      transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      pointer-events: none;
    }
    body.dark .radial-item-label {
      background: var(--paper-warm, #1c1c22);
      border-color: var(--paper-edge, #2a2a34);
      color: var(--ink, #e8e4dc);
    }
    .radial-item:hover .radial-item-label {
      color: var(--accent, #c4562a);
      border-color: var(--accent, #c4562a);
      background: var(--accent-pale, #fce9e3);
    }
    body.dark .radial-item:hover .radial-item-label {
      color: var(--accent-light, #e8714a);
      border-color: var(--accent-light, #e8714a);
      background: var(--paper, #141418);
    }

    /* Copy item accent in social menu */
    .radial-item.is-copy .radial-icon {
      background: var(--accent-pale, #fce9e3);
      border-color: var(--accent, #c4562a);
    }
    body.dark .radial-item.is-copy .radial-icon {
      background: rgba(196, 86, 42, 0.2);
      border-color: var(--accent-light, #e8714a);
    }

    /* Staggered entrance — social (5 items) */
    .radial-menu.open .radial-item:nth-of-type(1) { transition-delay: 0.04s; }
    .radial-menu.open .radial-item:nth-of-type(2) { transition-delay: 0.09s; }
    .radial-menu.open .radial-item:nth-of-type(3) { transition-delay: 0.14s; }
    .radial-menu.open .radial-item:nth-of-type(4) { transition-delay: 0.19s; }
    .radial-menu.open .radial-item:nth-of-type(5) { transition-delay: 0.24s; }

    /* Staggered entrance — games (14 items) */
    .radial-menu.open .radial-item:nth-of-type(1)  { transition-delay: 0.03s; }
    .radial-menu.open .radial-item:nth-of-type(2)  { transition-delay: 0.06s; }
    .radial-menu.open .radial-item:nth-of-type(3)  { transition-delay: 0.09s; }
    .radial-menu.open .radial-item:nth-of-type(4)  { transition-delay: 0.12s; }
    .radial-menu.open .radial-item:nth-of-type(5)  { transition-delay: 0.15s; }
    .radial-menu.open .radial-item:nth-of-type(6)  { transition-delay: 0.18s; }
    .radial-menu.open .radial-item:nth-of-type(7)  { transition-delay: 0.21s; }
    .radial-menu.open .radial-item:nth-of-type(8)  { transition-delay: 0.24s; }
    .radial-menu.open .radial-item:nth-of-type(9)  { transition-delay: 0.27s; }
    .radial-menu.open .radial-item:nth-of-type(10) { transition-delay: 0.30s; }
    .radial-menu.open .radial-item:nth-of-type(11) { transition-delay: 0.33s; }
    .radial-menu.open .radial-item:nth-of-type(12) { transition-delay: 0.36s; }
    .radial-menu.open .radial-item:nth-of-type(13) { transition-delay: 0.39s; }
    .radial-menu.open .radial-item:nth-of-type(14) { transition-delay: 0.42s; }

    /* Mobile trigger sizes */
    @media (max-width: 480px) {
      .social-floating-trigger { bottom: 52px; right: 16px; width: 38px; height: 38px; }
      .social-floating-trigger svg { width: 16px; height: 16px; }
      .games-floating-trigger  { bottom: 156px; right: 16px; width: 38px; height: 38px; }
      .games-floating-trigger svg  { width: 18px; height: 18px; }

      .radial-icon { width: 46px; height: 46px; }
      .radial-icon svg { width: 20px; height: 20px; }
      .radial-item-label { font-size: 0.56rem; max-width: 76px; padding: 2px 6px; }
      .radial-menu::before { width: 64px; height: 64px; margin-left: -32px; margin-top: -32px; }
      .radial-menu-hub-label { font-size: 0.55rem; }
    }
    @media (max-width: 380px) {
      .social-floating-trigger { bottom: 44px; right: 12px; width: 34px; height: 34px; }
      .social-floating-trigger svg { width: 14px; height: 14px; }
      .games-floating-trigger  { bottom: 140px; right: 12px; width: 34px; height: 34px; }
      .games-floating-trigger svg  { width: 16px; height: 16px; }

      .radial-icon { width: 40px; height: 40px; }
      .radial-icon svg { width: 17px; height: 17px; }
      .radial-item-label { font-size: 0.52rem; max-width: 64px; padding: 2px 5px; }
      .radial-menu::before { width: 54px; height: 54px; margin-left: -27px; margin-top: -27px; }
      .radial-menu-hub-label { display: none; }
    }

    /* Hide widgets when tools sidebar is open */
    body.tools-sidebar-open .social-floating-trigger,
    body.tools-sidebar-open .games-floating-trigger,
    body.tools-sidebar-open .radial-menu,
    body.tools-sidebar-open .radial-blur-overlay,
    body.tools-sidebar-open .social-toast {
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.3s ease;
    }

    /* Toast */
    .social-toast {
      position: fixed;
      bottom: 174px;
      right: 24px;
      background: var(--ink, #1a1a2e);
      color: var(--paper, #faf8f4);
      padding: 7px 16px;
      border-radius: var(--radius, 6px);
      font-size: 0.75rem;
      font-weight: 500;
      box-shadow: var(--shadow-lg, 0 16px 48px rgba(26,26,46,0.18));
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.25s ease, transform 0.3s ease;
      z-index: 10003;
      pointer-events: none;
      font-family: var(--font-body, 'Outfit', sans-serif);
    }
    body.dark .social-toast {
      background: var(--paper-warm, #1c1c22);
      color: var(--ink, #e8e4dc);
      border: 1px solid var(--paper-edge, #2a2a34);
    }
    .social-toast.show { opacity: 1; transform: translateY(0); }

    /* ============================================================
       FOLLOW WIDGET
       ============================================================ */
    .follow-widget {
      position: fixed;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .follow-label {
      font-family: var(--font-display, 'Playfair Display', Georgia, serif);
      font-size: 0.55rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--ink-muted, #6b6b85);
      opacity: 0.75;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      margin-bottom: 2px;
    }
    .follow-buttons { display: flex; flex-direction: column; gap: 6px; }
    .follow-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      position: relative;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      text-decoration: none;
      overflow: visible;
    }
    .follow-btn:hover { transform: translateX(3px) scale(1.12); }
    .follow-btn:active { transform: translateX(0) scale(0.95); }
    .follow-btn[data-platform="pinterest"] { background: linear-gradient(145deg, #ff4d6d, #e60023); color: #fff; }
    .follow-btn[data-platform="pinterest"]:hover { box-shadow: 0 6px 18px rgba(230, 0, 35, 0.45); }
    .follow-btn[data-platform="x"] { background: linear-gradient(145deg, #444, #000); color: #fff; }
    .follow-btn[data-platform="x"]:hover { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45); }
    .follow-btn[data-platform="reddit"] { background: linear-gradient(145deg, #ff7a3d, #ff4500); color: #fff; }
    .follow-btn[data-platform="reddit"]:hover { box-shadow: 0 6px 18px rgba(255, 69, 0, 0.45); }
    .follow-btn svg {
      display: block;
      width: 14px;
      height: 14px;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .follow-btn:hover svg { transform: scale(1.15); }
    .follow-btn::after {
      content: attr(aria-label);
      position: absolute;
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%) scale(0.8);
      transform-origin: left center;
      background: var(--ink, #1a1a2e);
      color: var(--paper, #faf8f4);
      font-size: 0.58rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      font-family: var(--font-body, 'Outfit', sans-serif);
    }
    .follow-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
    body.tools-sidebar-open .follow-widget {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-50%) translateX(-20px) scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    @media (max-width: 480px) {
      .follow-widget { left: 8px; gap: 5px; }
      .follow-label { font-size: 0.5rem; }
      .follow-btn { width: 26px; height: 26px; }
      .follow-btn svg { width: 13px; height: 13px; }
    }
    @media (max-width: 380px) {
      .follow-widget { left: 6px; gap: 4px; }
      .follow-label { display: none; }
      .follow-btn { width: 24px; height: 24px; }
      .follow-btn svg { width: 12px; height: 12px; }
    }
  `;
  document.head.appendChild(styleEl);

  // =========================================================
  // ================= FOLLOW WIDGET =========================
  // =========================================================

  const followWidget = document.createElement('div');
  followWidget.className = 'follow-widget';
  followWidget.setAttribute('aria-label', 'Follow us on social media');

  const followLabel = document.createElement('div');
  followLabel.className = 'follow-label';
  followLabel.textContent = FOLLOW_HANDLE;
  followWidget.appendChild(followLabel);

  const followButtons = document.createElement('div');
  followButtons.className = 'follow-buttons';
  FOLLOW_PLATFORMS.forEach((platform) => {
    const btn = document.createElement('a');
    btn.className = 'follow-btn';
    btn.setAttribute('data-platform', platform.id);
    btn.setAttribute('aria-label', `Follow ${FOLLOW_HANDLE} on ${platform.label}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.href = platform.url;
    btn.innerHTML = platform.icon;
    followButtons.appendChild(btn);
  });
  followWidget.appendChild(followButtons);
  document.body.appendChild(followWidget);

  // =========================================================
  // ================= SHARED BLUR OVERLAY ===================
  // =========================================================

  const blurOverlay = document.createElement('div');
  blurOverlay.className = 'radial-blur-overlay';
  blurOverlay.id = 'radialBlurOverlay';
  document.body.appendChild(blurOverlay);

  // =========================================================
  // ================= TRIGGERS ==============================
  // =========================================================

  const socialTrigger = document.createElement('div');
  socialTrigger.className = 'social-floating-trigger';
  socialTrigger.setAttribute('aria-label', 'Share this page');
  socialTrigger.setAttribute('role', 'button');
  socialTrigger.setAttribute('tabindex', '0');
  socialTrigger.innerHTML = ICONS.share;
  document.body.appendChild(socialTrigger);

  const gamesTrigger = document.createElement('div');
  gamesTrigger.className = 'games-floating-trigger';
  gamesTrigger.setAttribute('aria-label', 'Play games');
  gamesTrigger.setAttribute('role', 'button');
  gamesTrigger.setAttribute('tabindex', '0');
  gamesTrigger.innerHTML = ICONS.joystick;
  document.body.appendChild(gamesTrigger);

  // Toast
  const toast = document.createElement('div');
  toast.className = 'social-toast';
  toast.id = 'socialToast';
  document.body.appendChild(toast);

  // =========================================================
  // ================= RADIAL MENU BUILDER ===================
  // =========================================================

  /**
   * Create a centered radial menu.
   * @param {string} id          element id
   * @param {string} hubLabel    text shown in the center hub
   */
  function createRadialMenu(id, hubLabel) {
    const menu = document.createElement('div');
    menu.className = 'radial-menu';
    menu.id = id;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', hubLabel);

    const hub = document.createElement('span');
    hub.className = 'radial-menu-hub-label';
    hub.textContent = hubLabel;
    menu.appendChild(hub);

    return menu;
  }

  // ---- Games menu ----
  const gamesMenu = createRadialMenu('gamesRadialMenu', 'Games');
  const gamesItems = [];

  GAMES.forEach((game) => {
    const item = document.createElement('a');
    item.className = 'radial-item';
    item.href = game.url;
    item.setAttribute('role', 'menuitem');
    item.setAttribute('aria-label', `${game.label}: ${game.description}`);
    item.innerHTML = `
      <span class="radial-icon">${game.icon}</span>
      <span class="radial-item-label">${game.label}</span>
    `;
    item.addEventListener('click', () => closeGamesMenu());
    gamesMenu.appendChild(item);
    gamesItems.push(item);
  });
  document.body.appendChild(gamesMenu);

  // ---- Social menu ----
  const socialMenu = createRadialMenu('socialRadialMenu', 'Share');
  const socialItems = [];

  SOCIAL_PLATFORMS.forEach((platform) => {
    const item = document.createElement('button');
    item.className = 'radial-item';
    item.type = 'button';
    item.setAttribute('role', 'menuitem');
    item.setAttribute('aria-label', `Share on ${platform.label}`);
    item.innerHTML = `
      <span class="radial-icon">${platform.icon}</span>
      <span class="radial-item-label">${platform.label}</span>
    `;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(platform.getUrl(), '_blank', 'width=600,height=500');
      closeSocialMenu();
    });
    socialMenu.appendChild(item);
    socialItems.push(item);
  });

  // Copy link item
  const copyItem = document.createElement('button');
  copyItem.className = 'radial-item is-copy';
  copyItem.type = 'button';
  copyItem.setAttribute('role', 'menuitem');
  copyItem.setAttribute('aria-label', 'Copy link to clipboard');
  copyItem.innerHTML = `
    <span class="radial-icon">${COPY_ITEM.icon}</span>
    <span class="radial-item-label">${COPY_ITEM.label}</span>
  `;
  copyItem.addEventListener('click', (e) => {
    e.stopPropagation();
    copyCurrentUrl();
  });
  socialMenu.appendChild(copyItem);
  socialItems.push(copyItem);

  document.body.appendChild(socialMenu);

  // =========================================================
  // ================= RADIAL LAYOUT ENGINE ==================
  // =========================================================

  /**
   * Compute radius for a menu based on item count and viewport size.
   * The circle is centered on screen, so the radius must stay small enough
   * that the icons + labels never touch the viewport edges.
   */
  function getRadiusFor(count) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minDim = Math.min(vw, vh);

    // Base radius as a fraction of the smaller viewport dimension.
    // Fewer items → tighter ring; more items → wider ring.
    let base;
    if (count <= 5) {
      base = minDim * 0.22;            // social: compact ring
    } else if (count <= 8) {
      base = minDim * 0.26;
    } else if (count <= 11) {
      base = minDim * 0.30;
    } else {
      base = minDim * 0.33;            // games: widest ring
    }

    // Clamp so labels never get clipped on small screens.
    const maxR = minDim * 0.42;
    const minR = count <= 5 ? 90 : 110;
    return Math.max(minR, Math.min(base, maxR));
  }

  /**
   * Position items evenly around a full circle centered on screen.
   * The first item starts at the top (-90°) and goes clockwise.
   */
  function layoutItems(menu, items) {
    const count = items.length;
    const radius = getRadiusFor(count);
    const startAngle = -90;
    const step = 360 / count;

    items.forEach((item, i) => {
      const angleDeg = startAngle + step * i;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;

      // The radial-item container is centred on the anchor point via
      // translate(). We offset by half the icon width so the icon's
      // visual center lands exactly on the ring position.
      item.style.setProperty('--radial-x', `calc(${x.toFixed(2)}px - 50%)`);
      item.style.setProperty('--radial-y', `calc(${y.toFixed(2)}px - 50%)`);
    });
  }

  function layoutAll() {
    layoutItems(gamesMenu, gamesItems);
    layoutItems(socialMenu, socialItems);
  }

  layoutAll();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutAll, 150);
  });

  // =========================================================
  // ================= COPY LINK HELPERS =====================
  // =========================================================

  function copyCurrentUrl() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => { showToast('Link copied!', 1500); closeSocialMenu(); })
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Link copied!', 1500);
    } catch (err) {
      showToast('Could not copy link', 1500);
    }
    document.body.removeChild(textarea);
    closeSocialMenu();
  }

  // =========================================================
  // ================= OPEN / CLOSE ==========================
  // =========================================================

  function syncOverlay() {
    const anyOpen =
      gamesMenu.classList.contains('open') ||
      socialMenu.classList.contains('open');
    blurOverlay.classList.toggle('active', anyOpen);
  }

  function openGamesMenu() {
    closeSocialMenu();
    // Re-layout in case viewport changed since last open
    layoutItems(gamesMenu, gamesItems);
    gamesMenu.classList.add('open');
    gamesTrigger.classList.add('active');
    gamesTrigger.innerHTML = ICONS.close;
    syncOverlay();
  }

  function closeGamesMenu() {
    gamesMenu.classList.remove('open');
    gamesTrigger.classList.remove('active');
    gamesTrigger.innerHTML = ICONS.joystick;
    syncOverlay();
  }

  function toggleGamesMenu() {
    if (gamesMenu.classList.contains('open')) closeGamesMenu();
    else openGamesMenu();
  }

  function openSocialMenu() {
    closeGamesMenu();
    layoutItems(socialMenu, socialItems);
    socialMenu.classList.add('open');
    socialTrigger.classList.add('active');
    socialTrigger.innerHTML = ICONS.close;
    syncOverlay();
  }

  function closeSocialMenu() {
    socialMenu.classList.remove('open');
    socialTrigger.classList.remove('active');
    socialTrigger.innerHTML = ICONS.share;
    syncOverlay();
  }

  function toggleSocialMenu() {
    if (socialMenu.classList.contains('open')) closeSocialMenu();
    else openSocialMenu();
  }

  // =========================================================
  // ================= EVENT LISTENERS =======================
  // =========================================================

  socialTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSocialMenu();
  });

  gamesTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleGamesMenu();
  });

  blurOverlay.addEventListener('click', () => {
    closeGamesMenu();
    closeSocialMenu();
  });

  // Clicking the center hub (::before) or empty space inside a menu closes it
  // — but clicking an item does not. We attach on the menu container.
  gamesMenu.addEventListener('click', (e) => {
    if (e.target === gamesMenu) closeGamesMenu();
  });
  socialMenu.addEventListener('click', (e) => {
    if (e.target === socialMenu) closeSocialMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const t = e.target;

    if (socialMenu.classList.contains('open')) {
      if (
        !t.closest('#socialRadialMenu') &&
        t !== socialTrigger &&
        !socialTrigger.contains(t) &&
        !blurOverlay.contains(t)
      ) {
        closeSocialMenu();
      }
    }

    if (gamesMenu.classList.contains('open')) {
      if (
        !t.closest('#gamesRadialMenu') &&
        t !== gamesTrigger &&
        !gamesTrigger.contains(t) &&
        !blurOverlay.contains(t)
      ) {
        closeGamesMenu();
      }
    }
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (socialMenu.classList.contains('open')) closeSocialMenu();
      if (gamesMenu.classList.contains('open')) closeGamesMenu();
    }
  });

  // Keyboard support for triggers
  gamesTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGamesMenu();
    }
  });
  socialTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSocialMenu();
    }
  });

  // =========================================================
  // ================= HIDE WITH TOOLS SIDEBAR ===============
  // =========================================================

  const sidebarObserver = new MutationObserver(() => {
    const sidebar = document.getElementById('toolsFixedSidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      document.body.classList.add('tools-sidebar-open');
      closeSocialMenu();
      closeGamesMenu();
    } else {
      document.body.classList.remove('tools-sidebar-open');
    }
  });

  const sidebarEl = document.getElementById('toolsFixedSidebar');
  if (sidebarEl) {
    sidebarObserver.observe(sidebarEl, { attributes: true, attributeFilter: ['class'] });
  } else {
    const bodyObserver = new MutationObserver(() => {
      const sb = document.getElementById('toolsFixedSidebar');
      if (sb) {
        bodyObserver.disconnect();
        sidebarObserver.observe(sb, { attributes: true, attributeFilter: ['class'] });
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  console.log('Social Share + Games (Centered Radial) + Follow Widgets initialized.');
})();
