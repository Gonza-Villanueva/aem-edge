// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useCallback } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import CustomeIcon from '../customeIcon/customeIcon.js';

const html = htm.bind(h);

export const CustomCheckbox = ({
  checked = false,
  id = 'custom-checkbox',
  onChange = () => {}
}) => {
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
    <div className="custom-checkbox">
      <button
        id=${id}
        type="button"
        role="checkbox"
        aria-checked=${checked}
        className=${[
          'custom-checkbox__box',
          checked ? 'custom-checkbox__box--checked' : ''
        ].join(' ')}
        onClick=${handleToggle}
        onKeyDown=${handleKeyDown}
        tabIndex="0"
      >
        ${checked && html`
          <${CustomeIcon} icon="success-white" color="white" size="xxs" />
        `}
      </button>
    </div>
  `;
};

export default CustomCheckbox;