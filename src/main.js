import './styles/main.css';
import './styles/refinement.css';
import './styles/sections.css';
import { setupExperiencePages } from './experience-pages.js';
import translations from './i18n/translations.js';

const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}assets/${path}`;
const languages = [['it','IT'],['en','EN'],['fr','FR'],['de','DE'],['es','ES'],['pt','PT']];
const serviceNames = ['Giro Classico','Esperienza Romantica','Occasioni Speciali','Esperienza Personalizzata'];
let language = localStorage.getItem('almara-language') || (navigator.language || 'en').slice(0,2);
if (!translations[language]) language = 'en';

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="grain"></div><div class="intro" aria-hidden="true"><span>ALMARA</span></div>
  <header class="nav" id="nav"><a class="nav-logo" href="#top" aria-label="ALMARA home"><img src="${asset('logo/logo-almara.png')}" alt="ALMARA"></a><nav aria-label="Main navigation">${[0,1,2,3].map((n)=>`<a href="#${['experience','services','venice','contact'][n]}" data-nav="${n}"></a>`).join('')}</nav><div class="nav-actions"><div class="language"><button class="language-current" aria-expanded="false" aria-haspopup="listbox"><span class="flag"></span><b></b></button><div class="language-list" role="listbox">${languages.map(([code,label])=>`<button role="option" data-language="${code}">${flag(code)}<span>${label}</span></button>`).join('')}</div></div><a href="#contact" class="nav-cta" data-i18n="contact"></a></div><button class="menu-button" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button></header>
  <main id="top"><section class="hero"><img class="mask mask-left" src="${asset('decorations/decoration-left.png')}" alt=""/><img class="mask mask-right" src="${asset('decorations/decoration-right.png')}" alt=""/><div class="hero-content"><img class="hero-logo" src="${asset('logo/logo-almara.png')}" alt="ALMARA Luxury Experience"><p class="eyebrow" data-i18n="eyebrow"></p><h1 data-i18n="title"></h1><p class="hero-copy" data-i18n="subtitle"></p><div class="hero-actions"><a href="#experience" class="button gold" data-i18n="discover"></a><a href="#contact" class="button ghost" data-i18n="contact"></a></div></div><a class="scroll-cue" href="#experience" aria-label="Scroll to experience"><span></span>SCROLL</a></section>
  <section class="experience section" id="experience"><div class="chapter">01 <span></span> ALMARA</div><div class="experience-copy"><p class="display reveal" data-i18n="experience"></p><p class="display gold-text reveal" data-i18n="authentic"></p></div><div class="ornament reveal">✦</div></section>
  <section class="services section" id="services"><div class="section-heading reveal"><p class="eyebrow">ALMARA / 02</p><h2 data-i18n="services"></h2></div><div class="service-list">${serviceNames.map((name,i)=>`<article class="service reveal"><div class="service-visual s${i}"><img src="${asset(`images/experience${i + 1}.png`)}" alt="${name}"><span>${String(i+1).padStart(2,'0')}</span></div><div class="service-info"><p class="service-no">0${i+1}</p><h3 data-service="${i}">${name}</h3><p data-description="${i}"></p><a href="#contact" class="text-link">DISCOVER <b>→</b></a></div></article>`).join('')}</div></section>
  <section class="immersive" id="venice"><div class="immersive-photo" style="--immersion:url('${asset('images/experience5.png')}')"></div><div class="water-light"></div><div class="immersive-content"><p class="eyebrow">VENICE / ALMARA</p><h2 class="reveal" data-i18n="immersive"></h2></div></section>
  <section class="tradition section"><div class="tradition-image reveal"><img src="${asset('images/experience6.png')}" alt="Venice by gondola"></div><div class="tradition-copy"><p class="eyebrow">THE ART OF THE ROUTE</p><h2 class="reveal" data-i18n="tradition"></h2><div class="rule reveal"></div><p class="reveal">Every detail is considered: the silence of a narrow canal, the changing light on water, the city revealing itself only at its own pace.</p></div></section>
  <section class="contact section" id="contact"><p class="eyebrow reveal">ALMARA / VENICE</p><h2 class="reveal" data-i18n="journey"></h2><div class="contact-grid">${[['whatsapp','WhatsApp','https://wa.me/XXXXXXXXXXX'],['instagram','Instagram','https://instagram.com/USERNAME'],['email','Email','mailto:EMAIL@example.com']].map(([icon,name,url])=>`<a class="contact-card reveal" href="${url}" target="_blank" rel="noreferrer"><img src="${asset(`icons/${icon}.png`)}" alt=""><span>${name}</span><b>↗</b></a>`).join('')}</div></section></main>
  <footer><img src="${asset('logo/logo-almara.png')}" alt="ALMARA"><span data-i18n="footer"></span><span>© ${new Date().getFullYear()} ALMARA</span></footer><div class="mobile-menu"><div class="mobile-links">${[0,1,2,3].map((n)=>`<a href="#${['experience','services','venice','contact'][n]}" data-nav="${n}"></a>`).join('')}</div><div class="mobile-languages">${languages.map(([code,label])=>`<button data-language="${code}">${flag(code)} ${label}</button>`).join('')}</div></div>`;

function flag(code) {
  const unionJack = code === 'en' ? `<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="m0 0 60 30M60 0 0 30"/><path fill="#c8102e" d="M0 0v2.24L25.53 15H30zM60 0h-4.47L30 12.76V15zM60 30v-2.24L34.47 15H30zM0 30h4.47L30 17.24V15z"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></svg>` : '';
  return `<i class="nation-flag nation-${code}" aria-hidden="true">${unionJack}</i>`;
}
function translate() { const t=translations[language]; document.documentElement.lang=language; document.title=`ALMARA — ${t.eyebrow}`; document.querySelector('meta[name="description"]').content=t.subtitle; document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t[el.dataset.i18n]); document.querySelectorAll('[data-nav]').forEach(el=>el.textContent=t.nav[el.dataset.nav]); document.querySelectorAll('[data-description]').forEach(el=>el.textContent=t.descriptions[el.dataset.description]); document.querySelectorAll('[data-service]').forEach((el,i)=>el.textContent= serviceNames[i]); const current=document.querySelector('.language-current'); current.querySelector('.flag').innerHTML=flag(language); current.querySelector('b').textContent=language.toUpperCase(); }
const routeCopy=document.querySelector('.tradition-copy');
routeCopy.querySelector('.eyebrow').dataset.i18n='routeLabel';
routeCopy.querySelector('p:last-child').dataset.i18n='routeCopy';
document.querySelectorAll('.text-link').forEach(el=>{el.innerHTML='<span data-i18n="more"></span> <b aria-hidden="true">→</b>'});
document.querySelector('.scroll-cue').innerHTML='<span></span><small data-i18n="scroll"></small>';
translate();
function translateServiceNames() {
  document.querySelectorAll('[data-service]').forEach((el,i)=>el.textContent=translations[language].names[i]);
  document.querySelectorAll('.service-visual img').forEach((el,i)=>el.alt=translations[language].names[i]);
}
translateServiceNames();
let changingLanguage = false;
function languageTextSpans() {
  const elements = document.querySelectorAll('[data-i18n], [data-nav], [data-description], [data-service], .detail-back, .detail-page h1, .detail-description, .detail-page .button');
  const spans = [];
  elements.forEach(el => {
    if (!el.getClientRects().length) return;
    [...el.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.className = 'language-text';
        node.replaceWith(span); span.append(node);
      }
    });
    spans.push(...el.querySelectorAll(':scope > .language-text'));
  });
  return [...new Set(spans)];
}
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',async()=>{
  const nextLanguage = button.dataset.language;
  if (nextLanguage === language || changingLanguage) return;
  document.querySelector('.language').classList.remove('open');
  document.querySelector('.language-current').setAttribute('aria-expanded','false');
  const update = () => {
    language=nextLanguage;
    localStorage.setItem('almara-language',language);
    translate(); translateServiceNames();
    document.dispatchEvent(new Event('almara-language-change'));
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { update(); return; }
  changingLanguage = true;
  const animations = [];
  try {
    const outgoing = languageTextSpans().map(el => el.animate([{opacity:1,filter:'blur(0px)'},{opacity:0,filter:'blur(2px)'}], {duration:160,fill:'forwards',easing:'ease-in'}));
    animations.push(...outgoing);
    await Promise.all(outgoing.map(animation=>animation.finished));
    update();
    outgoing.forEach(animation=>animation.cancel());
    const incoming = languageTextSpans().map((el,i) => el.animate([{opacity:0,filter:'blur(2px)'},{opacity:1,filter:'blur(0px)'}], {duration:300,delay:Math.min(i*12,72),fill:'both',easing:'ease-out'}));
    animations.push(...incoming);
    await Promise.all(incoming.map(animation=>animation.finished));
  } finally {
    animations.forEach(animation=>animation.cancel());
    changingLanguage = false;
  }
}));
document.querySelector('.language-current').addEventListener('click',()=>document.querySelector('.language').classList.toggle('open'));
const menu=document.querySelector('.menu-button'); menu.addEventListener('click',()=>{const active=document.body.classList.toggle('menu-open');menu.setAttribute('aria-expanded',active);}); document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); }}),{threshold:.08}); document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('.hero').insertAdjacentHTML('afterbegin','<div class="ambient-glow" aria-hidden="true"></div>');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let ticking=false;
function updateMotion() {
  const y=scrollY, h=innerHeight;
  document.querySelector('#nav').classList.toggle('scrolled',y>35);
  document.documentElement.style.setProperty('--scroll',motion.matches ? 0 : Math.min(y/h,1));
  if (!motion.matches) document.querySelectorAll('.service-visual, .tradition-image, .immersive').forEach(el=>{
    const rect=el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > h) return;
    const progress=(h/2 - rect.top - rect.height/2)/h;
    el.style.setProperty('--photo-shift',`${Math.max(-9,Math.min(9,progress*18))}px`);
    el.style.setProperty('--scene-shift',`${Math.max(-22,Math.min(22,progress*35))}px`);
  });
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateMotion)}},{passive:true});
addEventListener('resize',updateMotion); updateMotion();
const heroSection = document.querySelector('.hero');
const maskObserver = new IntersectionObserver(entries => {
  heroSection.classList.toggle('masks-visible', entries[0].intersectionRatio > .8);
}, { threshold: [0, .8, 1] });
setTimeout(() => maskObserver.observe(heroSection), motion.matches ? 0 : 1100);
setupExperiencePages({ translations, getLanguage: () => language, asset });
const languageButton=document.querySelector('.language-current');
const syncLanguageExpanded=()=>languageButton.setAttribute('aria-expanded',document.querySelector('.language').classList.contains('open'));
languageButton.addEventListener('click',syncLanguageExpanded);
document.addEventListener('click',e=>{if(!e.target.closest('.language')){document.querySelector('.language').classList.remove('open');syncLanguageExpanded()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');document.querySelector('.language').classList.remove('open');syncLanguageExpanded()}});
