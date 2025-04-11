/// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { CustomCheckbox } from '../../../atoms/customCheckbox/customCheckbox.js';
import { CustomRadioButton } from '../../../atoms/customRadioButton/customRadioButton.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleCheckboxRadioButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
    console.log('Checkbox está ahora:', newValue ? 'Marcado' : 'Desmarcado');
  };

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOption1Change = () => {
    setSelectedOption('option1');
  };

  const handleOption2Change = () => {
    setSelectedOption('option2');
  };

  const [isCheckeds, setIsCheckeds] = useState(false);

  const handleRadioChange = (newValue) => {
    setIsCheckeds(newValue);
    console.log('El radio está ahora:', newValue ? 'Seleccionado' : 'No seleccionado');
  };

  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <h2>Checkbox</h2>
        <${CustomCheckbox}
          checked=${isChecked}
          id="my-checkbox"
          onChange=${handleCheckboxChange}
        />
      <h2>Radio button</h2>
      <section style="display: flex; gap: 16px;">
        <!-- Opción 1 -->
        <div style="display: flex; gap: 5px;">
          <${CustomRadioButton}
            checked=${selectedOption === 'option1'}
            id="radio-1"
            name="my-radio-group"
            onChange=${handleOption1Change}
          />
          <label for="radio-1">Opción 1</label>
        </div>
        <!-- Opción 2 -->
        <div style="display: flex; gap: 5px;">
          <${CustomRadioButton}
            checked=${selectedOption === 'option2'}
            id="radio-2"
            name="my-radio-group"
            onChange=${handleOption2Change}
          />
          <label for="radio-2">Opción 2</label>
        </div>
      </section>
      <section style="margin-top: 10px;">
        <div style="display: flex; gap: 5px;">
          <${CustomRadioButton}
            checked=${isCheckeds}
            id="radio-3"
            name="my-radio-group"
            onChange=${handleRadioChange}
          />
          <label for="radio-3">Independiente</label>
        </div>
      </section>
    </div>
  `;
}
export default SampleCheckboxRadioButton;