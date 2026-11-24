/* Shared helpers for the Genshin tool pages. Place at site root. */
window.GD=(function(){
const $=id=>document.getElementById(id);
const f=n=>isFinite(n)?Math.round(n).toLocaleString('en-US'):'—';
const num=(id,d)=>{const v=parseFloat($(id).value);return isNaN(v)?(d||0):v;};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function toast(m){const t=$('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2200);}
function copy(text){return(navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(()=>toast('📋 Copied to clipboard'),()=>toast('Copy not supported on this browser'));}
function save(key,ids){try{const o={};ids.forEach(i=>{const e=$(i);if(e)o[i]=e.type==='checkbox'?e.checked:e.value;});localStorage.setItem(key,JSON.stringify(o));}catch(e){}}
function load(key){try{const o=JSON.parse(localStorage.getItem(key)||'null');if(!o)return;for(const k in o){const e=$(k);if(!e)continue;if(e.type==='checkbox')e.checked=o[k];else e.value=o[k];}}catch(e){}}
function faq(){document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);b.nextElementSibling.style.display=o?'none':'block';}));}
function debounce(fn,ms){let t;return()=>{clearTimeout(t);t=setTimeout(fn,ms||80);};}
return{$,f,num,clamp,toast,copy,save,load,faq,debounce};
})();
