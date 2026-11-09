/* Temas de fichas — Junta 3 by Julián Lenis. Escudos 100% inventados (no son de ningún club). */
(function(root){
const CREST_SHAPES=[
 'M50 4 L92 16 V52 C92 80 72 98 50 106 C28 98 8 80 8 52 V16 Z',
 'M10 8 H90 V55 C90 85 70 100 50 106 C30 100 10 85 10 55 Z',
 'M50 4 C64 12 80 12 92 8 V50 C92 78 74 96 50 106 C26 96 8 78 8 50 V8 C20 12 36 12 50 4 Z'];
const CREST_COLORS=[['#d62839','#ffffff'],['#1d4ed8','#ffffff'],['#15803d','#ffffff'],['#facc15','#1e3a8a'],['#111827','#ffffff'],['#38bdf8','#ffffff'],
 ['#7c3aed','#fde047'],['#f97316','#111827'],['#b91c1c','#1e40af'],['#16a34a','#facc15'],['#1e3a8a','#dc2626'],['#7f1d1d','#7dd3fc']];
const CREST_TXT=['AC','UD','RC','SD','CF','AD','FC','SC','CA','UC','RD','CD','AT','DE','UN','RS','SP','CE','OL','VA','MA','TO','ES','LO','BR','PE','CU','NO','SU','GA'];
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
  const sh=CREST_SHAPES[i%3];let [a,b]=CREST_COLORS[i%12];if(i>=24)[a,b]=[b==='#ffffff'?'#0f766e':b,a];const pat=i%8,txt=CREST_TXT[i%30],id='cr'+i;
  return `<svg viewBox="-4 -4 108 118" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><path d="${sh}"/></clipPath></defs>`+
   `<path d="${sh}" fill="#f5c542" stroke="#7a4b12" stroke-width="7" stroke-linejoin="round"/>`+
   `<g clip-path="url(#${id})">${crestPattern(pat,a,b)}</g>`+
   `<path d="${sh}" fill="none" stroke="#f5c542" stroke-width="3"/>`+
   `<circle cx="50" cy="55" r="21" fill="#fff" stroke="#1f2937" stroke-width="3"/>`+
   `<text x="50" y="63" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="21" fill="${a==='#ffffff'?'#111':(a==='#facc15'?'#1e3a8a':a)}">${txt}</text></svg>`;
}

/* ---- Banderas dibujadas (se ven en cualquier móvil o PC) ---- */
const F=(body)=>`<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style="width:86%;height:auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))">${body}<rect x=".5" y=".5" width="59" height="39" rx="3" fill="none" stroke="rgba(0,0,0,.35)"/></svg>`;
const h3=(a,b,c,w)=>`<rect width="60" height="40" fill="${b}"/><rect width="60" height="${w||13.33}" fill="${a}"/><rect y="${40-(w||13.33)}" width="60" height="${w||13.33}" fill="${c}"/>`;
const v3=(a,b,c)=>`<rect width="60" height="40" fill="${b}"/><rect width="20" height="40" fill="${a}"/><rect x="40" width="20" height="40" fill="${c}"/>`;
const nord=(bg,cr,in_)=>`<rect width="60" height="40" fill="${bg}"/><rect x="16" width="10" height="40" fill="${cr}"/><rect y="15" width="60" height="10" fill="${cr}"/>`+(in_?`<rect x="19" width="4" height="40" fill="${in_}"/><rect y="18" width="60" height="4" fill="${in_}"/>`:'');
const star=(cx,cy,r,c)=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.42:r;d+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1);}return `<path d="${d}Z" fill="${c}"/>`;};
const FLAGS=[
 ['España',`<rect width="60" height="40" fill="#c60b1e"/><rect y="10" width="60" height="20" fill="#ffc400"/><rect x="13" y="14" width="7" height="12" rx="2" fill="#ad1519"/>`],
 ['Colombia',`<rect width="60" height="40" fill="#fcd116"/><rect y="20" width="60" height="10" fill="#003893"/><rect y="30" width="60" height="10" fill="#ce1126"/>`],
 ['Francia',v3('#0055a4','#fff','#ef4135')],['Italia',v3('#009246','#fff','#ce2b37')],['Irlanda',v3('#169b62','#fff','#ff883e')],['Bélgica',v3('#000','#fae042','#ed2939')],
 ['Alemania',h3('#000','#dd0000','#ffce00')],['Países Bajos',h3('#ae1c28','#fff','#21468b')],['Austria',h3('#ed2939','#fff','#ed2939')],
 ['Polonia',`<rect width="60" height="40" fill="#dc143c"/><rect width="60" height="20" fill="#fff"/>`],['Ucrania',`<rect width="60" height="40" fill="#ffd500"/><rect width="60" height="20" fill="#005bbb"/>`],
 ['Japón',`<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="11" fill="#bc002d"/>`],
 ['México',v3('#006847','#fff','#ce1126')+`<circle cx="30" cy="20" r="5" fill="#8c5a2b"/><path d="M25 23 Q30 28 35 23" stroke="#006847" stroke-width="1.5" fill="none"/>`],
 ['Argentina',h3('#74acdf','#fff','#74acdf')+`<circle cx="30" cy="20" r="4.5" fill="#f6b40e" stroke="#85340a" stroke-width=".7"/>`],
 ['Brasil',`<rect width="60" height="40" fill="#009c3b"/><path d="M30 4 L56 20 L30 36 L4 20Z" fill="#ffdf00"/><circle cx="30" cy="20" r="8.5" fill="#002776"/><path d="M22 18 Q30 15 38 21" stroke="#fff" stroke-width="1.6" fill="none"/>`],
 ['Venezuela',h3('#ffcc00','#00247d','#cf142b')+[0,1,2,3,4,5,6,7].map(i=>{const a=Math.PI*(0.15+i*0.1);return `<circle cx="${(30-9*Math.cos(a)).toFixed(1)}" cy="${(23-7*Math.sin(a)).toFixed(1)}" r="1.1" fill="#fff"/>`}).join('')],
 ['Perú',v3('#d91023','#fff','#d91023')],
 ['Chile',`<rect width="60" height="40" fill="#d52b1e"/><rect width="60" height="20" fill="#fff"/><rect width="20" height="20" fill="#0039a6"/>`+star(10,10,6,'#fff')],
 ['Suecia',nord('#006aa7','#fecc00')],['Dinamarca',nord('#c8102e','#fff')],['Noruega',nord('#ba0c2f','#fff','#00205b')],['Finlandia',nord('#fff','#003580')],
 ['Suiza',`<rect width="60" height="40" fill="#da291c"/><rect x="26" y="9" width="8" height="22" fill="#fff"/><rect x="19" y="16" width="22" height="8" fill="#fff"/>`],
 ['Grecia',`<rect width="60" height="40" fill="#0d5eaf"/>${[1,3,5,7].map(i=>`<rect y="${i*4.44}" width="60" height="4.44" fill="#fff"/>`).join('')}<rect width="22" height="22.2" fill="#0d5eaf"/><rect x="8.9" width="4.4" height="22.2" fill="#fff"/><rect y="8.9" width="22" height="4.4" fill="#fff"/>`],
 ['Estados Unidos',`<rect width="60" height="40" fill="#fff"/>${[0,2,4,6,8,10,12].map(i=>`<rect y="${i*3.08}" width="60" height="3.08" fill="#b22234"/>`).join('')}<rect width="26" height="21.5" fill="#3c3b6e"/>${[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${3+c*5}" cy="${3+r*5}" r="1" fill="#fff"/>`).join('')).join('')}`],
 ['Reino Unido',`<rect width="60" height="40" fill="#012169"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" stroke-width="3"/><rect x="24" width="12" height="40" fill="#fff"/><rect y="14" width="60" height="12" fill="#fff"/><rect x="26.5" width="7" height="40" fill="#c8102e"/><rect y="16.5" width="60" height="7" fill="#c8102e"/>`],
 ['Canadá',`<rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d80621"/><rect x="45" width="15" height="40" fill="#d80621"/><path d="M30 8 L32 13 L36 11 L35 18 L39 16 L38 20 L41 21 L35 25 L36 28 L31 27 L31 32 L29 32 L29 27 L24 28 L25 25 L19 21 L22 20 L21 16 L25 18 L24 11 L28 13Z" fill="#d80621"/>`],
 ['Portugal',`<rect width="60" height="40" fill="#da291c"/><rect width="24" height="40" fill="#046a38"/><circle cx="24" cy="20" r="7" fill="#ffe900" stroke="#da291c" stroke-width="1"/>`],
 ['Corea del Sur',`<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="9" fill="#003478"/><path d="M21 20 A9 9 0 0 1 39 20 A4.5 4.5 0 0 1 30 20 A4.5 4.5 0 0 0 21 20Z" fill="#cd2e3a"/><g stroke="#000" stroke-width="2"><path d="M8 8 L14 4 M9 11 L15 7 M46 33 L52 29 M45 30 L51 26"/></g>`],
 ['Turquía',`<rect width="60" height="40" fill="#e30a17"/><circle cx="23" cy="20" r="9" fill="#fff"/><circle cx="25.5" cy="20" r="7.2" fill="#e30a17"/>`+star(36,20,4.5,'#fff')],
 ['Jamaica',`<rect width="60" height="40" fill="#009b3a"/><path d="M0 0 L30 20 L0 40Z M60 0 L30 20 L60 40Z" fill="#000"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#fed100" stroke-width="6"/>`],
 ['Cuba',`<rect width="60" height="40" fill="#fff"/>${[0,2,4].map(i=>`<rect y="${i*8}" width="60" height="8" fill="#002a8f"/>`).join('')}<path d="M0 0 L26 20 L0 40Z" fill="#cf142b"/>`+star(9,20,5,'#fff')],
 ['India',h3('#ff9933','#fff','#138808')+`<circle cx="30" cy="20" r="5" fill="none" stroke="#000080" stroke-width="1.3"/><circle cx="30" cy="20" r="1" fill="#000080"/>`]];
/* ---- Flores dibujadas + emoji ---- */
function flowerSVG(i){
  const cols=['#ff5d8f','#ffb703','#8e7dff','#ff7b39','#3fa9f5','#e63946','#ffffff','#b5179e'];
  const c=cols[i%8],n=i<8?8:5,round=i<8;let p='';
  for(let k=0;k<n;k++){const a=k*360/n;p+=round?`<ellipse cx="50" cy="26" rx="11" ry="20" fill="${c}" stroke="rgba(0,0,0,.18)" stroke-width="1.5" transform="rotate(${a} 50 50)"/>`:`<path d="M50 50 C36 34 38 14 50 6 C62 14 64 34 50 50Z" fill="${c}" stroke="rgba(0,0,0,.18)" stroke-width="1.5" transform="rotate(${a} 50 50)"/>`;}
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${p}<circle cx="50" cy="50" r="${round?12:10}" fill="${['#ffd23f','#7a4a1e','#ffd23f','#5a2d82','#ffe66d','#2b2d42','#f4a261','#ffd23f'][i%8]}"/></svg>`;
}
/* ---- Letras con colores ---- */
const LETTERS=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z','CH','LL','RR'];
const LCOL=['#e63946','#f77f00','#2a9d8f','#3a86ff','#8338ec','#ff006e','#06a77d','#d62828','#118ab2','#6a4c93'];
const letterHTML=(l,i)=>`<span class="let" style="color:${LCOL[(i*7)%LCOL.length]};font-size:${l.length>1?'0.62em':'0.95em'}">${l}</span>`;
/* ---- Deportes: pelotas y bates (emoji + dibujos) ---- */
const SPORT_SVG=[
 `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fff" stroke="#333" stroke-width="2"/><path d="M50 10 A40 40 0 0 1 90 50 L50 50Z" fill="#e63946"/><path d="M50 90 A40 40 0 0 1 10 50 L50 50Z" fill="#3a86ff"/><path d="M90 50 A40 40 0 0 1 50 90 L50 50Z" fill="#ffd23f"/><circle cx="50" cy="50" r="7" fill="#fff" stroke="#333" stroke-width="2"/></svg>`,
 `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="#fafafa" stroke="#999" stroke-width="2"/>${[[38,36],[55,32],[66,46],[50,50],[36,56],[56,64],[44,72],[68,60],[30,44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2" fill="#d6d6d6"/>`).join('')}</svg>`,
 `<svg viewBox="0 0 100 100"><path d="M22 86 L30 78 L78 18 Q86 10 90 14 Q94 18 86 26 L36 84 Z" fill="#c68642" stroke="#7a4a1e" stroke-width="2"/><circle cx="24" cy="84" r="6" fill="#7a4a1e"/></svg>`,
 `<svg viewBox="0 0 100 100"><rect x="44" y="62" width="12" height="32" rx="5" fill="#222"/><ellipse cx="50" cy="38" rx="28" ry="32" fill="#1d4ed8" stroke="#0b2a7a" stroke-width="3"/>${[0,1,2,3,4,5,6,7,8].map(k=>`<circle cx="${38+(k%3)*12}" cy="${26+Math.floor(k/3)*12}" r="3" fill="#0b2a7a"/>`).join('')}</svg>`,
 `<svg viewBox="0 0 100 100"><path d="M60 8 L44 80" stroke="#888" stroke-width="5"/><path d="M60 8 L64 6" stroke="#222" stroke-width="9" stroke-linecap="round"/><path d="M44 80 L30 88 Q22 92 26 84 L42 76Z" fill="#555"/><circle cx="72" cy="82" r="7" fill="#fff" stroke="#999"/></svg>`,
 `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#ff8c1a" stroke="#c95e00" stroke-width="2"/><ellipse cx="42" cy="40" rx="9" ry="6" fill="#ffd1a3" opacity=".8"/></svg>`,
 `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#d62828"/><circle cx="50" cy="50" r="16" fill="#fff"/><text x="50" y="57" text-anchor="middle" font-family="Arial Black,Arial" font-size="20" font-weight="900" fill="#111">3</text><ellipse cx="36" cy="30" rx="8" ry="5" fill="#fff" opacity=".5"/></svg>`,
 `<svg viewBox="0 0 100 100"><clipPath id="b9"><circle cx="50" cy="50" r="38"/></clipPath><circle cx="50" cy="50" r="38" fill="#fff" stroke="#ccc"/><rect y="30" width="100" height="40" fill="#f4c20d" clip-path="url(#b9)"/><circle cx="50" cy="50" r="14" fill="#fff"/><text x="50" y="57" text-anchor="middle" font-family="Arial Black,Arial" font-size="19" font-weight="900" fill="#111">9</text></svg>`,
 `<svg viewBox="0 0 100 100"><rect x="18" y="62" width="64" height="16" rx="8" fill="#111"/><ellipse cx="50" cy="62" rx="32" ry="8" fill="#333"/><ellipse cx="44" cy="61" rx="10" ry="2.5" fill="#666"/></svg>`];
const THEMES=[
 {id:'frutas',name:'Frutas',icon:'🍓',items:['🍎','🍏','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥕','🌽','🥦','🌶️','🥬','🫑','🥔','🧄','🥜','🫒']},
 {id:'animales',name:'Animales',icon:'🐶',items:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🦉','🦄','🐝','🐢','🐙','🦀','🐬','🐞','🦋','🐌','🦓','🦒','🐘']},
 {id:'escudos',name:'Escudos',icon:'🛡️',items:Array.from({length:30},(_,i)=>({h:crestSVG(i)}))},
 {id:'objetos',name:'Objetos',icon:'🎁',items:['⚽','🎸','🎧','📱','💡','🔑','⏰','📷','🎁','🎈','✏️','📚','🧸','🎨','🔔','☂️','👑','💎','🎺','🥁','🕶️','🧲','🎤','🚲','🔦','🧭','⚓','🪁','🎮','🏀']},
 {id:'flores',name:'Flores',icon:'🌷',items:['🌸','🌹','🌺','🌻','🌼','🌷','💐','🪷','🪻','🥀','🏵️','💮','🍀','🌵',...Array.from({length:16},(_,i)=>({h:flowerSVG(i)}))]},
 {id:'banderas',name:'Banderas',icon:'🏳️',items:FLAGS.map(f=>({h:F(f[1]),name:f[0]}))},
 {id:'comidas',name:'Comidas',icon:'🍕',items:['🍕','🍔','🍟','🌭','🌮','🌯','🥪','🥗','🍝','🍜','🍣','🍤','🍙','🥟','🥐','🥖','🥨','🧀','🍳','🥞','🧇','🍗','🍩','🍪','🎂','🧁','🍫','🍭','🍿','🍦']},
 {id:'letras',name:'Letras',icon:'🔤',items:LETTERS.map((l,i)=>({h:letterHTML(l,i)}))},
 {id:'deportes',name:'Pelotas y bates',icon:'⚾',items:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🏓','🏸','🏒','🏑','🥍','🏏','⛳','🎳','🥏','🥊','🥌','🛹',...SPORT_SVG.map(s=>({h:s}))]}];
const API={THEMES,crestSVG};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else Object.assign(root,API);
})(this);
