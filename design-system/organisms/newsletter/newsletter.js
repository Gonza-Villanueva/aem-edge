import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import gigyaClient from '../../../scripts/gigya/user.js';

const html = htm.bind(h);

export const Newsletter = () => {
  useEffect(() => {
    gigyaClient
      .showGigyaView('ulta-beauty-login-cdc-container', {
        screenSet: 'Default-ProfileUpdate',
        startScreen: 'gigya-communication-screen',
      })
      .catch((error) =>
        console.error('Error al renderizar la vista Gigya:', error)
      );
  }, []);
  // todo convertirlo a place holder
  return html`
    <div class="my-addresses-wrapper">
      <h4>Newsletter</h4>
      <div id="ulta-beauty-login-cdc-container"></div>
      <div className="line-divider"></div>
    </div>
  `;
};

export default Newsletter;
