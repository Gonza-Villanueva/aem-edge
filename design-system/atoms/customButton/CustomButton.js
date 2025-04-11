import { h } from '@dropins/tools/preact.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import { Button } from '@dropins/tools/components.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

/**
 * CustomButton - Wrapper del componente `Button` de @dropins/tools/components.js con soporte para variantes y tamaños.
 * ## Props
 * - `variant`: `"primary" | "secondary" | "tertiary"` – Variante visual del botón (por defecto: `"primary"`).
 * - `size`: `"medium" | "large"` – Tamaño del botón (por defecto: `"medium"`).
 * - `children`: contenido dentro del botón (texto, íconos, etc.).
 * - `...rest`: other valid property  like `onClick`, `disabled`, etc.
 * */

export const CustomButton = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...rest
}) => {
  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customButton/customButton.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  return html`
    <div className="custom-button-wrapper">
      <${Button} variant=${variant} size=${size} ...${rest}>${children}</${Button}>
    </div>
  `;
};
export default CustomButton;
