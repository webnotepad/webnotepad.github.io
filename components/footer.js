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
            <h4>Tools</h4>
            <ul>
              <li><a href="/#notepad">Open Editor</a></li>
              <li><a href="/diary">Diary Online</a></li>
              <li><a href="/mindmap">MindMap</a></li>
              <li><a href="/list-maker">List Maker</a></li>
              <li><a href="/all-tools">All Tools</a></li>
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
