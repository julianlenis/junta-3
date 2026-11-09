/* Junta 3 by Julián Lenis — motor del juego (sin dependencias) */
(function(root){
'use strict';
const TRAY=7, HOLD=3;
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const ri=(r,n)=>Math.floor(r()*n);
function shuffleArr(a,r){for(let i=a.length-1;i>0;i--){const j=ri(r,i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}

/* Dificultad por nivel: infinita, con topes y "nivel difícil" cada 10 */
function levelParams(n,maxTypes){
  maxTypes=maxTypes||18;
  const hard=n%10===0;
  let triples=Math.min(6+Math.floor((n-1)*0.8),48);
  if(hard)triples=Math.min(Math.round(triples*1.25)+1,56);
  let types=Math.min(3+Math.floor((n-1)/3)+(hard?2:0),maxTypes);
  types=Math.min(types,triples);
  const layers=Math.min(2+Math.floor((n-1)/5)+(hard?1:0),hard?9:8);
  let L=n<=2?2:Math.min(6,3+Math.floor((n-3)/10));
  if(hard)L=Math.min(6,L+2);
  const perTile=Math.max(2.4,5-(n-1)*0.035)*(hard?0.9:1);
  return {n,hard,triples,types,layers,L,pNew:Math.min(0.75,0.35+n*0.01),
    time:Math.ceil(triples*3*perTile/5)*5};
}

function overlaps(a,b){return Math.abs(a.x-b.x)<1&&Math.abs(a.y-b.y)<1;}
function link(tiles){
  for(const t of tiles){t.above=[];t.below=[];}
  for(const t of tiles)for(const u of tiles)if(u.z>t.z&&overlaps(t,u)){t.above.push(u.id);u.below.push(t.id);}
}

function genLayout(p,r){
  const target=p.triples*3;
  let S=0;for(let z=0;z<p.layers;z++)S+=Math.pow(0.72,z);
  let best=null;
  for(let boost=1;boost<3;boost*=1.12){
    const res=buildLayout(p,r,Math.ceil(target/S*boost));
    if(!best||res.tiles.length>best.tiles.length)best=res;
    const zs=new Set(res.tiles.map(t=>t.z)).size;
    if(res.tiles.length>=target&&zs>=Math.min(p.layers,3))break;
  }
  return finishLayout(best.tiles,best.C,target,r);
}
function buildLayout(p,r,B){
  const target=p.triples*3;
  let C=7,R=8;
  for(let c=3;c<=7;c++){let rr=Math.max(3,Math.min(8,Math.round(c*1.15)));if(c*rr*0.88>=B){C=c;R=rr;break;}}
  const fill=Math.min(0.95,Math.max(0.6,B/(C*R)));
  let tiles=[],layers=[],tries=0;
  const maxL=p.layers+5;
  for(let z=0;z<maxL&&tiles.length<target;z++){
    const o=z%2?0.5:0,cw=C-(z%2),ch=R-(z%2);
    if(cw<1||ch<1)break;
    const prev=layers[z-1]||[],cells=[];
    const pr=z===0?fill:0.9;
    for(let yi=0;yi<ch;yi++)for(let xi=0;xi<Math.ceil(cw/2);xi++){
      const x=xi+o,y=yi+o;
      if(z>0){const sup=prev.filter(c=>Math.abs(c.x-x)<1&&Math.abs(c.y-y)<1).length;if(sup<(z%2?3:2))continue;}
      if(r()>pr)continue;
      cells.push({x,y});const mx=(C-1)-x;if(Math.abs(mx-x)>0.01)cells.push({x:mx,y});
    }
    if(z>0&&cells.length===0)break;
    layers.push(cells);for(const c of cells)tiles.push({id:0,x:c.x,y:c.y,z});
    if(z===0&&cells.length<4&&tries++<20){tiles=[];layers=[];z=-1;}
  }
  return {tiles,C};
}
function finishLayout(tiles,C,target,r){
  let goal=Math.min(target,Math.floor(tiles.length/3)*3);
  // recortar desde arriba (por parejas simétricas cuando se puede)
  while(tiles.length>goal){
    const top=Math.max(...tiles.map(t=>t.z));
    const cand=tiles.filter(t=>t.z===top);
    const t=cand[ri(r,cand.length)];
    tiles.splice(tiles.indexOf(t),1);
    if(tiles.length>goal){const m=tiles.find(u=>u.z===t.z&&u.y===t.y&&Math.abs(u.x-((C-1)-t.x))<0.01);if(m)tiles.splice(tiles.indexOf(m),1);}
  }
  tiles.forEach((t,i)=>t.id=i);
  link(tiles);
  return tiles;
}

/* Orden de retirada aleatorio en el que cada ficha está libre al retirarla */
function removalOrder(tiles,r,onBoard){
  const left=new Set(onBoard||tiles.map(t=>t.id)),order=[];
  while(left.size){
    const free=[...left].filter(id=>tiles[id].above.every(a=>!left.has(a)));
    // ligera preferencia por fichas altas => soluciones que "desmontan" la torre
    free.sort((a,b)=>tiles[b].z-tiles[a].z);
    const id=free[r()<0.5?ri(r,Math.min(free.length,4)):ri(r,free.length)];
    left.delete(id);order.push(id);
  }
  return order;
}
function safe(open,size,L){
  if(size>L)return false;let m=99;for(const c of open.values())m=Math.min(m,2-c);
  return open.size===0||size+m<=L;
}
/* Asigna tipos siguiendo el orden: la bandeja nunca supera L (<=6) => resoluble */
function assignTypes(order,budget,L,pNew,r,initOpen){
  const open=new Map(initOpen||[]);let size=0;for(const c of open.values())size+=c;
  const out=new Map(),bud=budget.slice();
  for(let i=0;i<order.length;i++){
    const rem=order.length-i;let need=0;for(const c of open.values())need+=3-c;
    const acts=[];
    for(const [t,c] of open){const nc=c+1;const no=new Map(open);let ns=size+1;if(nc===3){no.delete(t);ns-=3;}else no.set(t,nc);
      if(safe(no,ns,L))acts.push({t,no,ns,w:nc===3?2:1});}
    const avail=[];for(let t=0;t<bud.length;t++)if(bud[t]>0&&!open.has(t))avail.push(t);
    if(avail.length&&need+2<=rem-1){const no=new Map(open);no.set(-1,1);if(safe(no,size+1,L)){
      // tipo con más presupuesto restante tiene más prob.
      let tot=0;for(const t of avail)tot+=bud[t];let x=r()*tot,tp=avail[0];for(const t of avail){x-=bud[t];if(x<0){tp=t;break;}}
      const n2=new Map(open);n2.set(tp,1);acts.push({t:tp,no:n2,ns:size+1,isNew:true});}}
    if(!acts.length)return null;
    let a;const nw=acts.find(x=>x.isNew),jn=acts.filter(x=>!x.isNew);
    if(nw&&(!jn.length||r()<pNew))a=nw;else{const c3=jn.filter(x=>x.w===2);a=(c3.length&&r()<0.5)?c3[ri(r,c3.length)]:jn[ri(r,jn.length)];}
    if(a.isNew)bud[a.t]--;
    out.set(order[i],a.t);open.clear();for(const [k,v] of a.no)open.set(k,v);size=a.ns;
  }
  return open.size===0?out:null;
}

function genLevel(n,maxTypes){
  const p=levelParams(n,maxTypes);
  const r=rng(n*7919+13);
  for(let attempt=0;attempt<200;attempt++){
    const tiles=genLayout(p,r);
    const triples=tiles.length/3;if(triples<2)continue;
    const types=Math.min(p.types,triples);
    // presupuesto de tríos por tipo
    const ids=shuffleArr([...Array(maxTypes||18).keys()],r).slice(0,types);
    const budget=new Array(maxTypes||18).fill(0);
    for(let i=0;i<triples;i++)budget[ids[i<types?i:ri(r,types)]]++;
    const order=removalOrder(tiles,r);
    const asg=assignTypes(order,budget,p.L,p.pNew,r);
    if(!asg)continue;
    for(const t of tiles)t.type=asg.get(t.id);
    return {n,p:Object.assign({},p,{triples,types}),tiles,solution:order};
  }
  throw new Error('no se pudo generar nivel '+n);
}

/* ---- Partida ---- */
function newGame(level){
  const tiles=level.tiles.map(t=>Object.assign({},t,{where:'board'}));
  return {n:level.n,p:level.p,tiles,tray:[],hold:[],hist:[],status:'play',moves:0};
}
function isFree(s,id){const t=s.tiles[id];if(t.where==='hold')return true;if(t.where!=='board')return false;return t.above.every(a=>s.tiles[a].where!=='board');}
function boardLeft(s){return s.tiles.filter(t=>t.where==='board').length;}
function insertTray(s,id){
  const ty=s.tiles[id].type;let pos=-1;
  for(let i=0;i<s.tray.length;i++)if(s.tiles[s.tray[i]].type===ty)pos=i;
  if(pos<0)s.tray.push(id);else s.tray.splice(pos+1,0,id);
}
function pick(s,id){
  if(s.status!=='play'||!isFree(s,id))return {ok:false};
  const t=s.tiles[id],from=t.where;
  if(from==='hold')s.hold.splice(s.hold.indexOf(id),1);
  t.where='tray';insertTray(s,id);s.moves++;
  s.hist.push({id,from});
  const ev={ok:true,id,match:null,win:false,lose:false};
  const same=s.tray.filter(x=>s.tiles[x].type===t.type);
  if(same.length>=3){const m=same.slice(0,3);for(const x of m){s.tiles[x].where='gone';s.tray.splice(s.tray.indexOf(x),1);}
    ev.match=m;s.hist=s.hist.filter(h=>s.tiles[h.id].where==='tray');}
  if(s.tiles.every(x=>x.where==='gone')){s.status='win';ev.win=true;}
  else if(s.tray.length>=TRAY){s.status='lose';s.reason='full';ev.lose=true;}
  return ev;
}
function undo(s){
  if(s.status!=='play')return null;const h=s.hist.pop();if(!h)return null;
  const t=s.tiles[h.id];if(t.where!=='tray')return null;
  s.tray.splice(s.tray.indexOf(h.id),1);t.where=h.from;if(h.from==='hold')s.hold.push(h.id);
  return h.id;
}
function remove3(s){
  if(!(s.status==='play'||(s.status==='lose'&&s.reason==='full')))return null;
  if(!s.tray.length||s.hold.length)return null;
  const m=s.tray.splice(0,Math.min(HOLD,s.tray.length));
  for(const id of m){s.tiles[id].where='hold';s.hold.push(id);}
  s.hist=s.hist.filter(h=>s.tiles[h.id].where==='tray');
  if(s.status==='lose')s.status='play';
  return m;
}
/* Mezclar manteniendo una solución garantizada (si se puede) */
function shuffle(s,r){
  r=r||Math.random;if(s.status!=='play')return false;
  const board=s.tiles.filter(t=>t.where==='board').map(t=>t.id);if(board.length<2)return false;
  const counts={};for(const id of board){const ty=s.tiles[id].type;counts[ty]=(counts[ty]||0)+1;}
  const outside=[...s.tray,...s.hold];
  for(let k=0;k<60;k++){
    // plan: primero las fichas apartadas, luego el tablero en orden libre
    const sim=new Map();let size=0;for(const id of s.tray){const ty=s.tiles[id].type;sim.set(ty,(sim.get(ty)||0)+1);size++;}
    let ok=true;
    for(const id of s.hold){const ty=s.tiles[id].type;const c=(sim.get(ty)||0)+1;if(c===3){sim.delete(ty);size-=2;}else{sim.set(ty,c);size++;}if(size>=TRAY){ok=false;break;}}
    if(!ok)break;
    // presupuesto por tipo (en tríos de "tiles nuevos" + completar los abiertos)
    const order=removalOrder(s.tiles,r,board);
    const res=assignFixed(order,counts,sim,size,r);
    if(res){for(const [id,ty] of res)s.tiles[id].type=ty;s.hist=[];return true;}
  }
  // sin garantía: permutación simple
  const tys=shuffleArr(board.map(id=>s.tiles[id].type),r);board.forEach((id,i)=>s.tiles[id].type=tys[i]);s.hist=[];
  return true;
}
function assignFixed(order,counts,open0,size0,r){
  const left=Object.assign({},counts),open=new Map(open0);let size=size0;const out=new Map();
  for(const id of order){
    const cand=Object.keys(left).filter(t=>left[t]>0).map(Number);
    const comp=cand.filter(t=>open.get(t)===2),one=cand.filter(t=>open.get(t)===1),nw=cand.filter(t=>!open.has(t));
    let t;
    if(comp.length)t=comp[ri(r,comp.length)];
    else if(one.length&&size+1<TRAY-1&&(!nw.length||r()<0.6||size+1>=TRAY-2))t=one[ri(r,one.length)];
    else if(nw.length&&size+1<TRAY-1)t=nw[ri(r,nw.length)];
    else if(one.length&&size+1<TRAY)t=one[ri(r,one.length)];
    else return null;
    left[t]--;out.set(id,t);const c=(open.get(t)||0)+1;
    if(c===3){open.delete(t);size-=2;}else{open.set(t,c);size++;}
    if(size>=TRAY)return null;
  }
  return open.size===0?out:null;
}
/* Solucionador DFS (para pruebas) */
function solve(s,budget){
  budget=budget||200000;let nodes=0;const seen=new Set();
  function key(st){return st.tiles.map(t=>t.where[0]).join('')+'|'+st.tray.map(i=>st.tiles[i].type).sort().join(',');}
  function clone(st){return {n:st.n,p:st.p,tiles:st.tiles.map(t=>Object.assign({},t)),tray:st.tray.slice(),hold:st.hold.slice(),hist:[],status:st.status,moves:st.moves};}
  function rec(st){
    if(st.status==='win')return true;if(st.status!=='play')return false;
    if(++nodes>budget)throw 'budget';
    const k=key(st);if(seen.has(k))return false;seen.add(k);
    const free=st.tiles.filter(t=>isFree(st,t.id));
    const tc={};for(const i of st.tray){const ty=st.tiles[i].type;tc[ty]=(tc[ty]||0)+1;}
    const byType=new Map();for(const t of free)if(!byType.has(t.type))byType.set(t.type,t.id); // fichas libres del mismo tipo son intercambiables salvo lo que destapan
    const moves=free.map(t=>t.id);
    moves.sort((a,b)=>(tc[st.tiles[b].type]||0)-(tc[st.tiles[a].type]||0));
    for(const id of moves){const c=clone(st);pick(c,id);if(rec(c))return true;}
    return false;
  }
  try{return rec(clone(s));}catch(e){if(e==='budget')return null;throw e;}
}
const API={TRAY,HOLD,rng,levelParams,genLevel,newGame,isFree,pick,undo,remove3,shuffle,solve,boardLeft};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.Engine=API;
})(this);
