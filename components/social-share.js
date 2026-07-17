/**
 * WebNotePad — social-share.js
 * Injects a fixed floating social share widget
 * Theme: Modern, clean, with rounded pill design
 * Position: Left side (before the sidebar trigger on the right)
 * Platform: Pinterest, Threads, Twitter/X, Telegram
 */

(function () {
  // Social media platforms configuration
  const socialPlatforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: '#000000',
      shareUrl: (url, title) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      id: 'threads',
      name: 'Threads',
      icon: '🧵',
      color: '#000000',
      shareUrl: (url, title) => `https://threads.net/intent/post?text=${encodeURIComponent(title + ' ' + url)}`,
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: '📌',
      color: '#E60023',
      shareUrl: (url, title) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      color: '#0088cc',
      shareUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
  ];

  // Inject CSS Styles
  const cssStyles = `
    /* Social Share Widget - Fixed Position */
    .social-share-widget {
      position: fixed;
      left: 20px;
      bottom: 120px;
      z-index: 9998;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--paper, #f8f6f0);
      padding: 12px 10px;
      border-radius: 50px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--paper-edge, #e8e4dc);
      backdrop-filter: blur(10px);
      background: rgba(248, 246, 240, 0.92);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    }

    body.dark .social-share-widget {
      background: rgba(30, 30, 40, 0.92);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    /* Share Label */
    .social-share-label {
      text-align: center;
      font-size: 0.55rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--ink-muted, #6b6b6b);
      padding-bottom: 6px;
      border-bottom: 1px solid var(--paper-edge, #e8e4dc);
      margin-bottom: 4px;
      opacity: 0.6;
    }

    body.dark .social-share-label {
      color: rgba(255, 255, 255, 0.5);
      border-bottom-color: rgba(255, 255, 255, 0.08);
    }

    /* Individual Social Buttons */
    .social-share-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--ink, #1a1a2e);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      position: relative;
    }

    body.dark .social-share-btn {
      color: rgba(255, 255, 255, 0.7);
    }

    .social-share-btn:hover {
      transform: scale(1.15) translateY(-2px);
      background: var(--paper-warm, #f0ece4);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }

    body.dark .social-share-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .social-share-btn:active {
      transform: scale(0.92);
    }

    /* Tooltip on hover */
    .social-share-btn::after {
      content: attr(data-tooltip);
      position: absolute;
      left: calc(100% + 14px);
      top: 50%;
      transform: translateY(-50%);
      background: var(--ink, #1a1a2e);
      color: var(--paper, #f8f6f0);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease;
      font-family: var(--font-body, system-ui, -apple-system, sans-serif);
    }

    body.dark .social-share-btn::after {
      background: rgba(255, 255, 255, 0.9);
      color: var(--ink, #1a1a2e);
    }

    .social-share-btn:hover::after {
      opacity: 1;
      left: calc(100% + 18px);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .social-share-widget {
        left: 12px;
        bottom: 100px;
        padding: 10px 8px;
        gap: 8px;
        border-radius: 40px;
      }

      .social-share-btn {
        width: 32px;
        height: 32px;
        font-size: 0.95rem;
      }

      .social-share-label {
        font-size: 0.45rem;
        padding-bottom: 4px;
        margin-bottom: 2px;
      }

      .social-share-btn::after {
        display: none; /* Hide tooltips on mobile for cleaner UI */
      }
    }

    @media (max-width: 480px) {
      .social-share-widget {
        left: 8px;
        bottom: 85px;
        padding: 8px 6px;
        gap: 6px;
        border-radius: 32px;
      }

      .social-share-btn {
        width: 28px;
        height: 28px;
        font-size: 0.8rem;
      }

      .social-share-label {
        font-size: 0.4rem;
        padding-bottom: 3px;
      }
    }

    /* Animation on page load */
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .social-share-widget {
      animation: slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    /* Adjust when sidebar is open to prevent overlap */
    .social-share-widget.shifted {
      transform: translateX(-10px);
      opacity: 0.7;
    }

    body.dark .social-share-widget.shifted {
      opacity: 0.5;
    }
  `;

  // Inject CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'social-share-widget';
  widgetContainer.id = 'socialShareWidget';
  widgetContainer.setAttribute('role', 'toolbar');
  widgetContainer.setAttribute('aria-label', 'Share this page on social media');

  // Build widget content
  let widgetHTML = `<div class="social-share-label">Share</div>`;

  socialPlatforms.forEach((platform) => {
    widgetHTML += `
      <button 
        class="social-share-btn" 
        data-platform="${platform.id}"
        data-tooltip="${platform.name}"
        aria-label="Share on ${platform.name}"
        style="color: ${platform.color};"
      >
        ${platform.icon}
      </button>
    `;
  });

  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  // Get all share buttons
  const shareButtons = widgetContainer.querySelectorAll('.social-share-btn');

  // Share function
  function sharePage(platformId) {
    const url = window.location.href;
    const title = document.title || 'WebNotePad - Your Creative Workspace';
    
    const platform = socialPlatforms.find(p => p.id === platformId);
    if (!platform) return;

    const shareUrl = platform.shareUrl(url, title);
    
    // Open share dialog in new window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      shareUrl,
      `share_${platformId}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  }

  // Add click listeners
  shareButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.dataset.platform;
      sharePage(platform);
      
      // Add subtle feedback
      btn.style.transform = 'scale(0.85)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  // Detect when the tools sidebar is open and adjust position
  function checkSidebarState() {
    const sidebar = document.getElementById('toolsFixedSidebar');
    const widget = document.getElementById('socialShareWidget');
    if (!sidebar || !widget) return;

    const observer = new MutationObserver(() => {
      if (sidebar.classList.contains('open')) {
        widget.classList.add('shifted');
      } else {
        widget.classList.remove('shifted');
      }
    });

    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }

  // Wait for sidebar to be rendered
  setTimeout(checkSidebarState, 100);

  // Also handle escape key to reset state
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const widget = document.getElementById('socialShareWidget');
      if (widget) widget.classList.remove('shifted');
    }
  });

  // Handle window resize for responsive adjustments
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const widget = document.getElementById('socialShareWidget');
      if (widget) {
        // Ensure widget is visible on small screens
        if (window.innerWidth < 480) {
          widget.style.animation = 'none';
        }
      }
    }, 250);
  });

  console.log('📱 Social Share Widget initialized successfully!');
})();
