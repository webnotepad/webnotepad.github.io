<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebNotePad · footer with social icons</title>
  <!-- Font Awesome 6 (free) for consistent social icons – but we use inline SVG for Pinterest, X, Reddit.
       No external dependency needed for the icons because we embed SVG directly. 
       We'll also include minimal styling to match a clean footer. -->
  <style>
    /* reset & base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background: #f9fafc;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* make footer stick to bottom for demo */
    #footer-root {
      margin-top: auto;
    }

    /* ----- footer styles (based on typical webnotepad aesthetic) ----- */
    .site-footer {
      background: #1e1f2b;
      color: #cdd1e0;
      padding: 2.5rem 1rem 1.5rem;
      font-size: 0.9rem;
      line-height: 1.5;
      border-top: 3px solid #3b3f5c;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-brand p {
      margin-top: 0.75rem;
      font-size: 0.85rem;
      opacity: 0.75;
      max-width: 280px;
    }

    .footer-logo {
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #f0f2f8;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .footer-col h4 {
      color: #f0f2f8;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      opacity: 0.9;
    }

    .footer-col ul {
      list-style: none;
    }

    .footer-col li {
      margin-bottom: 0.6rem;
    }

    .footer-col a {
      color: #b9bfd6;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 0.9rem;
    }

    .footer-col a:hover {
      color: #ffffff;
      text-decoration: underline;
    }

    .footer-bottom {
      border-top: 1px solid #2e3146;
      padding-top: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .footer-copy {
      opacity: 0.7;
    }

    .footer-links a {
      color: #b9bfd6;
      text-decoration: none;
      margin-left: 1.5rem;
    }

    .footer-links a:hover {
      color: #ffffff;
      text-decoration: underline;
    }

    /* ----- social icon row (placed below first widget) ----- */
    .social-icons-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1.25rem;      /* space above icons, below first widget text */
      margin-bottom: 0.25rem;
      flex-wrap: wrap;
    }

    .social-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      color: #cdd1e0;
      transition: all 0.2s ease;
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .social-icon:hover {
      background: #ffffff;
      color: #1e1f2b;
      transform: translateY(-2px);
      border-color: transparent;
    }

    .social-icon svg {
      width: 1.25rem;
      height: 1.25rem;
      fill: currentColor;
      stroke: none;
      display: block;
    }

    /* For X icon we use a custom path, fill works fine. */
    /* Reddit icon sometimes needs fill=currentColor, we set fill via attribute. */
    /* ensure no extra margin */
    .social-icon svg path {
      fill: currentColor;
    }

    /* small adjustment for the brand area to accommodate social row */
    .footer-brand {
      display: flex;
      flex-direction: column;
    }
  </style>
</head>
<body>

  <!-- We'll inject the footer via the same pattern as original footer.js 
       but we use inline HTML + script to keep it self-contained. 
       The original footer.js pattern is preserved conceptually. -->

  <div id="footer-root"></div>

  <script>
    (function () {
      const year = new Date().getFullYear();

      // ---------- SVG paths (embedded) ----------
      // Pinterest icon (standard P logo path, simplified but recognizable)
      const pinterestSvg = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C24.027 5.367 18.624 0 12.017 0z"/>
        </svg>
      `;

      // Twitter / X icon (official X logo path)
      const xSvg = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      `;

      // Reddit icon (classic snoo head simplified, but using standard path from simpleicons)
      const redditSvg = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm5.01 15.262c-.222.848-1.14 1.746-2.836 1.746-1.638 0-2.506-.886-2.724-1.03-.272.144-1.189.585-2.455.585-2.516 0-3.794-1.14-4.115-1.793-.24.103-.528.157-.829.157-1.05 0-1.903-.853-1.903-1.903s.853-1.903 1.903-1.903c.37 0 .72.11 1.018.298.744-1.123 2.132-1.898 3.744-1.898.783 0 1.54.186 2.207.524.153-1.336 1.07-2.382 2.22-2.382.06 0 .12.003.178.008-.096-.36-.15-.738-.15-1.126 0-1.84 1.49-3.33 3.33-3.33 1.84 0 3.33 1.49 3.33 3.33 0 .17-.013.337-.037.5.535.17 1.05.48 1.467.89.35.35.6.78.72 1.24.034.13.052.266.052.403 0 .227-.05.45-.143.656.03.128.045.26.045.396 0 1.57-1.53 2.94-3.64 2.94-.11 0-.22-.005-.328-.015zM7.522 11.82c-.42 0-.76.34-.76.76s.34.76.76.76.76-.34.76-.76-.34-.76-.76-.76zm8.956 0c-.42 0-.76.34-.76.76s.34.76.76.76.76-.34.76-.76-.34-.76-.76-.76z"/>
        </svg>
      `;

      // social icons row – placed after the brand description (below first widget)
      const socialIconsHTML = `
        <div class="social-icons-row">
          <a href="https://www.pinterest.com/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            ${pinterestSvg}
          </a>
          <a href="https://x.com/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            ${xSvg}
          </a>
          <a href="https://www.reddit.com/user/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
            ${redditSvg}
          </a>
        </div>
      `;

      // full footer HTML – identical structure to the original, but we insert
      // the social icons right after the first widget (the .footer-brand div's <p>)
      // We build it by hand with the social row inside .footer-brand after the paragraph.
      const footerHTML = `
        <footer class="site-footer" id="siteFooter" role="contentinfo">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="footer-logo">✦ Notepad Online</div>
                <p>The cleanest free online notepad. Write, save and organize your notes instantly in your browser — no signup, no ads, no complexity. Your thoughts, always safe.</p>
                <!-- social icons below the first widget (inside brand column, after description) -->
                ${socialIconsHTML}
              </div>
              <div class="footer-col">
                <h4>Tools</h4>
                <ul>
                  <li><a href="/#notepad">Open Editor</a></li>
                  <li><a href="/diary">Diary Online</a></li>
                  <li><a href="/mindmap">MindMap</a></li>
                  <li><a href="/list-maker">List Maker</a></li>
                  <li><a href="/all-tools">All Tools</a></li>
                  <li><a href="/games">Games</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>Resources</h4>
                <ul>              
                  <li><a href="/blog">Blog</a></li>              
                  <li><a href="/digital-study-planner-guide">Study Planner Guide</a></li>
                  <li><a href="/ultimate-guide-digital-note-taking">Note-Taking Guide</a></li>
                  <li><a href="/faq">Faqs</a></li>
                  <li><a href="/sitemap.xml">Sitemap</a></li>
                </ul>
              </div>          
              <div class="footer-col">
                <h4>Pages</h4>
                <ul>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/privacy">Privacy Policy</a></li>              
                  <li><a href="/terms">Terms of Use</a></li> 
                  <li><a href="/disclaimer">Disclaimer</a></li>
                  <li><a href="/cookies">Cookies Policy</a></li>              
                </ul>
              </div>
            </div>
            <div class="footer-bottom">
              <span class="footer-copy">© ${year} WebNotePad · webnotepad.github.io · Free Online Notepad</span>
              <div class="footer-links">           
                <a href="sitemap.xml">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      `;

      function initFooter() {
        const root = document.getElementById('footer-root');
        if (!root) return;
        root.innerHTML = footerHTML;
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
      } else {
        initFooter();
      }
    })();
  </script>

  <!-- dummy content to show the footer is at the bottom -->
  <main style="min-height: 50vh; display: flex; align-items: center; justify-content: center; color: #2e3146;">
    <p style="opacity:0.6; font-size:1.1rem;">✨ Page content — scroll down to see footer with social icons ✨</p>
  </main>

</body>
</html>
