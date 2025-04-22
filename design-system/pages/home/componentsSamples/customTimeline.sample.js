import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { CustomAccordion } from '../../../molecules/customAccordion/customAccordion.js';
import htm from '../../../../scripts/htm.js';
import { CustomTimeline } from '../../../molecules/customTimeline/customTimeline.js';
import { CustomButton } from '../../../atoms/customButton/CustomButton.js';

const html = htm.bind(h);

export const SampleTimeline = () => {
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [canceledCounter, setCanceledCounter] = useState(0);

  const handleNextStep = () => {
    approvedCounter === 5
      ? setApprovedCounter(0)
      : setApprovedCounter(approvedCounter + 1);
  };

  const handleCanceledNextStep = () => {
    canceledCounter === 5
      ? setCanceledCounter(0)
      : setCanceledCounter(canceledCounter + 1);
  };

  const handleOnStateChange = (open) => {
    console.log('Accordion section changed, open: ', open);
  };

  const approvedTimeline = html`
    <div style=${{ display: 'flex', flexDirection: 'column' }}>
      <${CustomTimeline} props=${{ currentStep: approvedCounter }} />
      <${CustomButton} onClick=${handleNextStep}>
        next step
      <//CustomButton>
    </div>
  `;

  const canceledTimeline = html`
    <div style=${{ display: 'flex', flexDirection: 'column' }}>
      <${CustomTimeline} props=${{
    currentStep: canceledCounter,
    isCurrentStepCanceled: canceledCounter == 5 ? true : false,
  }} />
      <${CustomButton} onClick=${handleCanceledNextStep}>
        next step
      <//CustomButton>
    </div>
  `;

  const accordionProps = {
    acordionProps: {
      actionIconPosition: 'right',
    },
    sections: [
      {
        title: 'Approved timeline',
        defaultOpen: true,
        onStateChange: (open) => handleOnStateChange(open),
        children: approvedTimeline,
      },
      {
        title: 'Canceled timeline',
        defaultOpen: true,
        onStateChange: (open) => handleOnStateChange(open),
        children: canceledTimeline,
      },
    ],
  };

  return html`
    <section>
      <h1>Timeline</h1>
      <${CustomAccordion} props=${accordionProps} />
    </section>
  `;
};

export default SampleTimeline;
