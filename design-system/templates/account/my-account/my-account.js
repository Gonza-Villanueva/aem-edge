import { h } from '@dropins/tools/preact.js';
import htm from '../../../../scripts/htm.js';
import { PersonalInfo } from '../../../organisms/personal-info/personal-info.js';
import { MyAddresses } from '../../../organisms/my-addresses/my-addresses.js';
import { Newsletter } from '../../../organisms/newsletter/newsletter.js';

const html = htm.bind(h);

export const AccountMyAccount = ({ props }) => {
  // todo convertirlo a place holder
  return html`
    <div className="${['my-account-wrapper'].join(' ')}">
      <h3>Información de mi cuenta</h3>
      <${PersonalInfo} />
      <${MyAddresses} />
      <${Newsletter} />
    </div>
  `;
};
export default AccountMyAccount;
