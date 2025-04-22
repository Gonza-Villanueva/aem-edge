// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import CustomCards from '../../../atoms/customCards/customCards.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleCards = () => {
  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <h2>Custom Cards Examples</h2>

      <section style="margin-bottom: 16px;">
        <h3>Ofertas desktop</h3>
        <h4>Estado predeterminado</h4>
        <${CustomCards}
          imageSrc="https://picsum.photos/400/300"
          imageAlt="Promotional image"
          labelText="ETIQUETA"
          titleText="Título"
          bodyText="Texto de cuerpo"
          linkText="Enlace"
          linkUrl="/promocion"
          showUrgencyTag=${false}
          clickableWholeCard=${false}
          cardVariant="horizontal"
        />
      </section>
      <section style="margin-bottom: 16px;">
        <h4>Con urgency tag</h4>
        <${CustomCards}
          imageSrc="https://picsum.photos/400/300"
          imageAlt="Promotional image"
          labelText="ETIQUETA"
          titleText="Título"
          bodyText="Texto de cuerpo"
          linkText="Enlace"
          linkUrl="/promocion"
          showUrgencyTag=${true}
          urgencyTagText="Próximamente"
          clickableWholeCard=${true}
          cardVariant="horizontal"
        />
      </section>
      
      <h3>Ofertas desktop</h3>
      <div style="display: flex; gap: 20px">
        <section style="margin-bottom: 16px;">
          <h4>Estado predeterminado</h4>
          <${CustomCards}
            imageSrc="https://picsum.photos/400/300"
            imageAlt="Promotional image"
            labelText="ETIQUETA"
            titleText="Título"
            bodyText="Texto de cuerpo"
            linkText="Enlace"
            linkUrl="/promocion"
            showUrgencyTag=${false}
            urgencyTagText="Últimos días"
            clickableWholeCard=${false}
            cardVariant="vertical"
          />
        </section>
        
        <!-- Example: Horizontal Layout -->
        <section style="margin-bottom: 16px;">
          <h4>Con urgency tag</h4>
          <${CustomCards}
            imageSrc="https://picsum.photos/400/300"
            imageAlt="Promotional image"
            labelText="ETIQUETA"
            titleText="Título"
            bodyText="Texto de cuerpo"
            linkText="Enlace"
            linkUrl="/promocion"
            showUrgencyTag=${true}
            urgencyTagText="Próximamente"
            clickableWholeCard=${false}
            cardVariant="vertical"
          />
        </section>
      </div>
      
      <section style="margin-bottom: 16px;">
        <h3>Corporate commitments desktop</h3>
        <${CustomCards}
          imageSrc="https://picsum.photos/200/150"
          imageAlt="Corporate commitment image"
          titleText="Nuestro Compromiso"
          bodyText="Conoce nuestros compromisos de calidad y servicio."
          linkText="Saber más"
          linkUrl="/compromiso"
          showUrgencyTag=${false}
          cardVariant="compact"
        />
      </section>
    </div>
  `;
};

export default SampleCards;
