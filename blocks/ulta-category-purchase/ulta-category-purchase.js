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
      return new Swiper('.ulta-category-purchase-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
          nextEl: '.ulta-category-purchase-button-next',
          prevEl: '.ulta-category-purchase-button-prev',
        },
      });
    }
    return null;
  }

  // Contenedor principal de Swiper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-category-purchase-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-category-purchase-wrapper-carrousel', 'swiper-wrapper');

  // Crear los slides
  items.forEach((item) => {
    const categoryName = item.querySelector('p')?.textContent || '';
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || categoryName;
    const linkElement = item.querySelector('a');
    const linkUrl = linkElement?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('ulta-category-purchase-slide', 'swiper-slide');

    slide.innerHTML = `
      <a href="${linkUrl}" class="ulta-category-purchase-item">
          <div class="ulta-category-purchase-image">
              <img src="${imgSrc}" alt="${imgAlt}">
          </div>
          <p class="ulta-category-purchase-name">${categoryName}</p>
      </a>
    `;

    moveInstrumentation(item, slide);
    swiperWrapper.appendChild(slide);
  });

  // Si hay 9 o menos items, centramos los elementos
  if (items.length <= 9) {
    swiperWrapper.classList.add('center-items');
  }

  // Botones de navegación
  const createNavButton = (className, imgAlt) => {
    const button = document.createElement('div');
    button.classList.add('ulta-category-purchase-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="../../icons/arrow.svg" alt="${imgAlt}" class="ulta-category-purchase-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-category-purchase-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-category-purchase-button-next', 'Next');

  // Título del bloque
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('ulta-category-purchase-title');

  const titleH2 = document.createElement('h2');
  titleH2.textContent = titleText;

  if (titleParagraph) {
    moveInstrumentation(titleParagraph, titleH2);
  }

  titleContainer.appendChild(titleH2);

  // Armar la estructura
  swiperContainer.appendChild(swiperWrapper);
  block.innerHTML = '';
  block.append(titleContainer, prevButton, swiperContainer, nextButton);
  block.classList.add('ulta-category-purchase');

  // Inicializar Swiper directamente
  initializeSwiper();
}
