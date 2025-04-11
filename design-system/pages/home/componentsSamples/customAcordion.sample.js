// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState, useCallback } from '@dropins/tools/preact-hooks.js';
import { CustomAccordion } from '../../../molecules/customAccordion/customAccordion.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleAcordion = () => {
  const handelOnStateChange = () => {
    alert('sample state change');
  };

  const acordionData = {
    acordionProps: {
      actionIconPosition: 'right',
    },
    sections: [
      {
        title: 'Seccion 1',
        defaultOpen: true,
        secondaryText: 'secondary text',
        onStateChange: (open) => handelOnStateChange(open),
        children: html`<div>soy la seccion 1</div>`,
      },
      {
        title: 'Seccion 2',
        secondaryText: 'secondary text',
        onStateChange: (open) => handelOnStateChange(open),
        children: html`<div>soy la seccion 2</div>`,
      },
    ],
  };
  return html`
    <div>
    <section>
      <h2>Acordeon</h2>
      <${CustomAccordion} props=${acordionData}/>
    </section>
    </div>
  `;
}
export default SampleAcordion;