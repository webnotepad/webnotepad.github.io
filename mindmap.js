/* =============================================
   WebNotePad — Mind Map (mindmap.css)
   Aesthetic: Dark tech / bold geometric
   ============================================= */
:root {
  --mm-bg: #0d1117;
  --mm-surface: #161b22;
  --mm-border: #30363d;
  --mm-text: #e6edf3;
  --mm-text-muted: #7d8590;
  --mm-accent: #2d6be4;
  --mm-accent2: #e4632d;
  --mm-green: #2da45e;
  --mm-canvas-bg: #0a0e14;
  --mm-toolbar-bg: #161b22;
  --mm-font-display: 'Syne', sans-serif;
  --mm-font-body: 'IBM Plex Sans', sans-serif;
  --mm-font-mono: 'IBM Plex Mono', monospace;
  --mm-radius: 6px;
  --mm-radius-lg: 12px;
  --mm-shadow: 0 4px 20px rgba(0,0,0,0.5);
  --mm-t: 0.2s ease;
}
body.dark {
  --mm-bg: #0d1117;
  --mm-surface: #161b22;
  --mm-border: #30363d;
  --mm-text: #e6edf3;
  --mm-text-muted: #7d8590;
  --mm-canvas-bg: #0a0e14;
}
/* Force dark scheme for mindmap regardless */
body { background: var(--mm-bg) !important; color: var(--mm-text) !important; }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--mm-font-body);overflow-x:hidden}
.mm-container{max-width:1200px;margin:0 auto;padding:0 24px}
a{text-decoration:none;color:inherit}
button{cursor:pointer;font-family:var(--mm-font-body);border:none;background:none}

/* HERO */
.mm-hero{position:relative;min-height:52vh;display:flex;align-items:center;padding:80px 0 60px;overflow:hidden;background:var(--mm-bg);border-bottom:1px solid var(--mm-border)}
.mm-hero-grid{position:absolute;inset:0;background-image:linear-gradient(var(--mm-border) 1px,transparent 1px),linear-gradient(90deg,var(--mm-border) 1px,transparent 1px);background-size:40px 40px;opacity:.2;pointer-events:none}
.mm-hero-inner{position:relative;z-index:2;max-width:680px}
.mm-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(45,107,228,.15);color:var(--mm-accent);border:1px solid rgba(45,107,228,.4);border-radius:100px;font-size:.78rem;font-weight:600;font-family:var(--mm-font-mono);margin-bottom:22px;animation:mmfade .5s ease both}
.mm-hero h1{font-family:var(--mm-font-display);font-size:clamp(2.4rem,6vw,4rem);font-weight:800;line-height:1.1;color:var(--mm-text);margin-bottom:18px;animation:mmfade .55s .1s ease both}
.mm-accent{color:var(--mm-accent)}
.mm-hero p{font-size:1.05rem;color:var(--mm-text-muted);max-width:480px;line-height:1.7;margin-bottom:28px;animation:mmfade .55s .2s ease both}
.mm-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:var(--mm-radius);font-size:.9rem;font-weight:600;transition:all var(--mm-t);cursor:pointer;animation:mmfade .55s .3s ease both}
.mm-btn-primary{background:var(--mm-accent);color:#fff;border:none}
.mm-btn-primary:hover{background:#1a55d4;transform:translateY(-2px);box-shadow:0 6px 20px rgba(45,107,228,.4)}
@keyframes mmfade{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}

/* Decorative floating nodes */
.mm-hero-nodes{position:absolute;right:5%;top:50%;transform:translateY(-50%);z-index:1;pointer-events:none}
.mn{position:absolute;padding:8px 16px;border-radius:20px;font-size:.8rem;font-weight:600;font-family:var(--mm-font-mono);animation:float 3s ease-in-out infinite}
.mn1{background:rgba(45,107,228,.2);color:var(--mm-accent);border:1px solid rgba(45,107,228,.4);top:0;left:0;animation-delay:0s}
.mn2{background:rgba(228,99,45,.15);color:var(--mm-accent2);border:1px solid rgba(228,99,45,.3);top:40px;left:140px;animation-delay:.5s}
.mn3{background:rgba(45,164,94,.15);color:var(--mm-green);border:1px solid rgba(45,164,94,.3);top:90px;left:20px;animation-delay:1s}
.mn4{background:rgba(155,45,228,.15);color:#9b2de4;border:1px solid rgba(155,45,228,.3);top:140px;left:120px;animation-delay:1.5s}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* APP */
.mm-app-section{padding:24px 0 60px;background:var(--mm-bg)}
.mm-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 0;flex-wrap:wrap}
.mm-toolbar-left,.mm-toolbar-right{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.mm-tool-btn{padding:6px 12px;border-radius:var(--mm-radius);font-size:.78rem;font-weight:600;color:var(--mm-text-muted);background:var(--mm-surface);border:1px solid var(--mm-border);transition:all var(--mm-t);white-space:nowrap;font-family:var(--mm-font-mono)}
.mm-tool-btn:hover:not(:disabled){color:var(--mm-text);background:#21262d;border-color:#6e7681}
.mm-tool-btn:disabled{opacity:.35;cursor:not-allowed}
.mm-danger:hover:not(:disabled){background:#3d1f1f!important;color:#f85149!important;border-color:#f85149!important}
.mm-accent-btn{background:rgba(45,107,228,.2)!important;color:var(--mm-accent)!important;border-color:rgba(45,107,228,.4)!important}
.mm-accent-btn:hover{background:var(--mm-accent)!important;color:#fff!important}
.mm-tool-sep{width:1px;height:20px;background:var(--mm-border)}
.mm-color-label{display:flex;align-items:center;gap:6px;font-size:.78rem;color:var(--mm-text-muted);font-family:var(--mm-font-mono);cursor:pointer}
.mm-color-label input{width:28px;height:26px;border:1px solid var(--mm-border);border-radius:4px;padding:2px;cursor:pointer;background:var(--mm-surface)}

/* Canvas */
.mm-canvas-wrap{position:relative;border:1px solid var(--mm-border);border-radius:var(--mm-radius-lg);overflow:hidden;background:var(--mm-canvas-bg);box-shadow:var(--mm-shadow)}
#mmCanvas{display:block;width:100%;height:520px;cursor:crosshair;touch-action:none}
.mm-node-editor{position:absolute;z-index:10;display:flex;gap:4px;align-items:center}
.mm-node-editor input{padding:6px 10px;border-radius:var(--mm-radius);border:1px solid var(--mm-accent);background:#1a2030;color:var(--mm-text);font-size:.85rem;outline:none;min-width:160px;font-family:var(--mm-font-mono)}
.mm-node-save{padding:6px 12px;background:var(--mm-accent);color:#fff;border-radius:var(--mm-radius);font-size:.85rem;font-weight:700;transition:background var(--mm-t)}
.mm-node-save:hover{background:#1a55d4}
.mm-hint{padding:8px 12px;font-size:.72rem;color:var(--mm-text-muted);font-family:var(--mm-font-mono);text-align:center;margin-top:8px}

/* SECTION COMMONS */
.mm-section{padding:80px 0;background:var(--mm-surface);border-top:1px solid var(--mm-border)}
.mm-section:nth-child(odd){background:var(--mm-bg)}
.mm-tag{font-family:var(--mm-font-mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--mm-accent);margin-bottom:12px}
.mm-section-title{font-family:var(--mm-font-display);font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:var(--mm-text);line-height:1.2;margin-bottom:48px}
.mm-section-title em{color:var(--mm-accent);font-style:italic}

/* HOW TO */
.mm-how{background:var(--mm-surface)!important}
.mm-how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.mm-how-card{background:var(--mm-bg);border:1px solid var(--mm-border);border-radius:var(--mm-radius-lg);padding:26px;transition:all var(--mm-t)}
.mm-how-card:hover{border-color:rgba(45,107,228,.5);box-shadow:0 0 20px rgba(45,107,228,.1)}
.mm-step-num{font-family:var(--mm-font-display);font-size:2.2rem;font-weight:800;color:rgba(45,107,228,.25);margin-bottom:12px;line-height:1}
.mm-how-card h3{font-family:var(--mm-font-display);font-size:1rem;font-weight:700;color:var(--mm-text);margin-bottom:8px}
.mm-how-card p{font-size:.85rem;color:var(--mm-text-muted);line-height:1.65}

/* DESC */
.mm-desc{background:var(--mm-bg)!important}
.mm-desc-inner{display:grid;grid-template-columns:.8fr 1.2fr;gap:64px;align-items:center}
.mm-desc-text p{font-size:.975rem;color:var(--mm-text-muted);line-height:1.8;margin-bottom:16px}
.mm-use-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.mm-use-tags span{padding:5px 12px;background:rgba(45,107,228,.1);color:var(--mm-accent);border:1px solid rgba(45,107,228,.3);border-radius:100px;font-size:.78rem;font-weight:600}
.mm-desc-card{background:var(--mm-surface);border:1px solid var(--mm-border);border-radius:var(--mm-radius-lg);padding:32px;box-shadow:var(--mm-shadow)}
.mm-mock-map{display:flex;flex-direction:column;align-items:center;gap:20px}
.mm-mock-root{padding:12px 24px;background:rgba(45,107,228,.2);border:2px solid var(--mm-accent);border-radius:8px;font-weight:700;font-family:var(--mm-font-mono);font-size:.9rem;color:var(--mm-text)}
.mm-mock-branches{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.mm-mock-branch{padding:8px 16px;background:color-mix(in srgb,var(--bc) 15%,transparent);border:1px solid color-mix(in srgb,var(--bc) 50%,transparent);border-radius:6px;font-size:.8rem;font-family:var(--mm-font-mono);color:var(--mm-text);font-weight:600}

/* FAQ */
.mm-faq{background:var(--mm-surface)!important}
.mm-faq-list{max-width:700px;display:flex;flex-direction:column;gap:2px}
.mm-faq-item{border:1px solid var(--mm-border);border-radius:var(--mm-radius);background:var(--mm-bg);overflow:hidden}
.mm-faq-q{width:100%;text-align:left;padding:16px 20px;font-size:.93rem;font-weight:600;color:var(--mm-text);display:flex;justify-content:space-between;align-items:center;gap:12px;transition:background var(--mm-t)}
.mm-faq-q::after{content:'+';font-size:1.2rem;font-weight:300;color:var(--mm-text-muted);transition:transform var(--mm-t)}
.mm-faq-q[aria-expanded="true"]::after{transform:rotate(45deg);color:var(--mm-accent)}
.mm-faq-q:hover{background:var(--mm-surface)}
.mm-faq-a{display:none;padding:0 20px 16px}
.mm-faq-a p{font-size:.875rem;color:var(--mm-text-muted);line-height:1.7}

/* TOAST */
.mm-toast{position:fixed;bottom:24px;right:24px;background:var(--mm-surface);color:var(--mm-text);padding:11px 18px;border-radius:var(--mm-radius);font-size:.85rem;font-weight:500;border:1px solid var(--mm-border);box-shadow:var(--mm-shadow);transform:translateY(60px);opacity:0;transition:all .3s;z-index:9999;pointer-events:none}
.mm-toast.show{transform:translateY(0);opacity:1}

/* FOOTER OVERRIDE */
.site-footer{background:#040608!important}

@media(max-width:900px){.mm-how-grid{grid-template-columns:repeat(2,1fr)}.mm-desc-inner{grid-template-columns:1fr;gap:36px}.mm-desc-visual{order:-1}}
@media(max-width:600px){.mm-how-grid{grid-template-columns:1fr}.mm-toolbar{gap:6px}.mm-toolbar-left,.mm-toolbar-right{width:100%}#mmCanvas{height:380px}}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-thumb{background:var(--mm-border);border-radius:3px}
