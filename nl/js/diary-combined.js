// =============================================
// PART 1: diary.js (Main diary functionality)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Wat maakte je vandaag aan het lachen?",
  "Beschrijf een uitdaging die je onlangs hebt overwonnen en hoe je dat deed.",
  "Waar ben je op dit moment dankbaar voor? Noem drie dingen.",
  "Als je één moment van deze week opnieuw mocht beleven, welk moment zou dat zijn?",
  "Welke emotie domineerde vandaag en waarom?",
  "Wat had je vandaag anders willen doen?",
  "Beschrijf iets moois dat je vandaag hebt opgemerkt.",
  "Aan welk doel werk je en welke vooruitgang heb je geboekt?",
  "Schrijf over iemand die je onlangs heeft beïnvloed.",
  "Waar kijk je deze week het meest naar uit?",
  "Welke les heeft vandaag je geleerd?",
  "Beschrijf je ideale dag in detail.",
  "Welke angst houdt je op dit moment tegen?",
  "Schrijf over een herinnering die je een warm gevoel geeft.",
  "Wat zou je je jongere zelf vandaag vertellen?",
  "Waar ben je trots op dat je onlangs hebt bereikt?",
  "Hoe heb je vandaag voor jezelf gezorgd?",
  "Welk boek, liedje of film heeft je onlangs geraakt en waarom?",
  "Beschrijf een gesprek dat je is bijgebleven.",
  "Hoe ziet jouw perfecte versie van morgen eruit?"
];

// ... (rest of the code structure remains identical, but with Dutch UI strings)

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

// ... (function today() remains the same)

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('nl-NL',{month:'short',day:'numeric',year:'numeric'});
}

// ... (loadActive, persistActive, switchEntry, newEntry, deleteEntry remain mostly same, just Dutch toast messages)

function toast(msg,d=2500){
  // Dutch messages used in calls:
  // '📝 Nieuwe entry aangemaakt'
  // '❌ Kan de laatste entry niet verwijderen.'
  // '🗑 Entry verwijderd.'
  // '💾 Opgeslagen!'
  // '⬇ Dagboek geëxporteerd!'
  // '⚠️ Geen entries om een back-up van te maken.'
  // '✅ Hersteld — X nieuw, Y bijgewerkt.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim remain similar with Dutch text)

// =============================================
// Google Drive Backup with Instructional Overlay
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... overlay innerHTML with Dutch text:
  // "Back-up klaar voor Google Drive"
  // "1. Je back-upbestand is automatisch gedownload."
  // "2. Er is een Google Drive-tab geopend." / "Open drive.google.com in een nieuw tabblad."
  // "3. Sleep het gedownloade bestand naar Drive om het in de cloud op te slaan."
  // "4. Om later te herstellen, klik op ⬆ Herstel en kies dit bestand."
  // "💡 Tip: Herhaal deze back-up elke paar weken om je dagboek veilig te houden."
  // "Got it" -> "Begrepen"
  // "Reopen Drive" -> "Google Drive opnieuw openen"
}

// ... (importBackup, handleImportFile with Dutch confirm messages)

// =============================================
// PART 2: diary-pdf.js (PDF Export functionality)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Klassiek Leder',   emoji:'📕' },
  { id:'floral',     name:'Floraal Vintage',  emoji:'🌸' },
  { id:'minimalist', name:'Minimalistisch Modern', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustiek',    emoji:'📦' },
  { id:'rosegold',   name:'Elegant Rosé Goud', emoji:'🌹' },
  { id:'botanical',  name:'Natuur Botanisch',  emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Blij', '😔':'Verdrietig', '😤':'Boos', '😰':'Angstig',
  '😌':'Kalm', '🤩':'Opgewonden', '😴':'Moe', '🤔':'Bedachtzaam'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('nl-NL', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML with Dutch footer text:
// "Geschreven met WebNotePad — webnotepad.github.io"
// Title fallback: 'Naamloze Entry')

// ... (generatePDF with Dutch filename fallback 'dagboek-entry' and Dutch alerts)

// ... (initPDF remains same structure)

// Combined Initialization
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
