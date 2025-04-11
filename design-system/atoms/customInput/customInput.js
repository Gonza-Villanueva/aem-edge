import { h } from '@dropins/tools/preact.js';
import { Input } from '@dropins/tools/components.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import { CustomeIcon } from '../customeIcon/customeIcon.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

/**
 {
  requiredMark: Boolean,
  label: string,
  errorMessage: string,
  inputProps: {
    id?: string;
    name?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    error?: boolean;
    floatingLabel?: string;
    onUpdateError?: (error: Error) => void;
    onValue?: (value: any) => void;
    size?: 'medium' | 'large';
    success?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    maxLength?: number;
  }
 }
 */

const html = htm.bind(h);

export const CustomInput = ({ props }) => {
  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customInput/customInput.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  return html`
    <div className="custom-input-wrapper">
      <label>${props.label}</label>
      <label className="requiredMark"
        >${props.requiredMark == true ? '*' : ''}</label
      >
      <${Input} ...${props.inputProps} />
      <div className="error-message-wrapper">
        ${props.errorMessage &&
        html` <${CustomeIcon} icon="warning" size="xxs" /> `}
        ${props.errorMessage &&
        html` <label className="error-message">${props.errorMessage}</label> `}
      </div>
    </div>
  `;
};
export default CustomInput;
