// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState, useCallback } from '@dropins/tools/preact-hooks.js';
import { CustomInput } from '../../../atoms/customInput/customInput.js';
import htm from '../../../../scripts/htm.js';

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

export const SampleInput = () => {
  const inputProps = {
    label: 'Label',
    requiredMark: true,
    inputProps: {
      variant: 'primary',
      onValue: (value) => {},
    },
  };

  const inputErrorProps = {
    label: 'Label',
    requiredMark: true,
    errorMessage: 'Error message',
    inputProps: {
      error: true,
      variant: 'primary',
      onValue: (value) => {},
    },
  };

  return html`
    <section>
      <h2>INPUT</h2>
      <${CustomInput} props=${inputProps} />
      <${CustomInput} props=${inputErrorProps} />
    </section>
  `;
};
export default SampleInput;
