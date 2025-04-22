import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const AccountPromotions = ({ props }) => {
  return html`
    <div className="${['promotions-wrapper'].join(' ')}">
      <p>promotions</p>
    </div>
  `;
};
export default AccountPromotions;
