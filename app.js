document.documentElement.classList.add('js');
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const lightbox=document.querySelector('.lightbox'),photo=lightbox?.querySelector('[data-lightbox-image]');
let current=0,trigger=null;
const visibleLinks=()=>[...document.querySelectorAll('[data-lightbox]')].filter(e=>!e.closest('[hidden]'));
function showPhoto(index){const links=visibleLinks();current=(index+links.length)%links.length;const link=links[current];photo.src=link.href;photo.alt=link.querySelector('img').alt;lightbox.querySelector('figcaption').textContent=photo.alt;lightbox.querySelector('[data-lightbox-count]').textContent=(current+1)+' / '+links.length;}
document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',e=>{if(!lightbox||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();trigger=link;showPhoto(visibleLinks().indexOf(link));lightbox.showModal();document.body.classList.add('modal-open');}));
lightbox?.querySelector('[data-previous]').addEventListener('click',()=>showPhoto(current-1));
lightbox?.querySelector('[data-next]').addEventListener('click',()=>showPhoto(current+1));
document.addEventListener('keydown',e=>{if(lightbox?.open&&e.key==='ArrowLeft')showPhoto(current-1);if(lightbox?.open&&e.key==='ArrowRight')showPhoto(current+1);});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('[data-dialog-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(dialog===lightbox)trigger?.focus();});});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('.portfolio-entry').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});const status=document.querySelector('[data-gallery-count]');if(status)status.textContent=count+' zdjęć';}));
