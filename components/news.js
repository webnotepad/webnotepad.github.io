/**
 * WebNotePad — Tech News & Articles Component
 * Dynamic loader for tech news articles, blog updates, and structured news cards.
 */
(function () {
  'use strict';

  // Array of Latest Tech News Posts & Articles
  const TECH_NEWS_POSTS = [
    {
      slug: 'tech-news-agentic-ai-2026',
      title: 'The Rise of Agentic AI: Why Enterprise Tech is Moving Beyond Traditional Chatbots',
      subtitle: 'Prompting is giving way to delegation. Autonomous command-line agents, local verification loops, and real-time task completion are redefining software workflows in late 2026.',
      category: 'Tech News & Innovation',
      date: 'Oct 31, 2026',
      isoDate: '2026-10-31',
      readTime: '7 min read',
      image: '/images/tech-news-agentic-ai.webp',
      imageAlt: 'Autonomous Agentic AI execution and terminal workflow diagram',
      isNews: true,
      url: '/tech-news-agentic-ai-2026',
      excerpt: 'Autonomous CLI agents, sandbox code execution loops, and verifiable enterprise pipelines are shifting productivity from prompt-response interactions to complete delegation.'
    },
    {
      slug: 'new-tools-word-search-crossword-emoji-picker',
      title: 'New Tools: Word Search Solver, Crossword Solver & Emoji Picker',
      subtitle: 'Three new free tools just landed on WebNotePad. Here\'s what each one does, how to use it, and how it slots into your writing toolkit.',
      category: 'Productivity & Release',
      date: 'Jul 12, 2026',
      isoDate: '2026-07-12',
      readTime: '9 min read',
      image: '/images/new-tools-update.webp',
      imageAlt: 'New WebNotePad solver and helper tools',
      isNews: false,
      url: '/new-tools-word-search-crossword-emoji-picker',
      excerpt: 'Three new free tools just landed on WebNotePad. Here is what each one does, how to use it, and how it slots into your writing and note-taking environment.'
    },
    {
      slug: 'alternatives-notion-evernote',
      title: 'Best Free Alternatives to Notion & Evernote: Why Simple Online Notepads Win for Most People',
      subtitle: 'Notion is an enterprise system. Evernote is an older platform. Most people just need to write down thoughts and find them fast.',
      category: 'App Comparison',
      date: 'May 9, 2026',
      isoDate: '2026-05-09',
      readTime: '10 min read',
      image: '/images/alternatives-notion-and-evernote.png',
      imageAlt: 'Comparison of Notion, Evernote, and WebNotePad',
      isNews: false,
      url: '/alternatives-notion-evernote',
      excerpt: 'Discover why simple, fast, browser-based local notepads beat complex paid tools for everyday capturing and personal knowledge management.'
    }
  ];

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (c) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /**
   * Builds a News / Blog card DOM element
   */
  function createNewsCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card news-card';
    article.setAttribute('data-article-slug', post.slug);

    const badge = post.isNews
      ? `<span class="news-badge" style="background: #0369a1; color: #fff; font-family: var(--font-mono, monospace); font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-right: 8px;">Tech News</span>`
      : '';

    article.innerHTML = `
      <div class="blog-card-content" style="display: flex; flex-direction: column; height: 100%;">
        ${post.image ? `
          <div class="news-card-img-wrap" style="width: 100%; height: 180px; overflow: hidden; border-radius: 8px; margin-bottom: 16px; background: var(--paper-warm);">
            <img src="${post.image}" alt="${escapeHtml(post.imageAlt || post.title)}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onerror="this.style.display='none';" />
          </div>
        ` : ''}
        <div class="blog-meta" style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--ink-muted); margin-bottom: 12px;">
          ${badge}
          <span class="date">📅 <time datetime="${post.isoDate}">${post.date}</time></span>
          <span>·</span>
          <span>⚡ ${post.readTime}</span>
        </div>
        <div class="card-divider" style="height: 3px; width: 40px; background: var(--accent, #c4562a); border-radius: 2px; margin-bottom: 14px;"></div>
        <h2 style="font-family: var(--font-display, serif); font-size: 1.35rem; font-weight: 800; line-height: 1.3; color: var(--ink); margin-bottom: 10px;">
          ${escapeHtml(post.title)}
        </h2>
        <div class="blog-excerpt" style="color: var(--ink-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; flex: 1;">
          <p>${escapeHtml(post.excerpt)}</p>
        </div>
        <a href="${post.url}" class="read-more" data-article-link="${post.slug}" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--accent, #c4562a); text-decoration: none; margin-top: auto;">
          Read full news story →
        </a>
      </div>
    `;

    return article;
  }

  /**
   * Renders Tech News items into grid and widget containers
   */
  function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid && !newsGrid.querySelector('.news-card')) {
      TECH_NEWS_POSTS.forEach((post) => {
        newsGrid.appendChild(createNewsCard(post));
      });
    }

    const newsWidget = document.getElementById('newsWidget');
    if (newsWidget && !newsWidget.querySelector('.widget-news-item')) {
      const topNews = TECH_NEWS_POSTS.find(p => p.isNews) || TECH_NEWS_POSTS[0];
      const widgetContent = document.createElement('div');
      widgetContent.className = 'widget-news-item';
      widgetContent.innerHTML = `
        <div style="background: var(--paper, #fff); border: 1px solid var(--paper-edge, #e7e0d5); border-radius: 8px; padding: 16px; margin-top: 12px;">
          <span style="background: #0369a1; color: #fff; font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">Breaking Tech</span>
          <h4 style="font-family: var(--font-display); font-size: 1rem; margin: 8px 0 6px; color: var(--ink);">${escapeHtml(topNews.title)}</h4>
          <p style="font-size: 0.82rem; color: var(--ink-muted); line-height: 1.4; margin-bottom: 10px;">${escapeHtml(topNews.excerpt)}</p>
          <a href="${topNews.url}" style="font-size: 0.8rem; font-weight: 600; color: #0369a1; text-decoration: none;">Read News Article →</a>
        </div>
      `;
      newsWidget.appendChild(widgetContent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNews);
  } else {
    renderNews();
  }
})();
