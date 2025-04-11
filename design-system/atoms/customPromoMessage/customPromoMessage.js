// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomPromoMessage = ({
  message = '',
  highlightText = '',
  backgroundColorOverride = '',
  textColorOverride = ''
}) => {
  useEffect(() => {
    loadCSS(`${window.hlx.codeBasePath}/design-system/atoms/customPromoMessage/customPromoMessage.css`)
      .catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const renderMessage = () => {
    if (highlightText && message.includes(highlightText)) {
      const parts = message.split(highlightText);
      return html`
        <span>
          ${parts[0]}
          <span className="custom-promo-message__highlight">${highlightText}</span>
          ${parts[1]}
        </span>
      `;
    }
    return message;
  };

  const style = {
    ...(backgroundColorOverride && { backgroundColor: backgroundColorOverride }),
    ...(textColorOverride && { color: textColorOverride })
  };

  return html`
    <div className="custom-promo-message" style=${style}>
      <span className="custom-promo-message__text">
        ${renderMessage()}
      </span>
    </div>
  `;
};

export default CustomPromoMessage;
