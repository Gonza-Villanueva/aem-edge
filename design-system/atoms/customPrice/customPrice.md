# CustomPrice Component Documentation

## Overview

The `CustomPrice` component is a reusable price particle designed for integration in product cards, listings, detail views, and other components within AEM. It is built to display various types of price presentations, including a simple price, discounted price, prices with additional label text, and highlighted final prices.

## Features

- Displays a single price or both a current and an original/discounted price.
- Supports additional textual labels (e.g., "regular price") alongside the prices.
- Allows customization of the price presentation through style and size modifiers.
- Formats numeric values based on locale and currency settings.
- Responsive design that adapts to mobile devices.

## Props

The component accepts a `props` object with the following properties:

| Prop            | Type    | Required | Description                                                                                                                                                                          |
| --------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **firstPrice**  | Object  | Yes      | Object with the primary price. Must include a numeric `price` value. Optionally includes `style` (e.g., `highlight`, `strikethrough`) and `size` (e.g., `xl`) to control appearance. |
| **secondPrice** | Object  | No       | Object for a secondary price (used for discounts or original price). Optionally includes a numeric `price`, and style/size properties.                                               |
| **labelText**   | String  | No       | Additional text to display next to the price, such as "regular price".                                                                                                               |
| **locale**      | String  | No       | Locale string used for formatting the price. Default is `en-US`.                                                                                                                     |
| **currency**    | String  | No       | Currency code used for formatting the price. Default is `USD`.                                                                                                                       |
| **highlight**   | Boolean | No       | If true, the price is visually highlighted.                                                                                                                                          |

## Implementation Details

- **Price Formatting:**  
  The component uses a helper function `formatPrice` that applies `toLocaleString` for proper formatting based on the supplied `locale` and `currency`.
- **Styling:**  
  CSS classes such as `content-price--highlight`, `content-price--strikethrough`, and `content-price--size-xl` are applied conditionally based on the properties of the price objects. The component loads its styles via an external CSS file using `loadCSS`.

## Usage Examples

### Example 1: Simple Price

```js
const simplePriceProps = {
  firstPrice: {
    price: 1001.5,
    style: 'highlight',
  },
  locale: 'en-US',
  currency: 'USD',
};
```
