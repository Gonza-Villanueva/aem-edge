// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomButton } from '../../../atoms/customButton/CustomButton.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleCustomButton = () => {

  const handleClick = () => {
    alert('sample click');
  };

  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <section style=${{
      display: 'flex',
      'flex-direction': 'column',
      gap: '20px',
    }}>
      <h2>Buttons</h2>
      <p>primary</p>
      <div style=${{ display: 'flex', gap: '20px' }}>
          <${CustomButton} variant="primary" size='large' onClick=${() =>
      handleClick()}>label</${CustomButton}>
          <${CustomButton} variant="primary" size='large' disabled>label</${CustomButton}>

          <${CustomButton} variant="primary" size='medium' onClick=${() =>
      handleClick()}>label</${CustomButton}>
          <${CustomButton} variant="primary" size='medium' disabled>label</${CustomButton}>
      </div>
      <p>secondary</p>
      <div style=${{ display: 'flex', gap: '20px' }}>
          <${CustomButton} onClick=${() =>
      handleClick()} size='large' variant="secondary">label</${CustomButton}>
          <${CustomButton} disabled onClick=${() =>
      handleClick()} size='large' variant="secondary">label</${CustomButton}>

          <${CustomButton} onClick=${() =>
      handleClick()} variant="secondary">label</${CustomButton}>
          <${CustomButton} disabled onClick=${() =>
      handleClick()} variant="secondary">label</${CustomButton}>

      </div>

      <p>tertiary</p>
          <div style=${{ display: 'flex', gap: '20px' }}>
              <${CustomButton} size='large' onClick=${() =>
      handleClick()}  variant="tertiary">
               label
               </${CustomButton}>
              <${CustomButton} size='large' disabled onClick=${() =>
      handleClick()} variant="tertiary">label</${CustomButton}>

              <${CustomButton} onClick=${() =>
      handleClick()} variant="tertiary">label</${CustomButton}>
              <${CustomButton} disabled onClick=${() =>
      handleClick()} variant="tertiary">label</${CustomButton}>
      </div>
    </section>
    </div>
  `;
}
export default SampleCustomButton;