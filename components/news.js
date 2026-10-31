// Render Featured News Banner before the Blog Grid
function renderFeaturedNewsBanner() {
  const blogContainer = document.querySelector('.container');
  const blogGrid = document.querySelector('.blog-grid');
  if (!blogContainer || !blogGrid) return;

  const section = document.createElement('section');
  section.className = 'tech-news-section';
  section.innerHTML = `
    <div class="tech-news-badge">⚡ Latest Tech News</div>
    <div class="tech-news-grid">
      <div class="tech-news-content">
        <h2 class="tech-news-title">The Rise of Agentic AI: Beyond <em>Chatbots</em></h2>
        <p class="tech-news-excerpt">Autonomous CLI agents, sandbox execution loops, and verifiable pipelines are shifting enterprise engineering in 2026.</p>
        <a href="/tech-news-agentic-ai-2026" class="tech-news-cta">Read Full Story →</a>
      </div>
      <div class="tech-news-img-wrap">
        <img src="/images/tech-news-agentic-ai.webp" alt="Agentic AI workflow" />
      </div>
    </div>
  `;

  blogContainer.insertBefore(section, blogGrid);
}
