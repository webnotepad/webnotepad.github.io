/* AI Image Prompts — popup, copy-to-clipboard, reading progress */
(function(){
  var modal=document.getElementById('apModal'); if(!modal) return;
  var $=function(id){return document.getElementById(id)};
  var pins=[].slice.call(document.querySelectorAll('.ap-pin')), cur=-1, last=null, toastT;
  function open(i){
    cur=(i+pins.length)%pins.length; var p=pins[cur], d=p.dataset;
    $('apmImg').src=p.querySelector('img').src; $('apmImg').alt=p.querySelector('img').alt;
    $('apmCat').textContent=d.cat; $('apmTitle').textContent=d.title; $('apmPrompt').textContent=d.prompt;
    $('apmAr').textContent='· --ar '+d.ar; $('apmCopy').textContent='📋 Copy Prompt'; $('apmCopy').classList.remove('done');
    if(modal.hidden){last=document.activeElement; modal.hidden=false; document.body.classList.add('ap-lock');} $('apmCopy').focus({preventScroll:true});
  }
  function close(){modal.hidden=true; document.body.classList.remove('ap-lock'); if(last&&last.focus) last.focus();}
  function toast(m){var t=$('apToast'); t.textContent=m; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){t.classList.remove('show')},2000);}
  function copy(){
    var text=pins[cur].dataset.prompt, btn=$('apmCopy');
    function ok(){btn.textContent='✓ Copied!'; btn.classList.add('done'); toast('Prompt copied ✓'); if(window.gtag) gtag('event','copy_prompt',{prompt_title:pins[cur].dataset.title});}
    function fallback(){var ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.cssText='position:fixed;opacity:0;top:0'; document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0,99999); try{document.execCommand('copy')?ok():toast('Press Ctrl/Cmd+C to copy')}catch(e){toast('Press Ctrl/Cmd+C to copy')} document.body.removeChild(ta);}
    if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(text).then(ok,fallback); else fallback();
  }
  pins.forEach(function(p,i){p.addEventListener('click',function(){open(i)})});
  $('apmClose').addEventListener('click',close); $('apmCopy').addEventListener('click',copy);
  $('apmPrev').addEventListener('click',function(){open(cur-1)}); $('apmNext').addEventListener('click',function(){open(cur+1)});
  modal.addEventListener('click',function(e){if(e.target===modal) close()});
  document.addEventListener('keydown',function(e){
    if(modal.hidden) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowLeft') open(cur-1); else if(e.key==='ArrowRight') open(cur+1);
    else if(e.key==='Tab'){var f=[].slice.call(modal.querySelectorAll('button')); var a=f.indexOf(document.activeElement); if(e.shiftKey&&a<=0){e.preventDefault();f[f.length-1].focus();} else if(!e.shiftKey&&a===f.length-1){e.preventDefault();f[0].focus();}}
  });
  var ts=0; modal.addEventListener('touchstart',function(e){ts=e.changedTouches[0].clientX},{passive:true});
  modal.querySelector('.ap-modal-img').addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-ts; if(Math.abs(dx)>60) open(cur+(dx<0?1:-1));},{passive:true});
  var bar=$('apBar'); if(bar) window.addEventListener('scroll',function(){var h=document.documentElement; bar.style.width=Math.min(100,h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%';},{passive:true});
})();
