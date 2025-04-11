// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomPromoMessage } from '../../../atoms/customPromoMessage/customPromoMessage.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SamplePromoMessage = () => {
  return html`
    <div className="${['home-wrapper'].join(' ')}">
    <h2>Promo Banner</h2>
      
      <section style="margin-bottom: 16px;">
        <p>Banner con mensaje simple (sin resaltado)</p>
        <${CustomPromoMessage}
          message="Envío gratuito en órdenes mayores a MXN$ 600"
        />
      </section>
      
      <section style="margin-bottom: 16px;">
        <p>Banner con mensaje y texto resaltado</p>
        <${CustomPromoMessage}
          message="Obsequio con tu pedido"
          highlightText="Obsequio con tu pedido"
        />
      </section>
      
      <section style="margin-bottom: 16px;">
        <p>Banner con override de color (fondo y texto)</p>
        <${CustomPromoMessage}
          message="Envío gratuito en órdenes mayores a MXN$ 600"
          highlightText="MXN$ 600"
          backgroundColorOverride="#fff099"
          textColorOverride="#000000"
        />
      </section>
    </div>
  `;
}
export default SamplePromoMessage;