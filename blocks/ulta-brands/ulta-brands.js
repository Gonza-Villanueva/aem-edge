/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);
  const titleElement = items.shift();
  const titleParagraph = titleElement?.querySelector('p');
  const titleText = titleParagraph?.textContent.trim();

  // Inicialización de Swiper
  function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      return new Swiper('.ulta-brand-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        navigation: {
          nextEl: '.ulta-brand-button-next',
          prevEl: '.ulta-brand-button-prev',
        },
        pagination: {
          el: '.ulta-brand-pagination',
          clickable: true,
        },
      });
    }
    return null;
  }

  // Contenedor principal de Swiper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-brand-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-brand-wrapper-carrousel', 'swiper-wrapper');

  // Crear los slides
  items.forEach((item) => {
    const categoryName = item.querySelector('p')?.textContent || '';
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || categoryName;
    const linkElement = item.querySelector('a');
    const linkUrl = linkElement?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('ulta-brand-slide', 'swiper-slide');

    slide.innerHTML = `
      <a href="${linkUrl}" class="ulta-brand-item">
          <div class="ulta-brand-image">
              <img src="${imgSrc}" alt="${imgAlt}">
          </div>
          <p class="ulta-brand-name">${categoryName}</p>
      </a>
    `;

    moveInstrumentation(item, slide);
    swiperWrapper.appendChild(slide);
  });

  // Si hay 5 o menos items, centramos los elementos
  if (items.length <= 5) {
    swiperWrapper.classList.add('center-items');
  }

  // Botones de navegación
  const createNavButton = (className, imgAlt) => {
    const button = document.createElement('div');
    button.classList.add('ulta-brand-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="../icons/arrow.svg" alt="${imgAlt}" class="ulta-brand-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-brand-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-brand-button-next', 'Next');

  // Título del bloque
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('ulta-brand-title');

  const titleH2 = document.createElement('h2');
  titleH2.textContent = titleText;

  if (titleParagraph) {
    moveInstrumentation(titleParagraph, titleH2);
  }
  titleContainer.appendChild(titleH2);

  // Agregar contenedor de paginación
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('ulta-brand-pagination');

  // Armar la estructura
  swiperContainer.appendChild(swiperWrapper);
  block.innerHTML = '';
  block.append(titleContainer, prevButton, swiperContainer, nextButton, paginationContainer);
  block.classList.add('ulta-brand');

  // Inicializar Swiper
  initializeSwiper();
}
