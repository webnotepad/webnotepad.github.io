/**
 * WebNotePad — sidebar.js
 * A minimal floating button that navigates to all-tools.html
 */

(function () {
  // 1. Inject CSS Styles
  const cssStyles = `
    /* Floating Launch Button */
    .tools-floating-trigger {
      position: fixed;
      bottom: 120px;
      right: 24px;
      z-index: 9999;
      width: 52px;
      height: 52px;
      background: var(--ink);
      color: #C2410C;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
      cursor: pointer;
      border: 1px solid var(--paper-edge);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background 0.2s ease,
                  color 0.2s ease,
                  box-shadow 0.3s ease;
      animation: attentionPulse 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
    }
    .tools-floating-trigger svg {
      width: 24px;
      height: 24px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.dark .tools-floating-trigger {
      background: var(--accent);
      color: var(--white);
    }
    .tools-floating-trigger:hover {
      transform: scale(1.08) rotate(15deg);
      background: #C2410C;
      color: var(--white);
      animation-play-state: paused;
      box-shadow: 0 8px 24px rgba(194, 65, 12, 0.4);
    }

    @keyframes attentionPulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(194, 65, 12, 0.4), var(--shadow);
      }
      50% {
        transform: scale(1.08);
        box-shadow: 0 0 0 12px rgba(194, 65, 12, 0), var(--shadow);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(194, 65, 12, 0), var(--shadow);
      }
    }

    @media (max-width: 640px) {
      .tools-floating-trigger {
        width: 48px;
        height: 48px;
        bottom: 100px;
        right: 18px;
      }
      .tools-floating-trigger svg {
        width: 22px;
        height: 22px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tools-floating-trigger {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  // 2. Inject styles into document head
  const styleEl = document.createElement("style");
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 3. Get the root container and bail if it doesn't exist
  const rootContainer = document.getElementById("tools-sidebar-root");
  if (!rootContainer) return;

  // 4. Define the trigger SVG icon
  const triggerSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.6"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;

  // 5. Inject the floating trigger button
  rootContainer.innerHTML = `
    <div class="tools-floating-trigger" id="toolsSidebarTrigger" title="Explore All Tools" aria-label="Navigate to all tools" role="link" tabindex="0">${triggerSvg}</div>
  `;

  // 6. Get the trigger element
  const trigger = document.getElementById("toolsSidebarTrigger");
  if (!trigger) return;

  // 7. Navigate to all-tools.html on click or keyboard activation
  function navigateToAllTools() {
    window.location.href = "all-tools.html";
  }

  trigger.addEventListener("click", navigateToAllTools);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToAllTools();
    }
  });
})();
