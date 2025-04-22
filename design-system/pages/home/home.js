// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { SampleCustomButton } from './componentsSamples/customButton.sample.js';
import { SampleSwitch } from './componentsSamples/customSwitch.sample.js';
import { SampleAcordion } from './componentsSamples/customAcordion.sample.js';
import { SampleTooltip } from './componentsSamples/customTooltip.sample.js';
import { SampleMessage } from './componentsSamples/customMessage.sample.js';
import { SampleCustomCarousel } from './componentsSamples/customCarousel.samle.js';
import { SampleCheckboxRadioButton } from './componentsSamples/customCheckboxRadioButton.sample.js';
import { SampleInput } from './componentsSamples/customInput.sample.js';
import { SampleOrderStatusLabel } from './componentsSamples/customOrderStatusLabel.sample.js';
import { SampleTabs } from './componentsSamples/customTabs.sample.js';
import { SampleCustomStarRating } from './componentsSamples/customStarRating.sample.js';
import { SampleSelect } from './componentsSamples/customSelect.sample.js';
import { SampleCustomPrice } from './componentsSamples/customPrice.sample.js';
import { SamplePromoMessage } from './componentsSamples/customPromoMessage.sample.js';
import { SampleCards } from './componentsSamples/customCards.sample.js';
import { SampleTimeline } from './componentsSamples/customTimeline.sample.js';

import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

export const Home = () => {
  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <${SampleTimeline} />
      <${SampleSelect} />
      <${SampleCustomPrice} />
      <${SampleCustomButton} />
      <${SampleCustomStarRating} />
      <${SampleInput} />
      <${SampleCustomCarousel} />
      <${SampleCheckboxRadioButton} />
      <${SampleSwitch} />
      <${SampleAcordion} />
      <${SampleTooltip} />
      <${SampleMessage} />
      <${SampleOrderStatusLabel} />
      <${SampleTabs} />
      <${SamplePromoMessage} />
      <${SampleCards} />
    </div>
  `;
};

export default Home;
