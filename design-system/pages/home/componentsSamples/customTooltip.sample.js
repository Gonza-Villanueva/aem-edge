// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomTooltip } from '../../../atoms/customTooltip/customTooltip.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleTooltip = () => {

  return html`
    <div className="${['home-wrapper'].join(' ')}">
    <h2>TOOLTIPS</h2>
      <section>
        <h3>Tooltip posición superior con botón de cierre y enlace</h3>
        <${CustomTooltip}
          text="Tooltip en posición superior"
          linkText="Más info"
          linkUrl="https://ejemplo.com/top"
          position="top"
          closeButton=${true}
          icon=${html`<img src="../../icons/ultaIcons/Ayuda.svg" />`}
        />
      </section>
      
      <section>
        <h3>Tooltip posición inferior sin botón de cierre</h3>
        <${CustomTooltip}
          text="Tooltip en posición inferior"
          linkText="Más info"
          linkUrl="https://ejemplo.com/bottom"
          position="bottom"
          closeButton=${false}
          icon=${html`<img src="../../icons/ultaIcons/Ayuda.svg" />`}
        />
      </section>
      
      <section>
        <h3>Tooltip posición inferior sin enlace</h3>
        <${CustomTooltip}
          text="Tooltip sin enlace clickeable"
          position="bottom"
          closeButton=${true}
          icon=${html`<img src="../../icons/ultaIcons/Ayuda.svg" />`}
        />
      </section>
    </div>
  `;
}
export default SampleTooltip;