/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);

  // Extraer el título y el botón "Ver todo"
  const titleElement = items.shift();
  const titleParagraph = titleElement?.querySelector('p'); // Párrafo dentro del título
  const buttonElement = items.shift();
  const buttonParagraph = buttonElement?.querySelector('p'); // Párrafo dentro del botón
  const linkElement = items.shift();

  const titleText = titleParagraph?.textContent.trim();
  const buttonText = buttonParagraph?.textContent.trim();
  const buttonLink = linkElement?.querySelector('a')?.href || '#';

  // Crear contenedor de Swiper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-promotions-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-promotions-wrapper', 'swiper-wrapper');

  // Crear los slides de promociones basados en los elementos restantes
  items.forEach((item) => {
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || 'Promotion image';

    const texts = item.querySelectorAll('p');
    const brandName = texts[0]?.textContent.trim() || '';
    const promoTitle = texts[1]?.textContent.trim() || '';
    const promoDescription = texts[2]?.textContent.trim() || '';

    const link = item.querySelector('a');
    const linkUrl = link?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('ulta-promotions-slide', 'swiper-slide');

    slide.innerHTML = `
      <div class="ulta-promotions-item">
        <a href="${linkUrl}" class="ulta-promotions-link">
          <div class="ulta-promotions-image">
            <img src="${imgSrc}" alt="${imgAlt}">
          </div>
          <div class="ulta-promotions-info">
            <p class="ulta-promotions-brand">${brandName}</p>
            <p class="ulta-promotions-title">${promoTitle}</p>
            <p class="ulta-promotions-description">${promoDescription}</p>
          </div>
        </a>
      </div>
    `;

    // Pasar los elementos originales a moveInstrumentation
    moveInstrumentation(item, slide);
    swiperWrapper.appendChild(slide);
  });

  // Botones de navegación
  const createNavButton = (className, imgAlt) => {
    const button = document.createElement('div');
    button.classList.add('ulta-promotions-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="../../icons/arrow.svg" alt="${imgAlt}" class="ulta-promotions-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-promotions-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-promotions-button-next', 'Next');

  // Título y botón "Ver todo"
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('ulta-promotions-header');

  // Título
  const titleH2 = document.createElement('h2');
  titleH2.textContent = titleText;
  moveInstrumentation(titleParagraph, titleH2);

  // Botón "Ver todo"
  const viewAllButton = document.createElement('a');
  viewAllButton.classList.add('ulta-promotions-view-all');
  viewAllButton.href = buttonLink;

  // Crear párrafo para el botón
  const viewAllText = document.createElement('p');
  viewAllText.textContent = buttonText;
  moveInstrumentation(buttonParagraph, viewAllText);

  viewAllButton.appendChild(viewAllText);

  headerContainer.appendChild(titleH2);
  headerContainer.appendChild(viewAllButton);

  // Armar la estructura final
  swiperContainer.appendChild(swiperWrapper);
  block.innerHTML = '';
  block.append(headerContainer, prevButton, swiperContainer, nextButton);
  block.classList.add('ulta-promotions-carousel');

  // Inicializar Swiper
  function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      return new Swiper('.ulta-promotions-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: '.ulta-promotions-button-next',
          prevEl: '.ulta-promotions-button-prev',
        },
      });
    }
    return null;
  }

  initializeSwiper();
}
