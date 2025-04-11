import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomPrice = ({ props }) => {
  // props
  const {
    firstPrice,
    secondPrice,
    labelText,
    locale = 'en-US',
    currency = 'USD',
  } = props;

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customPrice/customPrice.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const formatPrice = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString(locale, { style: 'currency', currency });
    }
    return value;
  };

  return html`
    <div className=${`custom-price-wrapper`}>
      <span
        className=${`content-price ${
          firstPrice.style && `content-price--${firstPrice.style}`
        } ${firstPrice.size && `content-price--size-${firstPrice.size}`}`}
      >
        ${formatPrice(firstPrice.price)}
      </span>
      ${labelText
        ? html` <span className="label-text"> ${labelText} </span> `
        : null}
      ${secondPrice && secondPrice.price
        ? html`
            <span
              className=${`content-price ${
                secondPrice.style && `content-price--${secondPrice.style}`
              }  ${
                secondPrice.size && `content-price--size-${secondPrice.size}`
              }`}
            >
              ${formatPrice(secondPrice.price)}
            </span>
          `
        : null}
    </div>
  `;
};
export default CustomPrice;
