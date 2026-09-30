// =============================================
// DEL 1: diary.js (Huvudfunktionalitet för dagbok)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Vad fick dig att le idag?",
  "Beskriv en utmaning du nyligen stött på och hur du hanterade den.",
  "Vilka tre saker är du tacksam för just nu?",
  "Om du kunde återuppleva en stund från denna vecka, vilken skulle det vara?",
  "Vilken känsla dominerade din dag och varför?",
  "Vad önskar du att du hade gjort annorlunda idag?",
  "Beskriv något vackert du lade märke till idag.",
  "Vilket mål arbetar du mot och hur har du utvecklats?",
  "Skriv om någon som nyligen påverkade dig.",
  "Vad ser du mest fram emot denna vecka?",
  "Vilken läxa lärde dagen idag dig?",
  "Beskriv din ideala dag i detalj.",
  "Vilken rädsla håller dig tillbaka just nu?",
  "Skriv om ett minne som får dig att känna värme.",
  "Vad skulle du säga till ditt yngre jag idag?",
  "Vad är du stolt över att nyligen ha uppnått?",
  "Hur tog du hand om dig själv idag?",
  "Vilken bok, låt eller film rörde dig nyligen och varför?",
  "Beskriv ett samtal som stannade kvar hos dig.",
  "Hur ser din perfekta version av morgondagen ut?"
];

// ... (Resten av kodstrukturen förblir identisk, men med svenska UI-strängar)

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

// ... (function today() förblir densamma)

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('sv-SE',{month:'short',day:'numeric',year:'numeric'});
}

// ... (loadActive, persistActive, switchEntry, newEntry, deleteEntry förblir ungefär desamma, endast svenska toast-meddelanden)

function toast(msg,d=2500){
  // Svenska meddelanden i anrop:
  // '📝 Nytt inlägg skapat'
  // '❌ Kan inte radera det sista inlägget.'
  // '🗑 Inlägg raderat.'
  // '💾 Sparat!'
  // '⬇ Dagbok exporterad!'
  // '⚠️ Inga inlägg att säkerhetskopiera.'
  // '✅ Återställd — X nya, Y uppdaterade.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim förblir liknande med svensk text)

// =============================================
// Google Drive Säkerhetskopia med instruktionsöverlägg
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... overlay innerHTML med svensk text:
  // "Säkerhetskopia redo för Google Drive"
  // "1. Din säkerhetskopiefil laddades ner automatiskt."
  // "2. En Google Drive-flik öppnades." / "Öppna drive.google.com i en ny flik."
  // "3. Dra den nedladdade filen till Drive för att spara den i molnet."
  // "4. För att återställa senare, klicka på ⬆ Importera och välj denna fil."
  // "💡 Tips: Upprepa denna säkerhetskopia varannan vecka för att hålla din dagbok säker."
  // "Uppfattat" istället för "Got it"
  // "Öppna Google Drive igen" istället för "Reopen Drive"
}

// ... (importBackup, handleImportFile med svenska bekräftelsemeddelanden)

// =============================================
// DEL 2: diary-pdf.js (PDF-export funktionalitet)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Klassisk Läder',   emoji:'📕' },
  { id:'floral',     name:'Blommig Vintage',  emoji:'🌸' },
  { id:'minimalist', name:'Minimalistisk Modern', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustik',     emoji:'📦' },
  { id:'rosegold',   name:'Elegant Roséguld', emoji:'🌹' },
  { id:'botanical',  name:'Natur Botanisk',   emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Glad', '😔':'Ledsen', '😤':'Arg', '😰':'Orolig',
  '😌':'Lugn', '🤩':'Upprymd', '😴':'Trött', '🤔':'Eftertänksam'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('sv-SE', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML med svensk sidfotstext:
// "Skriven med WebNotePad — webnotepad.github.io"
// Titel-fallback: 'Namnlöst inlägg')

// ... (generatePDF med svensk filnamn-fallback 'dagbok-inlagg' och svenska alerts)

// ... (initPDF förblir samma struktur)

// Kombinerad initiering
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
