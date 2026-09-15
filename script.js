(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
const fine=window.matchMedia?.('(pointer:fine)').matches??false;
const finishLoader=()=>$('.loader')?.classList.add('done');
if(document.readyState==='complete')setTimeout(finishLoader,700);else addEventListener('load',()=>setTimeout(finishLoader,700),{once:true});
setTimeout(finishLoader,2200);
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
const progress=$('.progress span'),nav=$('.nav');
let lastY=scrollY,scrollTick=false;
const updateScroll=()=>{const h=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${h>0?scrollY/h:0})`;if(nav){nav.classList.toggle('scrolled',scrollY>30);if(!reduced){const dy=scrollY-lastY;if(Math.abs(dy)>3&&scrollY>100)nav.classList.toggle('hidden',dy>0);if(scrollY<80)nav.classList.remove('hidden');}}lastY=scrollY;scrollTick=false};
addEventListener('scroll',()=>{if(!scrollTick){requestAnimationFrame(updateScroll);scrollTick=true}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
const reveals=$$('.reveal');
if(!reduced&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -7%'});reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%5,4)*80}ms`;io.observe(el)})}else reveals.forEach(e=>e.classList.add('visible'));
const glow=$('.cursor-glow');
if(glow&&!reduced&&fine){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.09;y+=(ty-y)*.09;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(loop)};loop()}
if(!reduced&&fine){
 $$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),mx=(e.clientX-r.left-r.width/2)/r.width,my=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate(${mx*12}px,${my*12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
 $$('.magnetic-card').forEach(el=>{const light=document.createElement('span');light.className='tilt-light';el.appendChild(light);el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateX(${y*-3.5}deg) rotateY(${x*3.5}deg) translateY(-6px)`;light.style.left=e.clientX-r.left+'px';light.style.top=e.clientY-r.top+'px'});el.addEventListener('pointerleave',()=>{el.style.transform='';light.style.left='50%';light.style.top='50%'})});
}
const menu=$('.menu'),mobileNav=$('nav');menu?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');mobileNav?.classList.toggle('mobile-open',open)});$$('nav a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');mobileNav?.classList.remove('mobile-open')}));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:reduced?'auto':'smooth'})}}));
const sections=$$('main section[id]'),links=$$('nav a');if('IntersectionObserver'in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>so.observe(s))}
if(!reduced){
 document.addEventListener('click',e=>{const target=e.target.closest('.button,.contact-link');if(!target)return;const r=target.getBoundingClientRect(),rip=document.createElement('i');rip.className='ripple';rip.style.left=e.clientX-r.left+'px';rip.style.top=e.clientY-r.top+'px';target.appendChild(rip);setTimeout(()=>rip.remove(),750)});
 if(fine){let lastParticle=0;addEventListener('pointermove',e=>{const now=performance.now();if(now-lastParticle<90)return;lastParticle=now;const p=document.createElement('i');p.className='particle';p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';p.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(p);setTimeout(()=>p.remove(),6000)},{passive:true})}
 $$('.hero h1,.statement h2,.section-head h2,.about h2,.contact h2').forEach((el,idx)=>{el.style.willChange='transform';el.addEventListener('pointermove',e=>{if(!fine)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`translate(${x*4}px,${y*3}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
 let raf=0;addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const y=scrollY;$$('.orb').forEach((o,i)=>o.style.translate=`0 ${y*(i?.025:-.035)}px`);const hero=$('.hero-copy');if(hero&&y<innerHeight)hero.style.transform=`translate3d(0,${y*.08}px,0)`})},{passive:true});
}
})();
