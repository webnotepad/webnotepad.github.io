/**
 * SocialShare — social-share.js
 * A floating social sharing widget with a pin-style aesthetic
 * Features: Pinterest, Threads, Twitter/X, Telegram
 * Style: Clean, modern, with subtle hover animations
 */

(function () {
  // ============================================================
  // 1. CONFIGURATION
  // ============================================================
  const CONFIG = {
    // Default share text and URL (can be overridden via data attributes)
    defaultText: "Check this out!",
    defaultUrl: window.location.href,
    defaultImage: "", // For Pinterest

    // Platform configurations
    platforms: [
      {
        id: "pinterest",
        name: "Pinterest",
        icon: "📌",
        color: "#E60023",
        bgColor: "#E60023",
        shareUrl: (url, text, image) =>
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&media=${encodeURIComponent(image || "")}&description=${encodeURIComponent(
            text
          )}`,
        needsImage: true,
      },
      {
        id: "threads",
        name: "Threads",
        icon: "🧵",
        color: "#000000",
        bgColor: "#000000",
        shareUrl: (url, text) =>
          `https://threads.net/intent/post?text=${encodeURIComponent(
            text + "\n" + url
          )}`,
      },
      {
        id: "twitter",
        name: "Twitter / X",
        icon: "🐦",
        color: "#000000",
        bgColor: "#000000",
        shareUrl: (url, text) =>
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
      },
      {
        id: "telegram",
        name: "Telegram",
        icon: "✈️",
        color: "#0088cc",
        bgColor: "#0088cc",
        shareUrl: (url, text) =>
          `https://t.me/share/url?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
      },
    ],
  };

  // ============================================================
  // 2. INJECT CSS STYLES
  // ============================================================
  const cssStyles = `
    /* ----- Floating Trigger Button (Pin Style) ----- */
    .social-share-trigger {
      position: fixed;
      bottom: 200px;
      right: 24px;
      z-index: 9999;
      width: 56px;
      height: 56px;
      background: #ffffff;
      color: #1a1a2e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06);
      cursor: pointer;
      border: 2px solid #f0f0f0;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.3s ease,
                  background 0.3s ease;
      font-family: system-ui, -apple-system, sans-serif;
      user-select: none;
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.92);
    }

    body.dark .social-share-trigger {
      background: rgba(30, 30, 50, 0.92);
      color: #f0f0f0;
      border-color: #3a3a5a;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .social-share-trigger:hover {
      transform: scale(1.12) rotate(-8deg);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      background: #ffffff;
    }

    body.dark .social-share-trigger:hover {
      background: rgba(40, 40, 65, 0.95);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .social-share-trigger.active {
      transform: scale(0.9) rotate(45deg);
      background: #f5f5f5;
      border-color: #ddd;
    }

    body.dark .social-share-trigger.active {
      background: #2a2a4a;
      border-color: #4a4a6a;
    }

    /* ----- Share Popover (Pin-style card) ----- */
    .social-share-popover {
      position: fixed;
      bottom: 190px;
      right: 24px;
      z-index: 9998;
      background: #ffffff;
      border-radius: 20px;
      padding: 20px 20px 18px;
      min-width: 220px;
      max-width: 280px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06);
      border: 1px solid #f0f0f0;
      opacity: 0;
      transform: scale(0.92) translateY(12px);
      transform-origin: bottom right;
      pointer-events: none;
      transition: opacity 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                  transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      font-family: system-ui, -apple-system, sans-serif;
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.96);
    }

    body.dark .social-share-popover {
      background: rgba(30, 30, 50, 0.96);
      border-color: #3a3a5a;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
    }

    .social-share-popover.open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Popover header */
    .social-share-popover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }

    body.dark .social-share-popover-header {
      border-bottom-color: #3a3a5a;
    }

    .social-share-popover-header span {
      font-size: 0.85rem;
      font-weight: 600;
      color: #1a1a2e;
      letter-spacing: -0.01em;
    }

    body.dark .social-share-popover-header span {
      color: #e8e8f0;
    }

    .social-share-popover-close {
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      color: #999;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .social-share-popover-close:hover {
      background: #f0f0f0;
      color: #333;
    }

    body.dark .social-share-popover-close:hover {
      background: #3a3a5a;
      color: #fff;
    }

    /* Platform grid */
    .social-share-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    .social-share-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 10px 4px 8px;
      border: none;
      background: transparent;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-decoration: none;
      color: #1a1a2e;
      font-family: system-ui, -apple-system, sans-serif;
      position: relative;
    }

    body.dark .social-share-btn {
      color: #e8e8f0;
    }

    .social-share-btn:hover {
      background: #f5f5f5;
      transform: translateY(-2px);
    }

    body.dark .social-share-btn:hover {
      background: #3a3a5a;
    }

    .social-share-btn:active {
      transform: scale(0.94);
    }

    .social-share-btn-icon {
      font-size: 1.5rem;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .social-share-btn:hover .social-share-btn-icon {
      transform: scale(1.15);
    }

    .social-share-btn-label {
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      opacity: 0.7;
      text-transform: uppercase;
    }

    /* Platform-specific hover tints */
    .social-share-btn[data-platform="pinterest"]:hover {
      background: #fde8e8;
    }
    body.dark .social-share-btn[data-platform="pinterest"]:hover {
      background: #3a1a1a;
    }

    .social-share-btn[data-platform="threads"]:hover {
      background: #e8e8f0;
    }
    body.dark .social-share-btn[data-platform="threads"]:hover {
      background: #3a3a4a;
    }

    .social-share-btn[data-platform="twitter"]:hover {
      background: #e8f0f8;
    }
    body.dark .social-share-btn[data-platform="twitter"]:hover {
      background: #1a2a3a;
    }

    .social-share-btn[data-platform="telegram"]:hover {
      background: #e4f0fa;
    }
    body.dark .social-share-btn[data-platform="telegram"]:hover {
      background: #1a2a3a;
    }

    /* Share count badge (optional - hidden by default) */
    .social-share-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ff4757;
      color: #fff;
      font-size: 0.55rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
    }

    body.dark .social-share-badge {
      border-color: #2a2a4a;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .social-share-popover {
        right: 12px;
        left: 12px;
        bottom: 180px;
        min-width: unset;
        max-width: unset;
        padding: 16px;
        border-radius: 16px;
      }
      .social-share-grid {
        gap: 6px;
      }
      .social-share-btn {
        padding: 8px 2px 6px;
      }
      .social-share-btn-icon {
        font-size: 1.3rem;
      }
      .social-share-btn-label {
        font-size: 0.5rem;
      }
      .social-share-trigger {
        width: 48px;
        height: 48px;
        font-size: 1.3rem;
        bottom: 100px;
        right: 16px;
      }
    }

    /* Animation for popover entrance */
    @keyframes popoverSlideUp {
      from {
        opacity: 0;
        transform: scale(0.92) translateY(16px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .social-share-popover.open {
      animation: popoverSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    /* Tiny tooltip / label on trigger */
    .social-share-trigger-label {
      position: absolute;
      right: 68px;
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      font-size: 0.7rem;
      padding: 4px 12px;
      border-radius: 8px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }

    body.dark .social-share-trigger-label {
      background: rgba(255, 255, 255, 0.15);
      color: #f0f0f0;
    }

    .social-share-trigger:hover .social-share-trigger-label {
      opacity: 1;
    }

    @media (max-width: 480px) {
      .social-share-trigger-label {
        display: none;
      }
    }
  `;

  // ============================================================
  // 3. INJECT STYLES
  // ============================================================
  const styleEl = document.createElement("style");
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // ============================================================
  // 4. BUILD DOM
  // ============================================================
  const root = document.createElement("div");
  root.id = "social-share-root";
  document.body.appendChild(root);

  // Get share data from data attributes or defaults
  const getShareData = () => {
    const el = document.querySelector("[data-social-share]");
    return {
      text: el?.dataset?.shareText || CONFIG.defaultText,
      url: el?.dataset?.shareUrl || window.location.href,
      image: el?.dataset?.shareImage || CONFIG.defaultImage,
    };
  };

  // Build popover HTML
  const platformsHTML = CONFIG.platforms
    .map((p) => {
      const label = p.id === "twitter" ? "X" : p.name;
      return `
        <button class="social-share-btn" data-platform="${p.id}" data-name="${p.name}" aria-label="Share on ${p.name}">
          <span class="social-share-btn-icon">${p.icon}</span>
          <span class="social-share-btn-label">${label}</span>
        </button>
      `;
    })
    .join("");

  root.innerHTML = `
    <!-- Floating Trigger Button -->
    <button class="social-share-trigger" id="socialShareTrigger" aria-label="Open share menu">
      <span>🔗</span>
      <span class="social-share-trigger-label">Share</span>
    </button>

    <!-- Popover Card -->
    <div class="social-share-popover" id="socialSharePopover" role="dialog" aria-label="Share options">
      <div class="social-share-popover-header">
        <span>✨ Share this</span>
        <button class="social-share-popover-close" id="socialShareClose" aria-label="Close share menu">✕</button>
      </div>
      <div class="social-share-grid" id="socialShareGrid">
        ${platformsHTML}
      </div>
    </div>
  `;

  // ============================================================
  // 5. DOM REFERENCES
  // ============================================================
  const trigger = document.getElementById("socialShareTrigger");
  const popover = document.getElementById("socialSharePopover");
  const closeBtn = document.getElementById("socialShareClose");
  const grid = document.getElementById("socialShareGrid");

  // ============================================================
  // 6. STATE & HELPERS
  // ============================================================
  let isOpen = false;

  function togglePopover() {
    isOpen = !isOpen;
    popover.classList.toggle("open", isOpen);
    trigger.classList.toggle("active", isOpen);

    // Update trigger icon
    trigger.querySelector("span:first-child").textContent = isOpen ? "✕" : "🔗";
  }

  function closePopover() {
    if (isOpen) {
      isOpen = false;
      popover.classList.remove("open");
      trigger.classList.remove("active");
      trigger.querySelector("span:first-child").textContent = "🔗";
    }
  }

  // ============================================================
  // 7. SHARE HANDLERS
  // ============================================================
  function handleShare(platformId) {
    const platform = CONFIG.platforms.find((p) => p.id === platformId);
    if (!platform) return;

    const { text, url, image } = getShareData();

    let shareUrl;
    if (platform.needsImage) {
      shareUrl = platform.shareUrl(url, text, image);
    } else {
      shareUrl = platform.shareUrl(url, text);
    }

    // Open in new window/tab
    window.open(
      shareUrl,
      "_blank",
      "width=600,height=500,scrollbars=yes,resizable=yes"
    );

    // Close popover after a beat
    setTimeout(closePopover, 300);

    // Track share event (optional - you can add analytics here)
    console.log(`[SocialShare] Shared on ${platform.name}:`, { text, url });
  }

  // ============================================================
  // 8. BIND EVENTS
  // ============================================================

  // Trigger click
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });

  // Close button
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePopover();
  });

  // Platform buttons (event delegation)
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".social-share-btn");
    if (!btn) return;
    const platform = btn.dataset.platform;
    if (platform) {
      handleShare(platform);
    }
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (isOpen && !popover.contains(e.target) && !trigger.contains(e.target)) {
      closePopover();
    }
  });

  // Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopover();
    }
  });

  // ============================================================
  // 9. OPTIONAL: Expose API for developers
  // ============================================================
  window.SocialShare = {
    open: togglePopover,
    close: closePopover,
    share: handleShare,
    setData: (data) => {
      const el = document.querySelector("[data-social-share]") || document.body;
      if (data.text) el.dataset.shareText = data.text;
      if (data.url) el.dataset.shareUrl = data.url;
      if (data.image) el.dataset.shareImage = data.image;
    },
    getData: getShareData,
  };

  console.log("[SocialShare] 🎯 Widget initialized. Use window.SocialShare to control.");
})();
