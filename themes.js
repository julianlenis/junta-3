/* Temas de fichas — Junta 3 by Julián Lenis. Escudos 100% inventados (no son de ningún club). */
(function(root){
const CREST_SHAPES=[
 'M50 4 L92 16 V52 C92 80 72 98 50 106 C28 98 8 80 8 52 V16 Z',
 'M10 8 H90 V55 C90 85 70 100 50 106 C30 100 10 85 10 55 Z',
 'M50 4 C64 12 80 12 92 8 V50 C92 78 74 96 50 106 C26 96 8 78 8 50 V8 C20 12 36 12 50 4 Z'];
const CREST_COLORS=[['#d62839','#ffffff'],['#1d4ed8','#ffffff'],['#15803d','#ffffff'],['#facc15','#1e3a8a'],['#111827','#ffffff'],['#38bdf8','#ffffff'],
 ['#7c3aed','#fde047'],['#f97316','#111827'],['#b91c1c','#1e40af'],['#16a34a','#facc15'],['#1e3a8a','#dc2626'],['#7f1d1d','#7dd3fc']];
const CREST_TXT=['AC','UD','RC','SD','CF','AD','FC','SC','CA','UC','RD','CD','AT','DE','UN','RS','SP','CE','OL','VA','MA','TO','ES','LO'];
function crestPattern(k,a,b){
  switch(k){
   case 0:return `<rect width="100" height="110" fill="${a}"/>`;
   case 1:return `<rect width="100" height="110" fill="${b}"/>`+[10,34,58,82].map(x=>`<rect x="${x}" width="12" height="110" fill="${a}"/>`).join('');
   case 2:return `<rect width="100" height="110" fill="${a}"/><rect y="40" width="100" height="26" fill="${b}"/>`;
   case 3:return `<rect width="100" height="110" fill="${a}"/><path d="M-10 20 L20 -10 L120 90 L90 120Z" fill="${b}"/>`;
   case 4:return `<rect width="100" height="110" fill="${a}"/><rect width="50" height="55" fill="${b}"/><rect x="50" y="55" width="50" height="55" fill="${b}"/>`;
   case 5:return `<rect width="50" height="110" fill="${a}"/><rect x="50" width="50" height="110" fill="${b}"/>`;
   case 6:return `<rect width="100" height="110" fill="${a}"/><path d="M0 30 L50 70 L100 30 V52 L50 92 L0 52Z" fill="${b}"/>`;
   default:return `<rect width="100" height="110" fill="${b}"/>`+[8,36,64,92].map(y=>`<rect y="${y}" width="100" height="14" fill="${a}"/>`).join('');
  }
}
function crestSVG(i){
  const sh=CREST_SHAPES[i%3],[a,b]=CREST_COLORS[i%12],pat=i%8,txt=CREST_TXT[i%24],id='cr'+i;
  return `<svg viewBox="-4 -4 108 118" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><path d="${sh}"/></clipPath></defs>`+
   `<path d="${sh}" fill="#f5c542" stroke="#7a4b12" stroke-width="7" stroke-linejoin="round"/>`+
   `<g clip-path="url(#${id})">${crestPattern(pat,a,b)}</g>`+
   `<path d="${sh}" fill="none" stroke="#f5c542" stroke-width="3"/>`+
   `<circle cx="50" cy="55" r="21" fill="#fff" stroke="#1f2937" stroke-width="3"/>`+
   `<text x="50" y="63" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="21" fill="${a==='#ffffff'?'#111':(a==='#facc15'?'#1e3a8a':a)}">${txt}</text></svg>`;
}
const THEMES=[
 {id:'frutas',name:'Frutas',icon:'🍓',items:['🍎','🍏','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥕','🌽','🥦','🌶️']},
 {id:'animales',name:'Animales',icon:'🐶',items:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🦉','🦄','🐝','🐢','🐙','🦀','🐬']},
 {id:'escudos',name:'Escudos',icon:'🛡️',crest:true,items:Array.from({length:24},(_,i)=>i)},
 {id:'objetos',name:'Objetos',icon:'🎁',items:['⚽','🎸','🎧','📱','💡','🔑','⏰','📷','🎁','🎈','✏️','📚','🧸','🎨','🔔','☂️','👑','💎','🎺','🥁','🕶️','🧲','🎤','🚲']}];
const API={THEMES,crestSVG};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else Object.assign(root,API);
})(this);
