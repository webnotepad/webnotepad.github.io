/**
 * social-share.js
 * Floating social share widget (Pinterest, X, LinkedIn, Threads, Copy Link)
 * Positioned above the main tools sidebar. Injects styles, markup, and logic.
 * Theme: Editorial / Ink-on-paper aesthetic
 */

(function () {
  'use strict';

  // ---- Configuration ----
  const SOCIAL_PLATFORMS = [
    {
      id: 'pinterest',
      label: 'Pinterest',
      icon: '📌',
      getUrl: () =>
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(document.title)}`,
    },
    {
      id: 'x',
      label: 'X',
      icon: '🐦',
      getUrl: () =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '🔗',
      getUrl: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    },
    {
      id: 'threads',
      label: 'Threads',
      icon: '🧵',
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
      font-size: 1.4rem;
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

    /* Popup panel */
    .social-share-popup {
      position: fixed;
      bottom: 254px;
      right: 24px;
      z-index: 10002;
      background: var(--paper, #faf8f4);
      border: 1px solid var(--paper-edge, #e8e2d6);
      border-radius: var(--radius-lg, 14px);
      box-shadow: var(--shadow-lg, 0 16px 48px rgba(26,26,46,0.18));
      padding: 20px 22px 18px;
      min-width: 220px;
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
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--paper-edge, #e8e2d6);
    }
    .social-popup-header span {
      font-family: var(--font-display, 'Playfair Display', Georgia, serif);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--ink, #1a1a2e);
      letter-spacing: -0.01em;
    }
    .social-popup-close {
      width: 26px;
      height: 26px;
      border: none;
      background: none;
      color: var(--ink-muted, #6b6b85);
      font-size: 0.85rem;
      cursor: pointer;
      border-radius: var(--radius, 6px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition, 0.2s cubic-bezier(0.4, 0, 0.2, 1));
    }
    .social-popup-close:hover {
      background: var(--paper-edge, #e8e2d6);
      color: var(--ink, #1a1a2e);
    }

    .social-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .social-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
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
      min-width: 0;
    }
    .social-btn:hover {
      background: var(--paper-warm, #f4f0e8);
      border-color: var(--paper-edge, #e8e2d6);
      transform: translateY(-1px);
    }
    body.dark .social-btn:hover {
      background: var(--paper, #141418);
    }
    .social-btn .social-icon {
      font-size: 1.15rem;
      flex-shrink: 0;
      width: 28px;
      text-align: center;
    }
    .social-btn .social-label {
      white-space: nowrap;
    }
    .social-btn.copy-btn {
      grid-column: 1 / -1;
      justify-content: center;
      border-color: var(--paper-edge, #e8e2d6);
      background: var(--paper-warm, #f4f0e8);
      margin-top: 2px;
      font-weight: 600;
      color: var(--accent, #c4562a);
    }
    body.dark .social-btn.copy-btn {
      background: var(--paper, #141418);
      border-color: var(--paper-edge, #2a2a34);
    }
    .social-btn.copy-btn:hover {
      background: var(--accent-pale, #fce9e3);
      border-color: var(--accent, #c4562a);
    }
    .social-btn.copy-btn .social-icon {
      font-size: 1rem;
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
        font-size: 1.15rem;
      }
      .social-share-popup {
        bottom: 232px;
        right: 16px;
        min-width: 180px;
        padding: 16px 16px 14px;
      }
      .social-grid {
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }
      .social-btn {
        padding: 8px 8px;
        font-size: 0.75rem;
        gap: 6px;
      }
      .social-btn .social-icon {
        font-size: 1rem;
        width: 22px;
      }
      .social-toast {
        bottom: 282px;
        right: 16px;
        font-size: 0.75rem;
        padding: 6px 14px;
      }
      .social-popup-header span {
        font-size: 0.75rem;
      }
    }

    @media (max-width: 380px) {
      .social-floating-trigger {
        bottom: 165px;
        right: 12px;
        width: 40px;
        height: 40px;
        font-size: 1rem;
      }
      .social-share-popup {
        bottom: 216px;
        right: 12px;
        min-width: 150px;
        padding: 12px 12px 10px;
      }
      .social-btn {
        font-size: 0.7rem;
        padding: 6px 6px;
        gap: 4px;
      }
      .social-btn .social-icon {
        font-size: 0.85rem;
        width: 18px;
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
  trigger.innerHTML = '🔗';
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
    <span>Share this page</span>
    <button class="social-popup-close" id="socialPopupClose" aria-label="Close share panel">✕</button>
  `;
  popup.appendChild(header);

  // Grid container
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

  // Copy link button (full width)
  const copyBtn = document.createElement('button');
  copyBtn.className = 'social-btn copy-btn';
  copyBtn.setAttribute('aria-label', 'Copy link to clipboard');
  copyBtn.innerHTML = `
    <span class="social-icon">📋</span>
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
          // Fallback
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
    trigger.innerHTML = '✕';
  }

  function closePopup() {
    popup.classList.remove('open');
    trigger.classList.remove('active');
    trigger.innerHTML = '🔗';
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

  // ---- Cleanup (optional) ----
  // No cleanup needed for a persistent widget.

  console.log('Social Share Widget initialized.');
})();
