// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { OrderStatusLabel } from '../../../atoms/customOrderStatusLabel/customOrderStatusLabel.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleOrderStatusLabel = () => {
  return html`
    <div className="${['home-wrapper'].join(' ')}">
    <h2>ESTADOS</h2>
    <h3>Etiquetas de estado de orden</h3>
    <section>
      <p>Estado predeterminado</p>
      <${OrderStatusLabel}
        state="Texto"
        type="default"
        size="default"
      />

      <p>Pedido creado</p>
      <${OrderStatusLabel}
        state="Pedido creado"
        type="created"
        size="small"
      />

      <p>Pedido aprobado</p>
      <${OrderStatusLabel}
        state="Pedido aprobado"
        type="approved"
        size="small"
      />

      <p>En preparación</p>
      <${OrderStatusLabel}
        state="En preparación"
        type="preparation"
        size="small"
      />

      <p>Recibido por paquetería</p>
      <${OrderStatusLabel}
        state="Recibido por paquetería"
        type="received"
        size="small"
      />

      <p>En camino</p>
      <${OrderStatusLabel}
        state="En camino"
        type="shipped"
        size="small"
      />

      <p>Entregado</p>
      <${OrderStatusLabel}
        state="Entregado"
        type="delivered"
        size="small"
      />

      <p>Cancelado</p>
      <${OrderStatusLabel}
        state="Cancelado"
        type="canceled"
        size="small"
      />

      <p>Con icono custom, color override y tamaño default</p>
      <${OrderStatusLabel}
        state="Revisando..."
        type="default"
        icon="../icons/ultaIcons/info.svg"
        size="default"
        colorOverride="#fce4ec"
      />
    </section>
    </div>
  `;
}
export default SampleOrderStatusLabel;