export function setupExperiencePages({ translations, getLanguage, asset }) {
  const slugs = ['classic', 'romantic', 'occasions', 'tailored'];
  const copy = {
    it: ['Lasciati accompagnare tra canali raccolti e scorci veneziani, osservando la città dal ritmo lento della gondola.', 'Condividi un momento a due tra riflessi sull’acqua e angoli suggestivi di Venezia.', 'Un modo speciale di vivere Venezia in occasione di un anniversario, una ricorrenza o un momento da ricordare.', 'Raccontaci che cosa desideri vivere a Venezia e costruiremo insieme la proposta più adatta.'],
    en: ['Discover quiet canals and Venetian views at the gentle pace of a gondola.', 'Share a moment for two among reflections on the water and atmospheric corners of Venice.', 'Experience Venice for an anniversary, a celebration or a moment worth remembering.', 'Tell us what you would like to experience in Venice and we will shape a proposal together.'],
    fr: ['Découvrez les petits canaux et les vues vénitiennes au rythme paisible d’une gondole.', 'Partagez un moment à deux entre les reflets de l’eau et les coins évocateurs de Venise.', 'Vivez Venise pour un anniversaire, une célébration ou un moment à retenir.', 'Racontez-nous vos envies à Venise et nous élaborerons ensemble une proposition adaptée.'],
    de: ['Entdecken Sie ruhige Kanäle und venezianische Ausblicke im sanften Rhythmus einer Gondel.', 'Genießen Sie einen Moment zu zweit zwischen Wasserspiegelungen und stimmungsvollen Winkeln Venedigs.', 'Erleben Sie Venedig zu einem Jubiläum, einem Fest oder einem besonderen Moment.', 'Erzählen Sie uns von Ihren Wünschen für Venedig, und wir gestalten gemeinsam einen passenden Vorschlag.'],
    es: ['Descubre canales tranquilos y vistas venecianas al ritmo pausado de una góndola.', 'Comparte un momento para dos entre reflejos sobre el agua y rincones de Venecia.', 'Vive Venecia para un aniversario, una celebración o un momento para recordar.', 'Cuéntanos qué deseas vivir en Venecia y prepararemos juntos una propuesta a tu medida.'],
    pt: ['Descubra canais tranquilos e vistas venezianas ao ritmo suave de uma gôndola.', 'Partilhe um momento a dois entre reflexos na água e recantos de Veneza.', 'Viva Veneza num aniversário, numa celebração ou num momento para recordar.', 'Conte-nos o que deseja viver em Veneza e construiremos juntos uma proposta adequada.'],
  };
  const info = {
    it: ['Contattaci per concordare percorso, disponibilità e dettagli dell’esperienza.', 'Torna alle esperienze'],
    en: ['Contact us to discuss the route, availability and experience details.', 'Back to experiences'],
    fr: ['Contactez-nous pour convenir du parcours, des disponibilités et des détails.', 'Retour aux expériences'],
    de: ['Kontaktieren Sie uns für Route, Verfügbarkeit und weitere Details.', 'Zurück zu den Erlebnissen'],
    es: ['Contáctanos para acordar la ruta, la disponibilidad y los detalles.', 'Volver a las experiencias'],
    pt: ['Contacte-nos para combinar o percurso, a disponibilidade e os detalhes.', 'Voltar às experiências'],
  };
  const home = document.querySelector('main');
  const page = document.createElement('main');
  page.className = 'detail-page';
  page.hidden = true;
  home.after(page);
  document.querySelectorAll('.service').forEach((el, i) => {
    el.id = `service-${slugs[i]}`;
    const href = `#experience/${slugs[i]}`;
    el.querySelector('.text-link').href = href;
    const visual = el.querySelector('.service-visual');
    const link = document.createElement('a');
    link.href = href;
    link.className = visual.className;
    link.innerHTML = visual.innerHTML;
    visual.replaceWith(link);
  });
  function render(focus = false) {
    const wasDetail = !page.hidden;
    const i = slugs.indexOf(location.hash.replace('#experience/', ''));
    const active = i >= 0;
    home.hidden = active;
    page.hidden = !active;
    document.documentElement.classList.toggle('detail-active', active);
    page.classList.toggle('detail-even', active && i % 2 === 1);
    if (active) {
      const lang = getLanguage(), t = translations[lang];
      if (wasDetail && !focus) {
        page.querySelector('.detail-back').textContent = `← ${info[lang][1]}`;
        page.querySelector('h1').textContent = t.names[i];
        page.querySelector('.detail-description').textContent = `${copy[lang][i]} ${info[lang][0]}`;
        page.querySelector('.button').textContent = t.contact;
        page.querySelector('.detail-photo').alt = t.names[i];
      } else {
      page.innerHTML = `<a class="detail-back text-link" href="#service-${slugs[i]}">← ${info[lang][1]}</a><div class="detail-layout"><img class="detail-photo" src="${asset(`images/experience${i + 1}.png`)}" alt="${t.names[i]}"><div><p class="eyebrow">ALMARA / 0${i + 1}</p><h1 tabindex="-1">${t.names[i]}</h1><p class="detail-description">${copy[lang][i]} ${info[lang][0]}</p><a class="button gold" href="#contact">${t.contact}</a></div></div>`;
      }
      document.title = `${t.names[i]} — ALMARA`;
      document.querySelector('meta[name="description"]').content = copy[lang][i];
      if (focus) { window.scrollTo({top:0,behavior:'instant'}); page.querySelector('h1').focus({preventScroll:true}); }
    } else {
      const t = translations[getLanguage()];
      document.title = `ALMARA — ${t.eyebrow}`;
      document.querySelector('meta[name="description"]').content = t.subtitle;
      if (focus && wasDetail) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'});
      }
    }
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let transitioning = false;
  function preparePhoto(hash) {
    document.querySelectorAll('.service-visual img').forEach(img => img.style.viewTransitionName = 'none');
    const slug = hash.startsWith('#experience/') ? hash.slice('#experience/'.length) : hash.replace('#service-', '');
    document.querySelector(`#service-${slugs.includes(slug) ? slug : slugs[0]} .service-visual img`).style.viewTransitionName = slugs.includes(slug) ? 'experience-photo' : 'none';
    const detailPhoto = page.querySelector('.detail-photo');
    if (detailPhoto) detailPhoto.style.viewTransitionName = slugs.includes(slug) ? 'experience-photo' : 'none';
  }
  async function navigate(hash, push = false) {
    if (transitioning) return;
    preparePhoto(hash);
    const update = () => {
      if (push) history.pushState(null, '', hash);
      render(true);
      const photo = page.querySelector('.detail-photo');
      if (photo) photo.style.viewTransitionName = 'experience-photo';
    };
    if (!document.startViewTransition || reducedMotion.matches) { update(); return; }
    transitioning = true;
    try {
      const transition = document.startViewTransition(update);
      await transition.finished;
    } finally { transitioning = false; }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    if (!hash.startsWith('#experience/') && page.hidden) return;
    event.preventDefault();
    navigate(hash, true);
  });
  addEventListener('hashchange', () => navigate(location.hash));
  document.addEventListener('almara-language-change', () => render());
  render(true);
}
