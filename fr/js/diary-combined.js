// =============================================
// PART 1: diary.js (Fonctionnalité principale du journal)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Qu'est-ce qui vous a fait sourire aujourd'hui ?",
  "Décrivez un défi que vous avez récemment relevé et comment vous l'avez géré.",
  "Quelles sont les trois choses pour lesquelles vous êtes reconnaissant en ce moment ?",
  "Si vous pouviez revivre un moment de cette semaine, lequel serait-ce ?",
  "Quelle émotion a dominé votre journée et pourquoi ?",
  "Qu'auriez-vous souhaité faire différemment aujourd'hui ?",
  "Décrivez quelque chose de beau que vous avez remarqué aujourd'hui.",
  "Vers quel objectif travaillez-vous et comment avez-vous progressé ?",
  "Écrivez à propos de quelqu'un qui vous a récemment influencé.",
  "Qu'attendez-vous le plus cette semaine ?",
  "Quelle leçon la journée d'aujourd'hui vous a-t-elle apprise ?",
  "Décrivez votre journée idéale en détail.",
  "Quelle peur vous retient en ce moment ?",
  "Écrivez à propos d'un souvenir qui vous réchauffe le cœur.",
  "Que diriez-vous à votre vous plus jeune aujourd'hui ?",
  "De quoi êtes-vous fier d'avoir récemment accompli ?",
  "Comment avez-vous pris soin de vous aujourd'hui ?",
  "Quel livre, chanson ou film vous a récemment ému et pourquoi ?",
  "Décrivez une conversation qui vous est restée en mémoire.",
  "À quoi ressemble votre version parfaite de demain ?"
];

// ... (Rest du code identique, avec des chaînes UI françaises)

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

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('fr-FR',{month:'short',day:'numeric',year:'numeric'});
}

function toast(msg,d=2500){
  // Messages français dans les appels :
  // '📝 Nouvelle entrée créée'
  // '❌ Impossible de supprimer la dernière entrée.'
  // '🗑 Entrée supprimée.'
  // '💾 Enregistré !'
  // '⬇ Journal exporté !'
  // '⚠️ Aucune entrée à sauvegarder.'
  // '✅ Restauré — X nouvelles, Y mises à jour.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim avec texte français)

// =============================================
// Sauvegarde Google Drive avec overlay d'instructions
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... innerHTML de l'overlay avec texte français :
  // "Sauvegarde prête pour Google Drive"
  // "1. Votre fichier de sauvegarde a été téléchargé automatiquement."
  // "2. Un onglet Google Drive vient de s'ouvrir." / "Ouvrez drive.google.com dans un nouvel onglet."
  // "3. Glissez le fichier téléchargé dans Drive pour le sauvegarder dans le cloud."
  // "4. Pour restaurer plus tard, cliquez sur ⬆ Importer et choisissez ce fichier."
  // "💡 Astuce : Répétez cette sauvegarde toutes les quelques semaines pour garder votre journal en sécurité."
  // "Compris" au lieu de "Got it"
  // "Rouvrir Google Drive" au lieu de "Reopen Drive"
}

// ... (importBackup, handleImportFile avec messages de confirmation français)

// =============================================
// PART 2: diary-pdf.js (Fonctionnalité d'export PDF)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Cuir Classique',   emoji:'📕' },
  { id:'floral',     name:'Floral Vintage',   emoji:'🌸' },
  { id:'minimalist', name:'Minimaliste Moderne', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustique',   emoji:'📦' },
  { id:'rosegold',   name:'Or Rose Élégant',  emoji:'🌹' },
  { id:'botanical',  name:'Nature Botanique', emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Heureux', '😔':'Triste', '😤':'En colère', '😰':'Anxieux',
  '😌':'Calme', '🤩':'Excité', '😴':'Fatigué', '🤔':'Pensif'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('fr-FR', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML avec texte de pied de page français :
// "Écrit avec WebNotePad — webnotepad.github.io"
// Fallback de titre : 'Entrée sans titre')

// ... (generatePDF avec fallback de nom de fichier 'entree-journal' et alertes françaises)

// ... (initPDF garde la même structure)

// Initialisation combinée
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
