const slides = [...document.querySelectorAll('.slide')];
let current = 0;
const titles = [
  'Cover','Kenapa Akun Sekolah?','Belajar Online','Aktivasi Akun','Catatan Login','Pastikan Akun Benar',
  'Apa itu Classroom?','Cara Join Classroom','Cek Tugas','Peran Orang Tua','Penutup'
];

function renderNav(){
  const nav = document.getElementById('navList');
  nav.innerHTML = slides.map((_,i)=>`
    <button onclick="goTo(${i})" class="w-full text-left px-4 py-3 rounded-xl transition ${i===current?'bg-blue-600 text-white':'hover:bg-white/10 text-slate-300'}">
      <span class="text-xs opacity-60 mr-2">${String(i+1).padStart(2,'0')}</span>${titles[i] || 'Slide'}
    </button>`).join('');
}

function update(){
  slides.forEach((s,i)=>s.classList.toggle('active',i===current));
  document.getElementById('counter').textContent = `${current+1} / ${slides.length}`;
  document.getElementById('progress').style.width = `${((current+1)/slides.length)*100}%`;
  renderNav();
}

function nextSlide(){ if(current < slides.length-1){ current++; update(); } }
function prevSlide(){ if(current > 0){ current--; update(); } }
function goTo(i){ current=i; update(); closeSidebar(); }

function openSidebar(){ document.body.classList.add('sidebar-open'); }
function closeSidebar(){ document.body.classList.remove('sidebar-open'); }

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight' || e.key==='PageDown' || e.key===' ') nextSlide();
  if(e.key==='ArrowLeft' || e.key==='PageUp') prevSlide();
  if(e.key==='Escape') closeSidebar();
});

function toggleFullscreen(){
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

function celebrate(){
  const colors=['#facc15','#fb7185','#60a5fa','#34d399','#c084fc'];
  for(let i=0;i<80;i++){
    const c=document.createElement('div');
    c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay=(Math.random()*.7)+'s';
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3200);
  }
}
update();


