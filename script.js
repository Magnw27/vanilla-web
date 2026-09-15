const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),700));
$('#year').textContent=new Date().getFullYear();
const progress=$('.progress span');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${h?scrollY/h:0})`};
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
const reveals=$$('.reveal');
if(!reduced&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;io.observe(el)})}else reveals.forEach(e=>e.classList.add('visible'));
const glow=$('.cursor-glow');
if(glow&&!reduced&&matchMedia('(pointer:fine)').matches){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.1;y+=(ty-y)*.1;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(loop)};loop()}
if(!reduced&&matchMedia('(pointer:fine)').matches){$$('.magnetic').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),mx=(e.clientX-r.left-r.width/2)/r.width,my=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate(${mx*12}px,${my*12}px)`});el.addEventListener('pointerleave',()=>el.style.transform=''));
$$('.magnetic-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*2.5}deg) translateY(-4px)`});el.addEventListener('pointerleave',()=>el.style.transform=''))}
const menu=$('.menu');menu?.addEventListener('click',()=>{document.body.classList.toggle('menu-open');document.body.classList.contains('menu-open')?document.querySelector('nav').style.cssText='display:flex;position:fixed;inset:80px 6vw auto;flex-direction:column;gap:22px;font-size:18px;padding:30px;background:#0b0b0f;border:1px solid #29292e;z-index:90':document.querySelector('nav').style.cssText='' });
$$('nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:reduced?'auto':'smooth'})}}));
