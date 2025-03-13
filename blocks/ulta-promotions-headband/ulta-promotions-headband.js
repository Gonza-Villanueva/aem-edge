/* global Swiper */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const div = document.createElement('div');
  div.className = 'ulta-promotions-headband-list';

  let slides = [];

  const extractSlides = () => {
    slides = [];
    const rows = [...block.children];
    if (rows.length > 3) {
      while (block.children.length > 3) {
        block.removeChild(block.lastChild);
      }
    }
    rows.slice(0, 3).forEach((row) => {
      const a = document.createElement('a');
      a.className = 'ulta-promotions-headband-item';

      const rowChildren = [...row.children];
      rowChildren.forEach((child, index) => {
        if (index === 0 || index === 1) {
          a.append(child.cloneNode(true));
        } else if (index === rowChildren.length - 1) {
          const url = child.querySelector('p')?.textContent.trim();
          if (url) {
            a.href = url;
          }
        }
      });

      moveInstrumentation(row, a);

      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.append(a);
      slides.push(slide);
    });
  };

  let swiperInstance = null;

  const waitForSwiper = (callback) => {
    if (typeof Swiper !== 'undefined') {
      callback();
    } else {
      const interval = setInterval(() => {
        if (typeof Swiper !== 'undefined') {
          clearInterval(interval);
          callback();
        }
      }, 100);
    }
  };

  const initializeSwiper = () => {
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper ulta-promotions-headband-swiper';
    swiperContainer.innerHTML = `
      <div class="swiper-wrapper">
        ${slides.map((slide) => slide.outerHTML).join('')}
      </div>
      <div class="swiper-pagination"></div>
    `;
    block.innerHTML = '';
    block.append(swiperContainer);

    waitForSwiper(() => {
      swiperInstance = new Swiper('.ulta-promotions-headband-swiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        slidesPerView: 1,
      });
    });
  };

  const destroySwiper = () => {
    if (swiperInstance) {
      swiperInstance.destroy();
      swiperInstance = null;
    }
  };

  const renderLayout = () => {
    block.innerHTML = '';

    if (window.innerWidth <= 1024) {
      initializeSwiper();
    } else {
      destroySwiper();
      div.innerHTML = '';

      slides.forEach((slide) => {
        const clonedElement = slide.firstElementChild.cloneNode(true);
        if (clonedElement) {
          div.append(clonedElement);
        }
      });

      block.append(div);
    }
  };

  extractSlides();
  renderLayout();

  window.addEventListener('resize', () => {
    renderLayout();
  });
}
