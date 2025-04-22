import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const AccountMyGiftslist = ({ props }) => {
  return html`
    <div className="${['my-gifts-list-wrapper'].join(' ')}">
      <p>Mi lista de regalos</p>
    </div>
  `;
};
export default AccountMyGiftslist;
