/* WebNotePad — Mind Map Engine (mindmap.js) */
(function() {
  'use strict';

  const SK = 'webnotepad_mindmap';
  const COLORS = ['#c4562a', '#2d6a4f', '#2d6be4', '#9b2de4', '#e4b82d', '#2db8e4', '#e42d6b', '#5de42d'];

  let nodes = [];
  let selectedId = null;
  let dragging = null;
  let dragOffset = { x: 0, y: 0 };
  let history = [];
  let editingId = null;

  let canvas, ctx, wrap, nodeEditor, nodeInput;
  let dpr = window.devicePixelRatio || 1;
  let isTouching = false;
  let touchTimer = null;
  let lastTap = 0;
  let tapTimeout = null;

  // Default mind map
  const DEFAULT_MAP = [
    { id: 'root', text: 'My Mind Map', x: 0, y: 0, color: '#c4562a', parent: null, collapsed: false },
    { id: 'n1', text: 'Idea 1', x: 180, y: -100, color: '#2d6be4', parent: 'root', collapsed: false },
    { id: 'n2', text: 'Idea 2', x: 180, y: 0, color: '#2d6a4f', parent: 'root', collapsed: false },
    { id: 'n3', text: 'Idea 3', x: 180, y: 100, color: '#9b2de4', parent: 'root', collapsed: false },
    { id: 'n1a', text: 'Sub idea', x: 380, y: -130, color: '#e4b82d', parent: 'n1', collapsed: false },
    { id: 'n1b', text: 'Sub idea 2', x: 380, y: -70, color: '#e4b82d', parent: 'n1', collapsed: false },
  ];

  function loadMap() {
    try {
      const raw = localStorage.getItem(SK);
      if (raw) nodes = JSON.parse(raw);
      else resetToDefault();
    } catch (e) { resetToDefault(); }
  }

  function saveMap() {
    localStorage.setItem(SK, JSON.stringify(nodes));
  }

  function resetToDefault() {
    nodes = DEFAULT_MAP.map(n => ({ ...n }));
    centerNodes();
  }

  function centerNodes() {
    if (!canvas) return;
    const cx = canvas.width / (2 * dpr),
      cy = canvas.height / (2 * dpr);
    const root = nodes.find(n => !n.parent);
    if (!root) return;
    const dx = cx - root.x,
      dy = cy - root.y;
    nodes.forEach(n => { n.x += dx;
      n.y += dy; });
  }

  function pushHistory() {
    history.push(JSON.stringify(nodes));
    if (history.length > 50) history.shift();
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

  // ===================== CANVAS SETUP =====================
  function initCanvas() {
    canvas = document.getElementById('mmCanvas');
    wrap = document.getElementById('mmCanvasWrap');
    ctx = canvas.getContext('2d');
    nodeEditor = document.getElementById('mmNodeEditor');
    nodeInput = document.getElementById('mmNodeInput');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas || !wrap) return;
    dpr = window.devicePixelRatio || 1;
    const rect = wrap.getBoundingClientRect();
    const w = rect.width;
    const h = parseInt(getComputedStyle(canvas).height) || 520;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    draw();
  }

  // ===================== DRAWING =====================
  function draw() {
    if (!ctx || !canvas) return;
    const W = canvas.width / dpr,
      H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);

    // Background grid
    const isDark = document.body.classList.contains('dark');
    ctx.strokeStyle = isDark ? 'rgba(42,42,52,0.4)' : 'rgba(232,226,214,0.4)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 40) { ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke(); }

    const visible = getVisible();

    // Draw connections
    visible.forEach(node => {
      if (!node.parent) return;
      const parent = nodes.find(n => n.id === node.parent);
      if (!parent) return;
      if (isCollapsed(parent)) return;
      drawEdge(parent, node);
    });

    // Draw nodes
    visible.forEach(node => { drawNode(node); });
  }

  function getVisible() {
    return nodes.filter(n => {
      if (!n.parent) return true;
      const parent = nodes.find(p => p.id === n.parent);
      return parent && !parent.collapsed;
    });
  }

  function isCollapsed(node) { return node.collapsed; }

  function drawEdge(from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    const mx = (from.x + to.x) / 2;
    ctx.bezierCurveTo(mx, from.y, mx, to.y, to.x, to.y);
    ctx.strokeStyle = to.color + '66';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function getNodeDims(node) {
    ctx.font = `600 13px "Outfit", sans-serif`;
    const textW = ctx.measureText(node.text).width;
    const pw = Math.max(textW + 28, 80);
    const ph = 34;
    return { w: pw, h: ph };
  }

  function drawNode(node) {
    const { w, h } = getNodeDims(node);
    const x = node.x - w / 2,
      y = node.y - h / 2;

    // Shadow
    ctx.shadowColor = node.color + '44';
    ctx.shadowBlur = node.id === selectedId ? 18 : 6;

    // Fill
    const isRoot = !node.parent;
    const alpha = node.id === selectedId ? '30' : '18';
    ctx.fillStyle = node.color + alpha;
    roundRect(x, y, w, h, isRoot ? 10 : 7);
    ctx.fill();

    // Border
    ctx.strokeStyle = node.id === selectedId ? node.color : node.color + '88';
    ctx.lineWidth = node.id === selectedId ? 2.5 : 1.5;
    roundRect(x, y, w, h, isRoot ? 10 : 7);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Text
    const isDark = document.body.classList.contains('dark');
    ctx.font = isRoot ? `700 13px "Outfit", sans-serif` : `500 12px "Outfit", sans-serif`;
    ctx.fillStyle = isDark ? '#e8e4dc' : '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(truncate(node.text, 20), node.x, node.y);

    // Collapse indicator
    const children = nodes.filter(n => n.parent === node.id);
    if (children.length) {
      const ind = node.collapsed ? '▶' : '▼';
      ctx.font = '9px sans-serif';
      ctx.fillStyle = node.color + 'bb';
      ctx.fillText(ind, node.x + w / 2 - 10, node.y - h / 2 + 8);
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }

  // ===================== HIT TEST =====================
  function hitTest(px, py) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const { w, h } = getNodeDims(n);
      if (px >= n.x - w / 2 && px <= n.x + w / 2 && py >= n.y - h / 2 && py <= n.y + h / 2) return n;
    }
    return null;
  }

  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches && e.touches[0];
    const cx = touch ? touch.clientX : e.clientX;
    const cy = touch ? touch.clientY : e.clientY;
    return { x: cx - rect.left, y: cy - rect.top };
  }

  function clampToCanvas(x, y, padding = 60) {
    if (!canvas) return { x, y };
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    return {
      x: Math.max(padding, Math.min(W - padding, x)),
      y: Math.max(padding, Math.min(H - padding, y))
    };
  }

  // ===================== EVENTS =====================
  function initEvents() {
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('dblclick', onDblClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    nodeInput && nodeInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') commitEdit();
      if (e.key === 'Escape') cancelEdit();
    });
    document.getElementById('mmNodeSaveBtn') && document.getElementById('mmNodeSaveBtn').addEventListener('click', commitEdit);

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault();
        undo(); }
      if (e.key === 'Delete' && selectedId) deleteNode(selectedId);
      if (e.key === 'Escape') cancelEdit();
    });
  }

  // Mouse events
  function onDown(e) {
    if (e.cancelable) e.preventDefault();
    const pos = getCanvasPos(e);
    const hit = hitTest(pos.x, pos.y);
    if (hit) {
      dragging = hit;
      dragOffset = { x: pos.x - hit.x, y: pos.y - hit.y };
      selectNode(hit.id);
    } else {
      selectNode(null);
    }
  }

  function onMove(e) {
    if (e.cancelable) e.preventDefault();
    if (!dragging) return;
    const pos = getCanvasPos(e);
    dragging.x = pos.x - dragOffset.x;
    dragging.y = pos.y - dragOffset.y;
    draw();
  }

  function onUp(e) {
    if (dragging) { pushHistory();
      saveMap(); }
    dragging = null;
  }

  function onDblClick(e) {
    const pos = getCanvasPos(e);
    const hit = hitTest(pos.x, pos.y);
    if (hit) {
      startEdit(hit, pos);
    } else {
      if (nodes.length === 0) {
        pushHistory();
        const cx = canvas.width / (2 * dpr);
        const cy = canvas.height / (2 * dpr);
        const n = {
          id: 'root',
          text: 'Central Idea',
          x: cx,
          y: cy,
          color: '#c4562a',
          parent: null,
          collapsed: false
        };
        nodes.push(n);
        saveMap();
        draw();
        startEdit(n, pos);
      } else {
        toast('Double-click a node to add a child, or click the + Add Child button');
      }
    }
  }

  // Touch events with better mobile support
  function onTouchStart(e) {
    isTouching = true;
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => {
      // Long press handling if needed
    }, 300);

    const pos = getCanvasPos(e);
    const hit = hitTest(pos.x, pos.y);
    if (hit) {
      dragging = hit;
      dragOffset = { x: pos.x - hit.x, y: pos.y - hit.y };
      selectNode(hit.id);
    } else {
      selectNode(null);
    }
  }

  function onTouchMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    dragging.x = pos.x - dragOffset.x;
    dragging.y = pos.y - dragOffset.y;
    draw();
  }

  function onTouchEnd(e) {
    isTouching = false;
    clearTimeout(touchTimer);

    // Detect if this was a tap or drag
    if (dragging) {
      pushHistory();
      saveMap();
      dragging = null;
      return;
    }

    // Handle tap/double-tap
    const now = Date.now();
    const timeSince = now - lastTap;
    lastTap = now;

    if (timeSince < 300 && timeSince > 0) {
      // Double tap detected
      e.preventDefault();
      const pos = getCanvasPos(e);
      const hit = hitTest(pos.x, pos.y);

      if (hit) {
        startEdit(hit, pos);
      } else if (nodes.length === 0) {
        pushHistory();
        const cx = canvas.width / (2 * dpr);
        const cy = canvas.height / (2 * dpr);
        const n = {
          id: 'root',
          text: 'Central Idea',
          x: cx,
          y: cy,
          color: '#c4562a',
          parent: null,
          collapsed: false
        };
        nodes.push(n);
        saveMap();
        draw();
        startEdit(n, pos);
      }

      // Cancel the single tap
      if (tapTimeout) {
        clearTimeout(tapTimeout);
        tapTimeout = null;
      }
    } else {
      // Single tap - select node or deselect
      tapTimeout = setTimeout(() => {
        const pos = getCanvasPos(e);
        const hit = hitTest(pos.x, pos.y);
        if (hit) {
          selectNode(hit.id);
        } else {
          selectNode(null);
        }
        tapTimeout = null;
      }, 200);
    }
  }

  function selectNode(id) {
    selectedId = id;
    updateToolbar();
    draw();
  }

  function startEdit(node, pos) {
    if (!nodeEditor || !nodeInput) return;
    editingId = node.id;
    nodeInput.value = node.text;
    const rect = wrap.getBoundingClientRect();
    const { w, h } = getNodeDims(node);

    // Position editor above the node, ensuring it stays in view
    let left = node.x - w / 2;
    let top = node.y - h / 2 - 44;

    // Clamp to canvas bounds
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;
    left = Math.max(4, Math.min(left, canvasWidth - 160));
    top = Math.max(4, Math.min(top, canvasHeight - 60));

    nodeEditor.style.display = 'flex';
    nodeEditor.style.left = left + 'px';
    nodeEditor.style.top = top + 'px';
    nodeInput.focus();
    nodeInput.select();
  }

  function commitEdit() {
    if (!editingId) return;
    const n = nodes.find(x => x.id === editingId);
    if (n && nodeInput) {
      pushHistory();
      n.text = nodeInput.value.trim() || n.text;
      saveMap();
      draw();
    }
    cancelEdit();
  }

  function cancelEdit() {
    editingId = null;
    if (nodeEditor) nodeEditor.style.display = 'none';
    if (nodeInput) nodeInput.value = '';
  }

  // ===================== TOOLBAR ACTIONS =====================
  function addChild() {
    if (!selectedId) return;
    pushHistory();
    const parent = nodes.find(n => n.id === selectedId);
    if (!parent) return;
    
    const mobile = isMobile();
    const dist = mobile ? 100 : 180;
    
    // Find existing children to distribute them better
    const children = nodes.filter(n => n.parent === selectedId);
    const angleStep = (Math.PI * 2) / Math.max(children.length + 1, 1);
    const angle = children.length * angleStep + Math.random() * 0.3;
    
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    let child = {
      id: 'n_' + Date.now(),
      text: 'New idea',
      x: parent.x + Math.cos(angle) * dist,
      y: parent.y + Math.sin(angle) * dist,
      color: color,
      parent: parent.id,
      collapsed: false
    };
    
    // Clamp position to canvas bounds
    const clamped = clampToCanvas(child.x, child.y, mobile ? 40 : 60);
    child.x = clamped.x;
    child.y = clamped.y;
    
    nodes.push(child);
    saveMap();
    draw();
    selectNode(child.id);
    toast('＋ Child node added');
  }

  function addSibling() {
    if (!selectedId) return;
    const node = nodes.find(n => n.id === selectedId);
    if (!node || !node.parent) return;
    pushHistory();
    const parent = nodes.find(n => n.id === node.parent);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    const mobile = isMobile();
    const dist = mobile ? 120 : 180;
    
    // Get siblings to spread them out
    const siblings = nodes.filter(n => n.parent === node.parent);
    const index = siblings.indexOf(node);
    const totalSiblings = siblings.length;
    const angleStep = (Math.PI * 1.2) / Math.max(totalSiblings, 1);
    const startAngle = -Math.PI * 0.6;
    const angle = startAngle + (index + 0.5) * angleStep;
    
    let sibling = {
      id: 'n_' + Date.now(),
      text: 'New idea',
      x: parent.x + Math.cos(angle) * dist,
      y: parent.y + Math.sin(angle) * dist,
      color: color,
      parent: node.parent,
      collapsed: false
    };
    
    // Clamp position to canvas bounds
    const clamped = clampToCanvas(sibling.x, sibling.y, mobile ? 40 : 60);
    sibling.x = clamped.x;
    sibling.y = clamped.y;
    
    nodes.push(sibling);
    saveMap();
    draw();
    selectNode(sibling.id);
    toast('⊕ Sibling node added');
  }

  function deleteNode(id) {
    if (!id) return;
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    if (!node.parent) { toast('❌ Cannot delete root node.'); return; }
    pushHistory();
    const toDelete = [id];
    // Recursively find all children
    function collectChildren(nid) {
      nodes.filter(n => n.parent === nid).forEach(n => { toDelete.push(n.id);
        collectChildren(n.id); });
    }
    collectChildren(id);
    nodes = nodes.filter(n => !toDelete.includes(n.id));
    selectedId = null;
    saveMap();
    draw();
    updateToolbar();
    toast('🗑 Node deleted.');
  }

  function collapseToggle() {
    if (!selectedId) return;
    const n = nodes.find(x => x.id === selectedId);
    if (!n) return;
    pushHistory();
    n.collapsed = !n.collapsed;
    const btn = document.getElementById('mmCollapseBtn');
    if (btn) btn.textContent = n.collapsed ? '⊞ Expand' : '⊟ Collapse';
    saveMap();
    draw();
  }

  function setNodeColor(color) {
    if (!selectedId) return;
    pushHistory();
    const n = nodes.find(x => x.id === selectedId);
    if (n) { n.color = color;
      saveMap();
      draw(); }
  }

  function undo() {
    if (!history.length) { toast('Nothing to undo.'); return; }
    nodes = JSON.parse(history.pop());
    saveMap();
    draw();
    updateToolbar();
    toast('↩ Undone');
  }

  function resetMap() {
    if (!confirm('Reset mind map to default? All changes will be lost.')) return;
    pushHistory();
    resetToDefault();
    saveMap();
    draw();
    selectNode(null);
    toast('⟳ Map reset');
  }

  function updateToolbar() {
    const hasSel = !!selectedId;
    const node = selectedId ? nodes.find(n => n.id === selectedId) : null;
    const hasParent = node && !!node.parent;
    ['mmAddChildBtn', 'mmCollapseBtn', 'mmDeleteNodeBtn', 'mmAddSiblingBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = !hasSel;
    });
    const delBtn = document.getElementById('mmDeleteNodeBtn');
    if (delBtn) delBtn.disabled = !hasParent;
    const sib = document.getElementById('mmAddSiblingBtn');
    if (sib) sib.disabled = !hasParent;
    const col = document.getElementById('mmCollapseBtn');
    if (col && node) col.textContent = node.collapsed ? '⊞ Expand' : '⊟ Collapse';
    const colorInput = document.getElementById('mmNodeColor');
    if (colorInput && node) colorInput.value = node.color;
  }

  // ===================== EXPORT =====================
  function exportPng() {
    // Redraw on a clean background for export
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    const isDark = document.body.classList.contains('dark');
    offCtx.fillStyle = isDark ? '#141418' : '#faf8f4';
    offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);
    // Transfer current canvas
    offCtx.drawImage(canvas, 0, 0);
    const url = offCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast('📷 PNG exported!');
  }

  function exportJson() {
    const json = JSON.stringify(nodes, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('⬇ JSON exported!');
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) throw new Error('Invalid format');
        pushHistory();
        nodes = imported;
        saveMap();
        draw();
        selectNode(null);
        toast('⬆ Map imported!');
      } catch (err) { toast('❌ Invalid JSON file.'); }
    };
    reader.readAsText(file);
  }

  // ===================== FAQ =====================
  function initFAQ() {
    document.querySelectorAll('.mm-faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.nextElementSibling;
        const open = a.style.display === 'block';
        document.querySelectorAll('.mm-faq-a').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.mm-faq-q').forEach(x => x.setAttribute('aria-expanded', 'false'));
        if (!open) { a.style.display = 'block';
          btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  function initScrollAnim() {
    const els = document.querySelectorAll('.mm-how-card,.mm-faq-item');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity .5s ${i * 0.06}s ease,transform .5s ${i * 0.06}s ease`;
      obs.observe(el);
    });
  }

  function toast(msg, d = 2500) {
    const t = document.getElementById('mmToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), d);
  }

  // ===================== DARK MODE SYNC =====================
  function syncDarkMode() {
    const isDark = document.body.classList.contains('dark');
    // Update canvas background
    if (ctx && canvas) {
      draw();
    }
  }

  // Watch for dark mode changes
  function initDarkModeObserver() {
    const observer = new MutationObserver(() => {
      syncDarkMode();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  // ===================== INIT =====================
  function init() {
    // Sync with main site dark mode
    initDarkModeObserver();

    initCanvas();
    loadMap();
    draw();
    initEvents();
    initFAQ();
    initScrollAnim();

    document.getElementById('mmAddChildBtn') && document.getElementById('mmAddChildBtn').addEventListener('click', addChild);
    document.getElementById('mmAddSiblingBtn') && document.getElementById('mmAddSiblingBtn').addEventListener('click', addSibling);
    document.getElementById('mmDeleteNodeBtn') && document.getElementById('mmDeleteNodeBtn').addEventListener('click', () => deleteNode(selectedId));
    document.getElementById('mmCollapseBtn') && document.getElementById('mmCollapseBtn').addEventListener('click', collapseToggle);
    document.getElementById('mmUndoBtn') && document.getElementById('mmUndoBtn').addEventListener('click', undo);
    document.getElementById('mmResetBtn') && document.getElementById('mmResetBtn').addEventListener('click', resetMap);
    document.getElementById('mmExportPngBtn') && document.getElementById('mmExportPngBtn').addEventListener('click', exportPng);
    document.getElementById('mmExportJsonBtn') && document.getElementById('mmExportJsonBtn').addEventListener('click', exportJson);
    document.getElementById('mmImportJsonBtn') && document.getElementById('mmImportJsonBtn').addEventListener('click', () => document.getElementById('mmImportFile').click());
    document.getElementById('mmImportFile') && document.getElementById('mmImportFile').addEventListener('change', e => { if (e.target.files[0]) importJson(e.target.files[0]); });
    document.getElementById('mmNodeColor') && document.getElementById('mmNodeColor').addEventListener('input', e => setNodeColor(e.target.value));

    // Fix for mobile viewport height
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        setTimeout(resize, 100);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
