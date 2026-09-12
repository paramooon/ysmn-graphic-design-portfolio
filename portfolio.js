const works=window.PORTFOLIO_WORKS||[];
const grid=document.querySelector('[data-portfolio-grid]');
const filters=document.querySelector('[data-service-filter]');
if(grid&&works.length){
  grid.innerHTML=works.map((work,index)=>`<article class="real-project reveal" data-service="${work.service}"><div class="real-project-visual"><img src="${work.src}" width="${work.width}" height="${work.height}" alt="${work.title}: ${work.subtitle}" loading="${index<2?'eager':'lazy'}" decoding="async"><span class="real-project-number">${String(index+1).padStart(2,'0')}</span></div><div class="real-project-meta"><h3>${work.title}</h3><p>${work.subtitle}</p><span>${work.service}</span></div></article>`).join('');
  const names=['Все',...new Set(works.map(w=>w.service))];
  filters.innerHTML=names.map((name,i)=>`<button type="button" class="${i===0?'is-active':''}" data-filter="${name}">${name}</button>`).join('');
  filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));grid.querySelectorAll('.real-project').forEach(card=>card.classList.toggle('is-hidden',b.dataset.filter!=='Все'&&card.dataset.service!==b.dataset.filter));});
}
