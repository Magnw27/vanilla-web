(()=>{
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const finishLoader=()=>$('.loader')?.classList.add('done');
  if(document.readyState==='complete') setTimeout(finishLoader,700);
  else window.addEventListener('load',()=>setTimeout(finishLoader,700),{once:true});
  setTimeout(finishLoader,2400);

  const year=$('#year');
  if(year) year.textContent=new Date().getFullYear();

  const progress=$('.progress span');
  const updateProgress=()=>{
    if(!progress)return;
    const h=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.transform=`scaleX(${h>0?window.scrollY/h:0})`;
  };
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress);
  updateProgress();

  const reveals=$$('.reveal');
  if(!reduced&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}
    }),{threshold:.12,rootMargin:'0px 0px -8%'});
    reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;io.observe(el);});
  }else reveals.forEach(el=>el.classList.add('visible'));

  const fine=window.matchMedia?.('(pointer:fine)').matches ?? false;
  const glow=$('.cursor-glow');
  if(glow&&!reduced&&fine){
    let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    const loop=()=>{x+=(tx-x)*.1;y+=(ty-y)*.1;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(loop);};
    loop();
  }

  if(!reduced&&fine){
    $$('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),mx=(e.clientX-r.left-r.width/2)/r.width,my=(e.clientY-r.top-r.height/2)/r.height;
        el.style.transform=`translate(${mx*12}px,${my*12}px)`;
      });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
    $$('.magnetic-card').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.transform=`perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*2.5}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  const menu=$('.menu');
  const nav=$('nav');
  menu?.addEventListener('click',()=>{
    const open=document.body.classList.toggle('menu-open');
    if(nav) nav.classList.toggle('mobile-open',open);
  });
  $$('nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const target=$(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:reduced?'auto':'smooth'});}
  }));
})();
