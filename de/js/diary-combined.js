// =============================================
// PART 1: diary.js (Haupt-Tagebuch-Funktionalität)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Was hat dich heute zum Lächeln gebracht?",
  "Beschreibe eine Herausforderung, die du kürzlich gemeistert hast und wie du sie bewältigt hast.",
  "Wofür bist du gerade dankbar? Nenne drei Dinge.",
  "Wenn du einen Moment dieser Woche noch einmal erleben könntest, welcher wäre es?",
  "Welche Emotion hat deinen Tag dominiert und warum?",
  "Was hättest du heute anders machen wollen?",
  "Beschreibe etwas Schönes, das dir heute aufgefallen ist.",
  "An welchem Ziel arbeitest du und welche Fortschritte hast du gemacht?",
  "Schreibe über jemanden, der dich kürzlich beeinflusst hat.",
  "Worauf freust du dich diese Woche am meisten?",
  "Welche Lektion hat dir heute gelernt?",
  "Beschreibe deinen idealen Tag im Detail.",
  "Welche Angst hält dich gerade zurück?",
  "Schreibe über eine Erinnerung, die dich warm fühlen lässt.",
  "Was würdest du deinem jüngeren Ich heute sagen?",
  "Worauf bist du stolz, kürzlich erreicht zu haben?",
  "Wie hast du heute für dich selbst gesorgt?",
  "Welches Buch, Lied oder Film hat dich kürzlich bewegt und warum?",
  "Beschreibe ein Gespräch, das dir im Gedächtnis geblieben ist.",
  "Wie sieht deine perfekte Version von morgen aus?"
];

// ... (Rest der Code-Struktur bleibt identisch, aber mit deutschen UI-Strings)

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

// ... (function today() bleibt gleich)

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('de-DE',{month:'short',day:'numeric',year:'numeric'});
}

// ... (loadActive, persistActive, switchEntry, newEntry, deleteEntry bleiben meist gleich, nur deutsche Toast-Nachrichten)

function toast(msg,d=2500){
  // Deutsche Nachrichten in Aufrufen:
  // '📝 Neuer Eintrag erstellt'
  // '❌ Kann den letzten Eintrag nicht löschen.'
  // '🗑 Eintrag gelöscht.'
  // '💾 Gespeichert!'
  // '⬇ Tagebuch exportiert!'
  // '⚠️ Keine Einträge für ein Backup.'
  // '✅ Wiederhergestellt — X neu, Y aktualisiert.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim bleiben ähnlich mit deutschem Text)

// =============================================
// Google Drive Backup mit Anleitungs-Overlay
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... Overlay innerHTML mit deutschem Text:
  // "Backup bereit für Google Drive"
  // "1. Deine Backup-Datei wurde automatisch heruntergeladen."
  // "2. Ein Google Drive-Tab wurde geöffnet." / "Öffne drive.google.com in einem neuen Tab."
  // "3. Ziehe die heruntergeladene Datei in Drive, um sie in der Cloud zu speichern."
  // "4. Zum späteren Wiederherstellen klicke auf ⬆ Importieren und wähle diese Datei."
  // "💡 Tipp: Wiederhole dieses Backup alle paar Wochen, um dein Tagebuch sicher zu halten."
  // "Verstanden" statt "Got it"
  // "Google Drive erneut öffnen" statt "Reopen Drive"
}

// ... (importBackup, handleImportFile mit deutschen Bestätigungsnachrichten)

// =============================================
// PART 2: diary-pdf.js (PDF Export Funktionalität)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Klassisch Leder',   emoji:'📕' },
  { id:'floral',     name:'Floral Vintage',    emoji:'🌸' },
  { id:'minimalist', name:'Minimalistisch Modern', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustikal',    emoji:'📦' },
  { id:'rosegold',   name:'Elegant Roségold',  emoji:'🌹' },
  { id:'botanical',  name:'Natur Botanisch',   emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Glücklich', '😔':'Traurig', '😤':'Wütend', '😰':'Ängstlich',
  '😌':'Ruhig', '🤩':'Aufgeregt', '😴':'Müde', '🤔':'Nachdenklich'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('de-DE', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML mit deutschem Footer-Text:
// "Geschrieben mit WebNotePad — webnotepad.github.io"
// Titel-Fallback: 'Unbenannter Eintrag')

// ... (generatePDF mit deutschem Dateinamen-Fallback 'tagebuch-eintrag' und deutschen Alerts)

// ... (initPDF bleibt gleiche Struktur)

// Kombinierte Initialisierung
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
