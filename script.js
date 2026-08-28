const people = [
  ['الملك خوفو','الحاكم الأعلى','photos/farao-03.jpeg'],
  ['كليوباترا','أميرة المملكة','photos/farao-02.jpeg'],
  ['أمنحوتب الثالث','الوزير الأعظم','photos/farao-01.jpeg'],
  ['تحتمس الثالث','قائد الحرس الملكي','photos/farao-04.jpeg'],
  ['توت عنخ آمون','كبير المهندسين','photos/farao-05.jpeg'],
  ['رمسيس الثاني','قائد الجيوش','photos/farao-06.jpeg'],
  ['نفرتيتي','أميرة المملكة','photos/farao-07.jpeg'],
  ['أبو الهول','رئيس الحرس','photos/farao-08.jpeg'],
  ['حتشبسوت','أميرة المملكة','photos/farao-09.jpeg']
];

const gallery = document.querySelector('#gallery');
const search = document.querySelector('#search');
let slideIndex = 0;
let isPlaying = false;
let timer;

function filteredPeople(){
  const query = search.value.toLowerCase();
  return people.filter(person => person[0].toLowerCase().includes(query) || person[1].toLowerCase().includes(query));
}

function restartTimer(){
  clearTimeout(timer);
  if(isPlaying && filteredPeople().length > 1) timer = setTimeout(() => { slideIndex++; render(); }, 5000);
}

function render(){
  const visible = filteredPeople();
  document.querySelector('#count').textContent = `${visible.length} ${visible.length === 1 ? 'فرعون' : 'فراعنة'}`;
  if(!visible.length){ gallery.innerHTML='<p>لم يتم العثور على أي فرعون.</p>'; return; }
  slideIndex = ((slideIndex % visible.length) + visible.length) % visible.length;
  const person = visible[slideIndex];
  gallery.className = 'gallery slideshow';
  gallery.innerHTML = `<div class="slide-shell"><img class="slide-image" src="${person[2]}" alt="صورة ${person[0]}" tabindex="0" role="button" aria-label="اضغط لبدء عرض الصور"><div class="slide-details"><span class="card-badge">المرتبة ${slideIndex + 1}</span><h3>${person[0]}</h3><p>${person[1]}</p>${!isPlaying?'<small class="start-hint">اضغط على الصورة لبدء العرض التلقائي</small>':''}</div><div class="slide-controls"><button class="slide-arrow" data-action="prev" aria-label="الصورة السابقة">‹</button><div class="slide-dots">${visible.map((_,i)=>`<button class="slide-dot ${i===slideIndex?'active':''}" data-index="${i}" aria-label="الصورة ${i+1}"></button>`).join('')}</div><button class="slide-arrow" data-action="next" aria-label="الصورة التالية">›</button></div><button class="pause-button" data-action="pause">${isPlaying?'إيقاف العرض':'تشغيل العرض'}</button></div>`;
  const start = () => { if(!isPlaying){ isPlaying=true; render(); } };
  gallery.querySelector('.slide-image').addEventListener('click', start);
  gallery.querySelector('.slide-image').addEventListener('keydown', event => { if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); start(); } });
  gallery.querySelectorAll('[data-action="prev"]').forEach(button => button.addEventListener('click',()=>{slideIndex--;render()}));
  gallery.querySelectorAll('[data-action="next"]').forEach(button => button.addEventListener('click',()=>{slideIndex++;render()}));
  gallery.querySelectorAll('.slide-dot').forEach(button => button.addEventListener('click',()=>{slideIndex=Number(button.dataset.index);render()}));
  gallery.querySelector('[data-action="pause"]').addEventListener('click',()=>{isPlaying=!isPlaying;render()});
  restartTimer();
}

search.addEventListener('input',()=>{slideIndex=0;render()});
render();
