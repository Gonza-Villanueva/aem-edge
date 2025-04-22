import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { Button } from '@dropins/tools/components.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

const ProductOptionsModal = ({ product, onAddToCart, labels }) => {
  const colorOption = product.options?.find(option => option.id === 'ulta_color');
  const sizeOption = product.options?.find(option => option.id === 'ulta_tamano');

  const currentOption = colorOption || sizeOption;
  const isColor = !!colorOption;

  const initial = currentOption?.values?.[0] || {};
  const [selected, setSelected] = useState(initial);

  const handleSelect = (item) => {
    setSelected(item);
  };

  const isOutOfStock = !selected.inStock;

  const colorHexMap = {
    'Azul': '#0000FF',
    'Rojo': '#FF0000',
    'Verde': '#00FF00',
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
  };

  const labelOptionTitleColor = labels.ProductCard?.Options?.Title?.Color;
  const labelOptionTitleSize = labels.ProductCard?.Options?.Title?.Size;
  const labelOptionDetailsLabelColor = labels.ProductCard?.Options?.Details?.label?.Color;
  const labelOptionDetailsLabelSize = labels.ProductCard?.Options?.Details?.label?.Size;

  return html`
    <div class=${`product-options option-${isColor ? 'color' : 'size'}`}>
      <div class="product-options__title">
        ${isColor ? labelOptionTitleColor : labelOptionTitleSize}
      </div>

      <div class="product-options__header">
        <div class="product-options__image">
          <img src=${selected.image || product.images?.[0]?.url} alt="" />
        </div>
        <div class="product-options__info">
          <div class="product-options__brand">
            ${product.attributes?.find(attr => attr.name === 'ulta_marca')?.value || ''}
          </div>
          <div class="product-options__name">${product.name}</div>
          <a class="product-options__link" href="/products/${product.urlKey}/${product.sku}">
            ${labels.ProductCard?.Options?.Info?.Details?.Link}
          </a>
        </div>
      </div>

      ${isColor && html`
        <div class="product-options__preview">
          <img src=${selected.image || product.images?.[0]?.url} alt="" />
        </div>
      `}

      <div class="product-options__details">
        <span class="product-options__label">
          ${isColor ? labelOptionDetailsLabelColor : labelOptionDetailsLabelSize }
        </span>

        <div class="product-options__summary">
          ${isColor && html`
            <div class="product-options__summary-circle" 
                style="background-color: ${colorHexMap[selected.title] || '#d4d4d4'};">
            </div>
          `}
          <span class="product-options__summary-state">
            ${isOutOfStock ? 'Undressed' : 'Turn on'}
          </span>
          <span class="product-options__summary-price">
            ${selected.price || product.price?.final?.amount?.value || ''}
          </span>
        </div>
      </div>

      <div class="product-options__items option-${isColor ? 'color' : 'size'}">
        ${currentOption?.values?.map(item => html`
          <div
            class=${`product-options__item
              ${selected.id === item.id ? 'product-options__item--active' : ''}`}
            onClick=${() => handleSelect(item)}
          >
            ${isColor
              ? html`
                <div class="product-options__item-circle-wrapper">
                  <div class="product-options__item-circle"
                    style="background-color: ${colorHexMap[item.title] || '#d4d4d4'}">
                  </div>
                </div>
                <span class="product-options__item-name">${item.title}</span>
              `
              : html`
                <div class="product-options__item-label">
                  ${item.title}
                </div>
              `
            }
          </div>
        `)}
      </div>

      <div class="product-options__actions">
        ${isOutOfStock && html`
          <span class="product-options__sold-out-message">
            ${labels.ProductCard?.Options?.Message?.SoldOut}
          </span>
        `}
        <${Button}
          variant="primary"
          disabled=${isOutOfStock}
          onClick=${() => onAddToCart(selected)}
        >
          ${labels.PLP?.ProductCard?.Button?.AddToCart}
        </${Button}>
      </div>
    </div>
  `;
};

export default ProductOptionsModal;
