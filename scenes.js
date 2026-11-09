/* Paisajes, horas del día y efectos — cada nivel es distinto. Junta 3 by Julián Lenis */
(function(root){
'use strict';
function rng(seed){let a=seed>>>0;return function(){a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const W=390,H=844;
const TIMES=[
 {id:'amanecer',name:'al amanecer',sky:['#ffb6a6','#ffe3b8'],sun:{x:70,y:330,r:46,c:'#fff3c4',g:'#ffd18a'},tint:['#ff9a7a',.18]},
 {id:'dia',name:'de día',sky:['#4fb8f2','#c8eeff'],sun:{x:310,y:120,r:38,c:'#fffbe0',g:'#fff2a8'},tint:null},
 {id:'atardecer',name:'al atardecer',sky:['#5b2a6e','#ff8a5c'],sun:{x:300,y:360,r:58,c:'#ffd27a',g:'#ff8a4c'},tint:['#ff6a4a',.22]},
 {id:'noche',name:'de noche',sky:['#0b1640','#3b2f78'],moon:{x:300,y:120,r:30},tint:['#10184a',.48]}];
// paisajes: devuelven las capas de tierra (sin cielo)
function ridge(r,y0,amp,step){let d=`M0 ${H} L0 ${y0}`;for(let x=0;x<=W+step;x+=step){d+=` L${x} ${y0-r()*amp}`;}return d+` L${W} ${H}Z`;}
function hills(r,y0,amp){let d=`M0 ${H} L0 ${y0}`;let x=0;while(x<W){const w=120+r()*120;d+=` Q${x+w/2} ${y0-amp*(0.5+r()*0.6)} ${x+w} ${y0+r()*20-10}`;x+=w;}return d+` L${W} ${H}Z`;}
const pine=(x,y,s,c,snow)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="0" width="6" height="14" fill="#5a3a22"/><path d="M0 -46 L18 -10 L-18 -10Z M0 -30 L22 4 L-22 4Z" fill="${c}"/>${snow?'<path d="M0 -46 L8 -30 L-8 -30Z" fill="#fff"/>':''}</g>`;
const LANDS=[
 {id:'montanas',name:'Montañas',icon:'⛰️',draw:(r,night)=>`<path d="${ridge(r,560,140,60)}" fill="#8aa1c8"/><path d="${ridge(r,640,120,45)}" fill="#5f7fa8"/><path d="${hills(r,720,60)}" fill="#3f8a5a"/><path d="${hills(r,790,40)}" fill="#2f6e46"/>`},
 {id:'playa',name:'Playa',icon:'🏖️',draw:(r,night)=>`<rect y="560" width="${W}" height="200" fill="#2aa6c9"/><path d="M0 600 Q100 590 200 600 T390 600" stroke="#bff0ff" stroke-width="3" fill="none" opacity=".6"/><path d="M0 650 Q100 640 200 650 T390 650" stroke="#bff0ff" stroke-width="3" fill="none" opacity=".5"/><path d="M0 ${H} L0 720 Q200 680 390 730 L390 ${H}Z" fill="#f4d79a"/><g transform="translate(330 740)"><path d="M0 0 Q-10 -90 10 -170" stroke="#7a4e2a" stroke-width="12" fill="none"/><g fill="#2e9d5a"><path d="M10 -170 Q-40 -190 -70 -150 Q-30 -175 10 -165Z"/><path d="M10 -170 Q60 -200 90 -150 Q50 -178 10 -165Z"/><path d="M10 -170 Q-10 -220 -50 -225 Q-5 -200 8 -168Z"/><path d="M10 -170 Q40 -225 75 -215 Q35 -205 12 -168Z"/></g></g>`},
 {id:'colinas',name:'Colinas',icon:'🌄',draw:(r)=>{let f='';for(let i=0;i<26;i++)f+=`<circle cx="${r()*W}" cy="${730+r()*110}" r="3.5" fill="${['#ffe066','#ff8fab','#fff'][i%3]}"/>`;
   return `<path d="${hills(r,600,90)}" fill="#9fd47a"/><path d="${hills(r,680,70)}" fill="#6fbf5a"/><g transform="translate(70 640)"><rect x="-5" y="-60" width="10" height="60" fill="#eee"/><g fill="#fff" transform="translate(0 -60) rotate(${r()*90})"><rect x="-2" y="-40" width="4" height="40"/><rect x="-2" y="0" width="4" height="40"/><rect x="-40" y="-2" width="40" height="4"/><rect x="0" y="-2" width="40" height="4"/></g></g><path d="${hills(r,760,50)}" fill="#4fa64a"/>${f}`;}},
 {id:'ciudad',name:'Ciudad',icon:'🏙️',draw:(r,night)=>{let b='';let x=0;while(x<W){const w=30+r()*40,h=120+r()*220,c=['#5a6b8c','#6c5a8c','#4a5a7a','#7a6a9a'][Math.floor(r()*4)];b+=`<rect x="${x}" y="${760-h}" width="${w}" height="${h+90}" fill="${c}"/>`;
   for(let yy=760-h+12;yy<740;yy+=22)for(let xx=x+6;xx<x+w-10;xx+=14)if(r()<(night?0.55:0.3))b+=`<rect x="${xx}" y="${yy}" width="7" height="10" fill="${night?'#ffe08a':'#cfe7ff'}" opacity=".9"/>`;x+=w+2;}
   return `<path d="${ridge(r,600,60,40)}" fill="#9aa6c8" opacity=".6"/>${b}<rect y="760" width="${W}" height="90" fill="#3b3f52"/><rect y="800" width="${W}" height="6" fill="#ffd34a" opacity=".6"/>`;}},
 {id:'desierto',name:'Desierto',icon:'🏜️',draw:(r)=>{const cac=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#3f9a5a"><rect x="-8" y="-80" width="16" height="80" rx="8"/><rect x="-28" y="-55" width="12" height="30" rx="6"/><rect x="-28" y="-30" width="24" height="10" rx="5"/><rect x="16" y="-65" width="12" height="30" rx="6"/><rect x="4" y="-40" width="24" height="10" rx="5"/></g>`;
   return `<path d="${hills(r,620,60)}" fill="#f2c27a"/><path d="M200 620 L260 520 L320 620Z" fill="#d9a35a"/><path d="${hills(r,700,50)}" fill="#e9ad5e"/><path d="${hills(r,780,40)}" fill="#d9944a"/>${cac(60,760,1)}${cac(340,800,0.8)}`;}},
 {id:'bosque',name:'Bosque',icon:'🌲',draw:(r)=>{let t='';for(let i=0;i<16;i++)t+=pine(r()*W,640+r()*40,1.2+r()*0.6,'#2f7a4a');let t2='';for(let i=0;i<12;i++)t2+=pine(r()*W,760+r()*40,1.8+r()*0.6,'#1f5e38');
   return `<path d="${hills(r,620,80)}" fill="#6aa66a"/>${t}<path d="${hills(r,740,50)}" fill="#3f8a4a"/>${t2}`;}},
 {id:'nieve',name:'Nieve',icon:'🏔️',draw:(r)=>{let t='';for(let i=0;i<10;i++)t+=pine(r()*W,740+r()*50,1.5+r()*0.6,'#2f6a5a',true);
   return `<path d="M-20 640 L90 470 L200 640Z" fill="#a9bcd9"/><path d="M60 518 L90 470 L120 518 L105 510 L90 524 L75 510Z" fill="#fff"/><path d="M150 650 L290 430 L430 650Z" fill="#8ea4c8"/><path d="M252 490 L290 430 L328 490 L310 480 L290 498 L270 480Z" fill="#fff"/><path d="${hills(r,700,40)}" fill="#eef4ff"/>${t}<path d="${hills(r,800,25)}" fill="#ffffff"/>`;}},
 {id:'pueblo',name:'Pueblo del Mediterráneo',icon:'🏘️',draw:(r,night)=>{let h='';for(let i=0;i<14;i++){const x=10+r()*340,y=600+r()*90,w=26+r()*26;h+=`<rect x="${x}" y="${y}" width="${w}" height="${w*0.8}" fill="#fffaf0"/><rect x="${x+w*0.35}" y="${y+w*0.35}" width="${w*0.25}" height="${w*0.3}" fill="${night?'#ffd76a':'#3a7bd5'}"/><path d="M${x-3} ${y} L${x+w/2} ${y-10} L${x+w+3} ${y}Z" fill="#d8643a"/>`;}
   return `<rect y="560" width="${W}" height="120" fill="#2b8fd0"/><path d="M0 ${H} L0 640 Q120 560 240 600 T390 620 L390 ${H}Z" fill="#c9a26a"/>${h}<path d="${hills(r,770,30)}" fill="#7aa64a"/>`;}},
 {id:'lago',name:'Lago',icon:'🏞️',draw:(r)=>{let re='';for(let i=0;i<18;i++){const x=r()*W;re+=`<path d="M${x} 800 q${3-r()*6} -40 ${4-r()*8} -60" stroke="#4a7a3a" stroke-width="3" fill="none"/>`;}
   return `<path d="${ridge(r,600,110,55)}" fill="#7f9bc4"/><path d="${hills(r,640,40)}" fill="#5a9a5a"/><rect y="650" width="${W}" height="110" fill="#5bb0d8"/><path d="M40 690 H160 M220 720 H350 M90 740 H200" stroke="#d6f2ff" stroke-width="2" opacity=".7"/><path d="${hills(r,780,30)}" fill="#4a8a3a"/>${re}`;}},
 {id:'selva',name:'Selva',icon:'🌴',draw:(r)=>{let l='';for(let i=0;i<22;i++){const x=r()*W,y=650+r()*160,s=0.7+r()*0.9;l+=`<g transform="translate(${x} ${y}) scale(${s}) rotate(${r()*60-30})" fill="${['#2f8a3a','#3fa34a','#1f6e2e'][i%3]}"><path d="M0 0 Q-40 -30 -60 -80 Q-10 -60 0 0Z"/><path d="M0 0 Q40 -30 60 -80 Q10 -60 0 0Z"/><path d="M0 0 Q-5 -50 0 -100 Q8 -50 0 0Z"/></g>`;}
   return `<path d="${hills(r,600,120)}" fill="#3f8a4a"/><path d="M300 560 Q310 610 300 700" stroke="#cfefff" stroke-width="14" fill="none" opacity=".8"/>${l}`;}}];
const FX=[
 {id:'hojas',name:'hojas al viento',emo:['🍂','🍁'],mode:'fall'},
 {id:'mariposas',name:'mariposas',emo:['🦋'],mode:'flutter'},
 {id:'pajaros',name:'pájaros',mode:'birds'},
 {id:'globos',name:'globos',emo:['🎈'],mode:'rise'},
 {id:'petalos',name:'pétalos',emo:['🌸'],mode:'fall'},
 {id:'burbujas',name:'burbujas',mode:'bubbles'},
 {id:'nubes',name:'nubes',mode:'clouds'}];
const FX_NIGHT=[{id:'estrellas',name:'estrellas fugaces',mode:'shooting'},{id:'luciernagas',name:'luciérnagas',mode:'fireflies'}];
const FX_SNOW={id:'nevada',name:'nevada',mode:'snow'};
function baseFx(i){const land=LANDS[i%LANDS.length],time=TIMES[(i+Math.floor(i/LANDS.length))%TIMES.length];return fxFor(i,land,time,null);}
function fxFor(i,land,time,prev){
  if(land.id==='nieve')return FX_SNOW;
  if(time.id==='noche'){let f=FX_NIGHT[Math.floor(i/4)%2];if(prev&&prev.id===f.id)f=FX_NIGHT.find(x=>x!==f);return f;}
  const water=land.id==='playa'||land.id==='lago'||land.id==='pueblo';
  for(let k=0;k<FX.length;k++){const f=FX[(i*3+k)%FX.length];if(f.id==='burbujas'&&!water)continue;if(prev&&prev.id===f.id)continue;return f;}
  return FX[0];
}
function sceneFor(n){
  const i=n-1,land=LANDS[i%LANDS.length];
  const time=TIMES[(i+Math.floor(i/LANDS.length))%TIMES.length];
  const fx=fxFor(i,land,time,i>0?baseFx(i-1):null);
  return {n,land,time,fx,label:`${land.icon} ${land.name} ${time.name}`};
}
function sceneSVG(sc){
  const r=rng(sc.n*131+7),t=sc.time,night=t.id==='noche';
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky[0]}"/><stop offset=".75" stop-color="${t.sky[1]}"/></linearGradient>`+
   `<radialGradient id="glow"><stop offset="0" stop-color="${t.sun?t.sun.g:'#fff'}" stop-opacity=".9"/><stop offset="1" stop-color="${t.sun?t.sun.g:'#fff'}" stop-opacity="0"/></radialGradient></defs>`+
   `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  if(night){for(let k=0;k<70;k++)s+=`<circle cx="${r()*W}" cy="${r()*560}" r="${0.6+r()*1.6}" fill="#fff" opacity="${0.4+r()*0.6}"/>`;
    s+=`<circle cx="${t.moon.x}" cy="${t.moon.y}" r="${t.moon.r*2.2}" fill="#fff" opacity=".08"/><circle cx="${t.moon.x}" cy="${t.moon.y}" r="${t.moon.r}" fill="#fdf6d8"/><circle cx="${t.moon.x+12}" cy="${t.moon.y-8}" r="${t.moon.r}" fill="${t.sky[0]}" opacity=".0"/><circle cx="${t.moon.x-8}" cy="${t.moon.y+6}" r="5" fill="#e8dfb8"/><circle cx="${t.moon.x+9}" cy="${t.moon.y-9}" r="3.5" fill="#e8dfb8"/>`;}
  else{const u=t.sun;s+=`<circle cx="${u.x}" cy="${u.y}" r="${u.r*3}" fill="url(#glow)"/><circle cx="${u.x}" cy="${u.y}" r="${u.r}" fill="${u.c}"/>`;
    for(let k=0;k<3;k++){const cx=r()*W,cy=80+r()*300,sc2=0.7+r()*0.8;s+=`<g opacity=".85" transform="translate(${cx} ${cy}) scale(${sc2})" fill="#fff"><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="18" cy="-8" rx="20" ry="14"/><ellipse cx="-16" cy="-5" rx="16" ry="11"/></g>`;}}
  s+=`<g>${sc.land.draw(r,night)}</g>`;
  if(t.tint)s+=`<rect y="380" width="${W}" height="${H}" fill="${t.tint[0]}" opacity="${t.tint[1]}"/>`;
  return s+'</svg>';
}
/* partículas animadas (CSS), detrás de las fichas */
function fxHTML(sc){
  const r=rng(sc.n*977+3),m=sc.fx.mode;let h='';
  const N={fall:12,flutter:6,rise:7,birds:5,bubbles:14,clouds:4,snow:40,shooting:3,fireflies:18}[m]||8;
  for(let k=0;k<N;k++){
    const x=Math.round(r()*100),d=(6+r()*8).toFixed(1),dl=(-r()*14).toFixed(1),sz=(14+r()*12).toFixed(0);
    const st=`left:${x}%;animation-duration:${d}s;animation-delay:${dl}s;font-size:${sz}px`;
    if(m==='fall'||m==='rise'||m==='flutter'){const e=sc.fx.emo[k%sc.fx.emo.length];h+=`<i class="fx ${m}" style="${st}">${e}</i>`;}
    else if(m==='snow')h+=`<i class="fx snow" style="left:${x}%;animation-duration:${(5+r()*7).toFixed(1)}s;animation-delay:${dl}s;width:${(3+r()*5).toFixed(0)}px;height:${(3+r()*5).toFixed(0)}px"></i>`;
    else if(m==='bubbles')h+=`<i class="fx bubble" style="left:${x}%;animation-duration:${d}s;animation-delay:${dl}s;width:${(6+r()*14).toFixed(0)}px;height:${(6+r()*14).toFixed(0)}px"></i>`;
    else if(m==='birds')h+=`<i class="fx bird" style="top:${(5+r()*35).toFixed(0)}%;animation-duration:${(12+r()*10).toFixed(1)}s;animation-delay:${dl}s"><svg viewBox="0 0 40 16" width="${26+r()*14|0}"><path d="M0 8 Q10 0 20 8 Q30 0 40 8" stroke="#2b2b3b" stroke-width="3" fill="none"/></svg></i>`;
    else if(m==='clouds')h+=`<i class="fx cloud" style="top:${(4+r()*40).toFixed(0)}%;animation-duration:${(30+r()*30).toFixed(0)}s;animation-delay:${(-r()*40).toFixed(0)}s;transform:scale(${(0.6+r()*0.8).toFixed(2)})"></i>`;
    else if(m==='shooting')h+=`<i class="fx shoot" style="left:${(20+r()*80).toFixed(0)}%;top:${(r()*30).toFixed(0)}%;animation-duration:${(4+r()*5).toFixed(1)}s;animation-delay:${(-r()*6).toFixed(1)}s"></i>`;
    else if(m==='fireflies')h+=`<i class="fx firefly" style="left:${x}%;top:${(45+r()*50).toFixed(0)}%;animation-duration:${(3+r()*4).toFixed(1)}s;animation-delay:${dl}s"></i>`;
  }
  return h;
}
const API={LANDS,TIMES,sceneFor,sceneSVG,fxHTML};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.Scenes=API;
})(this);
