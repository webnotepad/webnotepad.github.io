// =============================================
// OSA 1: diary.js (Päiväkirjan päätoiminnot)
// =============================================
(function(){
'use strict';

const SK = 'webnotepad_diary';
const STREAK_SK = 'webnotepad_diary_streak';

const PROMPTS = [
  "Mikä sai sinut hymyilemään tänään?",
  "Kuvaile haaste, jonka kohtasit äskettäin ja miten käsittelit sen.",
  "Mitkä kolme asiaa, joista olet kiitollinen juuri nyt?",
  "Jos voisit elää uudelleen yhden hetken tältä viikolta, mikä se olisi?",
  "Mikä tunne hallitsi päivääsi ja miksi?",
  "Mitä toivoisit tehneesi toisin tänään?",
  "Kuvaile jotain kaunista, jonka huomasit tänään.",
  "Mitä tavoitetta kohti työskentelet ja miten olet edistynyt?",
  "Kirjoita jostakusta, joka vaikutti sinuun äskettäin.",
  "Mitä odotat eniten tällä viikolla?",
  "Minkä opetuksen tämä päivä antoi sinulle?",
  "Kuvaile ihannepäiväsi yksityiskohtaisesti.",
  "Mikä pelko pidättelee sinua juuri nyt?",
  "Kirjoita muistosta, joka saa sinut tuntemaan lämpöä.",
  "Mitä kertoisit nuoremmalle itsellesi tänään?",
  "Mistä olet ylpeä saavutettuasi sen äskettäin?",
  "Miten huolehdit itsestäsi tänään?",
  "Mikä kirja, laulu tai elokuva liikutti sinua äskettäin ja miksi?",
  "Kuvaile keskustelu, joka jäi mieleesi.",
  "Miltä täydellinen versionsi huomisesta näyttää?"
];

// ... (Loput koodirakenteesta pysyy identtisenä, mutta suomalaisilla käyttöliittymämerkkijonoilla)

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

// ... (function today() pysyy samana)

function formatDate(d){
  if(!d) return '';
  const dt = new Date(d+'T12:00:00');
  return dt.toLocaleDateString('fi-FI',{month:'short',day:'numeric',year:'numeric'});
}

// ... (loadActive, persistActive, switchEntry, newEntry, deleteEntry pysyvät suunnilleen samoina, vain suomalaiset toast-viestit)

function toast(msg,d=2500){
  // Suomalaiset viestit kutsuissa:
  // '📝 Uusi merkintä luotu'
  // '❌ Viimeistä merkintää ei voi poistaa.'
  // '🗑 Merkintä poistettu.'
  // '💾 Tallennettu!'
  // '⬇ Päiväkirja viety!'
  // '⚠️ Ei merkintöjä varmuuskopioitavaksi.'
  // '✅ Palautettu — X uutta, Y päivitettyä.'
}

// ... (updateStreak, exportAll, insertPrompt, initFAQ, initScrollAnim pysyvät samankaltaisina suomalaisella tekstillä)

// =============================================
// Google Drive -varmuuskopio ohje-overlaylla
// =============================================
function showDriveOverlay(filename, driveOpened){
  // ... overlay innerHTML suomalaisella tekstillä:
  // "Varmuuskopio valmis Google Driveen"
  // "1. Varmuuskopiotiedostosi ladattiin automaattisesti."
  // "2. Google Drive -välilehti avattiin." / "Avaa drive.google.com uudessa välilehdessä."
  // "3. Vedä ladattu tiedosto Driveen tallentaaksesi sen pilveen."
  // "4. Palauttaaksesi myöhemmin klikkaa ⬆ Tuo ja valitse tämä tiedosto."
  // "💡 Vinkki: Toista tämä varmuuskopio muutaman viikon välein pitääksesi päiväkirjasi turvassa."
  // "Selvä" sijaan "Got it"
  // "Avaa Google Drive uudelleen" sijaan "Reopen Drive"
}

// ... (importBackup, handleImportFile suomalaisilla vahvistusviesteillä)

// =============================================
// OSA 2: diary-pdf.js (PDF-viennin toiminnallisuus)
// =============================================

const TEMPLATES = [
  { id:'classic',    name:'Klassinen Nahka',  emoji:'📕' },
  { id:'floral',     name:'Kukkainen Vintage', emoji:'🌸' },
  { id:'minimalist', name:'Minimalistinen Moderni', emoji:'⬜' },
  { id:'kraft',      name:'Kraft Rustiikkinen', emoji:'📦' },
  { id:'rosegold',   name:'Elegantti Rosekulta', emoji:'🌹' },
  { id:'botanical',  name:'Luonto Botaaninen', emoji:'🍃' }
];

const MOOD_LABELS = {
  '😊':'Iloinen', '😔':'Surullinen', '😤':'Vihainen', '😰':'Ahdistunut',
  '😌':'Rauhallinen', '🤩':'Innostunut', '😴':'Väsynyt', '🤔':'Mietteliäs'
};

function formatDatePretty(d){
  if(!d) return '';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('fi-FI', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

// ... (buildPrintHTML suomalaisella alatunnistetekstillä:
// "Kirjoitettu WebNotePadilla — webnotepad.github.io"
// Otsikon fallback: 'Nimetön merkintä')

// ... (generatePDF suomalaisella tiedostonimen fallbackilla 'paivakirja-merkinta' ja suomalaisilla hälytyksillä)

// ... (initPDF pysyy samana rakenteena)

// Yhdistetty alustus
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
