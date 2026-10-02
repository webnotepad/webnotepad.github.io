/* =============================================
   WebNotePad — Online Diary (Combined)
   Includes: diary.js + diary-pdf.js
   Updated: PDF modal with 300x250 ad + 5s countdown gate
          + Google Drive backup with instructional overlay
          + Import / Restore backup from .json file
   ============================================= */

// =============================================
// PART 1: diary.js (Main diary functionality)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "What made you smile today?",
  "Describe a challenge you faced recently and how you handled it.",
  "What are three things you are grateful for right now?",
  "If you could relive one moment from this week, what would it be?",
  "What emotion dominated your day and why?",
  "What do you wish you had done differently today?",
  "Describe something beautiful you noticed today.",
  "What goal are you working toward and how did you progress?",
  "Write about someone who influenced you recently.",
  "What are you most looking forward to this week?",
  "What lesson did today teach you?",
  "Describe your ideal day in detail.",
  "What fear is holding you back right now?",
  "Write about a memory that makes you feel warm.",
  "What would you tell your younger self today?",
  "What are you proud of accomplishing recently?",
  "How did you take care of yourself today?",
  "What book, song, or movie moved you lately and why?",
  "Describe a conversation that stuck with you.",
  "What does your perfect version of tomorrow look like?"
];

let entries = [];
let activeId = null;
let saveTimer = null;

function load(){
  try{ entries = JSON.parse(localStorage.getItem(SK)||'[]'); }catch(e){ entries=[]; }
  if(!entries.length){
    const first = makeEntry('My First Entry','😊','first diary entry');
    const area = '<p>Today I started using WebNotePad\'s online diary. I\'m going to use this space to track my thoughts, feelings, and daily experiences.</p><p>Writing in a diary feels like a fresh start. Here\'s to building a journaling habit! 🌱</p>';
    first.content = area;
    entries = [first];
    save();
  }
  activeId = entries[0].id;
}
function save(){ localStorage.setItem(SK, JSON.stringify(entries)); }

function makeEntry(title='', mood='', tags=''){
  return {
    id:'de_'+Date.now()+'_'+Math.random().toString(36).slice(2,5),
    title: title||'',
    date: today(),
    mood: mood||'',
    tags: tags||'',
    content:'',
    created: Date.now(),
    updated: Date.now()
  };
}

function today(){ return new Date().toISOString().slice(0,10); }

const $ = id => document.getElementById(id);

function render(filter='', moodFilter=''){
  const list = $('dEntriesList');
  if(!list) return;
  const q = filter.toLowerCase().trim();
  const filtered = entries.filter(e=>{
    const text = e.title+' '+(e.content||'').replace(/<[^>]+>/g,'');
    const matchQ = !q || text.toLowerCase().includes(q);
    const matchMood = !moodFilter || e.mood === moodFilter;
    return matchQ && matchMood;
  });
  list.innerHTML='';
  if(!filtered.length){
    list.innerHTML='<div style="padding:14px 10px;font-size:.8rem;color:var(--d-ink-muted);font-style:italic">No entries found.</div>';
  } else {
    filtered.forEach(e=>{
      const div = document.createElement('div');
      div.className = 'd-entry-item'+(e.id===activeId?' active':'');
      div.dataset.id = e.id;
      div.innerHTML=`<div class="d-entry-item-title">${e.mood||''} ${e.title||'Untitled Entry'}</div><div class="d-entry-item-meta">${formatDate(e.date)}${e.tags?'  · '+e.tags.split(',').slice(0,2).join(', '):''}</div>`;
      div.addEventListener('click',()=>switchEntry(e.id));
      list.appendChild(div);
    });
  }
  const cnt = $('dEntryCount');
  if(cnt) cnt.textContent = entries.length+' entr'+(entries.length===1?'y':'ies');
}

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}

function loadActive(){
  const e = entries.find(x=>x.id===activeId);
  if(!e) return;
  const title=$('dEntryTitle'), date=$('dEntryDate'), mood=$('dMoodSelect'), tags=$('dTagsInput'), area=$('dWritingArea');
  if(title) title.value=e.title||'';
  if(date) date.value=e.date||today();
  if(mood) mood.value=e.mood||'';
  if(tags) tags.value=e.tags||'';
  if(area) area.innerHTML=e.content||'';
  updateStats();
}

function persistActive(){
  const e = entries.find(x=>x.id===activeId);
  if(!e) return;
  const title=$('dEntryTitle'), date=$('dEntryDate'), mood=$('dMoodSelect'), tags=$('dTagsInput'), area=$('dWritingArea');
  if(title) e.title=title.value||'Untitled Entry';
  if(date) e.date=date.value||today();
  if(mood) e.mood=mood.value||'';
  if(tags) e.tags=tags.value||'';
  if(area) e.content=area.innerHTML||'';
  e.updated=Date.now();
}

function switchEntry(id){
  persistActive();
  save();
  activeId=id;
  loadActive();
  render($('dSearch').value, $('dMoodFilter').value);
}

function newEntry(){
  persistActive();
  save();
  const e=makeEntry();
  entries.unshift(e);
  activeId=e.id;
  save();
  loadActive();
  render();
  $('dEntryTitle') && $('dEntryTitle').focus();
  toast('📝 New entry created');
}

function deleteEntry(){
  if(entries.length<=1){ toast('❌ Cannot delete the last entry.'); return; }
  if(!confirm('Delete this entry permanently?')) return;
  entries = entries.filter(x=>x.id!==activeId);
  activeId=entries[0].id;
  save();
  loadActive();
  render();
  toast('🗑 Entry deleted.');
}

function autoSave(){
  if(saveTimer) clearTimeout(saveTimer);
  setSaving(true);
  saveTimer=setTimeout(()=>{
    persistActive();
    save();
    render($('dSearch').value, $('dMoodFilter').value);
    setSaving(false);
    updateStreak();
  },900);
}

function setSaving(s){
  const el=$('dAutoSave');
  if(!el) return;
  el.textContent=s?'◌ Saving…':'● Saved';
  el.className=s?'d-saving':'d-saved';
}

function updateStats(){
  const area=$('dWritingArea');
  if(!area) return;
  const text=area.innerText||'';
  const words=text.trim()?text.trim().split(/\s+/).filter(Boolean).length:0;
  const wc=$('dWordCount');
  if(wc) wc.textContent=words+' word'+(words===1?'':'s');
}

function updateStreak(){
  const dates=[...new Set(entries.map(e=>e.date))].sort().reverse();
  if(!dates.length){ setStreak(0); return; }
  const td=today();
  if(dates[0]!==td && dates[0]!==prevDay(td)){ setStreak(0); return; }
  let streak=1;
  for(let i=1;i<dates.length;i++){
    const prev=prevDay(dates[i-1]);
    if(dates[i]===prev) streak++;
    else break;
  }
  setStreak(streak);
  localStorage.setItem(STREAK_SK,streak);
}

function prevDay(d){
  const dt=new Date(d+'T12:00:00');
  dt.setDate(dt.getDate()-1);
  return dt.toISOString().slice(0,10);
}

function setStreak(n){
  const el=$('dStreak');
  if(el) el.textContent=`🔥 ${n} day streak`;
}

function exportAll(){
  const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>My Diary – WebNotePad</title>
<style>body{font-family:Georgia,serif;max-width:760px;margin:40px auto;padding:0 24px;color:#2c1a0e;line-height:1.8;background:#fdf6ed}
h1{font-size:2rem;margin-bottom:40px;border-bottom:2px solid #e8d5bc;padding-bottom:12px}
.entry{margin-bottom:56px;padding-bottom:40px;border-bottom:1px solid #e8d5bc}
.e-meta{font-size:.8rem;color:#9e7b5e;margin-bottom:12px;font-family:monospace}
.e-title{font-size:1.4rem;font-weight:700;margin-bottom:12px}
.e-content{font-size:1rem}
footer{margin-top:40px;font-size:.8rem;color:#9e7b5e;border-top:1px solid #e8d5bc;padding-top:12px}
</style></head><body>
<h1>📖 My Diary</h1>
${entries.map(e=>`<div class="entry">
<div class="e-meta">${formatDate(e.date)} ${e.mood||''} ${e.tags?'· '+e.tags:''}</div>
<div class="e-title">${e.title||'Untitled Entry'}</div>
<div class="e-content">${e.content||''}</div>
</div>`).join('')}
<footer>Exported from WebNotePad Online Diary — webnotepad.github.io</footer>
</body></html>`;
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='my-diary.html';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  toast('⬇ Diary exported!');
}

function insertPrompt(){
  const p=PROMPTS[Math.floor(Math.random()*PROMPTS.length)];
  const area=$('dWritingArea');
  if(!area) return;
  area.focus();
  document.execCommand('insertHTML',false,`<p><em>${p}</em></p><p></p>`);
  autoSave();
}

function initFAQ(){
  document.querySelectorAll('.d-faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const a=btn.nextElementSibling;
      const open=a.style.display==='block';
      document.querySelectorAll('.d-faq-a').forEach(x=>x.style.display='none');
      document.querySelectorAll('.d-faq-q').forEach(x=>x.setAttribute('aria-expanded','false'));
      if(!open){ a.style.display='block'; btn.setAttribute('aria-expanded','true'); }
    });
  });
}

function initScrollAnim(){
  const els=document.querySelectorAll('.d-how-card,.d-faq-item');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); }
    });
  },{threshold:.1});
  els.forEach((el,i)=>{ el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition=`opacity .5s ${i*.05}s ease, transform .5s ${i*.05}s ease`; obs.observe(el); });
}

function toast(msg,d=2500){
  const t=$('dToast');
  if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),d);
}

// =============================================
// Google Drive Backup with Instructional Overlay
// =============================================
function driveBackup(){
  // 1. Guard: nothing to back up
  if(!entries || !entries.length){
    toast('⚠️ No entries to back up yet.');
    return;
  }

  // 2. Build a friendly backup payload
  const backup = {
    app: 'WebNotePad Diary',
    version: 1,
    exportedAt: new Date().toISOString(),
    entryCount: entries.length,
    entries: entries
  };

  // 3. Trigger the download
  const stamp = new Date().toISOString().slice(0,10);
  const filename = `webnotepad-diary-backup-${stamp}.json`;
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 1500);

  // 4. Open Google Drive in a new tab (must be synchronous inside the click handler)
  let driveTab = null;
  try {
    driveTab = window.open('https://drive.google.com/drive/my-drive', '_blank', 'noopener');
  } catch(e) {
    driveTab = null;
  }

  // 5. Show the mini instructional overlay
  showDriveOverlay(filename, !!driveTab);
}

function showDriveOverlay(filename, driveOpened){
  // Remove any existing overlay
  const existing = document.getElementById('driveBackupOverlay');
  if(existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'driveBackupOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-live', 'polite');
  overlay.innerHTML = `
    <div class="drive-overlay-card">
      <button class="drive-overlay-close" aria-label="Close">✕</button>
      <div class="drive-overlay-header">
        <span class="drive-overlay-icon">☁️</span>
        <div>
          <h3>Backup ready for Google Drive</h3>
          <p class="drive-overlay-file">${filename}</p>
        </div>
      </div>
      <ol class="drive-overlay-steps">
        <li><strong>1.</strong> Your backup file was downloaded automatically.</li>
        <li><strong>2.</strong> ${driveOpened ? 'A Google Drive tab just opened.' : 'Open <em>drive.google.com</em> in a new tab.'}</li>
        <li><strong>3.</strong> <strong>Drag the downloaded file into Drive</strong> to save it in the cloud.</li>
        <li><strong>4.</strong> To restore later, click <strong>⬆ Restore</strong> and pick this file.</li>
      </ol>
      <div class="drive-overlay-note">
        💡 Tip: Repeat this backup every few weeks to keep your diary safe.
      </div>
      <div class="drive-overlay-actions">
        <button class="drive-overlay-btn drive-overlay-btn-primary" id="driveOverlayGotIt">Got it</button>
        <button class="drive-overlay-btn" id="driveOverlayReopen">Reopen Drive</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Trigger enter animation
  requestAnimationFrame(() => overlay.classList.add('show'));

  // Close handlers
  const close = () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 300);
  };
  overlay.querySelector('.drive-overlay-close').addEventListener('click', close);
  overlay.querySelector('#driveOverlayGotIt').addEventListener('click', close);
  overlay.querySelector('#driveOverlayReopen').addEventListener('click', () => {
    window.open('https://drive.google.com/drive/my-drive', '_blank', 'noopener');
  });
  overlay.addEventListener('click', (e) => {
    if(e.target === overlay) close();
  });
  document.addEventListener('keydown', function escHandler(e){
    if(e.key === 'Escape'){
      close();
      document.removeEventListener('keydown', escHandler);
    }
  });

  // Auto-close after 15 seconds
  setTimeout(() => {
    if(document.body.contains(overlay)) close();
  }, 15000);
}

// =============================================
// Import / Restore Backup
// =============================================
function importBackup(){
  const input = $('dImportInput');
  if(!input) {
    toast('⚠️ Import input not found on the page.');
    return;
  }
  input.value = '';       // reset so the same file can be re-picked
  input.click();          // open the file picker
}

function handleImportFile(evt){
  const file = evt.target.files && evt.target.files[0];
  if(!file) return;

  // Sanity check: must be a JSON file
  if(!/\.json$/i.test(file.name)){
    toast('⚠️ Please choose a .json backup file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    let parsed;
    try {
      parsed = JSON.parse(e.target.result);
    } catch(err) {
      toast('❌ That file is not a valid backup.');
      return;
    }

    // Accept both our own payload shape and a raw entries array
    let incoming = [];
    if(Array.isArray(parsed)) {
      incoming = parsed;
    } else if(parsed && Array.isArray(parsed.entries)) {
      incoming = parsed.entries;
    } else {
      toast('❌ Backup file has an unrecognised format.');
      return;
    }

    // Filter to entries that look valid (must have an id + content or title)
    incoming = incoming.filter(x => x && typeof x === 'object' && (x.id || x.title || x.content));
    if(!incoming.length){
      toast('❌ No usable entries found in that file.');
      return;
    }

    // Confirm before merging
    const msg =
      `Restore ${incoming.length} entr${incoming.length === 1 ? 'y' : 'ies'}?\n\n` +
      `This will MERGE with your current diary. Entries with the same ID will be updated; new ones will be added.`;
    if(!confirm(msg)) return;

    // Merge: existing entries by id, incoming entries overwrite/append
    const byId = new Map();
    entries.forEach(e => byId.set(e.id, e));
    let added = 0, updated = 0;

    incoming.forEach(inc => {
      // Ensure required fields exist on imported entries
      const clean = {
        id:       inc.id || ('de_' + Date.now() + '_' + Math.random().toString(36).slice(2,5)),
        title:    inc.title    || '',
        date:     inc.date     || today(),
        mood:     inc.mood     || '',
        tags:     inc.tags     || '',
        content:  inc.content  || '',
        created:  inc.created  || Date.now(),
        updated:  inc.updated  || Date.now()
      };
      if(byId.has(clean.id)) updated++;
      else added++;
      byId.set(clean.id, clean);
    });

    // Rebuild array sorted by updated desc
    entries = Array.from(byId.values()).sort((a,b) => (b.updated || 0) - (a.updated || 0));
    activeId = entries[0].id;

    save();
    loadActive();
    render();
    updateStreak();

    toast(`✅ Restored — ${added} new, ${updated} updated.`);
  };

  reader.onerror = () => toast('❌ Could not read that file.');
  reader.readAsText(file);
}

// =============================================
// Inject Drive overlay styles once
// =============================================
function injectDriveOverlayStyles(){
  if(document.getElementById('driveOverlayStyles')) return;
  const style = document.createElement('style');
  style.id = 'driveOverlayStyles';
  style.textContent = `
    #driveBackupOverlay {
      position: fixed;
      inset: 0;
      z-index: 10050;
      background: rgba(26, 26, 46, 0.35);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 24px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    #driveBackupOverlay.show {
      opacity: 1;
      pointer-events: auto;
    }
    .drive-overlay-card {
      background: #fdf6ed;
      color: #2c1a0e;
      border-radius: 18px;
      border: 1px solid #e8d5bc;
      box-shadow: 0 20px 60px rgba(26, 26, 46, 0.25);
      padding: 22px 22px 18px;
      max-width: 380px;
      width: 100%;
      font-family: 'Nunito', system-ui, sans-serif;
      transform: translateY(16px);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
      position: relative;
    }
    #driveBackupOverlay.show .drive-overlay-card {
      transform: translateY(0);
      opacity: 1;
    }
    body.dark .drive-overlay-card {
      background: #1c1c22;
      color: #e8e4dc;
      border-color: #2a2a34;
    }
    .drive-overlay-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: inherit;
      opacity: 0.55;
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .drive-overlay-close:hover {
      opacity: 1;
      background: rgba(0,0,0,0.06);
    }
    body.dark .drive-overlay-close:hover {
      background: rgba(255,255,255,0.08);
    }
    .drive-overlay-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
      padding-right: 24px;
    }
    .drive-overlay-icon {
      font-size: 1.6rem;
      line-height: 1;
      flex-shrink: 0;
    }
    .drive-overlay-header h3 {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 3px;
      line-height: 1.25;
    }
    .drive-overlay-file {
      font-size: 0.7rem;
      font-family: 'Fira Mono', 'Courier New', monospace;
      opacity: 0.6;
      margin: 0;
      word-break: break-all;
    }
    .drive-overlay-steps {
      list-style: none;
      padding: 0;
      margin: 0 0 14px;
      font-size: 0.85rem;
      line-height: 1.55;
    }
    .drive-overlay-steps li {
      padding: 6px 0;
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .drive-overlay-steps li strong:first-child {
      color: #b8624a;
      flex-shrink: 0;
    }
    body.dark .drive-overlay-steps li strong:first-child {
      color: #e8714a;
    }
    .drive-overlay-note {
      font-size: 0.75rem;
      padding: 8px 12px;
      border-radius: 8px;
      background: rgba(184, 98, 74, 0.08);
      border: 1px solid rgba(184, 98, 74, 0.2);
      margin-bottom: 14px;
      line-height: 1.5;
    }
    body.dark .drive-overlay-note {
      background: rgba(232, 113, 74, 0.12);
      border-color: rgba(232, 113, 74, 0.25);
    }
    .drive-overlay-actions {
      display: flex;
      gap: 8px;
    }
    .drive-overlay-btn {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid #e8d5bc;
      background: transparent;
      color: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .drive-overlay-btn:hover {
      background: rgba(184, 98, 74, 0.08);
      border-color: #b8624a;
    }
    .drive-overlay-btn-primary {
      background: #b8624a;
      color: #fff;
      border-color: #b8624a;
    }
    .drive-overlay-btn-primary:hover {
      background: #c9705a;
      border-color: #c9705a;
      color: #fff;
    }
    body.dark .drive-overlay-btn-primary {
      background: #e8714a;
      border-color: #e8714a;
    }
    body.dark .drive-overlay-btn-primary:hover {
      background: #f08560;
      border-color: #f08560;
    }
    @media (max-width: 480px) {
      #driveBackupOverlay {
        padding: 12px;
        align-items: flex-end;
      }
      .drive-overlay-card {
        border-radius: 16px;
        padding: 18px 18px 14px;
      }
      .drive-overlay-header h3 {
        font-size: 0.95rem;
      }
      .drive-overlay-steps {
        font-size: 0.8rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function initDiary(){
  load();
  render();
  loadActive();
  updateStreak();
  initFAQ();
  initScrollAnim();
  injectDriveOverlayStyles();

  // Restore dark mode
  if(localStorage.getItem('webnotepad_dark')==='1') document.body.classList.add('dark');

  const area=$('dWritingArea');
  if(area){
    area.addEventListener('input',()=>{ updateStats(); autoSave(); });
  }
  ['dEntryTitle','dEntryDate','dMoodSelect','dTagsInput'].forEach(id=>{
    const el=$(id);
    if(el) el.addEventListener('input', autoSave);
    if(el && el.tagName==='SELECT') el.addEventListener('change', autoSave);
  });

  $('dNewEntryBtn') && $('dNewEntryBtn').addEventListener('click', newEntry);
  $('dSaveBtn') && $('dSaveBtn').addEventListener('click',()=>{ persistActive(); save(); setSaving(false); toast('💾 Saved!'); });
  $('dDeleteBtn') && $('dDeleteBtn').addEventListener('click', deleteEntry);
  $('dExportAllBtn') && $('dExportAllBtn').addEventListener('click', exportAll);
  $('dDriveBackupBtn') && $('dDriveBackupBtn').addEventListener('click', driveBackup);
  $('dImportBtn') && $('dImportBtn').addEventListener('click', importBackup);
  $('dImportInput') && $('dImportInput').addEventListener('change', handleImportFile);
  $('dPromptBtn') && $('dPromptBtn').addEventListener('click', insertPrompt);
  $('dSearch') && $('dSearch').addEventListener('input',e=>render(e.target.value,$('dMoodFilter').value));
  $('dMoodFilter') && $('dMoodFilter').addEventListener('change',e=>render($('dSearch').value,e.target.value));

  // Format buttons
  document.querySelectorAll('.d-fmt[data-cmd]').forEach(btn=>{
    btn.addEventListener('click',()=>{ area && area.focus(); document.execCommand(btn.dataset.cmd,false,null); autoSave(); });
  });

  // Mobile sidebar toggle
  const mobileMenu=$('dMobileMenu');
  if(mobileMenu){
    mobileMenu.addEventListener('click',()=>{
      const sb=$('diarySidebar');
      if(sb) sb.style.display = sb.style.display==='none'?'flex':'none';
    });
  }
}

// =============================================
// PART 2: diary-pdf.js (PDF Export functionality)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Classic Leather',   emoji:'📕' },
  { id:'floral',     name:'Floral Vintage',    emoji:'🌸' },
  { id:'minimalist', name:'Minimalist Modern', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustic',      emoji:'📦' },
  { id:'rosegold',   name:'Elegant Rose Gold', emoji:'🌹' },
  { id:'botanical',  name:'Nature Botanical',  emoji:'🍃' }
];

let selectedTemplate = TEMPLATES[0].id;

const MOOD_LABELS = {
  '😊':'Happy', '😔':'Sad', '😤':'Angry', '😰':'Anxious',
  '😌':'Calm', '🤩':'Excited', '😴':'Tired', '🤔':'Thoughtful'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

function escapeHTML(s){
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

let pdfLibraryLoaded = false;
let pdfLibraryLoading = false;

function loadHtml2Pdf() {
  return new Promise((resolve, reject) => {
    if (typeof html2pdf !== 'undefined') {
      pdfLibraryLoaded = true;
      resolve();
      return;
    }

    if (pdfLibraryLoading) {
      const checkInterval = setInterval(() => {
        if (typeof html2pdf !== 'undefined') {
          clearInterval(checkInterval);
          pdfLibraryLoaded = true;
          pdfLibraryLoading = false;
          resolve();
        }
      }, 100);
      return;
    }

    pdfLibraryLoading = true;
    const script = document.createElement('script');
    script.src = '/js/html2pdf.bundle.min.js';
    script.async = true;

    script.onload = () => {
      pdfLibraryLoaded = true;
      pdfLibraryLoading = false;
      resolve();
    };

    script.onerror = () => {
      pdfLibraryLoading = false;
      reject(new Error('Failed to load PDF library'));
    };

    document.head.appendChild(script);
  });
}

let nativeAdLoaded = false;

function loadNativeAd() {
  if (nativeAdLoaded) return;
  nativeAdLoaded = true;

  const container = document.getElementById('pdfModalAdFrameNative');
  if (!container) return;

  // Inject the invoke.js script
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  script.src = 'https://pl31629520.profitableratecpmnetwork.com/f8ad2a8a31b10be48474b45838a6db56/invoke.js';
  document.body.appendChild(script);

  // Inject the container div (Adsterra renders INTO this ID)
  const adDiv = document.createElement('div');
  adDiv.id = 'container-f8ad2a8a31b10be48474b45838a6db56';
  container.appendChild(adDiv);
}
   
// ----- Ad injection for PDF modal -----
function injectModalAd() {
  const adFrame = $('pdfModalAdFrame');
  if (!adFrame) return;
  if (adFrame.dataset.loaded === '1') return;
  adFrame.dataset.loaded = '1';

  // 1. atOptions config (must run before invoke script)
  const configScript = document.createElement('script');
  configScript.type = 'text/javascript';
  configScript.text = `
    atOptions = {
      'key' : 'f5214acd8479e07d7defe4626c574aa5',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  `;
  adFrame.appendChild(configScript);

  // 2. External invoke script
  const invokeScript = document.createElement('script');
  invokeScript.type = 'text/javascript';
  invokeScript.src = 'https://www.highrevenueformat.com/f5214acd8479e07d7defe4626c574aa5/invoke.js';
  invokeScript.async = true;
  adFrame.appendChild(invokeScript);
}

// ----- Countdown gate state -----
let countdownTimer = null;
const COUNTDOWN_SECONDS = 5;

function startCountdown(seconds = COUNTDOWN_SECONDS) {
  const overlay  = $('pdfCountdownOverlay');
  const numberEl = $('pdfCountdownNumber');
  const textEl   = $('pdfCountdownText');
  const ring     = $('pdfCountdownRing');
  const btn      = $('pdfGenerateBtn');

  if (!overlay || !numberEl || !textEl || !ring || !btn) return;

  // Reset UI
  overlay.classList.remove('hidden');
  btn.disabled = true;

  const total = seconds;
  const circumference = 2 * Math.PI * 31; // r=31 in the SVG
  ring.style.strokeDasharray  = circumference;
  ring.style.strokeDashoffset = 0;

  let remaining = total;
  numberEl.textContent = remaining;
  textEl.textContent = remaining + 's';

  // Clear any prior timer
  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    remaining -= 1;
    const elapsed = total - remaining;
    const offset  = (elapsed / total) * circumference;

    ring.style.strokeDashoffset = offset;
    const display = Math.max(remaining, 0);
    numberEl.textContent = display;
    textEl.textContent = display + 's';

    if (remaining <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      overlay.classList.add('hidden');
      btn.disabled = false;
    }
  }, 1000);
}

function openModal(){
  buildTemplateGrid();
  injectModalAd();
  const overlay = $('pdfModalOverlay');
  if(overlay) overlay.classList.add('show');
  startCountdown(COUNTDOWN_SECONDS);
}

function closeModal(){
  const overlay = $('pdfModalOverlay');
  if(overlay) overlay.classList.remove('show');
  const loading = $('pdfLoading');
  if(loading) loading.classList.remove('active');

  // Stop any running countdown when the modal is closed
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  // Re-enable the button so it isn't stuck disabled on next open
  const btn = $('pdfGenerateBtn');
  if (btn) btn.disabled = false;

  // Make sure the overlay is visible again for the next open
  const cdOverlay = $('pdfCountdownOverlay');
  if (cdOverlay) cdOverlay.classList.remove('hidden');
}

function buildTemplateGrid(){
  const grid = $('pdfTemplateGrid');
  if(!grid) return;
  grid.innerHTML = '';
  TEMPLATES.forEach(t=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pdf-template-swatch' + (t.id === selectedTemplate ? ' selected' : '');
    btn.dataset.tpl = t.id;
    btn.setAttribute('aria-label', 'Use ' + t.name + ' template');
    btn.innerHTML =
      `<span class="pdf-swatch-preview pdf-tpl-${t.id}-preview"></span>` +
      `<span class="pdf-swatch-label">${t.emoji} ${t.name}</span>`;
    btn.addEventListener('click', ()=>{
      selectedTemplate = t.id;
      grid.querySelectorAll('.pdf-template-swatch').forEach(x=>x.classList.remove('selected'));
      btn.classList.add('selected');
    });
    grid.appendChild(btn);
  });
}

function buildPrintHTML(){
  const title   = ($('dEntryTitle')  && $('dEntryTitle').value)  || 'Untitled Entry';
  const date    = ($('dEntryDate')   && $('dEntryDate').value)   || '';
  const mood    = ($('dMoodSelect')  && $('dMoodSelect').value)  || '';
  const tags    = ($('dTagsInput')   && $('dTagsInput').value)   || '';
  const content = ($('dWritingArea') && $('dWritingArea').innerHTML) || '<p><em>(No content yet)</em></p>';

  const moodLabel = MOOD_LABELS[mood] || '';
  const tagList = tags ? tags.split(',').map(t=>t.trim()).filter(Boolean) : [];

  return `
    <div class="pdf-page pdf-tpl-${selectedTemplate}">
      <div class="pdf-page-inner">
        <div class="pdf-header">
          <span class="pdf-brand">📖 WebNotepad Diary</span>
          <span class="pdf-date">${formatDatePretty(date)}</span>
        </div>
        <h1 class="pdf-title">${escapeHTML(title)}</h1>
        <div class="pdf-meta-row">
          ${mood ? `<span class="pdf-mood">${mood} ${moodLabel}</span>` : ''}
          ${tagList.length ? `<span class="pdf-tags">${tagList.map(t=>`<em>#${escapeHTML(t)}</em>`).join(' ')}</span>` : ''}
        </div>
        <div class="pdf-divider"></div>
        <div class="pdf-content">${content}</div>
        <div class="pdf-footer">Written with WebNotepad — webnotepad.github.io</div>
      </div>
    </div>`;
}

async function generatePDF(){
  const loading = $('pdfLoading');
  if(loading) loading.classList.add('active');

  try {
    await loadHtml2Pdf();

    if (typeof html2pdf === 'undefined') {
      throw new Error('PDF library failed to load');
    }

    const printArea = $('pdfPrintArea');
    printArea.innerHTML = buildPrintHTML();
    printArea.style.display = 'block';

    const rawTitle = ($('dEntryTitle') && $('dEntryTitle').value) || 'diary-entry';
    const safeName = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'diary-entry';

    const restoreScrollX = window.scrollX;
    const restoreScrollY = window.scrollY;
    window.scrollTo(0, 0);

    const opt = {
      margin: 0,
      filename: `${safeName}.pdf`,
      image: { type:'jpeg', quality:0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      },
      jsPDF: { unit:'in', format:'letter', orientation:'portrait' },
      pagebreak: { mode:['css','legacy'] }
    };

    await html2pdf().set(opt).from(printArea.querySelector('.pdf-page')).save();

    if(loading) loading.classList.remove('active');
    printArea.style.display = 'none';
    printArea.innerHTML = '';
    window.scrollTo(restoreScrollX, restoreScrollY);
    closeModal();
    toast('📄 PDF downloaded!');

  } catch (err) {
    console.error('PDF generation failed:', err);
    if(loading) loading.classList.remove('active');
    if (err.message === 'Failed to load PDF library') {
      alert('The PDF library could not be loaded. Please check that /js/html2pdf.bundle.min.js exists and try again.');
    } else {
      alert('Something went wrong generating the PDF. Please try again.');
    }
  }
}

function initPDF(){
  $('dPdfBtn') && $('dPdfBtn').addEventListener('click', openModal);
  $('pdfModalClose') && $('pdfModalClose').addEventListener('click', closeModal);
  $('pdfModalOverlay') && $('pdfModalOverlay').addEventListener('click', e=>{
    if(e.target.id === 'pdfModalOverlay') closeModal();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') closeModal();
  });
  $('pdfGenerateBtn') && $('pdfGenerateBtn').addEventListener('click', generatePDF);
}

// =============================================
// Combined Initialization
// =============================================
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initDiary();
    initPDF();
  });
} else {
  initDiary();
  initPDF();
}

})();
