(() => {
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('#navigation');
  menu?.addEventListener('click', () => { const on = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(on)); nav.classList.toggle('open', on); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));
  document.addEventListener('keydown', e => { if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');} });
  const filters = [...document.querySelectorAll('[data-filter]')];
  const works = [...document.querySelectorAll('[data-work]')];
  const count = document.querySelector('[data-count]');
  filters.forEach(b => b.addEventListener('click', () => {
    filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    works.forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter);
    if(count)count.textContent = `${works.filter(x=>!x.hidden).length} صور في المعرض`;
  }));
  const lightbox = document.querySelector('#lightbox'); let current=0, trigger;
  function showWork(index){
    const shown=works.filter(x=>!x.hidden); current=(index+shown.length)%shown.length;
    const fig=shown[current], image=fig.querySelector('img'), target=lightbox.querySelector('img');
    target.src=image.src;target.alt=image.alt;lightbox.querySelector('[data-caption]').textContent=fig.querySelector('figcaption').innerText;
    lightbox.querySelector('[data-position]').textContent=`${current+1} / ${shown.length}`;
  }
  works.forEach(w=>w.querySelector('button').addEventListener('click',e=>{trigger=e.currentTarget;showWork(works.filter(x=>!x.hidden).indexOf(w));lightbox.showModal();}));
  document.querySelector('[data-close]')?.addEventListener('click',()=>lightbox.close());
  lightbox?.addEventListener('close',()=>trigger?.focus());
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
  document.querySelector('[data-next]')?.addEventListener('click',()=>showWork(current+1));
  document.querySelector('[data-prev]')?.addEventListener('click',()=>showWork(current-1));
  lightbox?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showWork(current+1);if(e.key==='ArrowRight')showWork(current-1);});
  const form=document.querySelector('#enquiry');
  document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{ if(!form)return;form.elements.service.value=b.dataset.service;document.querySelector('#message-result').hidden=true;form.elements.service.focus({preventScroll:true});form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}));
  form?.addEventListener('input',()=>{document.querySelector('#message-result').hidden=true;});
  form?.addEventListener('submit',e=>{
    e.preventDefault();const rows=[`السلام عليكم، أرغب بالاستفسار لدى ${form.dataset.business}.`];
    for(const element of form.elements){if(!element.name||!element.value.trim())continue;rows.push(`${element.dataset.label}: ${element.value.trim()}`);}
    rows.push('أرجو إفادتي بالتفاصيل والتوفر والتكلفة.');
    const message=rows.join('\n');document.querySelector('#message-preview').textContent=message;
    document.querySelector('#whatsapp-ready').href=`https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(message)}`;
    const result=document.querySelector('#message-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  });
  document.querySelectorAll('input[type=date]').forEach(el=>{const d=new Date();el.min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});
  document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
  document.querySelector('[data-copy]')?.addEventListener('click',async()=>{const b=document.querySelector('[data-copy]'),s=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(b.dataset.copy);s.textContent='تم نسخ رابط الموقع.';}catch{s.textContent='يمكنك تحديد الرابط الظاهر ونسخه.';document.querySelector('#site-link')?.select();}});
})();
