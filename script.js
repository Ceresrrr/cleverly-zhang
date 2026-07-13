const body = document.body;
const langSwitch = document.querySelector('#langSwitch');
let lang = localStorage.getItem('cz-lang') || 'zh';

function setLanguage(next) {
  lang = next;
  body.classList.toggle('en', lang === 'en');
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh]').forEach((el) => {
    el.innerHTML = el.dataset[lang];
  });
  localStorage.setItem('cz-lang', lang);
}
setLanguage(lang);
langSwitch.addEventListener('click', () => setLanguage(lang === 'zh' ? 'en' : 'zh'));
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  observer.observe(el);
});

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
document.querySelectorAll('a,button,.orbit-card').forEach((el) => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});
function cursorFrame(){ rx += (mx-rx)*.12; ry += (my-ry)*.12; ring.style.transform=`translate(${rx}px,${ry}px)`; requestAnimationFrame(cursorFrame); }
cursorFrame();

const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resize(){ w=canvas.width=innerWidth*devicePixelRatio; h=canvas.height=innerHeight*devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); particles=Array.from({length:Math.min(65,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12})); }
function draw(){ ctx.clearRect(0,0,innerWidth,innerHeight); for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='#777';ctx.fillRect(p.x,p.y,1,1)} for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){ctx.strokeStyle=`rgba(120,120,120,${(1-d/110)*.12})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}requestAnimationFrame(draw)}
addEventListener('resize',resize);resize();draw();
