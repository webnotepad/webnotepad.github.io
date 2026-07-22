/* =============================================
   WebNotePad — Online Diary (Combined)
   Includes: diary.js + diary-pdf.js
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

function initDiary(){
  load();
  render();
  loadActive();
  updateStreak();
  initFAQ();
  initScrollAnim();

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

function openModal(){
  buildTemplateGrid();
  const overlay = $('pdfModalOverlay');
  if(overlay) overlay.classList.add('show');
}

function closeModal(){
  const overlay = $('pdfModalOverlay');
  if(overlay) overlay.classList.remove('show');
  const loading = $('pdfLoading');
  if(loading) loading.classList.remove('active');
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

  // Complete template styles with all template variations
  const templateStyles = `
    /* Base styles for all templates */
    .pdf-page {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      box-sizing: border-box;
    }
    .pdf-page-inner {
      width: 100%;
      max-width: 700px;
      padding: 50px 55px;
      border-radius: 12px;
      box-sizing: border-box;
      position: relative;
    }

    /* CLASSIC LEATHER template */
    .pdf-tpl-classic .pdf-page-inner {
      background: #f5ebe0;
      border: 8px solid #5c3d2e;
      border-radius: 4px;
      box-shadow: inset 0 0 30px rgba(92, 61, 46, 0.2);
      padding: 45px 50px;
    }
    .pdf-tpl-classic .pdf-header {
      border-bottom: 2px solid #5c3d2e;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-classic .pdf-title {
      color: #3d2517;
      font-size: 28px;
      font-weight: 700;
    }
    .pdf-tpl-classic .pdf-meta-row {
      background: rgba(92, 61, 46, 0.08);
      padding: 10px 14px;
      border-radius: 6px;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-classic .pdf-divider {
      background: #5c3d2e;
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-classic .pdf-content {
      color: #2c1a0e;
      font-size: 16px;
      line-height: 1.8;
    }
    .pdf-tpl-classic .pdf-content p {
      color: #2c1a0e;
    }
    .pdf-tpl-classic .pdf-footer {
      color: #5c3d2e;
      border-top: 1px solid #d4c5b8;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
    }

    /* FLORAL VINTAGE template */
    .pdf-tpl-floral .pdf-page-inner {
      background: linear-gradient(135deg, #fdf6ee 0%, #f8efe4 100%);
      border: 6px solid #d4a8a8;
      border-radius: 8px;
      box-shadow: 0 0 0 2px #f0d6d6 inset;
      padding: 45px 50px;
    }
    .pdf-tpl-floral .pdf-header {
      border-bottom: 2px solid #d4a8a8;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-floral .pdf-title {
      color: #6b4c4c;
      font-size: 28px;
      font-weight: 700;
      font-family: Georgia, serif;
    }
    .pdf-tpl-floral .pdf-meta-row {
      background: rgba(212, 168, 168, 0.15);
      padding: 10px 14px;
      border-radius: 6px;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-floral .pdf-divider {
      background: linear-gradient(to right, #d4a8a8, transparent);
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-floral .pdf-content {
      color: #4a3535;
      font-size: 16px;
      line-height: 1.8;
      font-family: Georgia, serif;
    }
    .pdf-tpl-floral .pdf-footer {
      color: #6b4c4c;
      border-top: 1px solid #e8d4d4;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
    }

    /* MINIMALIST MODERN template */
    .pdf-tpl-minimalist .pdf-page-inner {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      padding: 45px 50px;
    }
    .pdf-tpl-minimalist .pdf-header {
      border-bottom: 2px solid #333;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-minimalist .pdf-title {
      color: #1a1a1a;
      font-size: 28px;
      font-weight: 700;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .pdf-tpl-minimalist .pdf-meta-row {
      background: #f5f5f5;
      padding: 10px 14px;
      border-radius: 4px;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-minimalist .pdf-divider {
      background: #333;
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-minimalist .pdf-content {
      color: #1a1a1a;
      font-size: 16px;
      line-height: 1.8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .pdf-tpl-minimalist .pdf-footer {
      color: #888;
      border-top: 1px solid #e0e0e0;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
    }

    /* KRAFT RUSTIC template */
    .pdf-tpl-kraft .pdf-page-inner {
      background: #f5ede4;
      border: 6px solid #b8956a;
      border-radius: 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 45px 50px;
    }
    .pdf-tpl-kraft .pdf-header {
      border-bottom: 2px solid #b8956a;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-kraft .pdf-title {
      color: #5a3e28;
      font-size: 28px;
      font-weight: 700;
      font-family: 'Courier New', monospace;
    }
    .pdf-tpl-kraft .pdf-meta-row {
      background: rgba(184, 149, 106, 0.15);
      padding: 10px 14px;
      border-radius: 0;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-kraft .pdf-divider {
      background: #b8956a;
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-kraft .pdf-content {
      color: #3a2a1a;
      font-size: 16px;
      line-height: 1.8;
      font-family: 'Courier New', monospace;
    }
    .pdf-tpl-kraft .pdf-footer {
      color: #b8956a;
      border-top: 1px solid #d4c5b8;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
      font-family: 'Courier New', monospace;
    }

    /* ROSE GOLD template */
    .pdf-tpl-rosegold .pdf-page-inner {
      background: linear-gradient(145deg, #fdf6f0 0%, #f8ece4 100%);
      border: 6px solid #d4a08a;
      border-radius: 12px;
      box-shadow: 0 0 0 2px #f0d6c8 inset, 0 8px 30px rgba(212, 160, 138, 0.2);
      padding: 45px 50px;
    }
    .pdf-tpl-rosegold .pdf-header {
      border-bottom: 2px solid #d4a08a;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-rosegold .pdf-title {
      color: #6b3d2e;
      font-size: 28px;
      font-weight: 700;
      font-family: Georgia, serif;
    }
    .pdf-tpl-rosegold .pdf-meta-row {
      background: rgba(212, 160, 138, 0.15);
      padding: 10px 14px;
      border-radius: 8px;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-rosegold .pdf-divider {
      background: linear-gradient(to right, #d4a08a, transparent);
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-rosegold .pdf-content {
      color: #4a2a1a;
      font-size: 16px;
      line-height: 1.8;
      font-family: Georgia, serif;
    }
    .pdf-tpl-rosegold .pdf-footer {
      color: #d4a08a;
      border-top: 1px solid #e8d4c8;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
    }

    /* BOTANICAL template */
    .pdf-tpl-botanical .pdf-page-inner {
      background: #f6f4ec;
      border: 6px solid #5a7a4a;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(90, 122, 74, 0.1);
      padding: 45px 50px;
    }
    .pdf-tpl-botanical .pdf-header {
      border-bottom: 2px solid #5a7a4a;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .pdf-tpl-botanical .pdf-title {
      color: #2d4a1a;
      font-size: 28px;
      font-weight: 700;
      font-family: Georgia, serif;
    }
    .pdf-tpl-botanical .pdf-meta-row {
      background: rgba(90, 122, 74, 0.1);
      padding: 10px 14px;
      border-radius: 6px;
      margin: 10px 0 16px 0;
    }
    .pdf-tpl-botanical .pdf-divider {
      background: #5a7a4a;
      height: 2px;
      margin: 18px 0 20px 0;
    }
    .pdf-tpl-botanical .pdf-content {
      color: #2a3a1a;
      font-size: 16px;
      line-height: 1.8;
      font-family: Georgia, serif;
    }
    .pdf-tpl-botanical .pdf-footer {
      color: #5a7a4a;
      border-top: 1px solid #d4dcc8;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 13px;
    }

    /* Common elements */
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .pdf-brand {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }
    .pdf-date {
      font-size: 14px;
      opacity: 0.7;
    }
    .pdf-title {
      margin: 8px 0 4px 0;
      line-height: 1.2;
    }
    .pdf-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      font-size: 14px;
    }
    .pdf-mood {
      font-weight: 600;
    }
    .pdf-tags em {
      font-style: italic;
      margin-right: 4px;
      font-weight: 500;
    }
    .pdf-divider {
      width: 60px;
    }
    .pdf-content {
      font-size: 16px;
      line-height: 1.8;
    }
    .pdf-content p {
      margin: 0 0 12px 0;
    }
    .pdf-content p:last-child {
      margin-bottom: 0;
    }
    .pdf-content h1, .pdf-content h2, .pdf-content h3 {
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .pdf-content ul, .pdf-content ol {
      margin: 8px 0 12px 20px;
      padding: 0;
    }
    .pdf-content li {
      margin-bottom: 4px;
    }
    .pdf-content blockquote {
      border-left: 3px solid #ccc;
      padding-left: 16px;
      margin: 12px 0;
      font-style: italic;
    }
    .pdf-footer {
      font-size: 13px;
      text-align: center;
      letter-spacing: 0.3px;
    }

    /* Preview swatches */
    .pdf-tpl-classic-preview {
      background: linear-gradient(145deg, #5c3d2e, #3d2517);
    }
    .pdf-tpl-floral-preview {
      background: linear-gradient(135deg, #fdf6ee 0%, #f8efe4 100%);
      border: 3px solid #d4a8a8;
    }
    .pdf-tpl-minimalist-preview {
      background: #ffffff;
      border: 2px solid #e0e0e0;
    }
    .pdf-tpl-kraft-preview {
      background: #f5ede4;
      border: 3px solid #b8956a;
    }
    .pdf-tpl-rosegold-preview {
      background: linear-gradient(145deg, #fdf6f0 0%, #f8ece4 100%);
      border: 3px solid #d4a08a;
    }
    .pdf-tpl-botanical-preview {
      background: #f6f4ec;
      border: 3px solid #5a7a4a;
    }
  `;

  return `
    <div class="pdf-page pdf-tpl-${selectedTemplate}">
      <style>${templateStyles}</style>
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
