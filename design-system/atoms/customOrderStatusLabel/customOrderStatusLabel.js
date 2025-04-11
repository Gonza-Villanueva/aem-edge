// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const OrderStatusLabel = ({
  state = 'Estado',
  type = 'default',
  icon = '',
  size = 'default',
  colorOverride = ''
}) => {

  useEffect(() => {
    loadCSS(`${window.hlx.codeBasePath}/design-system/atoms/customOrderStatusLabel/customOrderStatusLabel.css`)
      .catch((err) => console.error('Error al cargar el CSS', err));
  }, []);
  
  const defaultIconPath = type === 'canceled'
    ? '../icons/X.svg'
    : '../icons/ultaIcons/success-black.svg';

  const finalIconPath = icon || defaultIconPath;
  const sizeClass = size === 'small' ? 'order-status--small' : 'order-status--default';
  const typeClass = `order-status--${type}`;
  const style = colorOverride ? { backgroundColor: colorOverride } : {};

  return html`
    <span
      className=${['order-status', typeClass, sizeClass].join(' ')}
      style=${style}
    >
      <span className="order-status__icon">
        <img src=${finalIconPath} alt="icono" />
      </span>
      <span className="order-status__text">${state}</span>
    </span>
  `;
};

export default OrderStatusLabel;
