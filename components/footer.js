/**
 * WebNotePad — Footer Component
 * Injected into #footer-root on DOMContentLoaded
 */
(function () {
  const year = new Date().getFullYear();

  // Social icons (Pinterest, X/Twitter, Reddit) — inline SVGs
  const pinterestSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C24.027 5.367 18.624 0 12.017 0z"/>
    </svg>`;

  const xSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>`;

  const redditSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm5.01 15.262c-.222.848-1.14 1.746-2.836 1.746-1.638 0-2.506-.886-2.724-1.03-.272.144-1.189.585-2.455.585-2.516 0-3.794-1.14-4.115-1.793-.24.103-.528.157-.829.157-1.05 0-1.903-.853-1.903-1.903s.853-1.903 1.903-1.903c.37 0 .72.11 1.018.298.744-1.123 2.132-1.898 3.744-1.898.783 0 1.54.186 2.207.524.153-1.336 1.07-2.382 2.22-2.382.06 0 .12.003.178.008-.096-.36-.15-.738-.15-1.126 0-1.84 1.49-3.33 3.33-3.33 1.84 0 3.33 1.49 3.33 3.33 0 .17-.013.337-.037.5.535.17 1.05.48 1.467.89.35.35.6.78.72 1.24.034.13.052.266.052.403 0 .227-.05.45-.143.656.03.128.045.26.045.396 0 1.57-1.53 2.94-3.64 2.94-.11 0-.22-.005-.328-.015zM7.522 11.82c-.42 0-.76.34-.76.76s.34.76.76.76.76-.34.76-.76-.34-.76-.76-.76zm8.956 0c-.42 0-.76.34-.76.76s.34.76.76.76.76-.34.76-.76-.34-.76-.76-.76z"/>
    </svg>`;

  // Style block — scoped to our new social row so it works without touching external CSS
  const socialStyles = `
    <style>
      .social-icons-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 1rem;
        flex-wrap: wrap;
      }
      .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        background: rgba(255,255,255,0.06);
        color: #cdd1e0;
        border: 1px solid rgba(255,255,255,0.08);
        transition: all .2s ease;
        text-decoration: none;
      }
      .social-icon:hover {
        background: #ffffff;
        color: #1e1f2b;
        transform: translateY(-2px);
        border-color: transparent;
      }
      .social-icon svg {
        width: 1.15rem;
        height: 1.15rem;
        fill: currentColor;
        display: block;
      }
    </style>`;

  const socialIconsHTML = `
    <div class="social-icons-row">
      <a href="https://www.pinterest.com/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">${pinterestSvg}</a>
      <a href="https://x.com/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">${xSvg}</a>
      <a href="https://www.reddit.com/user/webnotepad" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Reddit">${redditSvg}</a>
    </div>`;

  const footerHTML = `
    ${socialStyles}
    <footer class="site-footer" id="siteFooter" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">✦ Notepad Online</div>
            <p>The cleanest free online notepad. Write, save and organize your notes instantly in your browser — no signup, no complexity. Your thoughts, always safe.</p>
            ${socialIconsHTML}
          </div>
          <div class="footer-col">
            <h4>Tools</h4>
            <ul>
              <li><a href="/#notepad">Open Editor</a></li>
              <li><a href="/diary">Diary Online</a></li>              
              <li><a href="/list-maker">List Maker</a></li>
              <li><a href="/all-tools">All Tools</a></li>
              <li><a href="/games">Games</a></li>
              <li><a href="/solvers">Puzzle Solvers</a></li>
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
