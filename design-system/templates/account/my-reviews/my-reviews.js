import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const AccountMyReviews = ({ props }) => {
  return html`
    <div className="${['my-reviews-wrapper'].join(' ')}">
      <p>Mis reseñas</p>
    </div>
  `;
};
export default AccountMyReviews;
