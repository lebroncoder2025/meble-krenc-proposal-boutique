const localPortfolio = [
  { file: 'realizacja-01.jpg', category: 'living', title: 'Granatowa sofa i fotele w reprezentacyjnym wnętrzu', width: 970, height: 2048 },
  { file: 'realizacja-02.jpg', category: 'living', title: 'Jasna sofa z miękkimi poduszkami w salonie', width: 1600, height: 1200 },
  { file: 'realizacja-03.jpg', category: 'living', title: 'Zaokrąglona forma jasnego mebla wypoczynkowego', width: 1440, height: 1801 },
  { file: 'realizacja-04.jpg', category: 'sleeping', title: 'Łóżko z tapicerowanym zagłówkiem w jasnej sypialni', width: 1440, height: 1920 },
  { file: 'realizacja-05.jpg', category: 'living', title: 'Panoramiczne ujęcie granatowej strefy wypoczynku', width: 2048, height: 970 },
  { file: 'realizacja-06.jpg', category: 'living', title: 'Okrągła sofa i fotele w eleganckim wnętrzu', width: 2048, height: 995 },
  { file: 'realizacja-07.jpg', category: 'living', title: 'Jasny zestaw sofa, fotel i puf', width: 2016, height: 1512 },
  { file: 'realizacja-08.jpg', category: 'living', title: 'Nowoczesny salon z grafitowym narożnikiem', width: 1080, height: 737 },
  { file: 'realizacja-09.jpg', category: 'sleeping', title: 'Łóżko z turkusowym, pikowanym zagłówkiem', width: 1200, height: 1600 },
  { file: 'realizacja-10.jpg', category: 'living', title: 'Strefa wypoczynku w reprezentacyjnym wnętrzu', width: 970, height: 2048 },
  { file: 'realizacja-11.jpg', category: 'eating', title: 'Turkusowa zabudowa tapicerowana w restauracji', width: 2048, height: 1365 },
  { file: 'realizacja-12.jpg', category: 'living', title: 'Zaokrąglony fotel w przestrzeni handlowej', width: 1440, height: 1800 },
  { file: 'realizacja-13.jpg', category: 'sleeping', title: 'Zielony tapicerowany zagłówek z pionowym podziałem', width: 1440, height: 1440 },
  { file: 'realizacja-14.jpg', category: 'sleeping', title: 'Zielone łóżko pod skosem z tapicerowaną ścianą', width: 970, height: 2048 },
  { file: 'realizacja-15.jpg', category: 'eating', title: 'Granatowa strefa stolików i foteli', width: 970, height: 2048 },
  { file: 'realizacja-16.jpg', category: 'living', title: 'Grafitowa sofa w klasycznym wnętrzu', width: 970, height: 2048 },
  { file: 'realizacja-17.jpg', category: 'living', title: 'Nowoczesny salon z dużym narożnikiem', width: 2048, height: 970 },
  { file: 'realizacja-18.jpg', category: 'sleeping', title: 'Detal miękkiego zagłówka i tkaniny', width: 1440, height: 1440 },
  { file: 'realizacja-19.jpg', category: 'living', title: 'Jasna sofa w domu z widokiem na zimowy krajobraz', width: 1200, height: 1600 },
  { file: 'realizacja-20.jpg', category: 'living', title: 'Okrągła strefa wypoczynku w hotelowym wnętrzu', width: 970, height: 2048 },
  { file: 'realizacja-21.jpg', category: 'living', title: 'Granatowa sofa i fotele w jasnym salonie', width: 1080, height: 706 },
  { file: 'realizacja-22.jpg', category: 'eating', title: 'Tapicerowana ława w industrialnej restauracji', width: 941, height: 1672 },
  { file: 'realizacja-23.jpg', category: 'living', title: 'Granatowa sofa na tle dekoracyjnych sztukaterii', width: 1024, height: 768 },
  { file: 'realizacja-24.jpg', category: 'living', title: 'Panoramiczny kadr dużej sofy modułowej', width: 970, height: 2048 },
  { file: 'realizacja-25.jpg', category: 'eating', title: 'Pikowana ława i stoły w restauracyjnym wnętrzu', width: 941, height: 1672 },
  { file: 'realizacja-26.jpg', category: 'living', title: 'Jasny narożnik z zaokrąglonym siedziskiem', width: 2048, height: 970 },
  { file: 'realizacja-27.jpg', category: 'living', title: 'Pikowany narożnik w jasnym salonie', width: 2048, height: 970 },
  { file: 'realizacja-28.jpg', category: 'sleeping', title: 'Ciepła sypialnia z tapicerowanym łóżkiem', width: 2048, height: 970 },
  { file: 'realizacja-29.jpg', category: 'living', title: 'Sofa w salonie z zielonymi zasłonami', width: 2048, height: 1365 },
  { file: 'realizacja-30.jpg', category: 'sleeping', title: 'Jasne łóżko z wysokim pikowanym zagłówkiem', width: 970, height: 2048 },
  { file: 'realizacja-31.jpg', category: 'living', title: 'Zaokrąglony jasny narożnik z pracowni', width: 2016, height: 1512 },
  { file: 'realizacja-32.jpg', category: 'sleeping', title: 'Beżowe łóżko z pikowanym frontem', width: 2048, height: 995 },
  { file: 'realizacja-33.jpg', category: 'living', title: 'Jasny pikowany narożnik w pracowni', width: 1448, height: 1086 },
  { file: 'realizacja-34.jpg', category: 'living', title: 'Pikowana sofa z poduchami — detal realizacji', width: 941, height: 1672 },
  { file: 'realizacja-35.jpg', category: 'sleeping', title: 'Zielona sypialnia z tapicerowanym łóżkiem', width: 1086, height: 1448 }
];

const portfolioGrid = document.querySelector('.portfolio-grid');

if (portfolioGrid) {
  const fragment = document.createDocumentFragment();

  localPortfolio.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'portfolio-entry portfolio-entry--local';
    entry.dataset.category = item.category;

    const figure = document.createElement('figure');
    figure.className = 'photo';

    const link = document.createElement('a');
    link.href = `assets/realizacje/${item.file}`;
    link.dataset.lightbox = '';
    link.dataset.width = item.width;
    link.setAttribute('aria-label', `Otwórz zdjęcie: ${item.title}`);

    const image = document.createElement('img');
    image.src = link.href;
    image.alt = item.title;
    image.width = item.width;
    image.height = item.height;
    image.loading = 'lazy';
    image.decoding = 'async';

    const openLabel = document.createElement('span');
    openLabel.className = 'photo-open';
    openLabel.setAttribute('aria-hidden', 'true');
    openLabel.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg>';

    link.append(image, openLabel);

    const caption = document.createElement('figcaption');
    const categoryLabel = item.category === 'sleeping' ? 'sypialnia' : item.category === 'eating' ? 'jadalnia i horeca' : 'wypoczynek';
    caption.innerHTML = `<span>Meble Krenc / ${categoryLabel}</span><span>Realizacja</span>`;

    figure.append(link, caption);
    entry.append(figure);
    fragment.append(entry);
  });

  portfolioGrid.prepend(fragment);

  const galleryCount = document.querySelector('[data-gallery-count]');
  if (galleryCount) galleryCount.textContent = `${portfolioGrid.querySelectorAll('.portfolio-entry').length} zdjęć`;

  const photoCredit = document.querySelector('.photo-credit');
  if (photoCredit) {
    photoCredit.innerHTML = 'Materiały wizualne: Meble Krenc oraz <a href="https://www.unifora.at" target="_blank" rel="noopener noreferrer">Unifora Interieur</a>.';
  }

  const introDescription = document.querySelector('.intro-description');
  if (introDescription) {
    introDescription.textContent = 'Zobacz wybrane realizacje Meble Krenc — od sof i narożników po łóżka, siedziska i zabudowy tapicerowane. Materiały wizualne: Meble Krenc oraz Unifora Interieur.';
  }
}
