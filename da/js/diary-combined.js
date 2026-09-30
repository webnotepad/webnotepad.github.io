// =============================================
// DEL 1: diary.js (Hoveddagbog-funktionalitet)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Hvad fik dig til at smile i dag?",
  "Beskriv en udfordring, du for nylig stod over for, og hvordan du håndterede den.",
  "Hvad er tre ting, du er taknemmelig for lige nu?",
  "Hvis du kunne genopleve ét øjeblik fra denne uge, hvilket ville det være?",
  "Hvilken følelse dominerede din dag, og hvorfor?",
  "Hvad ville du ønske, du havde gjort anderledes i dag?",
  "Beskriv noget smukt, du lagde mærke til i dag.",
  "Hvilket mål arbejder du hen imod, og hvordan er det gået?",
  "Skriv om en person, der for nylig har påvirket dig.",
  "Hvad ser du mest frem til i denne uge?",
  "Hvilken lektie lærte dagen i dag dig?",
  "Beskriv din ideelle dag i detaljer.",
  "Hvilken frygt holder dig tilbage lige nu?",
  "Skriv om et minde, der får dig til at føle varme.",
  "Hvad ville du fortælle dit yngre jeg i dag?",
  "Hvad er du stolt af at have opnået for nylig?",
  "Hvordan tog du hånd om dig selv i dag?",
  "Hvilken bog, sang eller film rørte dig for nylig, og hvorfor?",
  "Beskriv en samtale, der blev hængende hos dig.",
  "Hvordan ser din perfekte version af i morgen ud?"
];

// ... (Resten af kodestrukturen forbliver identisk, men med danske UI-strenge)

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

// ... (function today() forbliver den samme)

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('da-DK',{month:'short',day:'numeric',year:'numeric'});
}

// ... (loadActive, persistActive, switchEntry, newEntry, deleteEntry forbliver stort set de samme, kun danske toast-beskeder)

function toast(msg,d=2500){
  // Danske beskeder i kald:
  // '📝 Nyt indlæg oprettet'
  // '❌ Kan ikke slette det sidste indlæg.'
  // '🗑 Indlæg slettet.'
  // '💾 Gemt!'
  // '⬇ Dagbog eksporteret!'
  // '⚠️ Ingen indlæg at lave backup af.'
  // '✅ Gendannet — X nye, Y opdaterede.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim forbliver lignende med dansk tekst)

// =============================================
// Google Drive Backup med instruktions-overlay
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... overlay innerHTML med dansk tekst:
  // "Backup klar til Google Drive"
  // "1. Din backup-fil blev downloadet automatisk."
  // "2. En Google Drive-fane blev åbnet." / "Åbn drive.google.com i en ny fane."
  // "3. Træk den downloadede fil ind i Drive for at gemme den i skyen."
  // "4. For at gendanne senere skal du klikke på ⬆ Importer og vælge denne fil."
  // "💡 Tip: Gentag denne backup hver par uger for at holde din dagbog sikker."
  // "Forstået" i stedet for "Got it"
  // "Genåbn Google Drive" i stedet for "Reopen Drive"
}

// ... (importBackup, handleImportFile med danske bekræftelsesbeskeder)

// =============================================
// DEL 2: diary-pdf.js (PDF-eksport funktionalitet)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Klassisk Læder',   emoji:'📕' },
  { id:'floral',     name:'Blomstret Vintage', emoji:'🌸' },
  { id:'minimalist', name:'Minimalistisk Moderne', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustik',     emoji:'📦' },
  { id:'rosegold',   name:'Elegant Roséguld', emoji:'🌹' },
  { id:'botanical',  name:'Natur Botanisk',   emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Glad', '😔':'Trist', '😤':'Vred', '😰':'Ængstelig',
  '😌':'Rolig', '🤩':'Begejstret', '😴':'Træt', '🤔':'Eftertænksom'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('da-DK', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML med dansk sidefod-tekst:
// "Skrevet med WebNotePad — webnotepad.github.io"
// Titel-fallback: 'Unavngivet indlæg')

// ... (generatePDF med dansk filnavn-fallback 'dagbog-indlaeg' og danske alerts)

// ... (initPDF forbliver samme struktur)

// Kombineret initialisering
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
