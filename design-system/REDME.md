## ✅ Example use in Preact

```js
import { h } from '@dropins/tools/preact.js';
import htm from '{ruta}/scripts/htm.js';
import { CustomButton } from '{ruta}/design-system/atoms/customButton/CustomButton.js';

const html = htm.bind(h);

const CustomHome = () => {
  const handleClick = () => {
    alert('Hola');
  };

  return html`
    <div>
      <${CustomButton} variant="primary" size="large" onClick=${handleClick}>
        label
      </${CustomButton}>
    </div>
  `;
};
```

## ✅ Example use in block (AEM)

```js
import { render as provider } from '@dropins/storefront-cart/render.js';
import { CustomButton } from '../../design-system/atoms/customButton/CustomButton.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const handleClick = () => {
    alert('Ejemplo');
  };

  await provider.render(CustomButton, {
    variant: 'secondary',
    size: 'large',
    children: 'label',
    onClick: handleClick,
  })(block);
}
```
