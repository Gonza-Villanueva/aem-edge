// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect, useCallback } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomRadioButton = ({
  checked = false,
  id = 'custom-radio',
  name = 'custom-radio-group',
  onChange = () => {}
}) => {

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customRadioButton/customRadioButton.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const handleToggle = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  return html`
    <div className="custom-radio">
      <button
        id=${id}
        name=${name}
        type="button"
        role="radio"
        aria-checked=${checked}
        className=${[
          'custom-radio__circle',
          checked ? 'custom-radio__circle--checked' : ''
        ].join(' ')}
        onClick=${handleToggle}
        onKeyDown=${handleKeyDown}
        tabIndex="0"
      >
        ${checked && html`<span className="custom-radio__dot"></span>`}
      </button>
    </div>
  `;
};

export default CustomRadioButton;