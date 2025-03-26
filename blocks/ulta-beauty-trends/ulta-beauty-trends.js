/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const items = Array.from(block.children);

  // Extraer el título y el botón "Ver todo"
  const titleElement = items.shift();
  const titleParagraph = titleElement?.querySelector('p'); // Párrafo dentro del título
  const descriptionElement = items.shift();
  const descriptionParagraph = descriptionElement?.querySelector('p'); // Párrafo dentro del botón

  const titleText = titleParagraph?.textContent.trim();
  const descriptionText = descriptionParagraph?.textContent.trim();

  // Crear contenedor de Swiper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('ulta-beauty-trends-swiper', 'swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('ulta-beauty-trends-wrapper', 'swiper-wrapper');

  // Crear los slides de tendencias de belleza basados en los elementos restantes
  items.forEach((item) => {
    const imgElement = item.querySelector('img');
    const imgSrc = imgElement?.src || '';
    const imgAlt = imgElement?.alt || 'Beauty trend image';

    const texts = item.querySelectorAll('p');
    const trendCategory = texts[0]?.textContent.trim() || '';
    const trendTitle = texts[1]?.textContent.trim() || '';

    const link = item.querySelector('a');
    const linkUrl = link?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('ulta-beauty-trend-slide', 'swiper-slide');

    slide.innerHTML = `
      <div class="ulta-beauty-trend-item">
        <a href="${linkUrl}" class="ulta-beauty-trend-link">
          <div class="ulta-beauty-trend-image">
            <img src="${imgSrc}" alt="${imgAlt}">
          </div>
          <div class="ulta-beauty-trend-info">
            <p class="ulta-beauty-trend-brand">${trendCategory}</p>
            <p class="ulta-beauty-trend-title">${trendTitle}</p>
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
    button.classList.add('ulta-beauty-trends-button', className, `swiper-button-${className.split('-')[2]}`);
    button.innerHTML = `<img src="../../icons/arrow.svg" alt="${imgAlt}" class="ulta-beauty-trends-arrow">`;
    return button;
  };

  const prevButton = createNavButton('ulta-beauty-trends-button-prev', 'Previous');
  const nextButton = createNavButton('ulta-beauty-trends-button-next', 'Next');

  // Título y botón "Ver todo"
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('ulta-beauty-trends-header');

  // Título
  const titleH2 = document.createElement('h2');
  titleH2.textContent = titleText;
  moveInstrumentation(titleParagraph, titleH2);

  // Crear párrafo para el botón
  const viewAllText = document.createElement('p');
  viewAllText.textContent = descriptionText;
  moveInstrumentation(descriptionParagraph, viewAllText);

  headerContainer.appendChild(titleH2);
  headerContainer.appendChild(viewAllText);

  // Armar la estructura final
  swiperContainer.appendChild(swiperWrapper);
  block.innerHTML = '';
  block.append(headerContainer, prevButton, swiperContainer, nextButton);
  block.classList.add('ulta-beauty-trends-carousel');

  // Inicializar Swiper
  function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      return new Swiper('.ulta-beauty-trends-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: '.ulta-beauty-trends-button-next',
          prevEl: '.ulta-beauty-trends-button-prev',
        },
      });
    }
    return null;
  }

  initializeSwiper();
}
