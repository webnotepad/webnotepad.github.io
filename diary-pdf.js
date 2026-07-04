/* =============================================
   WebNotePad — Diary PDF Export (diary-pdf.js)
   Depends on: diary.js (for #dWritingArea etc.),
               html2pdf.js CDN (loaded in diary.html)
   Everything runs client-side — no data ever
   leaves the browser.
   ============================================= */
(function(){
  'use strict';

  const $ = id => document.getElementById(id);

  // ---- Template registry -------------------------------------------
  // id must match a .pdf-tpl-<id> class defined in diary-pdf.css
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

  // ---- Small helpers --------------------------------------------------
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

  function showToast(msg){
    const t = $('dToast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2500);
  }

  // ---- Modal open / close ----------------------------------------------
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

  // ---- Build the template picker grid -----------------------------------
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

  // ---- Build the printable markup for the currently open entry -----------
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

  // ---- Generate + download the PDF ---------------------------------------
  function generatePDF(){
    if(typeof html2pdf === 'undefined'){
      alert('The PDF library did not load. Please check your connection and try again.');
      return;
    }

    const loading = $('pdfLoading');
    if(loading) loading.classList.add('active');

    const printArea = $('pdfPrintArea');
    printArea.innerHTML = buildPrintHTML();
    printArea.style.display = 'block';

    const rawTitle = ($('dEntryTitle') && $('dEntryTitle').value) || 'diary-entry';
    const safeName = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'diary-entry';

    const opt = {
      margin: 0,
      filename: `${safeName}.pdf`,
      image: { type:'jpeg', quality:0.98 },
      html2canvas: { scale:2, useCORS:true },
      jsPDF: { unit:'in', format:'letter', orientation:'portrait' },
      pagebreak: { mode:['css','legacy'] }
    };

    html2pdf().set(opt).from(printArea.querySelector('.pdf-page')).save()
      .then(()=>{
        if(loading) loading.classList.remove('active');
        printArea.style.display = 'none';
        printArea.innerHTML = '';
        closeModal();
        showToast('📄 PDF downloaded!');
      })
      .catch(err=>{
        console.error('PDF generation failed:', err);
        if(loading) loading.classList.remove('active');
        alert('Something went wrong generating the PDF. Please try again.');
      });
  }

  // ---- Wire up events -----------------------------------------------------
  function init(){
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

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
