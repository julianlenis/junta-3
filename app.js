/* Junta 3 by Julián Lenis */
'use strict';
const $=id=>document.getElementById(id);
const PRICES={undo:30,remove:60,shuffle:45};
const BNAME={undo:'Deshacer',remove:'Sacar 3',shuffle:'Mezclar'};
const BICON={undo:'↩️',remove:'⏏️',shuffle:'🔀'};
const MAXT=30;
let save=load();
function load(){let s={};try{s=JSON.parse(localStorage.getItem('j3_save')||'{}')}catch(e){}
  return Object.assign({level:1,coins:100,b:{undo:2,remove:1,shuffle:1},theme:'auto',sound:true,best:{}},s);}
function store(){localStorage.setItem('j3_save',JSON.stringify(save));refreshCoins();}
function themeFor(n){return save.theme==='auto'?THEMES[(n-1)%THEMES.length]:(THEMES.find(t=>t.id===save.theme)||THEMES[0]);}
function fmt(s){s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}

/* ---------- sonido ---------- */
let ac=null;
function tone(f,d,type,v,delay){if(!save.sound)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const t=ac.currentTime+(delay||0);
  const o=ac.createOscillator(),g=ac.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v||.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d+.02);}catch(e){}}
const SND={tap:()=>tone(660,.08,'triangle',.1),match:()=>{tone(784,.12,'sine',.13);tone(988,.12,'sine',.13,.07);tone(1319,.2,'sine',.12,.14);},
  win:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.25,'triangle',.12,i*.11)),lose:()=>[440,370,311,262].forEach((f,i)=>tone(f,.3,'sawtooth',.06,i*.15)),
  boost:()=>{tone(520,.1,'square',.06);tone(780,.14,'square',.06,.08);},no:()=>tone(180,.15,'square',.06)};

/* ---------- inicio ---------- */
function refreshCoins(){document.querySelectorAll('.coinVal').forEach(e=>e.textContent=save.coins);}
function renderHome(){
  refreshCoins();$('bSound').textContent=save.sound?'🔊':'🔇';
  const n=save.level,p=Engine.levelParams(n,MAXT),th=themeFor(n);
  $('hLvl').textContent=n;
  $('hLvlTag').textContent=p.hard?'🔥 Nivel difícil · premio doble':'Nivel';$('hLvlTag').className='tag'+(p.hard?' hard':'');
  $('hInfo').textContent=`${th.icon} ${th.name} · ${p.triples*3} fichas · ${p.types} tipos${p.carousel?' · 🎠 carrusel':''}`;
  const sc=Scenes.sceneFor(n);$('hScene').textContent=`${sc.label} · forma ${p.shapeName}`;
  const ch=[{id:'auto',name:'Cambia cada nivel',icon:'🔄'},...THEMES];
  $('themes').innerHTML=ch.map(t=>`<button class="chip${save.theme===t.id?' on':''}" data-t="${t.id}">${t.icon} ${t.name}</button>`).join('');
  $('shop').innerHTML=Object.keys(PRICES).map(k=>`<div class="shopItem"><div class="si">${BICON[k]}</div><div class="sn">${BNAME[k]}</div><div class="sh">Tienes ${save.b[k]}</div><button data-buy="${k}">🪙 ${PRICES[k]}</button></div>`).join('');
}
$('themes').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;save.theme=b.dataset.t;store();renderHome();SND.tap();});
$('shop').addEventListener('click',e=>{const b=e.target.closest('[data-buy]');if(!b)return;buy(b.dataset.buy,()=>renderHome());});
$('bSound').onclick=()=>{save.sound=!save.sound;store();renderHome();SND.tap();};
$('bPlay').onclick=()=>startLevel(save.level);
function buy(k,after){
  if(save.coins<PRICES[k]){SND.no();toast(`Te faltan ${PRICES[k]-save.coins} 🪙. ¡Gana niveles para conseguir más!`);return false;}
  save.coins-=PRICES[k];save.b[k]++;store();SND.boost();toast(`${BICON[k]} +1 ${BNAME[k]}`);after&&after();return true;
}

/* ---------- partida ---------- */
let G=null; // {lv,s,theme,els,time,left,visTray,paused}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('show',s.id===id));}
function startLevel(n){
  const lv=Engine.genLevel(n,MAXT);
  const th=themeFor(n);
  const sc=Scenes.sceneFor(n);
  G={n,lv,sc,s:Engine.newGame(lv),theme:th,els:{},visTray:null,last:performance.now(),over:false,golds:0,used:0,off:0,car:null};
  $('carousel').classList.toggle('on',lv.p.carousel>0);
  $('scene').innerHTML=Scenes.sceneSVG(sc)+'<div id="fx">'+Scenes.fxHTML(sc)+'</div>';
  show('game');
  $('gLvl').textContent=(lv.p.hard?'🔥 ':'')+'Nivel '+n;$('gTheme').textContent=th.icon+' '+th.name+' · '+sc.land.icon+' '+sc.land.name;
  const st=$('stage');st.innerHTML='';
  for(const t of G.s.tiles){
    const el=document.createElement('div');el.className='tile in';el.dataset.id=t.id;
    el.innerHTML='<div class="face"></div>';setFace(el,t.type);
    el.style.animationDelay=(t.z*0.07+t.y*0.015)+'s';
    if(t.car)el.classList.add('car','hid');
    el.addEventListener('pointerdown',ev=>{ev.preventDefault();tap(t.id);});
    st.appendChild(el);G.els[t.id]=el;
  }
  layout(true);updBoost();
  setTimeout(()=>Object.values(G.els).forEach(e=>e.classList.remove('in')),1200);
  toast((lv.p.hard?'🔥 ¡Nivel difícil! Premio doble<br>':'')+(lv.p.carousel?'🎠 Nivel con carrusel<br>':'')+sc.label+'<br><small>Forma: '+lv.p.shapeName+' · ✨ busca las fichas doradas</small>',2200);
}
function setFace(el,type){
  const f=el.firstChild;
  if(G.theme.crest)f.innerHTML=crestSVG(G.theme.items[type]);else f.textContent=G.theme.items[type];
  el.classList.toggle('gold',G.s.gold.includes(type));
}
function rel(el){const g=$('game').getBoundingClientRect(),r=el.getBoundingClientRect();return {x:r.left-g.left,y:r.top-g.top,w:r.width,h:r.height};}
function layout(first){
  if(!G)return;
  const tiles=G.s.tiles,b=rel($('board'));
  // bandeja
  const tw=rel($('tray'));const slotW=(tw.w-6*4)/7,slotH=slotW*1.15;
  document.documentElement.style.setProperty('--slot',slotH+'px');
  if(!$('tray').children.length)$('tray').innerHTML='<div class="slot"></div>'.repeat(7);
  const tr=rel($('tray'));
  // tablero
  let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,zM=0;
  for(const t of tiles){if(t.car)continue;x0=Math.min(x0,t.x);x1=Math.max(x1,t.x);y0=Math.min(y0,t.y);y1=Math.max(y1,t.y);zM=Math.max(zM,t.z);}
  const cols=x1-x0+1,rows=y1-y0+1;
  let S=Math.min(b.w/cols,(b.h-8)/(rows*1.15+zM*0.06+0.12),74);S=Math.floor(S);
  const H=S*1.15,lift=S*0.06;
  const bw=cols*S,bh=rows*H+zM*lift;
  const ox=b.x+(b.w-bw)/2,oy=b.y+(b.h-bh)/2+zM*lift;
  const st=$('stage');st.style.setProperty('--tw',S+'px');st.style.setProperty('--th',H+'px');
  const k=slotW/S;
  const holdOn=G.s.hold.length>0;$('hold').classList.toggle('on',holdOn);
  const hr=rel($('hold'));
  const vt=G.visTray||G.s.tray;
  for(const t of tiles){
    const el=G.els[t.id];let X,Y,sc=1,z;
    if(t.where==='board'&&t.car)continue;
    if(t.where==='board'){X=ox+(t.x-x0)*S;Y=oy+(t.y-y0)*H-t.z*lift;z=10+t.z*300+Math.round(t.y*2)*12+Math.round(t.x*2);
      el.classList.toggle('dim',!Engine.isFree(G.s,t.id));}
    else if(t.where==='tray'||(t.where==='gone'&&vt.includes(t.id))){const i=vt.indexOf(t.id);if(i<0)continue;X=tr.x+i*(slotW+4);Y=tr.y;sc=k;z=6000+i;el.classList.remove('dim');}
    else if(t.where==='hold'){const i=G.s.hold.indexOf(t.id);const tot=G.s.hold.length;X=hr.x+hr.w/2+(i-tot/2)*(slotW+6);Y=hr.y;sc=k;z=5000+i;el.classList.remove('dim');}
    else continue;
    el.style.zIndex=z;el.style.transform=`translate(${X}px,${Y}px) scale(${sc})`;
  }
  $('tray').classList.toggle('danger',G.s.tray.length>=5);
  $('gLeft').textContent='🧩 '+tiles.filter(t=>t.where!=='gone').length;
  if(G.lv.p.carousel){const c=rel($('carousel'));const sp=slotW+10;G.car={x:c.x,y:c.y+(c.h-slotH)/2-2,w:c.w,sp,k,Lp:Math.max(G.lv.p.carousel*sp,c.w+sp)};carTick(0);}
}
/* carrusel: gira sin parar; todas las fichas pasan por delante */
let lastT=0;
function carTick(dt){
  if(!G||!G.car)return;const c=G.car;
  if(!(G.paused||G.over||$('modal').classList.contains('on')))G.off+=dt*0.032;
  for(const t of G.s.tiles){if(!t.car||t.where!=='board')continue;const el=G.els[t.id];
    if(!el.classList.contains('car')){el.classList.add('car');}
    const x=(((t.ci*c.sp-G.off)%c.Lp)+c.Lp)%c.Lp;const X=c.x+x-c.sp+8;
    const vis=X>c.x-c.sp*0.2&&X<c.x+c.w-c.sp*0.8;
    const edge=Math.min(X-c.x,c.x+c.w-(X+c.sp-10));const op=Math.max(0,Math.min(1,(edge+c.sp*0.3)/(c.sp*0.5)));
    el.style.opacity=op;el.classList.toggle('hid',!vis||op<0.6);el.classList.remove('dim');
    el.style.zIndex=4000;el.style.transform=`translate(${X}px,${c.y}px) scale(${c.k})`;}
}
function loop(ts){const dt=lastT?Math.min(100,ts-lastT):0;lastT=ts;if(G&&G.car&&!document.hidden)carTick(dt);requestAnimationFrame(loop);}
requestAnimationFrame(loop);
function tap(id){
  if(!G||G.over||G.paused)return;
  const s=G.s,pre=s.tray.slice(),t=s.tiles[id];
  if(!Engine.isFree(s,id)){return;}
  const ev=Engine.pick(s,id);if(!ev.ok)return;
  SND.tap();
  const el=G.els[id];if(t.car){el.classList.remove('car','hid');el.style.opacity=1;}el.classList.add('fly');setTimeout(()=>el.classList.remove('fly'),320);
  if(ev.match){
    // mostrar el trío completo en la bandeja y luego hacerlo estallar
    const vis=pre.slice();let pos=-1;for(let i=0;i<vis.length;i++)if(s.tiles[vis[i]].type===t.type)pos=i;
    if(pos<0)vis.push(id);else vis.splice(pos+1,0,id);
    G.visTray=vis;layout();
    const m=ev.match;
    setTimeout(()=>{
      m.forEach(x=>{const e=G.els[x];e.classList.add('pop');sparks(e);setTimeout(()=>e.remove(),380);});
      SND.match();navigator.vibrate&&navigator.vibrate(15);
      if(G.visTray===vis)G.visTray=null;layout();
      if(ev.gold)goldReward();
      if(ev.win)setTimeout(win,450);
    },300);
  }else layout();
  if(ev.lose){G.over=true;setTimeout(()=>lose('full'),420);}
}
function sparks(el){
  const r=rel(el),st=$('stage');
  for(let i=0;i<7;i++){const s=document.createElement('div');s.className='spark';const a=i/7*Math.PI*2;
    s.style.left=(r.x+r.w/2-5)+'px';s.style.top=(r.y+r.h/2-5)+'px';s.style.setProperty('--dx',Math.cos(a)*34+'px');s.style.setProperty('--dy',Math.sin(a)*34+'px');
    s.style.background=['#ffc94a','#ff7a59','#3cc6a0','#fff'][i%4];st.appendChild(s);setTimeout(()=>s.remove(),600);}
}
/* ayudas */
function updBoost(){document.querySelectorAll('.boost').forEach(b=>{const k=b.dataset.b,n=save.b[k],bd=b.querySelector('.badge');
  if(n>0){bd.textContent=n;bd.className='badge';}else{bd.textContent='🪙'+PRICES[k];bd.className='badge buy';}});}
document.querySelectorAll('.boost').forEach(b=>b.addEventListener('click',()=>useBoost(b.dataset.b)));
function useBoost(k,fromLose){
  if(!G||(G.over&&!fromLose)||G.paused&&!fromLose)return false;
  const s=G.s;
  if(k==='undo'&&!(s.hist.length&&s.tiles[s.hist[s.hist.length-1].id].where==='tray')){SND.no();toast('No hay nada que deshacer');return false;}
  if(k==='remove'){if(!s.tray.length){SND.no();toast('La bandeja está vacía');return false;}if(s.hold.length){SND.no();toast('Primero usa las fichas que apartaste');return false;}}
  if(k==='shuffle'&&Engine.boardLeft(s)<2){SND.no();return false;}
  if(save.b[k]<=0){if(!buy(k))return false;}
  save.b[k]--;G.used++;store();updBoost();SND.boost();
  if(k==='undo'){Engine.undo(s);layout();}
  else if(k==='remove'){Engine.remove3(s);layout();}
  else{Engine.shuffle(s);const els=s.tiles.filter(t=>t.where==='board').map(t=>G.els[t.id]);
    els.forEach(e=>e.style.transition='transform .18s ease-in');
    els.forEach(e=>{e.dataset.tf=e.style.transform;e.style.transform=e.style.transform.replace(/scale\([^)]*\)/,'scale(0.01)');});
    setTimeout(()=>{s.tiles.filter(t=>t.where==='board').forEach(t=>setFace(G.els[t.id],t.type));els.forEach(e=>{e.style.transition='';});layout();},200);}
  return true;
}
/* fin */
function win(){
  G.over=true;SND.win();
  const p=G.lv.p,stars=G.used===0?3:G.used===1?2:1;
  let coins=(10+Math.floor(G.n/2)+stars*5)*(p.hard?2:1);
  save.coins+=coins;save.best[G.n]=Math.max(save.best[G.n]||0,stars);
  if(G.n===save.level)save.level++;store();
  modal({icon:p.hard?'🏆':'🎉',title:p.hard?'¡Nivel difícil superado!':'¡Nivel '+G.n+' superado!',
    body:`<div class="stars">${[1,2,3].map(i=>`<span class="${i<=stars?'':'off'}">⭐</span>`).join('')}</div>${G.used?'Ayudas usadas: '+G.used:'¡Sin usar ayudas!'}${G.golds?' · ✨ '+G.golds+(G.golds>1?' tríos dorados':' trío dorado'):''}<br><span class="reward">+${coins} 🪙${p.hard?' (premio doble)':''}</span>`,
    btns:[{t:'Siguiente nivel ▶',c:'primary big',f:()=>startLevel(G.n+1)},{t:'Inicio',f:goHome}]});
}
function lose(reason){
  SND.lose();
  const btns=[];
  btns.push({t:`⏏️ Sacar 3 y seguir (${save.b.remove>0?'tienes '+save.b.remove:'🪙'+PRICES.remove})`,c:'green',f:()=>{G.over=false;if(!useBoost('remove',true)){G.over=true;setTimeout(()=>lose('full'),50);}}});
  btns.push({t:'Reintentar ↻',c:'primary big',f:()=>startLevel(G.n)},{t:'Inicio',f:goHome});
  modal({icon:'😵',title:'¡Bandeja llena!',body:'Se juntaron 7 fichas sin trío. Puedes apartar 3 fichas y seguir, o volver a intentarlo.',btns});
}
function goHome(){G=null;show('home');renderHome();}
$('bPause').onclick=()=>{if(!G||G.over)return;G.paused=true;
  modal({icon:'⏸',title:'Pausa',body:'Nivel '+G.n,btns:[{t:'Continuar ▶',c:'primary big',f:()=>{G.paused=false;}},{t:'Reiniciar nivel ↻',f:()=>startLevel(G.n)},{t:'Inicio',f:goHome}]});};
/* modal y avisos */
function modal(o){
  $('mIcon').textContent=o.icon||'';$('mTitle').textContent=o.title||'';$('mBody').innerHTML=o.body||'';
  const bx=$('mBtns');bx.innerHTML='';
  (o.btns||[]).forEach(b=>{const e=document.createElement('button');e.className='btn '+(b.c||'');e.textContent=b.t;e.onclick=()=>{$('modal').classList.remove('on');b.f&&b.f();};bx.appendChild(e);});
  $('modal').classList.add('on');
}
let tt;function toast(h,ms){const t=$('toast');t.innerHTML=h;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),ms||1500);}
/* premio de las fichas doradas */
function goldReward(){
  const R=[{t:'coins',v:25},{t:'coins',v:50},{t:'b',b:'undo'},{t:'b',b:'remove'},{t:'b',b:'shuffle'},{t:'coins',v:75}];
  const x=R[Math.floor(Math.random()*R.length)];let icon,txt;
  if(x.t==='coins'){save.coins+=x.v;icon='🪙';txt=`+${x.v} monedas`;}
  else if(x.t==='b'){save.b[x.b]++;icon=BICON[x.b];txt=`+1 ${BNAME[x.b]} gratis`;updBoost();}
  store();G.golds++;
  const el=$('reward');el.innerHTML=`<div class="rt">✨ ¡Trío dorado! ✨</div><div class="ri">${icon}</div><div class="rv">${txt}</div>`;
  el.classList.remove('on');void el.offsetWidth;el.classList.add('on');
  const r=el.getBoundingClientRect(),st=$('stage');
  for(let i=0;i<14;i++){const s=document.createElement('div');s.className='spark';const a=i/14*Math.PI*2;
    s.style.left=(r.left+r.width/2-5)+'px';s.style.top=(r.top+r.height/2-5)+'px';s.style.setProperty('--dx',Math.cos(a)*150+'px');s.style.setProperty('--dy',Math.sin(a)*150+'px');
    s.style.background=['#ffd75e','#fff3b0','#ffb02e'][i%3];s.style.width=s.style.height='12px';st.appendChild(s);setTimeout(()=>s.remove(),600);}
  [1047,1319,1568,2093].forEach((f,i)=>tone(f,.25,'triangle',.11,i*.08));navigator.vibrate&&navigator.vibrate([20,40,20]);
}
window.addEventListener('resize',()=>layout());
renderHome();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
