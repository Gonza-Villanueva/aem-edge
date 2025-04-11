// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomTabs } from '../../../atoms/customTabs/customTabs.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleTabs = () => {

  return html`
    <div className="${['home-wrapper'].join(' ')}">
    <h2>TABS - MIS ORDENES</h2>
      <${CustomTabs} defaultActiveIndex=${0} onTabChange=${(index) => console.log('Pestaña activa:', index)}>
        <div tabTitle="Artículos ordenados">
          <p>Contenido para artículos ordenados...</p>
          <!-- Aquí puedes cargar contenido extenso, componentes, etc. -->
        </div>
        <div tabTitle="Factura">
          <p>Contenido para factura...</p>
        </div>
        <div tabTitle="Devoluciones">
          <p>Contenido para devoluciones...</p>
        </div>
        <div tabTitle="Envíos">
          <p>Contenido para envíos...</p>
        </div>
      </${CustomTabs}>
    </div>
  `;
}
export default SampleTabs;