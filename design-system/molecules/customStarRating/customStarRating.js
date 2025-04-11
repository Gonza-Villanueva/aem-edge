import { h } from '@dropins/tools/preact.js';
import { useEffect, useState } from '@dropins/tools/preact-hooks.js';

import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomStarRating = ({
  maxStars = 5,
  getRate,
  isSelectingRate,
  initialRate = 0,
}) => {
  const [starRate, setStarRate] = useState(initialRate);
  const [svgContent, setSvgContent] = useState('');
  const [modifyRate, setModifyRate] = useState(false);

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/molecules/customStarRating/customStarRating.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);
  useEffect(() => {
    fetch(`../../../icons/ultaIcons/star.svg`)
      .then((res) => res.text())
      .then(setSvgContent);
  }, []);
  useEffect(() => {
    const totalStars = maxStars;

    for (let i = 1; i <= totalStars; i++) {
      const starElements = document.getElementsByClassName(
        `star-wrapper star-wrapper-id-${i}`
      );
      Array.from(starElements).forEach((element) => {
        element.classList.remove('fill-star', 'fill-half-star');
      });
    }

    const fullStars = Math.floor(starRate);
    const hasHalfStar = starRate % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      const starElements = document.getElementsByClassName(
        `star-wrapper star-wrapper-id-${i}`
      );
      Array.from(starElements).forEach((element) => {
        element.classList.add('fill-star');
      });
    }

    if (hasHalfStar && fullStars < totalStars) {
      const starElements = document.getElementsByClassName(
        `star-wrapper star-wrapper-id-${fullStars + 1}`
      );
      Array.from(starElements).forEach((element) => {
        element.classList.add('fill-half-star');
      });
    }
  }, [starRate]);
  useEffect(() => {
    if (typeof getRate === 'function') {
      getRate(starRate);
    }
  }, [starRate]);
  useEffect(() => {
    if (typeof isSelectingRate === 'function') {
      isSelectingRate(modifyRate);
    }
  }, [modifyRate]);
  useEffect(() => {
    setStarRate(initialRate);
  }, [initialRate]);

  const onStarOver = (rate) => {
    if (modifyRate) {
      setStarRate(rate);
    }
  };

  const starContainers = [];
  for (let i = 1; i <= maxStars; i++) {
    starContainers.push(
      html`
        <div
          key=${i}
          className=${['star-wrapper', `star-wrapper-id-${i}`].join(' ')}
        >
          <div
            className=${['half-star-wrapper'].join(' ')}
            onMouseOver=${() => onStarOver(i - 0.5)}
          ></div>
          <div
            className=${['half-star-wrapper'].join(' ')}
            onMouseOver=${() => onStarOver(i)}
          ></div>

          <div
            className=${['star-icon-container-base'].join(' ')}
            dangerouslySetInnerHTML=${{ __html: svgContent }}
          ></div>
          <div
            className=${['star-icon-container-filled'].join(' ')}
            dangerouslySetInnerHTML=${{ __html: svgContent }}
          ></div>
        </div>
      `
    );
  }

  return html`
    <div
      onClick=${() => setModifyRate(!modifyRate)}
      className="custom-star-rating"
    >
      ${starContainers}
    </div>
  `;
};
export default CustomStarRating;
