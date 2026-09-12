const works=window.PORTFOLIO_WORKS||[];
const grid=document.querySelector('[data-portfolio-grid]');
const filters=document.querySelector('[data-service-filter]');
const closeIcon=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>`;
const lightbox=document.createElement('dialog');
lightbox.className='work-lightbox';
lightbox.setAttribute('aria-label','Предпросмотр проекта');
lightbox.innerHTML=`<div class="work-lightbox-shell"><div class="work-lightbox-top"><span>Предпросмотр проекта</span><button class="work-lightbox-close" type="button" aria-label="Закрыть">${closeIcon}</button></div><div class="work-lightbox-stage"><img class="work-lightbox-image" alt=""></div><div class="work-lightbox-meta"><h3></h3><p></p><span></span></div></div>`;
document.body.append(lightbox);
const modalImage=lightbox.querySelector('.work-lightbox-image');
const modalTitle=lightbox.querySelector('h3');
const modalText=lightbox.querySelector('p');
const modalService=lightbox.querySelector('.work-lightbox-meta span');
let returnFocus=null;
function openWork(work,card){returnFocus=card;modalImage.src=work.src;modalImage.alt=`${work.title}: ${work.subtitle}`;modalTitle.textContent=work.title;modalText.textContent=work.subtitle;modalService.textContent=work.service;document.body.classList.add('lightbox-open');lightbox.showModal();lightbox.querySelector('.work-lightbox-close').focus()}
function closeWork(){if(lightbox.open)lightbox.close()}
lightbox.querySelector('.work-lightbox-close').addEventListener('click',closeWork);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeWork()});
lightbox.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');modalImage.removeAttribute('src');if(returnFocus)returnFocus.focus()});
if(grid&&works.length){grid.innerHTML=works.map((work,index)=>`<article class="real-project reveal" data-service="${work.service}" data-work-index="${index}" role="button" tabindex="0" aria-label="Открыть проект ${work.title}"><div class="real-project-visual"><img src="${work.src}" width="${work.width}" height="${work.height}" alt="${work.title}: ${work.subtitle}" loading="${index<2?'eager':'lazy'}" decoding="async"><span class="real-project-number">${String(index+1).padStart(2,'0')}</span></div><div class="real-project-meta"><h3>${work.title}</h3><p>${work.subtitle}</p><span>${work.service}</span></div></article>`).join('');const names=['Все',...new Set(works.map(w=>w.service))];filters.innerHTML=names.map((name,i)=>`<button type="button" class="${i===0?'is-active':''}" data-filter="${name}">${name}</button>`).join('');filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));grid.querySelectorAll('.real-project').forEach(card=>card.classList.toggle('is-hidden',b.dataset.filter!=='Все'&&card.dataset.service!==b.dataset.filter))});grid.addEventListener('click',e=>{const card=e.target.closest('.real-project');if(card)openWork(works[Number(card.dataset.workIndex)],card)});grid.addEventListener('keydown',e=>{const card=e.target.closest('.real-project');if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openWork(works[Number(card.dataset.workIndex)],card)}})}
