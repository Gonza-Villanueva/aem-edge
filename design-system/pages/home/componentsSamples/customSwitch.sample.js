// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomSwitch } from '../../../atoms/customSwitch/customSwitch.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleSwitch = () => {
  const [switchOneChecked, setSwitchOneChecked] = useState(false);
  const [switchTwoChecked, setSwitchTwoChecked] = useState(true);

  const handleSwitchChangeOne = (newValue) => {
    setSwitchOneChecked(newValue);
    alert('Switch 1:', newValue ? 'Encendido' : 'Apagado');
  };

  const handleSwitchChangeTwo = (newValue) => {
    setSwitchTwoChecked(newValue);
    alert('Switch 2:', newValue ? 'Encendido' : 'Apagado');
  };

  return html`
    <div className="${['home-wrapper'].join(' ')}">
    <h2>Switch</h2>
      <section>
        <p>Estado inicial</p>
        <${CustomSwitch}
            checked=${switchOneChecked}
            id="switch-1"
            onChange=${handleSwitchChangeOne}
        />
        <p>Estado de alternancia</p>
        <${CustomSwitch}
          checked=${switchTwoChecked}
          id="switch-2"
          onChange=${handleSwitchChangeTwo}
        />
      </section>
    </div>
  `;
}
export default SampleSwitch;