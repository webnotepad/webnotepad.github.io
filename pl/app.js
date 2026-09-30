/**
 * WebNotePad — app.js (Polski)
 * Pełna logika aplikacji notatnika
 */
(function () {
  'use strict';

  /* ============================================================
     STATE
  ============================================================ */
  const STORAGE_KEY = 'webnotepad_notes';
  const ACTIVE_KEY  = 'webnotepad_active';

  let notes = [];
  let activeId = null;
  let autoSaveTimer = null;
  let isSaving = false;

  /* ============================================================
     DOM REFS
  ============================================================ */
  const dom = {};

  function bindDOM() {
    dom.noteList      = document.getElementById('noteList');
    dom.noteSearch    = document.getElementById('noteSearch');
    dom.newNoteBtn    = document.getElementById('newNoteBtn');
    dom.noteTitleInput = document.getElementById('noteTitleInput');
    dom.editorArea    = document.getElementById('editorArea');
    dom.wordCount     = document.getElementById('wordCount');
    dom.charCount     = document.getElementById('charCount');
    dom.lineCount     = document.getElementById('lineCount');
    dom.readTime      = document.getElementById('readTime');
    dom.autoSaveStatus = document.getElementById('autoSaveStatus');
    dom.exportTxtBtn  = document.getElementById('exportTxtBtn');
    dom.exportHtmlBtn = document.getElementById('exportHtmlBtn');
    dom.copyAllBtn    = document.getElementById('copyAllBtn');
    dom.clearBtn      = document.getElementById('clearBtn');
    dom.fullscreenBtn = document.getElementById('fullscreenBtn');
    dom.darkModeBtn   = document.getElementById('darkModeBtn');
    dom.fontSizeSelect = document.getElementById('fontSizeSelect');
    dom.textColorPicker = document.getElementById('textColorPicker');
    dom.findReplaceToggle = document.getElementById('findReplaceToggle');
    dom.findReplaceBar = document.getElementById('findReplaceBar');
    dom.findInput     = document.getElementById('findInput');
    dom.replaceInput  = document.getElementById('replaceInput');
    dom.doReplaceBtn  = document.getElementById('doReplaceBtn');
    dom.doReplaceAllBtn = document.getElementById('doReplaceAllBtn');
    dom.closeFindReplace = document.getElementById('closeFindReplace');
    dom.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    dom.appSidebar    = document.getElementById('appSidebar');
    dom.mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
    dom.faqList       = document.getElementById('faqList');
    dom.toast         = document.getElementById('toast');
  }

  /* ============================================================
     NOTE STORAGE
  ============================================================ */
  function loadNotes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      notes = raw ? JSON.parse(raw) : [];
    } catch (e) {
      notes = [];
    }
    if (!notes.length) {
      notes = [createNote('Notatka Powitalna', '<p>Witaj w <strong>WebNotePad</strong>! 🎉</p><p>Zacznij tutaj pisać swoje notatki. Twoje notatki są zapisywane automatycznie.</p><p>Użyj paska narzędzi powyżej, aby <u>sformatować</u> tekst, utworzyć <em>listy</em> i więcej.</p><ul><li>Twórz wiele notatek przyciskiem ＋</li><li>Szukaj notatek na pasku bocznym</li><li>Eksportuj jako TXT lub HTML</li><li>Przełącz tryb ciemny za pomocą 🌙</li></ul>')];
      saveNotes();
    }
    activeId = localStorage.getItem(ACTIVE_KEY) || notes[0].id;
    if (!notes.find(n => n.id === activeId)) activeId = notes[0].id;
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      localStorage.setItem(ACTIVE_KEY, activeId);
    } catch (e) {
      showToast('⚠ Pamięć pełna. Wyeksportuj i usuń kilka notatek.', 4000);
    }
  }

  function createNote(title = 'Notatka bez tytułu', content = '') {
    return {
      id: 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      title: title || 'Notatka bez tytułu',
      content: content || '',
      created: Date.now(),
      updated: Date.now()
    };
  }

  function getActiveNote() {
    return notes.find(n => n.id === activeId) || null;
  }

  /* ============================================================
     RENDER NOTE LIST
  ============================================================ */
  function renderNoteList(filter = '') {
    if (!dom.noteList) return;
    const q = filter.toLowerCase().trim();
    const filtered = q
      ? notes.filter(n => n.title.toLowerCase().includes(q) || n.content.replace(/<[^>]+>/g, '').toLowerCase().includes(q))
      : notes;

    dom.noteList.innerHTML = '';
    if (!filtered.length) {
      dom.noteList.innerHTML = '<li style="padding:12px 10px;font-size:0.8rem;color:var(--ink-muted);font-style:italic;">Nie znaleziono notatek.</li>';
      return;
    }
    filtered.forEach(note => {
      const li = document.createElement('li');
      li.className = 'note-list-item' + (note.id === activeId ? ' active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', note.id === activeId ? 'true' : 'false');
      li.dataset.id = note.id;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'note-item-title';
      titleSpan.textContent = note.title || 'Notatka bez tytułu';

      const delBtn = document.createElement('button');
      delBtn.className = 'note-delete-btn';
      delBtn.innerHTML = '✕';
      delBtn.title = 'Usuń notatkę';
      delBtn.setAttribute('aria-label', 'Usuń notatkę: ' + note.title);
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteNote(note.id);
      });

      li.appendChild(titleSpan);
      li.appendChild(delBtn);
      li.addEventListener('click', () => switchNote(note.id));
      dom.noteList.appendChild(li);
    });
  }

  /* ============================================================
     SWITCH / SAVE / DELETE NOTES
  ============================================================ */
  function switchNote(id) {
    persistCurrentNote();
    activeId = id;
    localStorage.setItem(ACTIVE_KEY, activeId);
    loadActiveNote();
    renderNoteList(dom.noteSearch ? dom.noteSearch.value : '');
    if (dom.appSidebar) dom.appSidebar.classList.remove('mobile-open');
  }

  function loadActiveNote() {
    const note = getActiveNote();
    if (!note) return;
    if (dom.noteTitleInput) dom.noteTitleInput.value = note.title;
    if (dom.editorArea) dom.editorArea.innerHTML = note.content;
    updateStats();
  }

  function persistCurrentNote() {
    const note = getActiveNote();
    if (!note) return;
    if (dom.noteTitleInput) note.title = dom.noteTitleInput.value || 'Notatka bez tytułu';
    if (dom.editorArea) note.content = dom.editorArea.innerHTML;
    note.updated = Date.now();
  }

  function newNote() {
    persistCurrentNote();
    const note = createNote();
    notes.unshift(note);
    activeId = note.id;
    saveNotes();
    renderNoteList();
    loadActiveNote();
    if (dom.noteTitleInput) {
      dom.noteTitleInput.value = '';
      dom.noteTitleInput.focus();
    }
    showToast('✦ Utworzono nową notatkę');
  }

  function deleteNote(id) {
    if (notes.length <= 1) { showToast('❌ Nie można usunąć ostatniej notatki.'); return; }
    if (!confirm('Usunąć tę notatkę? Tej operacji nie można cofnąć.')) return;
    notes = notes.filter(n => n.id !== id);
    if (activeId === id) activeId = notes[0].id;
    saveNotes();
    renderNoteList(dom.noteSearch ? dom.noteSearch.value : '');
    loadActiveNote();
    showToast('🗑 Notatka usunięta.');
  }

  /* ============================================================
     AUTO SAVE
  ============================================================ */
  function triggerAutoSave() {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    setAutoSaveStatus('saving');
    autoSaveTimer = setTimeout(() => {
      persistCurrentNote();
      saveNotes();
      renderNoteList(dom.noteSearch ? dom.noteSearch.value : '');
      setAutoSaveStatus('saved');
    }, 900);
  }

  function setAutoSaveStatus(state) {
    if (!dom.autoSaveStatus) return;
    if (state === 'saving') {
      dom.autoSaveStatus.textContent = '◌ Zapisywanie…';
      dom.autoSaveStatus.className = 'status-saving';
    } else {
      dom.autoSaveStatus.textContent = '● Zapisano';
      dom.autoSaveStatus.className = 'status-save';
    }
  }

  /* ============================================================
     STATS
  ============================================================ */
  function updateStats() {
    if (!dom.editorArea) return;
    const text = dom.editorArea.innerText || '';
    const html = dom.editorArea.innerHTML || '';

    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const lines = html.split(/<br\s*\/?>|<\/p>|<\/li>|<\/div>/i).filter(l => l.trim().replace(/<[^>]+>/g, '').trim()).length || (text.split('\n').length);
    const readMins = Math.max(1, Math.ceil(words / 200));

    if (dom.wordCount) dom.wordCount.textContent = words + (words === 1 ? ' słowo' : ' słów');
    if (dom.charCount) dom.charCount.textContent = chars + ' znaków';
    if (dom.lineCount) dom.lineCount.textContent = lines + (lines === 1 ? ' wiersz' : ' wierszy');
    if (dom.readTime) dom.readTime.textContent = readMins + ' min czytania';
  }

  /* ============================================================
     FORMATTING TOOLBAR
  ============================================================ */
  function bindFormatToolbar() {
    document.querySelectorAll('.fmt-btn[data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.editorArea.focus();
        document.execCommand(btn.dataset.cmd, false, null);
        triggerAutoSave();
      });
    });

    if (dom.fontSizeSelect) {
      dom.fontSizeSelect.addEventListener('change', () => {
        dom.editorArea.focus();
        document.execCommand('fontSize', false, dom.fontSizeSelect.value);
        triggerAutoSave();
      });
    }

    if (dom.textColorPicker) {
      dom.textColorPicker.addEventListener('input', () => {
        dom.editorArea.focus();
        document.execCommand('foreColor', false, dom.textColorPicker.value);
        triggerAutoSave();
      });
    }
  }

  /* ============================================================
     FIND & REPLACE
  ============================================================ */
  function doFindReplace(replaceAll) {
    const find = dom.findInput ? dom.findInput.value : '';
    const replace = dom.replaceInput ? dom.replaceInput.value : '';
    if (!find) { showToast('Wprowadź szukaną frazę.'); return; }

    const content = dom.editorArea.innerHTML;
    const flags = replaceAll ? 'gi' : 'i';
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);

    if (!regex.test(content)) { showToast('⚠ Nie znaleziono tekstu.'); return; }

    const count = (content.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
    dom.editorArea.innerHTML = content.replace(regex, replace);
    triggerAutoSave();
    showToast(`✔ Zamieniono ${replaceAll ? count : 1} wystąpień.`);
  }

  /* ============================================================
     EXPORT
  ============================================================ */
  function exportTxt() {
    const note = getActiveNote();
    const text = dom.editorArea ? (dom.editorArea.innerText || '') : '';
    const title = note ? note.title : 'notatka';
    downloadFile(text, sanitizeFilename(title) + '.txt', 'text/plain;charset=utf-8');
    showToast('⬇ Wyeksportowano jako TXT');
  }

  function exportHtml() {
    const note = getActiveNote();
    const title = note ? note.title : 'notatka';
    const content = dom.editorArea ? dom.editorArea.innerHTML : '';
    const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8"/>
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 760px; margin: 40px auto; padding: 0 24px; line-height: 1.75; color: #1a1a2e; }
    h1 { font-size: 1.8rem; border-bottom: 2px solid #e8e2d6; padding-bottom: 12px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div>${content}</div>
  <footer style="margin-top:48px;padding-top:12px;border-top:1px solid #e8e2d6;font-size:0.8rem;color:#999;">Wyeksportowano z WebNotePad — webnotepad.github.io</footer>
</body>
</html>`;
    downloadFile(html, sanitizeFilename(title) + '.html', 'text/html;charset=utf-8');
    showToast('⬇ Wyeksportowano jako HTML');
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9\-_\s]/gi, '').trim().replace(/\s+/g, '-').toLowerCase() || 'notatka';
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ============================================================
     COPY
  ============================================================ */
  async function copyAll() {
    const text = dom.editorArea ? (dom.editorArea.innerText || '') : '';
    try {
      await navigator.clipboard.writeText(text);
      showToast('✔ Skopiowano do schowka!');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✔ Skopiowano do schowka!');
    }
  }

  /* ============================================================
     CLEAR
  ============================================================ */
  function clearNote() {
    if (!confirm('Wyczyścić całą zawartość tej notatki?')) return;
    if (dom.editorArea) dom.editorArea.innerHTML = '';
    triggerAutoSave();
    updateStats();
    showToast('✕ Notatka wyczyszczona.');
  }

  /* ============================================================
     FULLSCREEN
  ============================================================ */
  function toggleFullscreen() {
    const isFs = document.body.classList.toggle('fullscreen');
    if (dom.fullscreenBtn) dom.fullscreenBtn.textContent = isFs ? '⊠' : '⛶';
    if (dom.fullscreenBtn) dom.fullscreenBtn.title = isFs ? 'Wyjdź z pełnego ekranu' : 'Pełny ekran';
    if (isFs) showToast('⛶ Tryb pełnoekranowy — naciśnij Esc, aby wyjść');
    if (isFs) dom.editorArea && dom.editorArea.focus();
  }

  /* ============================================================
     DARK MODE (editor button)
  ============================================================ */
  function toggleDark() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    if (dom.darkModeBtn) dom.darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('webnotepad_dark', isDark ? '1' : '0');
    const headerDarkBtn = document.getElementById('headerDarkBtn');
    if (headerDarkBtn) {
      headerDarkBtn.textContent = isDark ? '☀️' : '🌙';
    }
  }

  /* ============================================================
     FAQ ACCORDION
  ============================================================ */
  function initFAQ() {
    if (!dom.faqList) return;
    dom.faqList.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-a');
        const isOpen = answer.style.display === 'block';
        dom.faqList.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
        dom.faqList.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded', 'false'));
        if (!isOpen) {
          answer.style.display = 'block';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ============================================================
     KEYBOARD SHORTCUTS
  ============================================================ */
  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (document.body.classList.contains('fullscreen')) toggleFullscreen();
        if (dom.findReplaceBar && dom.findReplaceBar.style.display !== 'none') {
          dom.findReplaceBar.style.display = 'none';
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        if (dom.editorArea && document.activeElement === dom.editorArea) {
          e.preventDefault();
          toggleFindReplace();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        persistCurrentNote();
        saveNotes();
        setAutoSaveStatus('saved');
        showToast('✔ Zapisano!');
      }
    });
  }

  function toggleFindReplace() {
    if (!dom.findReplaceBar) return;
    const isHidden = dom.findReplaceBar.style.display === 'none' || dom.findReplaceBar.style.display === '';
    dom.findReplaceBar.style.display = isHidden ? 'flex' : 'none';
    if (isHidden && dom.findInput) dom.findInput.focus();
  }

  /* ============================================================
     TOAST
  ============================================================ */
  function showToast(msg, duration = 2500) {
    if (!dom.toast) return;
    dom.toast.textContent = msg;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), duration);
  }

  /* ============================================================
     SCROLL ANIMATIONS
  ============================================================ */
  function initScrollAnimations() {
    const cards = document.querySelectorAll('.feature-card, .usecase-card, .how-step, .faq-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
      observer.observe(card);
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    bindDOM();
    loadNotes();
    renderNoteList();
    loadActiveNote();
    bindFormatToolbar();
    initFAQ();
    bindKeyboard();
    initScrollAnimations();

    if (localStorage.getItem('webnotepad_dark') === '1') {
      document.body.classList.add('dark');
      if (dom.darkModeBtn) dom.darkModeBtn.textContent = '☀️';
    }

    if (dom.editorArea) {
      dom.editorArea.addEventListener('input', () => {
        updateStats();
        triggerAutoSave();
      });
      dom.editorArea.addEventListener('keyup', updateStats);
    }
    if (dom.noteTitleInput) {
      dom.noteTitleInput.addEventListener('input', triggerAutoSave);
    }

    if (dom.newNoteBtn) dom.newNoteBtn.addEventListener('click', newNote);
    if (dom.exportTxtBtn) dom.exportTxtBtn.addEventListener('click', exportTxt);
    if (dom.exportHtmlBtn) dom.exportHtmlBtn.addEventListener('click', exportHtml);
    if (dom.copyAllBtn) dom.copyAllBtn.addEventListener('click', copyAll);
    if (dom.clearBtn) dom.clearBtn.addEventListener('click', clearNote);
    if (dom.fullscreenBtn) dom.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (dom.darkModeBtn) dom.darkModeBtn.addEventListener('click', toggleDark);

    if (dom.findReplaceToggle) dom.findReplaceToggle.addEventListener('click', toggleFindReplace);
    if (dom.doReplaceBtn) dom.doReplaceBtn.addEventListener('click', () => doFindReplace(false));
    if (dom.doReplaceAllBtn) dom.doReplaceAllBtn.addEventListener('click', () => doFindReplace(true));
    if (dom.closeFindReplace) dom.closeFindReplace.addEventListener('click', () => {
      if (dom.findReplaceBar) dom.findReplaceBar.style.display = 'none';
    });
    if (dom.findInput) dom.findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doFindReplace(false);
    });

    if (dom.noteSearch) {
      dom.noteSearch.addEventListener('input', () => renderNoteList(dom.noteSearch.value));
    }

    if (dom.toggleSidebarBtn) {
      dom.toggleSidebarBtn.addEventListener('click', () => {
        dom.appSidebar.classList.toggle('collapsed');
        dom.toggleSidebarBtn.textContent = dom.appSidebar.classList.contains('collapsed') ? '▶' : '◀';
      });
    }
    if (dom.mobileSidebarBtn) {
      dom.mobileSidebarBtn.addEventListener('click', () => {
        dom.appSidebar.classList.toggle('mobile-open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
