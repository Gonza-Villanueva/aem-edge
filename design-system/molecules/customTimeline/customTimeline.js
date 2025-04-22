import { h } from '@dropins/tools/preact.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

const DEFAULT_CANCELED_MILESTONS = {
  id: 'onFinally',
  state: {
    label: 'Cancelado',
    icon: html`<img src="../../../icons/X.svg" width="20px" height="20px" />`,
  },
};

const DEFAULT_MILESTONS = [
  {
    id: 'onCreate',
    state: {
      label: 'Pedido creado',
      icon: html`<img
        src="../../../icons/bag.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
  {
    id: 'onApproved',
    state: {
      label: 'Pedido aprobado',
      icon: html`<img
        src="../../../icons/check.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
  {
    id: 'onPrepparing',
    state: {
      label: 'En preparación',
      icon: html`<img
        src="../../../icons/clock.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
  {
    id: 'onRecivedFromStorage',
    state: {
      label: 'Recibido por paquetería',
      icon: html`<img
        src="../../../icons/delivery-method.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
  {
    id: 'onTheWay',
    state: {
      label: 'En camino',
      icon: html`<img
        src="../../../icons/delivery.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
  {
    id: 'onFinally',
    state: {
      label: 'Entregado',
      icon: html`<img
        src="../../../icons/home.svg"
        width="20px"
        height="20px"
      />`,
    },
  },
];

export const CustomTimeline = ({ props }) => {
  const {
    milestones = DEFAULT_MILESTONS,
    currentStep = 0,
    canceledMilestone = DEFAULT_CANCELED_MILESTONS,
    isCurrentStepCanceled = false,
  } = props || {};

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/molecules/customTimeline/customTimeline.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  return html`
    <div className="custom-timeline-wrapper">
      ${milestones.map((milestone, index) => {
        const isCurrent = index === currentStep;
        const isPast = index < currentStep;
        const dotClass = isPast ? 'dot dot--active' : 'dot dot--inactive';
        return html`
          <div className="mileston-wrapper">
            <div
              className=${`milestone ${isCurrent ? 'icon-mode' : 'dot-mode'}`}
            >
              ${isCurrent
                ? html`
                    <div className="icon-wrapper">
                      ${isCurrentStepCanceled
                        ? canceledMilestone.state.icon
                        : milestone.state.icon}
                    </div>
                    <label>
                      ${isCurrentStepCanceled
                        ? canceledMilestone.state.label
                        : milestone.state.label}
                    </label>
                  `
                : html`
                    <div className="dot-wrapper">
                      <div className=${dotClass}></div>
                    </div>
                  `}
            </div>
          </div>
        `;
      })}
      <div className="timeline-line"></div>
    </div>
  `;
};

export default CustomTimeline;
