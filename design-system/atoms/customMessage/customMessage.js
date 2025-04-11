// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect, useCallback } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import CustomeIcon from '../customeIcon/customeIcon.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomMessage = ({
  type = 'info',
  variant = 'complete',
  title = '',
  description = '',
  images = [],
  links = [],
  showCloseButton = true,
  onClose = () => {},
  autoClose = false,
  autoCloseDuration = 5000
}) => {

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customMessage/customMessage.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  useEffect(() => {
    let timer;
    if (autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, autoCloseDuration, onClose]);

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const containerClass = [
    'custom-message',
    `custom-message--${type}`,
    `custom-message--${variant}`
  ].join(' ');

  const renderIcon = () => {
    switch (type) {
      case 'error':
        return html`<span className="custom-message__icon"><${CustomeIcon} icon="error" size='xs'/></span>`;
      case 'warning':
        return html`<span className="custom-message__icon"><${CustomeIcon} icon="warning" size='xs'/></span>`;
      case 'success':
        return html`<span className="custom-message__icon"><${CustomeIcon} icon="success" size='xs'/></span>`;
      case 'info':
      default:
        return html`<span className="custom-message__icon"><${CustomeIcon} icon="info" size='xs'/></span>`;
    }
  };

  return html`
    <div className=${containerClass}>
      ${renderIcon()}
      <div className="custom-message__content">
        ${variant === 'complete' && title && html`
          <span className="custom-message__title">${title}</span>
        `}
        <p className="custom-message__description">${description}</p>

        ${variant === 'complete' && links.length > 0 && html`
          <div className="custom-message__links">
            ${links.map((link) => html`
              <a
                href=${link.url}
                className="custom-message__link"
                target="_blank"
              >
                ${link.text}
              </a>
            `)}
          </div>
        `}
        ${variant === 'complete' && images.length > 0 && html`
            <div className="custom-message__images">
              ${images.map(imgUrl => html`
                <img src=${imgUrl} alt="Imagen ilustrativa" className="custom-message__image" />
              `)}
            </div>
          `}
      </div>
      ${showCloseButton && html`
        <button
          type="button"
          className="custom-message__close"
          onClick=${handleCloseClick}
          aria-label="Cerrar mensaje"
        >
          <img src="../icons/X.svg" alt="Cerrar" />
        </button>
      `}
    </div>
  `;
};

export default CustomMessage;