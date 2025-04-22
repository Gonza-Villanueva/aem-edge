// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useCallback, useEffect } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomCards = ({
  imageSrc = '',
  imageAlt = '',
  labelText = '',
  titleText = '',
  bodyText = '',
  linkText = '',
  linkUrl = '',
  showUrgencyTag = false,
  urgencyTagText = '',
  clickableWholeCard = false,
  cardVariant = 'vertical',
  ...rest
}) => {
  
  useEffect(() => {
    loadCSS(`${window.hlx.codeBasePath}/design-system/atoms/customCards/customCards.css`)
      .catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const handleCardClick = useCallback(() => {
    if (clickableWholeCard && linkUrl) {
      window.open(linkUrl, '_blank');
    }
  }, [clickableWholeCard, linkUrl]);

  let variantClass = '';
  if (cardVariant === 'compact') {
    variantClass = 'custom-card--compact';
  } else if (cardVariant === 'horizontal') {
    variantClass = 'custom-card--horizontal';
  } else {
    variantClass = 'custom-card--vertical';
  }

  return html`
    <div className=${`custom-card ${variantClass}`} onClick=${handleCardClick} ...${rest}>
      <div className="custom-card__image-wrapper">
        <img src=${imageSrc} alt=${imageAlt} className="custom-card__image" />
      </div>
      <div className="custom-card__content">
        ${showUrgencyTag && urgencyTagText && html`
          <span className="custom-card__urgency-tag">${urgencyTagText}</span>
        `}
        ${labelText && html`<span className="custom-card__label">${labelText}</span>`}
        <h3 className="custom-card__title">${titleText}</h3>
        <p className="custom-card__body">${bodyText}</p>
        ${linkText && linkUrl && html`
          <a href=${linkUrl} className="custom-card__link" target="_blank" rel="noopener noreferrer">
            ${linkText}
          </a>
        `}
      </div>
    </div>
  `;
};

export default CustomCards;
