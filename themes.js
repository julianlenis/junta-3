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
/* ---- Perros dibujados (chihuahuas protagonistas + otras razas) ---- */
const DK='#3b2a1a';
function dogHead(o){
  const fur=o.fur,ear=o.ear||'flop',ec=o.earC||fur,big=o.ear==='tri',cy=big?58:56;
  const hx=o.rx||(big?25:29),hy=o.ry||(big?24:27);
  let s='';
  // orejas detrás de la cabeza
  if(ear==='tri')s+=`<path d="M34 46 L6 8 Q4 4 9 6 L50 36Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M33 40 L14 14 L44 34Z" fill="${o.earIn||'#f6a6b2'}"/><path d="M66 46 L94 8 Q96 4 91 6 L50 36Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M67 40 L86 14 L56 34Z" fill="${o.earIn||'#f6a6b2'}"/>`;
  if(ear==='tall')s+=`<path d="M26 46 L24 6 Q25 3 28 6 L48 32Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M29 38 L28 14 L42 32Z" fill="${o.earIn||'#e9a0a0'}"/><path d="M74 46 L76 6 Q75 3 72 6 L52 32Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M71 38 L72 14 L58 32Z" fill="${o.earIn||'#e9a0a0'}"/>`;
  if(ear==='bat')s+=`<path d="M30 42 Q6 30 12 14 Q22 4 46 30Z" fill="${ec}" stroke="${DK}" stroke-width="2.5"/><path d="M30 36 Q14 28 17 18 Q24 12 40 30Z" fill="#f2a7b0"/><path d="M70 42 Q94 30 88 14 Q78 4 54 30Z" fill="${ec}" stroke="${DK}" stroke-width="2.5"/><path d="M70 36 Q86 28 83 18 Q76 12 60 30Z" fill="#f2a7b0"/>`;
  if(ear==='curl')s+=[[22,52],[78,52]].map(([x,y])=>[0,1,2].map(k=>`<circle cx="${x}" cy="${y+k*12}" r="11" fill="${ec}" stroke="${DK}" stroke-width="2"/>`).join('')).join('');
  // cabeza
  s+=`<ellipse cx="50" cy="${cy}" rx="${hx}" ry="${hy}" fill="${fur}" stroke="${DK}" stroke-width="2.5"/>`;
  if(o.top)s+=o.top(cy);
  if(o.spots)s+=o.spots.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#1b1b1b"/>`).join('');
  if(o.patch)s+=`<ellipse cx="38" cy="${cy-6}" rx="11" ry="12" fill="${o.patch}"/>`;
  if(o.blaze)s+=`<path d="M50 ${cy-hy+2} Q44 ${cy-6} 40 ${cy+12} L60 ${cy+12} Q56 ${cy-6} 50 ${cy-hy+2}Z" fill="${o.blaze}"/>`;
  if(o.cheeks)s+=`<ellipse cx="34" cy="${cy+10}" rx="13" ry="11" fill="${o.cheeks}"/><ellipse cx="66" cy="${cy+10}" rx="13" ry="11" fill="${o.cheeks}"/>`;
  // orejas caídas delante
  if(ear==='flop')s+=`<path d="M26 38 Q12 40 12 62 Q12 76 20 76 Q28 74 30 58Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M74 38 Q88 40 88 62 Q88 76 80 76 Q72 74 70 58Z" fill="${ec}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  if(ear==='long')s+=`<path d="M28 40 Q10 44 12 72 Q14 86 22 84 Q30 80 32 60Z" fill="${ec}" stroke="${DK}" stroke-width="2.5"/><path d="M72 40 Q90 44 88 72 Q86 86 78 84 Q70 80 68 60Z" fill="${ec}" stroke="${DK}" stroke-width="2.5"/>`;
  if(ear==='fold')s+=`<path d="M28 36 L14 34 Q12 40 22 50Z" fill="${ec}" stroke="${DK}" stroke-width="2" stroke-linejoin="round"/><path d="M72 36 L86 34 Q88 40 78 50Z" fill="${ec}" stroke="${DK}" stroke-width="2" stroke-linejoin="round"/>`;
  if(o.mask)s+=`<ellipse cx="50" cy="${cy+12}" rx="${big?13:17}" ry="${big?10:13}" fill="${o.mask}"/>`;
  // ojos
  const er=big?7.5:5.5,ex=big?14:13,ey=cy-(big?3:5);
  if(o.brows)s+=`<path d="M${50-ex-7} ${ey-9} L${50-ex+6} ${ey-6} M${50+ex+7} ${ey-9} L${50+ex-6} ${ey-6}" stroke="${o.brows}" stroke-width="5" stroke-linecap="round"/>`;
  if(o.eyeDots)s+=`<circle cx="${50-ex}" cy="${ey-9}" r="3.5" fill="${o.eyeDots}"/><circle cx="${50+ex}" cy="${ey-9}" r="3.5" fill="${o.eyeDots}"/>`;
  const ic=o.eyeC||'#1b1b1b';
  s+=[50-ex,50+ex].map(x=>`<circle cx="${x}" cy="${ey}" r="${er}" fill="${ic}"/><circle cx="${x+er*0.35}" cy="${ey-er*0.4}" r="${er*0.35}" fill="#fff"/>`).join('');
  // hocico
  const my=cy+(big?11:12);
  if(o.muzzle)s+=`<ellipse cx="50" cy="${my+2}" rx="${big?11:14}" ry="${big?8:10}" fill="${o.muzzle}"/>`;
  if(o.wrinkle)s+=`<path d="M40 ${cy-14} Q50 ${cy-18} 60 ${cy-14} M42 ${cy-9} Q50 ${cy-12} 58 ${cy-9}" stroke="#7a5a35" stroke-width="2" fill="none"/>`;
  if(o.beard)s+=`<path d="M28 ${my-8} Q26 ${my+22} 50 ${my+26} Q74 ${my+22} 72 ${my-8} Q62 ${my-2} 50 ${my-4} Q38 ${my-2} 28 ${my-8}Z" fill="${o.beard}" stroke="${DK}" stroke-width="2"/><path d="M40 ${my+6} Q42 ${my+14} 46 ${my+18} M60 ${my+6} Q58 ${my+14} 54 ${my+18}" stroke="#b8bec6" stroke-width="2" fill="none"/>`;
  s+=`<ellipse cx="50" cy="${my-2}" rx="${big?5:6.5}" ry="${big?3.6:4.6}" fill="#1b1b1b"/>`;
  if(!o.beard)s+=`<path d="M50 ${my+2} L50 ${my+5} M43 ${my+5} Q50 ${my+11} 57 ${my+5}" stroke="#1b1b1b" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if(o.tongue)s+=`<path d="M45 ${my+7} Q45 ${my+18} 50 ${my+18} Q55 ${my+18} 55 ${my+7}Z" fill="#ff6b81" stroke="#b43a50" stroke-width="1.5"/>`;
  if(o.bone)s+=`<g transform="translate(50 ${my+9})"><rect x="-20" y="-3.5" width="40" height="7" rx="3" fill="#fff8e6" stroke="${DK}" stroke-width="1.5"/>${[[-20,-4],[-20,4],[20,-4],[20,4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#fff8e6" stroke="${DK}" stroke-width="1.5"/>`).join('')}</g>`;
  if(o.acc)s+=o.acc(cy,hy);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}
const bow=(x,y,c)=>`<g transform="translate(${x} ${y})"><path d="M0 0 L-13 -8 L-13 8Z M0 0 L13 -8 L13 8Z" fill="${c}" stroke="${DK}" stroke-width="2" stroke-linejoin="round"/><circle r="4" fill="${c}" stroke="${DK}" stroke-width="2"/></g>`;
const collar=(cy,hy,c)=>`<path d="M30 ${cy+hy-6} Q50 ${cy+hy+6} 70 ${cy+hy-6}" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="50" cy="${cy+hy+5}" r="5" fill="#ffd23f" stroke="#a87b00" stroke-width="1.5"/>`;
/* Chihuahua de cuerpo entero (de pie, mirando a la izquierda) */
function chiBody(fur,sweater,earIn){
  const legs=[[34,62],[42,62],[66,62],[74,62]].map(([x,y])=>`<rect x="${x-3}" y="${y}" width="6" height="26" rx="3" fill="${fur}" stroke="${DK}" stroke-width="2"/>`).join('');
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${legs}`+
   `<path d="M80 52 Q96 44 90 28 Q88 24 86 28 Q90 40 78 46" fill="${fur}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/>`+
   `<ellipse cx="56" cy="56" rx="27" ry="14" fill="${fur}" stroke="${DK}" stroke-width="2.5"/>`+
   (sweater?`<path d="M38 46 Q56 40 74 46 L76 66 Q56 72 38 66Z" fill="${sweater}" stroke="${DK}" stroke-width="2"/><path d="M40 52 H74 M40 60 H75" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 3"/>`:'')+
   `<path d="M24 34 L10 4 Q8 1 12 3 L36 24Z" fill="${fur}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 28 L14 10 L32 24Z" fill="${earIn||'#f6a6b2'}"/>`+
   `<path d="M42 30 L50 4 Q52 1 54 5 L52 32Z" fill="${fur}" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/>`+
   `<circle cx="34" cy="38" r="17" fill="${fur}" stroke="${DK}" stroke-width="2.5"/>`+
   `<ellipse cx="20" cy="45" rx="9" ry="6.5" fill="${fur}" stroke="${DK}" stroke-width="2.5"/><ellipse cx="13" cy="43" rx="3.5" ry="2.6" fill="#1b1b1b"/>`+
   `<circle cx="30" cy="35" r="5" fill="#1b1b1b"/><circle cx="31.5" cy="33.2" r="1.8" fill="#fff"/></svg>`;
}
/* Salchicha de cuerpo entero */
const dachshund=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${[22,32,70,80].map(x=>`<rect x="${x-3}" y="62" width="7" height="16" rx="3" fill="#8b4513" stroke="${DK}" stroke-width="2"/>`).join('')}<path d="M86 52 Q98 46 96 36" stroke="${DK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M86 52 Q98 46 96 36" stroke="#8b4513" stroke-width="3.5" fill="none" stroke-linecap="round"/><rect x="14" y="46" width="76" height="22" rx="11" fill="#8b4513" stroke="${DK}" stroke-width="2.5"/><circle cx="18" cy="42" r="13" fill="#8b4513" stroke="${DK}" stroke-width="2.5"/><path d="M8 44 L-2 48 Q-4 54 4 54 L12 52Z" fill="#8b4513" stroke="${DK}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="0" cy="49" r="3" fill="#1b1b1b"/><path d="M20 34 Q32 34 30 56 Q24 58 22 50Z" fill="#5a2d0c" stroke="${DK}" stroke-width="2"/><circle cx="13" cy="39" r="3.6" fill="#1b1b1b"/><circle cx="14" cy="38" r="1.3" fill="#fff"/></svg>`.replace('viewBox="0 0 100 100"','viewBox="-6 0 106 100"');
const DOG_SVG=[
 // --- chihuahuas ---
 dogHead({ear:'tri',fur:'#e8b96a',muzzle:'#f6dcae'}),
 dogHead({ear:'tri',fur:'#2b2b2b',earIn:'#d98a8a',muzzle:'#c9874a',eyeDots:'#c9874a',cheeks:'#c9874a'}),
 dogHead({ear:'tri',fur:'#fbf5ec',muzzle:'#fff',acc:()=>bow(50,33,'#ff4f9a')}),
 dogHead({ear:'tri',fur:'#7b4a2a',earIn:'#e6a08a',muzzle:'#a8714c',acc:(cy,hy)=>collar(cy,hy,'#1e88e5')}),
 dogHead({ear:'tri',fur:'#d9a24a',muzzle:'#fff',blaze:'#fff',tongue:true}),
 dogHead({ear:'tri',fur:'#9aa5b5',muzzle:'#d7dde5',acc:(cy)=>`<rect x="27" y="${cy-11}" width="20" height="13" rx="5" fill="#111"/><rect x="53" y="${cy-11}" width="20" height="13" rx="5" fill="#111"/><path d="M47 ${cy-6} H53" stroke="#111" stroke-width="3"/><path d="M30 ${cy-8} L36 ${cy-8}" stroke="#fff" stroke-width="2" opacity=".7"/>`}),
 chiBody('#e8b96a'),
 chiBody('#2b2b2b','#e63946','#d98a8a'),
 dogHead({ear:'tri',fur:'#f3d3a6',muzzle:'#fff',acc:()=>`<path d="M34 30 L36 16 L43 24 L50 12 L57 24 L64 16 L66 30Z" fill="#ffd23f" stroke="#a87b00" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="24" r="2.5" fill="#e63946"/>`}),
 dogHead({ear:'tri',fur:'#c98b5a',muzzle:'#fff',blaze:'#fff',acc:()=>`<path d="M40 34 L52 4 L62 32Z" fill="#8338ec" stroke="${DK}" stroke-width="2" stroke-linejoin="round"/><circle cx="52" cy="5" r="4" fill="#ffd23f"/><path d="M45 22 L58 20 M43 28 L60 26" stroke="#ffd23f" stroke-width="3"/>`}),
 // --- otras razas ---
 dogHead({ear:'flop',fur:'#f1c27d',earC:'#d9a55c',muzzle:'#f8dcb0',tongue:true}), // labrador
 dogHead({ear:'flop',fur:'#2d2d2d',earC:'#1a1a1a',muzzle:'#3d3d3d',eyeC:'#8b5a2b'}), // labrador negro
 dogHead({ear:'tall',fur:'#c98b45',earC:'#2a2a2a',earIn:'#5a4030',top:(cy)=>`<path d="M23 ${cy-4} Q50 ${cy-40} 77 ${cy-4} Q64 ${cy-14} 50 ${cy-4} Q36 ${cy-14} 23 ${cy-4}Z" fill="#2a2a2a"/>`,mask:'#2a2a2a'}), // pastor
 dogHead({ear:'flop',fur:'#ffffff',earC:'#ffffff',spots:[[34,40,4],[64,36,5],[72,58,3.5],[30,62,3],[56,30,2.5],[44,72,2.5],[66,70,3]]}), // dálmata
 dogHead({ear:'fold',fur:'#e6c08a',earC:'#2a2a2a',mask:'#2a2a2a',wrinkle:true,rx:31}), // pug
 dogHead({ear:'tall',fur:'#5f6b7a',earC:'#5f6b7a',earIn:'#fff',eyeC:'#3da5ff',blaze:'#fff',cheeks:'#fff',muzzle:'#fff'}), // husky
 dogHead({ear:'long',fur:'#c7782e',earC:'#6b3a12',blaze:'#fff',muzzle:'#fff'}), // beagle
 dogHead({ear:'curl',fur:'#f7f2ff',earC:'#f7f2ff',muzzle:'#fff',top:(cy)=>[30,42,54,66,36,60].map((x,i)=>`<circle cx="${x+2}" cy="${cy-24+(i>3?-6:0)}" r="10" fill="#f7f2ff" stroke="${DK}" stroke-width="2"/>`).join(''),acc:()=>bow(50,22,'#7bd3f7')}), // caniche
 dogHead({ear:'tall',fur:'#e9893a',earC:'#e9893a',earIn:'#fff',blaze:'#fff',cheeks:'#fff',tongue:true}), // corgi
 dachshund,
 dogHead({ear:'fold',fur:'#1f1f1f',earC:'#1f1f1f',blaze:'#fff',muzzle:'#fff',eyeC:'#6b3a12'}), // border collie
 dogHead({ear:'fold',fur:'#6b7280',earC:'#4b5563',brows:'#f1f3f5',beard:'#f1f3f5'}), // schnauzer
 dogHead({ear:'bat',fur:'#ffffff',earC:'#2a2a2a',patch:'#2a2a2a',muzzle:'#f3e3d3',wrinkle:true,rx:31}), // bulldog francés
 dogHead({ear:'flop',fur:'#fff',earC:'#a0522d',patch:'#a0522d',muzzle:'#fff',acc:(cy,hy)=>`<rect x="40" y="${cy+hy-2}" width="20" height="13" rx="4" fill="#b5651d" stroke="${DK}" stroke-width="2"/><path d="M40 ${cy+hy+4} H60" stroke="#ffd23f" stroke-width="2"/>`}), // san bernardo
 dogHead({ear:'flop',fur:'#b98a5e',earC:'#8a5a33',muzzle:'#e6cba8',bone:true}), // mestizo con hueso
 dogHead({ear:'tall',fur:'#c08a4a',earC:'#c08a4a',earIn:'#e0b07a',top:(cy)=>`<path d="M26 ${cy-6} Q50 ${cy-38} 74 ${cy-6} Q50 ${cy-16} 26 ${cy-6}Z" fill="#4a6a8a"/>`,acc:()=>bow(50,32,'#e63946')}), // yorkshire
];
/* ---- Vehículos dibujados (coches, autobuses, aviones...) — genéricos, sin marcas ---- */
const VK='#1f2328',GL='#bfe6ff';
const wh=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r||9}" fill="#222" stroke="${VK}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${(r||9)*0.42}" fill="#cfd4da"/>`;
const V=(b)=>`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${b}</svg>`;
const P=(d,f,sw)=>`<path d="${d}" fill="${f}" stroke="${VK}" stroke-width="${sw||2.5}"/>`;
const SEDAN='M8 72 L8 60 Q10 53 20 52 L30 51 L38 38 Q40 35 46 35 L66 35 Q71 35 74 39 L82 51 L90 53 Q94 55 94 61 L94 72 Z';
const SEDAN_W=P('M41 39 L53 39 L53 50 L34 50Z',GL,2)+P('M57 39 L67 39 Q70 39 72 42 L77 50 L57 50Z',GL,2);
const car=(c,extra,pre)=>V((pre||'')+P(SEDAN,c)+SEDAN_W+`<rect x="88" y="58" width="6" height="4" rx="1" fill="#ffe066"/><rect x="8" y="58" width="5" height="4" rx="1" fill="#ff4d4d"/>`+(extra||'')+wh(28,72)+wh(74,72));
const VEH_SVG=[
 // coches
 car('#ffd000',`${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<rect x="${12+i*7}" y="61" width="3.5" height="3.5" fill="${VK}"/>`).join('')}`,P('M48 35 L48 28 L64 28 L64 35Z','#fff',2)), // taxi
 car('#ffffff',`<path d="M9 60 H93" stroke="#1d4ed8" stroke-width="7"/>`,`<rect x="47" y="27" width="9" height="8" rx="2" fill="#e63946" stroke="${VK}" stroke-width="2"/><rect x="56" y="27" width="9" height="8" rx="2" fill="#1d4ed8" stroke="${VK}" stroke-width="2"/>`), // policía
 V(P('M4 72 L4 62 Q6 56 22 54 L40 50 Q50 40 62 40 L72 41 Q80 44 86 52 L95 56 Q98 60 97 72 Z','#e63946')+P('M48 50 Q54 44 62 44 L70 45 L76 52 L48 52Z',GL,2)+P('M4 56 L2 48 L14 48 L14 54Z','#e63946',2)+`<path d="M20 62 H80" stroke="#fff" stroke-width="3"/>`+wh(24,72)+wh(78,72)), // deportivo
 V(P('M6 72 L6 56 Q8 52 18 52 L80 52 Q92 53 95 60 L95 72 Z','#14b8a6')+`<path d="M64 52 L56 38" stroke="${VK}" stroke-width="3.5" stroke-linecap="round"/>`+P('M30 52 L30 42 Q30 40 34 40 L38 40 L40 52Z','#7c2d12',2)+P('M44 52 L44 42 Q44 40 48 40 L52 40 L54 52Z','#7c2d12',2)+wh(26,72)+wh(76,72)), // descapotable
 V(P('M8 72 L8 40 Q8 34 14 34 L70 34 Q76 34 80 42 L86 52 L92 54 Q95 56 95 62 L95 72Z','#2e7d32')+P('M14 39 H38 V51 H14Z',GL,2)+P('M43 39 H66 Q71 39 74 44 L78 51 H43Z',GL,2)+`<rect x="12" y="28" width="56" height="5" rx="2" fill="#555" stroke="${VK}" stroke-width="2"/>`+`<circle cx="6" cy="56" r="8" fill="#333" stroke="${VK}" stroke-width="2"/>`+wh(28,72,10)+wh(76,72,10)), // todoterreno
 V(P('M6 74 L6 30 Q6 24 12 24 L72 24 Q79 24 83 33 L92 50 Q95 55 95 61 L95 74Z','#f97316')+P('M66 30 H74 Q78 30 80 34 L87 48 H66Z',GL,2)+[12,32,50].map(x=>P(`M${x} 30 H${x+14} V46 H${x}Z`,GL,2)).join('')+`<path d="M48 50 V70" stroke="${VK}" stroke-width="2"/>`+wh(26,74)+wh(76,74)), // furgoneta
 V(P('M10 72 Q8 50 28 41 Q50 30 72 41 Q92 50 92 72 Z','#ff6fae')+P('M34 45 Q50 36 66 45 L68 54 L32 54Z',GL,2)+`<path d="M50 38 V54" stroke="${VK}" stroke-width="2"/>`+`<circle cx="88" cy="60" r="3.5" fill="#ffe066" stroke="${VK}" stroke-width="1.5"/>`+wh(28,72)+wh(72,72)), // escarabajo (genérico)
 V(P('M6 72 L6 50 L50 50 L52 34 Q53 32 58 32 L70 32 Q74 32 76 36 L83 49 L92 51 Q95 53 95 60 L95 72Z','#2563eb')+P('M56 36 L70 36 L76 48 L56 48Z',GL,2)+`<path d="M8 54 H48" stroke="#1e3a8a" stroke-width="3"/>`+wh(24,72,10)+wh(76,72,10)), // pick-up
 car('#7c3aed'), // coche morado
 V(P('M8 66 L8 54 L28 54 L32 34 Q32 32 36 32 L60 32 Q63 32 64 34 L68 54 L92 54 L92 66Z','#1f2937')+P('M8 66 Q8 52 22 52 Q34 52 36 66Z','#1f2937')+P('M64 66 Q66 52 78 52 Q92 52 92 66Z','#1f2937')+P('M36 36 H47 V50 H34Z','#fff3c4',2)+P('M51 36 H60 L63 50 H51Z','#fff3c4',2)+`<circle cx="90" cy="50" r="4" fill="#ffe066" stroke="${VK}" stroke-width="1.5"/>`+wh(22,70,9)+wh(78,70,9)), // coche clásico
 V(P('M6 74 L6 30 Q6 24 12 24 L72 24 Q79 24 83 33 L92 50 Q95 55 95 61 L95 74Z','#ffffff')+P('M66 30 H74 Q78 30 80 34 L87 48 H66Z',GL,2)+`<path d="M8 56 H93" stroke="#e63946" stroke-width="6"/><rect x="26" y="32" width="8" height="22" fill="#e63946"/><rect x="19" y="39" width="22" height="8" fill="#e63946"/>`+`<rect x="56" y="17" width="12" height="7" rx="2" fill="#1d4ed8" stroke="${VK}" stroke-width="2"/>`+wh(26,74)+wh(76,74)), // ambulancia
 V(P('M3 74 L3 42 L64 42 L66 30 L84 30 Q90 30 92 40 L97 52 L97 74Z','#d62828')+P('M70 34 H84 Q87 34 88 38 L92 50 H70Z',GL,2)+`<rect x="6" y="32" width="56" height="8" fill="#e5e7eb" stroke="${VK}" stroke-width="2"/>${[12,20,28,36,44,52].map(x=>`<path d="M${x} 32 V40" stroke="${VK}" stroke-width="2"/>`).join('')}<rect x="6" y="52" width="56" height="10" fill="#e5e7eb" stroke="${VK}" stroke-width="1.5"/>`+wh(16,74)+wh(38,74)+wh(80,74)), // bomberos
 // autobuses
 V(P('M4 76 L4 30 Q4 24 10 24 L80 24 Q86 24 88 30 L96 50 L96 76Z','#ffc107')+[8,24,40,56].map(x=>P(`M${x} 30 H${x+12} V46 H${x}Z`,GL,2)).join('')+P('M74 30 H82 L90 50 H74Z',GL,2)+`<path d="M4 54 H96 M4 62 H96" stroke="${VK}" stroke-width="2.5"/><rect x="88" y="58" width="6" height="5" fill="#fff"/>`+wh(22,76)+wh(76,76)), // escolar
 V(P('M8 82 L8 14 Q8 8 14 8 L86 8 Q92 8 92 14 L92 82Z','#d62828')+[12,30,48,66].map(x=>P(`M${x} 14 H${x+14} V30 H${x}Z`,GL,2)+P(`M${x} 44 H${x+14} V60 H${x}Z`,GL,2)).join('')+`<path d="M8 38 H92" stroke="#ffd23f" stroke-width="3"/><rect x="82" y="44" width="8" height="30" fill="${GL}" stroke="${VK}" stroke-width="2"/>`+wh(24,82)+wh(74,82)), // dos pisos
 V(P('M3 74 L3 32 Q3 26 9 26 L90 26 Q96 26 96 34 L97 74Z','#22a559')+P('M8 32 H82 V52 H8Z',GL,2)+[26,44,62].map(x=>`<path d="M${x} 32 V52" stroke="${VK}" stroke-width="2"/>`).join('')+P('M86 32 H93 V70 H86Z',GL,2)+`<rect x="8" y="58" width="74" height="4" fill="#fff"/>`+wh(20,74)+wh(70,74)), // urbano
 V(P('M3 72 L3 34 Q3 26 12 26 L74 26 Q84 26 90 36 L97 52 L97 72Z','#1d4ed8')+P('M8 32 H72 Q80 32 84 38 L90 50 H8Z','#0b2545',2)+`<path d="M3 58 Q50 52 97 60" stroke="#93c5fd" stroke-width="5" fill="none"/>`+wh(20,72)+wh(78,72)), // autocar
 V(P('M18 86 L18 22 Q18 12 28 12 L72 12 Q82 12 82 22 L82 86Z','#fb8c00')+P('M24 32 H76 V58 H24Z',GL,2)+`<rect x="30" y="17" width="40" height="10" rx="2" fill="#111"/><text x="50" y="25.5" text-anchor="middle" font-family="Arial Black,Arial" font-size="9" font-weight="900" fill="#ffd23f">24</text><circle cx="30" cy="70" r="5" fill="#ffe066" stroke="${VK}" stroke-width="2"/><circle cx="70" cy="70" r="5" fill="#ffe066" stroke="${VK}" stroke-width="2"/><rect x="40" y="66" width="20" height="8" rx="2" fill="#444"/><path d="M18 36 H10 V48 M82 36 H90 V48" stroke="${VK}" stroke-width="3" fill="none"/><rect x="22" y="86" width="12" height="8" rx="2" fill="#222"/><rect x="66" y="86" width="12" height="8" rx="2" fill="#222"/>`), // autobús de frente
 V(`<path d="M2 6 H98" stroke="${VK}" stroke-width="2"/><path d="M40 32 L58 6 M48 32 L66 6" stroke="${VK}" stroke-width="3"/>`+P('M3 76 L3 38 Q3 32 9 32 L90 32 Q96 32 96 40 L97 76Z','#38bdf8')+[8,26,44,62].map(x=>P(`M${x} 38 H${x+14} V54 H${x}Z`,'#fff',2)).join('')+P('M82 38 H92 V72 H82Z','#fff',2)+wh(22,76)+wh(70,76)), // trolebús
 // aviones
 V(P('M6 54 Q6 46 18 46 L80 46 Q96 48 96 54 Q96 60 80 62 L18 62 Q6 62 6 54Z','#ffffff')+P('M12 46 L4 24 L16 24 L28 46Z','#1d4ed8')+P('M40 58 L56 84 L66 84 L60 58Z','#cbd5e1')+P('M44 50 L54 36 L60 36 L58 50Z','#94a3b8',2)+[24,32,40,48,56,64,72].map(x=>`<circle cx="${x}" cy="52" r="2.2" fill="#1d4ed8"/>`).join('')+P('M84 49 Q92 50 94 54 L84 54Z',GL,1.5)+`<path d="M6 58 H90" stroke="#1d4ed8" stroke-width="2.5"/>`), // avión de pasajeros
 V(P('M14 56 Q14 48 26 48 L70 48 Q82 50 84 56 Q82 62 70 64 L26 64 Q14 64 14 56Z','#ffd23f')+P('M30 42 H74 V48 H30Z','#e63946',2)+`<path d="M44 48 L40 64 M60 48 L62 64" stroke="${VK}" stroke-width="2"/>`+P('M18 50 L8 36 L16 36 L26 49Z','#e63946',2)+P('M58 52 H70 Q76 53 78 56 H58Z',GL,1.5)+`<ellipse cx="88" cy="56" rx="3" ry="16" fill="#555" stroke="${VK}" stroke-width="1.5"/><circle cx="85" cy="56" r="3" fill="${VK}"/>`+wh(54,76,5)+`<path d="M54 64 V72" stroke="${VK}" stroke-width="2"/>`), // avioneta
 V(P('M10 58 Q10 50 22 50 L72 50 Q82 52 84 58 Q82 64 72 66 L22 66 Q10 66 10 58Z','#e63946')+P('M28 30 H82 V36 H28Z','#e63946',2)+P('M28 72 H82 V78 H28Z','#e63946',2)+`<path d="M38 36 V72 M70 36 V72" stroke="${VK}" stroke-width="2.5"/>`+P('M14 52 L6 36 L14 36 L24 51Z','#ffd23f',2)+`<circle cx="56" cy="50" r="5" fill="#8b5a2b" stroke="${VK}" stroke-width="1.5"/><ellipse cx="90" cy="58" rx="3" ry="16" fill="#555" stroke="${VK}" stroke-width="1.5"/>`), // biplano
 V(P('M10 46 Q10 38 22 38 L72 38 Q84 40 86 46 Q84 52 72 54 L22 54 Q10 54 10 46Z','#f97316')+P('M30 30 H78 V36 H30Z','#fff',2)+P('M14 40 L6 24 L14 24 L24 39Z','#fff',2)+P('M58 41 H70 Q76 42 78 45 H58Z',GL,1.5)+`<path d="M36 54 L32 70 M64 54 L68 70" stroke="${VK}" stroke-width="2.5"/>`+P('M14 70 H84 Q90 70 88 76 L84 78 H18 Q12 78 14 70Z','#e5e7eb',2)+`<path d="M2 86 Q14 80 26 86 T50 86 T74 86 T98 86" stroke="#3a86ff" stroke-width="3" fill="none"/><ellipse cx="90" cy="46" rx="3" ry="14" fill="#555" stroke="${VK}" stroke-width="1.5"/>`), // hidroavión
 V(`<path d="M10 22 H90" stroke="${VK}" stroke-width="4" stroke-linecap="round"/><rect x="47" y="22" width="6" height="10" fill="${VK}"/>`+P('M64 50 L94 46 L94 54 L66 58Z','#d62828',2)+P('M90 40 L98 40 L96 54 L90 54Z','#d62828',2)+P('M20 54 Q20 32 44 32 Q70 32 70 54 Q70 70 46 70 L32 70 Q20 70 20 54Z','#d62828')+P('M24 52 Q24 38 40 37 L46 37 L46 54Z',GL,2)+`<path d="M26 80 H70 M34 70 L32 80 M58 70 L60 80" stroke="${VK}" stroke-width="3" stroke-linecap="round"/>`), // helicóptero
 // extras del grupo
 V(`<circle cx="30" cy="16" r="7" fill="#e5e7eb"/><circle cx="22" cy="10" r="5" fill="#e5e7eb"/>`+P('M26 40 L24 24 L36 24 L34 40Z','#333',2)+P('M8 70 L8 48 Q8 40 16 40 L60 40 L60 70Z','#15803d')+P('M58 30 H92 V70 H58Z','#166534')+P('M66 36 H84 V50 H66Z',GL,2)+`<rect x="56" y="26" width="40" height="5" fill="#d62828" stroke="${VK}" stroke-width="2"/>`+P('M2 72 L8 62 L8 72Z','#d62828',2)+`<circle cx="10" cy="56" r="4" fill="#ffe066" stroke="${VK}" stroke-width="1.5"/><path d="M6 76 H96" stroke="${VK}" stroke-width="3"/>`+wh(24,72,8)+wh(46,72,8)+wh(74,70,12)), // tren
 V(P('M3 72 L3 26 H62 V72Z','#cbd5e1')+`<path d="M3 34 H62 M3 44 H62 M3 54 H62 M3 64 H62" stroke="#94a3b8" stroke-width="2"/>`+P('M64 72 L64 38 Q64 34 68 34 L84 34 Q88 34 90 38 L97 52 L97 72Z','#2563eb')+P('M70 40 H84 L90 52 H70Z',GL,2)+wh(16,74)+wh(36,74)+wh(80,74)), // camión
];
const THEMES=[
 {id:'frutas',name:'Frutas',icon:'🍓',items:['🍎','🍏','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥕','🌽','🥦','🌶️','🥬','🫑','🥔','🧄','🥜','🫒']},
 {id:'animales',name:'Animales',icon:'🐶',items:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🦉','🦄','🐝','🐢','🐙','🦀','🐬','🐞','🦋','🐌','🦓','🦒','🐘']},
 {id:'escudos',name:'Escudos',icon:'🛡️',items:Array.from({length:30},(_,i)=>({h:crestSVG(i)}))},
 {id:'objetos',name:'Objetos',icon:'🎁',items:['⚽','🎸','🎧','📱','💡','🔑','⏰','📷','🎁','🎈','✏️','📚','🧸','🎨','🔔','☂️','👑','💎','🎺','🥁','🕶️','🧲','🎤','🚲','🔦','🧭','⚓','🪁','🎮','🏀']},
 {id:'flores',name:'Flores',icon:'🌷',items:['🌸','🌹','🌺','🌻','🌼','🌷','💐','🪷','🪻','🥀','🏵️','💮','🍀','🌵',...Array.from({length:16},(_,i)=>({h:flowerSVG(i)}))]},
 {id:'banderas',name:'Banderas',icon:'🏳️',items:FLAGS.map(f=>({h:F(f[1]),name:f[0]}))},
 {id:'comidas',name:'Comidas',icon:'🍕',items:['🍕','🍔','🍟','🌭','🌮','🌯','🥪','🥗','🍝','🍜','🍣','🍤','🍙','🥟','🥐','🥖','🥨','🧀','🍳','🥞','🧇','🍗','🍩','🍪','🎂','🧁','🍫','🍭','🍿','🍦']},
 {id:'letras',name:'Letras',icon:'🔤',items:LETTERS.map((l,i)=>({h:letterHTML(l,i)}))},
 {id:'deportes',name:'Pelotas y bates',icon:'⚾',items:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🏓','🏸','🏒','🏑','🥍','🏏','⛳','🎳','🥏','🥊','🥌','🛹',...SPORT_SVG.map(s=>({h:s}))]},
 {id:'perros',name:'Perros',icon:'🐕',items:[...DOG_SVG.map(h=>({h})),'🐶','🐕','🐩','🦮']},
 {id:'vehiculos',name:'Vehículos',icon:'🚌',items:[...VEH_SVG.map(h=>({h})),'🚙','🚌','✈️','🚜','🛵']}];

/* ---- Mezcla: varios temas en el mismo nivel (v6) ---- */
// Grupos de fichas que se parecen a tamaño de ficha: en una mezcla no se juntan dos del mismo grupo.
const SIMILAR={
 frutas:[['🍎','🍅','🍒'],['🍏','🍐'],['🍊','🥭','🍑'],['🥦','🥬'],['🌶️','🫑'],['🫐','🍇'],['🍈','🍉']],
 animales:[['🐯','🦁','🐱'],['🐭','🐹'],['🐨','🐼']],
 escudos:Array.from({length:12},(_,k)=>[k,k+12,k+24]),
 objetos:[['🎤','🎧'],['🔦','💡'],['🔔','⏰']],
 flores:[['🌸','💮','🏵️'],['🌹','🥀'],['🌷','🌺'],['🌻','🌼'],...Array.from({length:8},(_,k)=>[14+k,22+k])],
 banderas:[[1,15],[8,9,16],[3,12,4],[5,6],[2,7],[19,20,22,29],[18,10],[13,23],[17,31,24],[11,28]],
 comidas:[['🌮','🌯'],['🍣','🍙'],['🧁','🎂'],['🥞','🧇'],['🍩','🍪'],['🥐','🥨'],['🍔','🥪']],
 letras:[['O','Q'],['C','G'],['E','F'],['M','N','Ñ'],['L','LL'],['R','RR','P','B'],['I','J'],['U','V'],['CH','LL','RR']],
 deportes:[['⚾','🥎'],['🏉','🏈'],['🏒','🏑','🥍'],['🎱',27,28],['🏀',26],[22,'⛳'],['🏏',23],['🏓','🏸']],
 perros:[[0,4,8,9],[1,7],[2,17,28],[11,20],[10,24,26],[14,22],[3,25],[6,27]],
 vehiculos:[[0,1,8],[5,10],[12,14,17,26],[18,27],[19,20,21],[4,25]]};
const CHIHUAHUAS=[0,1,2,3,4,5,6,7,8,9];
const itemKey=it=>typeof it==='string'?it:it.h;
const letterOf=(t,i)=>t.id==='letras'?LETTERS[i]:null;
function groupsOf(t){ // índice -> lista de ids de grupo
  const g=new Map(),list=SIMILAR[t.id]||[];
  list.forEach((grp,gi)=>grp.forEach(x=>{let i=typeof x==='number'?x:t.items.findIndex((it,k)=>it===x||letterOf(t,k)===x);
    if(i>=0){if(!g.has(i))g.set(i,[]);g.get(i).push(t.id+gi);}}));
  return g;
}
const MIX_ORDER=[9,10,0,5,7,1,8,3,6,2,4]; // perros, vehículos, frutas, banderas, letras, animales, deportes, objetos, comidas, escudos, flores
function mixThemesFor(n,nTypes){
  const K=nTypes<6?2:Math.min(6,Math.max(3,Math.floor(nTypes/2)));
  const c=Math.floor((n-1)/THEMES.length),stride=1+(c%5),start=((n-1)*3)%THEMES.length,L=THEMES.length;
  const out=[];for(let i=0;out.length<K;i++){const t=THEMES[MIX_ORDER[(start+i*stride)%L]];if(!out.includes(t))out.push(t);}
  return out;
}
/* usedTypes: tipos (0..maxT-1) que aparecen en el tablero. Devuelve un "tema" con items[tipo]. */
function mixTheme(n,usedTypes,maxT,rngF){
  maxT=maxT||30;const used=[...usedTypes].sort((a,b)=>a-b);
  const r=rngF||(()=>{let a=(n*2654435761)>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};})();
  const themes=mixThemesFor(n,used.length);
  const slots=themes.map(()=>0);used.forEach((_,i)=>slots[i%themes.length]++);
  const keys=new Set(),blocked=new Set(),chosen=[],from=[];
  themes.forEach((t,ti)=>{
    const g=groupsOf(t);
    let cand=[...t.items.keys()];for(let i=cand.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[cand[i],cand[j]]=[cand[j],cand[i]];}
    if(t.id==='perros')cand.sort((a,b)=>(CHIHUAHUAS.includes(b)?1:0)-(CHIHUAHUAS.includes(a)?1:0)); // chihuahuas protagonistas
    const pick=[];
    for(const pass of [0,1,2]){
      for(const i of cand){if(pick.length>=slots[ti])break;if(pick.includes(i))continue;
        const k=itemKey(t.items[i]),gs=g.get(i)||[];
        if(pass<2&&keys.has(k))continue;if(pass<1&&gs.some(x=>blocked.has(x)))continue;
        pick.push(i);keys.add(k);gs.forEach(x=>blocked.add(x));}
    }
    for(const i of pick){chosen.push(t.items[i]);from.push(t.id);}
  });
  // mezclar el orden para que los temas no queden agrupados por número de tipo
  const ord=[...chosen.keys()];for(let i=ord.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]];}
  const items=new Array(maxT).fill(null),src=new Array(maxT).fill(null);
  used.forEach((ty,k)=>{items[ty]=chosen[ord[k]];src[ty]=from[ord[k]];});
  for(let i=0;i<maxT;i++)if(items[i]===null){items[i]=themes[0].items[i%themes[0].items.length];src[i]=themes[0].id;}
  return {id:'mezcla',name:'Mezcla',icon:'🎲',mix:themes,items,src,label:'🎲 Mezcla '+themes.map(t=>t.icon).join('')};
}
const API={THEMES,crestSVG,mixTheme,mixThemesFor,SIMILAR};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else Object.assign(root,API);
})(this);
