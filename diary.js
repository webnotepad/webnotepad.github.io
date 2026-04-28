/* =============================================
   WebNotePad — Online Diary (diary.css)
   Aesthetic: Warm journal / soft paper tones
   ============================================= */
:root {
  --d-cream: #fdf6ed;
  --d-warm: #f5ead8;
  --d-tan: #e8d5bc;
  --d-brown: #8b5e3c;
  --d-ink: #2c1a0e;
  --d-ink-soft: #5c3d2e;
  --d-ink-muted: #9e7b5e;
  --d-rose: #c4705a;
  --d-rose-pale: #faeae5;
  --d-green: #3d6b4f;
  --d-gold: #c9960b;
  --d-white: #ffffff;
  --d-font-serif: 'Lora', Georgia, serif;
  --d-font-sans: 'Nunito', sans-serif;
  --d-font-mono: 'Fira Mono', monospace;
  --d-radius: 8px;
  --d-radius-lg: 16px;
  --d-shadow: 0 4px 20px rgba(44,26,14,0.1);
  --d-shadow-lg: 0 12px 40px rgba(44,26,14,0.15);
  --d-t: 0.2s ease;
}
body.dark {
  --d-cream: #1a1410;
  --d-warm: #221a14;
  --d-tan: #2e2318;
  --d-ink: #f0e8dc;
  --d-ink-soft: #c8b8a4;
  --d-ink-muted: #8a7060;
  --d-rose-pale: #2a1810;
  --d-shadow: 0 4px 20px rgba(0,0,0,0.4);
  --d-shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--d-font-sans);background:var(--d-cream);color:var(--d-ink);line-height:1.65;overflow-x:hidden;transition:background .2s,color .2s}
.d-container{max-width:1140px;margin:0 auto;padding:0 24px}
a{text-decoration:none;color:inherit}
button{cursor:pointer;font-family:var(--d-font-sans);border:none;background:none}
input,select,textarea{font-family:var(--d-font-sans)}

/* HERO */
.d-hero{position:relative;min-height:56vh;display:flex;align-items:center;padding:80px 0 60px;overflow:hidden;background:var(--d-warm)}
.d-hero-orbs{position:absolute;inset:0;pointer-events:none}
.orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.35}
.orb1{width:400px;height:400px;background:radial-gradient(circle,#f4c99a,transparent);top:-100px;right:-80px}
.orb2{width:300px;height:300px;background:radial-gradient(circle,#e89e82,transparent);bottom:-60px;left:-60px}
.orb3{width:200px;height:200px;background:radial-gradient(circle,#c9960b44,transparent);top:40%;left:30%}
body.dark .orb{opacity:.12}
.d-hero-inner{position:relative;z-index:1;max-width:680px}
.d-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:var(--d-rose-pale);color:var(--d-rose);border:1px solid var(--d-rose);border-radius:100px;font-size:.8rem;font-weight:600;font-family:var(--d-font-mono);margin-bottom:24px;animation:dfadeIn .5s ease both}
.d-hero h1{font-family:var(--d-font-serif);font-size:clamp(2.4rem,6vw,4rem);font-weight:700;line-height:1.15;color:var(--d-ink);margin-bottom:20px;animation:dfadeIn .55s .1s ease both}
.d-accent{color:var(--d-rose);font-style:italic}
.d-hero p{font-size:1.05rem;color:var(--d-ink-soft);max-width:500px;line-height:1.7;margin-bottom:32px;animation:dfadeIn .55s .2s ease both}
.d-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:var(--d-radius);font-size:.9rem;font-weight:700;transition:all var(--d-t);cursor:pointer;border:2px solid transparent;animation:dfadeIn .55s .3s ease both}
.d-btn-primary{background:var(--d-rose);color:#fff;border-color:var(--d-rose)}
.d-btn-primary:hover{background:var(--d-brown);border-color:var(--d-brown);transform:translateY(-2px);box-shadow:0 6px 20px rgba(196,112,90,.3)}
@keyframes dfadeIn{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}

/* APP */
.d-app-section{padding:0 0 72px}
.d-app-shell{display:flex;border:1px solid var(--d-tan);border-radius:var(--d-radius-lg);overflow:hidden;box-shadow:var(--d-shadow-lg);min-height:580px;background:var(--d-cream);transition:border-color .2s,background .2s}
.d-sidebar{width:260px;min-width:260px;background:var(--d-warm);border-right:1px solid var(--d-tan);display:flex;flex-direction:column}
.d-sidebar-top{padding:16px 14px 12px;border-bottom:1px solid var(--d-tan)}
.d-sidebar-brand{font-family:var(--d-font-serif);font-size:1rem;font-weight:700;color:var(--d-brown);margin-bottom:10px}
.d-new-btn{width:100%;padding:8px;background:var(--d-rose);color:#fff;border-radius:var(--d-radius);font-size:.83rem;font-weight:700;border:none;cursor:pointer;transition:background var(--d-t)}
.d-new-btn:hover{background:var(--d-brown)}
.d-search-wrap{padding:10px 12px 6px}
.d-search-wrap input,.d-filter-row select{width:100%;padding:7px 10px;border-radius:var(--d-radius);border:1px solid var(--d-tan);background:var(--d-cream);color:var(--d-ink);font-size:.8rem;outline:none;transition:border-color var(--d-t)}
.d-search-wrap input:focus,.d-filter-row select:focus{border-color:var(--d-rose)}
.d-filter-row{padding:4px 12px 8px}
.d-entries-list{flex:1;overflow-y:auto;padding:8px}
.d-entry-item{padding:10px 10px;border-radius:var(--d-radius);cursor:pointer;border:1px solid transparent;transition:all var(--d-t);margin-bottom:2px}
.d-entry-item:hover{background:var(--d-cream);border-color:var(--d-tan)}
.d-entry-item.active{background:var(--d-cream);border-color:var(--d-rose)}
.d-entry-item-title{font-size:.83rem;font-weight:600;color:var(--d-ink);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-entry-item-meta{font-size:.72rem;color:var(--d-ink-muted);font-family:var(--d-font-mono)}
.d-sidebar-footer{padding:10px 14px;border-top:1px solid var(--d-tan);display:flex;align-items:center;justify-content:space-between}
.d-icon-btn{font-size:.78rem;font-weight:700;color:var(--d-ink-muted);padding:5px 8px;border-radius:var(--d-radius);background:var(--d-tan);border:1px solid transparent;transition:all var(--d-t)}
.d-icon-btn:hover{color:var(--d-ink);background:var(--d-cream)}
.d-entry-count{font-size:.72rem;color:var(--d-ink-muted);font-family:var(--d-font-mono)}

/* EDITOR */
.d-editor-panel{flex:1;display:flex;flex-direction:column;min-width:0}
.d-editor-header{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--d-tan);background:var(--d-cream);flex-wrap:wrap}
.d-mobile-menu{display:none;width:32px;height:32px;align-items:center;justify-content:center;border-radius:var(--d-radius);background:var(--d-warm);border:1px solid var(--d-tan);font-size:1rem;color:var(--d-ink-soft)}
.d-entry-meta{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap}
.d-date-input,.d-mood-select,.d-tags-input{padding:5px 10px;border-radius:var(--d-radius);border:1px solid var(--d-tan);background:var(--d-warm);color:var(--d-ink);font-size:.8rem;outline:none;transition:border-color var(--d-t)}
.d-date-input:focus,.d-mood-select:focus,.d-tags-input:focus{border-color:var(--d-rose)}
.d-tags-input{flex:1;min-width:160px}
.d-editor-actions{display:flex;gap:8px}
.d-action-btn{padding:6px 14px;border-radius:var(--d-radius);font-size:.8rem;font-weight:700;background:var(--d-rose);color:#fff;border:none;cursor:pointer;transition:background var(--d-t)}
.d-action-btn:hover{background:var(--d-brown)}
.d-delete-btn{background:transparent;color:var(--d-ink-muted);border:1px solid var(--d-tan)}
.d-delete-btn:hover{background:#fde8e8;color:#c0392b;border-color:#c0392b}
.d-entry-title{padding:16px 20px 8px;font-family:var(--d-font-serif);font-size:1.35rem;font-weight:700;color:var(--d-ink);background:transparent;border:none;outline:none;width:100%;border-bottom:1px solid var(--d-tan)}
.d-entry-title::placeholder{color:var(--d-tan)}
.d-format-bar{display:flex;align-items:center;gap:4px;padding:8px 16px;background:var(--d-warm);border-bottom:1px solid var(--d-tan);flex-wrap:wrap}
.d-fmt{padding:4px 8px;border-radius:4px;font-size:.82rem;font-weight:600;color:var(--d-ink-muted);background:transparent;border:1px solid transparent;transition:all var(--d-t)}
.d-fmt:hover{background:var(--d-tan);color:var(--d-ink)}
.d-fmt-sep{width:1px;height:16px;background:var(--d-tan);margin:0 4px}
.d-writing-area{flex:1;padding:24px 24px 16px;font-family:var(--d-font-serif);font-size:1rem;line-height:1.9;color:var(--d-ink);outline:none;overflow-y:auto;min-height:280px}
.d-writing-area:empty::before{content:attr(data-placeholder);color:var(--d-tan);font-style:italic;pointer-events:none}
body.dark .d-writing-area:empty::before{color:var(--d-ink-muted)}
.d-status-bar{display:flex;align-items:center;gap:10px;padding:6px 16px;background:var(--d-warm);border-top:1px solid var(--d-tan);font-size:.73rem;font-family:var(--d-font-mono);color:var(--d-ink-muted);flex-wrap:wrap}
.d-saved{color:var(--d-green)}
.d-saving{color:var(--d-gold)}
.d-sep{color:var(--d-tan)}

/* SECTIONS */
.d-section{padding:80px 0}
.d-section-tag{font-family:var(--d-font-mono);font-size:.73rem;letter-spacing:.12em;text-transform:uppercase;color:var(--d-rose);margin-bottom:14px}
.d-section-title{font-family:var(--d-font-serif);font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:var(--d-ink);line-height:1.25;margin-bottom:48px}
.d-section-title em{color:var(--d-rose);font-style:italic}

/* HOW TO */
.d-how{background:var(--d-warm)}
.d-how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.d-how-card{background:var(--d-cream);border:1px solid var(--d-tan);border-radius:var(--d-radius-lg);padding:28px;transition:all var(--d-t)}
.d-how-card:hover{box-shadow:var(--d-shadow);transform:translateY(-3px)}
.d-how-num{font-family:var(--d-font-serif);font-size:2.5rem;font-weight:700;color:var(--d-tan);margin-bottom:12px;line-height:1}
body.dark .d-how-num{color:var(--d-tan)}
.d-how-card h3{font-family:var(--d-font-serif);font-size:1.05rem;font-weight:700;color:var(--d-ink);margin-bottom:8px}
.d-how-card p{font-size:.875rem;color:var(--d-ink-soft);line-height:1.65}

/* DESCRIPTION */
.d-desc{background:var(--d-cream)}
.d-desc-inner{display:grid;grid-template-columns:1.3fr .7fr;gap:64px;align-items:center}
.d-desc-text p{font-size:.975rem;color:var(--d-ink-soft);line-height:1.8;margin-bottom:16px}
.d-benefits{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.d-benefits span{padding:6px 14px;background:var(--d-rose-pale);color:var(--d-rose);border:1px solid var(--d-rose);border-radius:100px;font-size:.78rem;font-weight:600}
.d-journal-card{background:var(--d-warm);border:1px solid var(--d-tan);border-radius:var(--d-radius-lg);padding:32px;box-shadow:var(--d-shadow-lg);position:relative}
.d-journal-card::before{content:'📖';position:absolute;top:-20px;left:24px;font-size:2.5rem}
.d-journal-lines{margin:24px 0 20px;display:flex;flex-direction:column;gap:12px}
.d-line{height:2px;background:var(--d-tan);border-radius:1px}
.d-line-short{width:80%}
.d-line-shorter{width:60%}
.d-journal-mood{font-size:.8rem;font-weight:600;color:var(--d-rose);font-family:var(--d-font-mono);margin-bottom:6px}
.d-journal-date{font-size:.75rem;color:var(--d-ink-muted);font-family:var(--d-font-mono)}

/* FAQ */
.d-faq{background:var(--d-warm)}
.d-faq-list{max-width:700px;display:flex;flex-direction:column;gap:2px}
.d-faq-item{border:1px solid var(--d-tan);border-radius:var(--d-radius);background:var(--d-cream);overflow:hidden}
.d-faq-q{width:100%;text-align:left;padding:16px 20px;font-size:.95rem;font-weight:600;color:var(--d-ink);display:flex;justify-content:space-between;align-items:center;gap:12px;transition:background var(--d-t)}
.d-faq-q::after{content:'+';font-size:1.2rem;font-weight:300;color:var(--d-ink-muted);transition:transform var(--d-t)}
.d-faq-q[aria-expanded="true"]::after{transform:rotate(45deg);color:var(--d-rose)}
.d-faq-q:hover{background:var(--d-warm)}
.d-faq-a{display:none;padding:0 20px 16px}
.d-faq-a p{font-size:.875rem;color:var(--d-ink-soft);line-height:1.7}

/* TOAST */
.d-toast{position:fixed;bottom:24px;right:24px;background:var(--d-ink);color:var(--d-cream);padding:11px 18px;border-radius:var(--d-radius);font-size:.85rem;font-weight:500;box-shadow:var(--d-shadow-lg);transform:translateY(60px);opacity:0;transition:all .3s;z-index:9999;pointer-events:none}
.d-toast.show{transform:translateY(0);opacity:1}

/* MOBILE */
@media(max-width:900px){.d-how-grid{grid-template-columns:repeat(2,1fr)}.d-desc-inner{grid-template-columns:1fr;gap:36px}}
@media(max-width:680px){.d-how-grid{grid-template-columns:1fr}.d-app-shell{flex-direction:column}.d-sidebar{width:100%;min-width:0;max-height:240px;border-right:none;border-bottom:1px solid var(--d-tan)}.d-mobile-menu{display:flex}.d-editor-header{flex-wrap:wrap}.d-entry-meta{flex-direction:column;align-items:flex-start}.d-tags-input{width:100%}}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-thumb{background:var(--d-tan);border-radius:3px}
