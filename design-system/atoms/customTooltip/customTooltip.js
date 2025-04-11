// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect ,useState, useCallback } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomTooltip = ({
  text = 'Texto del tooltip',
  linkText = '',
  linkUrl = '#',
  position = 'bottom',
  closeButton = true,
  icon = 'ⓘ'
}) => {

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customTooltip/customTooltip.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const [isOpen, setIsOpen] = useState(false); 

  const handleMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return html`
    <div
      className="custom-tooltip-container"
      onMouseEnter=${handleMouseEnter}
      onMouseLeave=${handleMouseLeave}
      onFocus=${handleMouseEnter}
      onBlur=${handleMouseLeave}
      onKeyDown=${handleKeyDown}
      tabIndex="0"
    >
      <span className="custom-tooltip-icon">${icon}</span>

      ${isOpen && html`
        <div className=${[
        'custom-tooltip-box',
        `custom-tooltip-box--${position}`
      ].join(' ')}>
          <p className="custom-tooltip-text">${text}</p>

          ${linkText && html`
            <a
              href=${linkUrl}
              className="custom-tooltip-link"
              target="_blank"
            >
              ${linkText}
            </a>
          `}

          ${closeButton && html`
            <button
              className="custom-tooltip-close"
              onClick=${handleCloseClick}
              aria-label="Cerrar tooltip"
            >
              <img src="../icons/X.svg" alt="Cerrar tooltip" />
            </button>
          `}
        </div>
      `}
    </div>
  `;
};

export default CustomTooltip;
