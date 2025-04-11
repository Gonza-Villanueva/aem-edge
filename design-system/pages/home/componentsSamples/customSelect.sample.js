// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomSelect } from '../../../atoms/customSelect/customSelect.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleSelect = () => {
  const label = 'Este es el label';
  const options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];
  const defaultValue = 'Selecciona tu encabezado';
  const required = true;
  const errorMessage = 'Este campo es obligatorio';
  const handleSelectChange = (option) => {
    // handle select option
  };
  return html`
    <section>
      <h2>Select con validación de error</h2>
      <${CustomSelect}
        props=${{
          label,
          options,
          defaultValue,
          required,
          errorMessage,
          onChange: handleSelectChange,
        }}
      />

      <h2>Select sin validación de error</h2>
      <${CustomSelect} props=${{ label, options }} />
    </section>
  `;
};
export default SampleSelect;
