/**
 * WebNotePad — Footer Component
 * Injected into #footer-root on DOMContentLoaded
 */
(function () {
  const year = new Date().getFullYear();

  const footerHTML = `
    <footer class="site-footer" id="siteFooter" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">✦ Notepad Online</div>
            <p>The cleanest free online notepad. Write, save and organize your notes instantly in your browser — no signup, no ads, no complexity. Your thoughts, always safe.</p>
          </div>
          <div class="footer-col">
            <h4>Notepad</h4>
            <ul>
              <li><a href="/#notepad">Open Editor</a></li>
              <li><a href="/#features">Features</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#use-cases">Use Cases</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/#faq">FAQ</a></li>
              <li><a href="/diary">Online Diary</a></li>
              <li><a href="/mindmap">MindMap Online</a></li>
              <li><a href="/list-maker">List Maker</a></li>
              </ul>
          </div>
          <div class="footer-col">
            <h4>Features</h4>
            <ul>
              <li><a href="/#notepad">Auto-Save</a></li>
              <li><a href="/#notepad">Dark Mode</a></li>
              <li><a href="/#notepad">Rich Text</a></li>
              <li><a href="/#notepad">Export Notes</a></li>
              <li><a href="/#notepad">Find & Replace</a></li>
              <li><a href="/#notepad">Fullscreen</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">© ${year} WebNotePad · webnotepad.github.io · Free Online Notepad</span>
          <div class="footer-links">
            <a href="privacy">Privacy</a>
            <a href="terms">Terms</a>
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
