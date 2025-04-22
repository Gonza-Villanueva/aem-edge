import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const AccountMyFavorites = ({ props }) => {
  return html`
    <div className="${['my-gifts-list-wrapper'].join(' ')}">
      <p>Mis favoritos</p>
    </div>
  `;
};
export default AccountMyFavorites;
