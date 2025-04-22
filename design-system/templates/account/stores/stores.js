import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const AccountStores = ({ props }) => {
  return html`
    <div className="${['stores-wrapper'].join(' ')}">
      <p>stores</p>
    </div>
  `;
};
export default AccountStores;
