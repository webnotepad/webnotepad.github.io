/**
 * social-share.js
 * Floating social share widget with SVG icons and vertical layout
 * Positioned above the main tools sidebar.
 * Theme: Editorial / Ink-on-paper aesthetic
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
    share: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`
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

  // ---- Helper: toast ----
  function showToast(message, duration = 2000) {
    const toast = document.getElementById('socialToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ---- Inject CSS ----
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* Social Share Widget — injected by social-share.js */

    /* Floating trigger */
    .social-floating-trigger {
      position: fixed;
      bottom: 190px;
      right: 24px;
      z-index: 10001;
      width: 52px;
      height: 52px;
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
      animation: socialPulse 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }
    .social-floating-trigger svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .social-floating-trigger:hover svg {
      transform: scale(1.1);
    }
    body.dark .social-floating-trigger {
      background: var(--accent, #c4562a);
      color: var(--white, #ffffff);
    }
    .social-floating-trigger:hover {
      transform: scale(1.08) rotate(8deg);
      background: var(--accent, #c4562a);
      color: var(--white, #ffffff);
      animation-play-state: paused;
      box-shadow: 0 8px 24px rgba(196, 86, 42, 0.3);
    }
    .social-floating-trigger.active {
      transform: scale(0.9) rotate(-90deg);
      background: var(--paper-warm, #f4f0e8);
      color: var(--ink, #1a1a2e);
      animation: none;
      box-shadow: none;
    }

    /* Popup panel - vertical layout */
    .social-share-popup {
      position: fixed;
      bottom: 254px;
      right: 24px;
      z-index: 10002;
      background: var(--paper, #faf8f4);
      border: 1px solid var(--paper-edge, #e8e2d6);
      border-radius: var(--radius-lg, 14px);
      box-shadow: var(--shadow-lg, 0 16px 48px rgba(26,26,46,0.18));
      padding: 16px 16px 14px;
      min-width: 180px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(12px) scale(0.96);
      transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: bottom right;
    }
    .social-share-popup.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }
    body.dark .social-share-popup {
      background: var(--paper-warm, #1c1c22);
      border-color: var(--paper-edge, #2a2a34);
    }

    .social-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--paper-edge, #e8e2d6);
    }
    .social-popup-header span {
      font-family: var(--font-display, 'Playfair Display', Georgia, serif);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--ink, #1a1a2e);
      letter-spacing: -0.01em;
    }
    .social-popup-close {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      color: var(--ink-muted, #6b6b85);
      cursor: pointer;
      border-radius: var(--radius, 6px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition, 0.2s cubic-bezier(0.4, 0, 0.2, 1));
      padding: 0;
    }
    .social-popup-close:hover {
      background: var(--paper-edge, #e8e2d6);
      color: var(--ink, #1a1a2e);
    }
    .social-popup-close svg {
      display: block;
    }

    /* Vertical grid layout */
    .social-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .social-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius, 6px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--ink, #1a1a2e);
      font-family: var(--font-body, 'Outfit', sans-serif);
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition, 0.2s cubic-bezier(0.4, 0, 0.2, 1));
      text-decoration: none;
      width: 100%;
      text-align: left;
    }
    .social-btn:hover {
      background: var(--paper-warm, #f4f0e8);
      border-color: var(--paper-edge, #e8e2d6);
      transform: translateX(2px);
    }
    body.dark .social-btn:hover {
      background: var(--paper, #141418);
    }
    .social-btn .social-icon {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink-muted, #6b6b85);
      transition: color var(--transition);
    }
    .social-btn:hover .social-icon {
      color: var(--accent, #c4562a);
    }
    .social-btn .social-icon svg {
      display: block;
      width: 18px;
      height: 18px;
    }
    .social-btn .social-label {
      flex: 1;
    }

    /* Copy link button - full width, prominent */
    .social-btn.copy-btn {
      margin-top: 4px;
      border-color: var(--paper-edge, #e8e2d6);
      background: var(--paper-warm, #f4f0e8);
      font-weight: 600;
      color: var(--accent, #c4562a);
      justify-content: center;
      border-style: dashed;
    }
    body.dark .social-btn.copy-btn {
      background: var(--paper, #141418);
      border-color: var(--paper-edge, #2a2a34);
    }
    .social-btn.copy-btn:hover {
      background: var(--accent-pale, #fce9e3);
      border-color: var(--accent, #c4562a);
      border-style: solid;
      transform: translateX(0) scale(1.01);
    }
    .social-btn.copy-btn .social-icon {
      color: var(--accent, #c4562a);
    }
    .social-btn.copy-btn:hover .social-icon {
      color: var(--accent-light, #e8714a);
    }

    /* Toast notification */
    .social-toast {
      position: fixed;
      bottom: 310px;
      right: 24px;
      background: var(--ink, #1a1a2e);
      color: var(--paper, #faf8f4);
      padding: 8px 18px;
      border-radius: var(--radius, 6px);
      font-size: 0.8rem;
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
    .social-toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* Pulse animation */
    @keyframes socialPulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(196, 86, 42, 0.25), var(--shadow, 0 6px 24px rgba(26,26,46,0.12));
      }
      50% {
        transform: scale(1.06);
        box-shadow: 0 0 0 14px rgba(196, 86, 42, 0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12));
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(196, 86, 42, 0), var(--shadow, 0 6px 24px rgba(26,26,46,0.12));
      }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .social-floating-trigger {
        bottom: 175px;
        right: 16px;
        width: 46px;
        height: 46px;
      }
      .social-floating-trigger svg {
        width: 18px;
        height: 18px;
      }
      .social-share-popup {
        bottom: 232px;
        right: 16px;
        min-width: 160px;
        padding: 14px 14px 12px;
      }
      .social-btn {
        padding: 8px 12px;
        font-size: 0.75rem;
        gap: 10px;
      }
      .social-btn .social-icon {
        width: 24px;
        height: 24px;
      }
      .social-btn .social-icon svg {
        width: 16px;
        height: 16px;
      }
      .social-toast {
        bottom: 282px;
        right: 16px;
        font-size: 0.75rem;
        padding: 6px 14px;
      }
      .social-popup-header span {
        font-size: 0.72rem;
      }
    }

    @media (max-width: 380px) {
      .social-floating-trigger {
        bottom: 165px;
        right: 12px;
        width: 40px;
        height: 40px;
      }
      .social-floating-trigger svg {
        width: 16px;
        height: 16px;
      }
      .social-share-popup {
        bottom: 216px;
        right: 12px;
        min-width: 140px;
        padding: 10px 10px 8px;
      }
      .social-btn {
        font-size: 0.7rem;
        padding: 6px 10px;
        gap: 8px;
      }
      .social-btn .social-icon {
        width: 20px;
        height: 20px;
      }
      .social-btn .social-icon svg {
        width: 14px;
        height: 14px;
      }
    }
  `;
  document.head.appendChild(styleEl);

  // ---- Build DOM ----
  // Trigger button
  const trigger = document.createElement('div');
  trigger.className = 'social-floating-trigger';
  trigger.setAttribute('aria-label', 'Share this page');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  trigger.innerHTML = ICONS.share;
  document.body.appendChild(trigger);

  // Toast
  const toast = document.createElement('div');
  toast.className = 'social-toast';
  toast.id = 'socialToast';
  document.body.appendChild(toast);

  // Popup panel
  const popup = document.createElement('div');
  popup.className = 'social-share-popup';
  popup.id = 'socialSharePopup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', 'Share options');

  // Popup header
  const header = document.createElement('div');
  header.className = 'social-popup-header';
  header.innerHTML = `
    <span>Share</span>
    <button class="social-popup-close" id="socialPopupClose" aria-label="Close share panel">${ICONS.close}</button>
  `;
  popup.appendChild(header);

  // Grid container - vertical
  const grid = document.createElement('div');
  grid.className = 'social-grid';

  // Add platform buttons
  SOCIAL_PLATFORMS.forEach((platform) => {
    const btn = document.createElement('button');
    btn.className = 'social-btn';
    btn.setAttribute('data-platform', platform.id);
    btn.setAttribute('aria-label', `Share on ${platform.label}`);
    btn.innerHTML = `
      <span class="social-icon">${platform.icon}</span>
      <span class="social-label">${platform.label}</span>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = platform.getUrl();
      window.open(url, '_blank', 'width=600,height=500');
      closePopup();
    });
    grid.appendChild(btn);
  });

  // Copy link button (full width, prominent)
  const copyBtn = document.createElement('button');
  copyBtn.className = 'social-btn copy-btn';
  copyBtn.setAttribute('aria-label', 'Copy link to clipboard');
  copyBtn.innerHTML = `
    <span class="social-icon">${ICONS.link}</span>
    <span class="social-label">Copy Link</span>
  `;
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          showToast('Link copied!', 1500);
          closePopup();
        })
        .catch(() => {
          fallbackCopy(url);
        });
    } else {
      fallbackCopy(url);
    }
  });
  grid.appendChild(copyBtn);

  popup.appendChild(grid);
  document.body.appendChild(popup);

  // ---- Helpers ----
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
    closePopup();
  }

  function openPopup() {
    popup.classList.add('open');
    trigger.classList.add('active');
    trigger.innerHTML = ICONS.close;
  }

  function closePopup() {
    popup.classList.remove('open');
    trigger.classList.remove('active');
    trigger.innerHTML = ICONS.share;
  }

  function togglePopup() {
    if (popup.classList.contains('open')) {
      closePopup();
    } else {
      openPopup();
    }
  }

  // ---- Event listeners ----
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
  });

  // Close button inside popup
  const closeBtn = document.getElementById('socialPopupClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
    });
  }

  // Close on click outside popup and trigger
  document.addEventListener('click', (e) => {
    if (popup.classList.contains('open')) {
      const target = e.target;
      if (!popup.contains(target) && target !== trigger && !trigger.contains(target)) {
        closePopup();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('open')) {
      closePopup();
    }
  });

  // Prevent popup close when clicking inside it
  popup.addEventListener('click', (e) => e.stopPropagation());

  console.log('Social Share Widget initialized with SVG icons and vertical layout.');
})();
