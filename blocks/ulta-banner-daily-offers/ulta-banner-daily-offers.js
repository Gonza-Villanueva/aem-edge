/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);

  // Extraer el título
  const titleElement = items.shift();
  const titleParagraph = titleElement?.querySelector('p');
  const titleText = titleParagraph?.textContent.trim();

  // Contenedor que previene el desborde
  const container = document.createElement('div');
  container.classList.add('ulta-banner-daily-offers-container-swiper');

  // Contenedor de Swiper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-banner-daily-offers-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-banner-daily-offers-wrapper-swiper', 'swiper-wrapper');

  // Crear los slides de ofertas del día
  items.forEach((item) => {
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || 'Offer image';

    const texts = item.querySelectorAll('p');
    const offerTagline = texts[0]?.textContent.trim() || '';
    const offerCategory = texts[1]?.textContent.trim() || '';
    const offerTitle = texts[2]?.textContent.trim() || '';
    const offerDescription = texts[3]?.textContent.trim() || '';
    const buttonText = texts[4]?.textContent.trim() || '';

    const linkElement = item.querySelector('a');
    const linkUrl = linkElement?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('ulta-banner-daily-offers-slide', 'swiper-slide');

    slide.innerHTML = `
      <div class="ulta-banner-daily-offers-item">
        <div class="ulta-banner-daily-offers-image">
          <img src="${imgSrc}" alt="${imgAlt}">
        </div>
        <div class="ulta-banner-daily-offers-info">
          <div class="ulta-banner-daily-offers-tagline">${offerTagline}</div>
          <p class="ulta-banner-daily-offers-category">${offerCategory}</p>
          <p class="ulta-banner-daily-offers-title">${offerTitle}</p>
          <p class="ulta-banner-daily-offers-description">${offerDescription}</p>
          <a href="${linkUrl}" class="ulta-banner-daily-offers-button">${buttonText}</a>
        </div>
      </div>
    `;

    // Pasar los elementos originales a moveInstrumentation
    moveInstrumentation(item, slide);
    swiperWrapper.appendChild(slide);
  });

  // Botones de navegación (fuera del contenedor que oculta el overflow)
  const createNavButton = (className, imgAlt) => {
    const button = document.createElement('div');
    button.classList.add('ulta-banner-daily-offers-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="../../icons/arrow.svg" alt="${imgAlt}" class="ulta-banner-daily-offers-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-banner-daily-offers-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-banner-daily-offers-button-next', 'Next');

  // Contenedor de paginación (bolitas)
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('ulta-banner-daily-offers-pagination');

  // Título del bloque
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('ulta-banner-daily-offers-header');

  const titleH2 = document.createElement('h2');
  titleH2.textContent = titleText;
  moveInstrumentation(titleParagraph, titleH2);
  titleContainer.appendChild(titleH2);

  // Armar la estructura final
  swiperContainer.appendChild(swiperWrapper);
  container.appendChild(swiperContainer);
  container.appendChild(paginationContainer);
  block.innerHTML = '';
  block.append(titleContainer, prevButton, container, nextButton);
  block.classList.add('ulta-banner-daily-offers');

  // Inicializar Swiper con paginación en móviles y flechas en desktop
  function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      return new Swiper('.ulta-banner-daily-offers-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        centeredSlides: true,
        navigation: {
          nextEl: '.ulta-banner-daily-offers-button-next',
          prevEl: '.ulta-banner-daily-offers-button-prev',
        },
        pagination: {
          el: '.ulta-banner-daily-offers-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            navigation: {
              enabled: true,
            },
            pagination: {
              enabled: false,
            },
          },
          0: {
            navigation: {
              enabled: false,
            },
            pagination: {
              enabled: true,
            },
            centeredSlides: false,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
        },
      });
    }
    return null;
  }

  initializeSwiper();
}
