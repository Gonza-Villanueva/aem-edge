// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomCarousel } from '../../../molecules/customCarousel/customCarousel.js';
import htm from '../../../../scripts/htm.js';

/**
  {
    swiperConfigs:{
        direction: 'vertical' | 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',}
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: number,
          disableOnInteraction: boolean,
        },
        loop: boolean,
      },
      slides:[
      children: HTML(html`component`),
      ]
}
 */

const html = htm.bind(h);

export const SampleCustomCarousel = () => {
  const carouselData = {
    swiperConfigs: {
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    },
    slides: [
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 1
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 2
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 3
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 4
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 5
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 5
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 5
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 5
      </div>`,
      html`<div
        style=${{
          display: 'flex',
          'justify-content': 'center',
          height: '50px',
        }}
      >
        slide 5
      </div>`,
    ],
  };

  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <section
        style=${{
          display: 'flex',
          'flex-direction': 'column',
          gap: '20px',
        }}
      >
        <h2>CAROUSEL</h2>
        <${CustomCarousel} props=${carouselData} />
      </section>
    </div>
  `;
};
export default SampleCustomCarousel;
