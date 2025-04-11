// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect, useCallback } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomSwitch = ({
  checked = false,
  id = 'custom-switch',
  onChange = () => {}
}) => {

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customSwitch/customSwitch.css`
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
    <div className="custom-switch">
      <button
        id=${id}
        type="button"
        role="switch"
        aria-checked=${checked}
        className=${[
          'custom-switch__toggle',
          checked ? 'custom-switch__toggle--on' : 'custom-switch__toggle--off'
        ].join(' ')}
        onClick=${handleToggle}
        onKeyDown=${handleKeyDown}
        tabIndex="0"
      >
        <span className="custom-switch__handle"></span>
      </button>
    </div>
  `;
};

export default CustomSwitch;
