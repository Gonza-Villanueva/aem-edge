import { h } from '@dropins/tools/preact.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { useEffect, useRef } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

export const CustomCarousel = ({ props }) => {
  const swiperContainerRef = useRef(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      new Swiper(swiperContainerRef.current, {
        ...props.swiperConfigs,
      });
    } else {
      console.error('El contenedor de Swiper no está disponible.');
    }
  }, [props.swiperConfigs]);

  return html`
    <div className="custom-carousel">
      <div class="swiper">
        <div className="swiper-container" ref=${swiperContainerRef}>
          <div className="swiper-wrapper">
            ${props.slides.map(
              (slide) => html` <div className="swiper-slide">${slide}</div> `
            )}
          </div>
          <div className="swiper-button-prev">
            <img
              src="../../icons/arrow.svg"
              alt="Previous"
              width="20px"
              height="20px"
            />
          </div>
          <div className="swiper-button-next">
            <img
              src="../../icons/arrow.svg"
              alt="Next"
              width="20px"
              height="20px"
            />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  `;
};

export default CustomCarousel;
