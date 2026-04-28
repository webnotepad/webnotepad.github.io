/* WebNotePad — Online Diary (diary.js) */
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

function init(){
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

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();
})();
