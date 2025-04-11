// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { CustomPrice } from '../../../atoms/customPrice/customPrice.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleCustomPrice = () => {
  const simplePriceProps = {
    firstPrice: {
      price: 1001.5,
      style: 'highlight',
    },
    locale: 'en-US',
    currency: 'USD',
  };
  const discountPriceProps = {
    firstPrice: {
      price: 245.95,
      style: 'highlight',
    },
    secondPrice: {
      price: 351.35,
      style: 'strikethrough',
    },
    locale: 'en-US',
    currency: 'USD',
  };
  const priceWithLabelProps = {
    firstPrice: {
      price: 56.85,
      style: 'highlight',
      size: 'xl',
    },
    secondPrice: {
      price: 96.79,
      style: 'strikethrough',
    },
    labelText: 'precio regular',
    locale: 'en-US',
    currency: 'USD',
  };

  const highlightedPriceProps = {
    firstPrice: {
      price: 161.05,
      style: 'strikethrough',
    },
    secondPrice: {
      price: 191.72,
    },
    highlight: true,
    locale: 'en-US',
    currency: 'USD',
  };

  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <section>
        <h2>Price</h2>
        <${CustomPrice} props=${simplePriceProps} />
        <${CustomPrice} props=${discountPriceProps} />
        <${CustomPrice} props=${priceWithLabelProps} />
        <${CustomPrice} props=${highlightedPriceProps} />
      </section>
    </div>
  `;
};
export default SampleCustomPrice;
