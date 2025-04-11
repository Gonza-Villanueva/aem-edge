# CustomPromoMessage Component Documentation

## Overview

The `CustomPromoMessage` component is a reusable promotional message particle designed to display key promotional or benefit text (e.g., free shipping, gift with purchase) in a visually distinctive banner. It is built for integration in AEM and other environments where promotional information must be clearly displayed without reloading the page.

## Features

- **Full Promotional Message:** Displays a complete promotional message.
- **Text Highlighting:** Optionally highlights a specific text fragment (e.g., "MXN$ 600") within the message.
- **Custom Color Overrides:** Supports custom background and text colors via props.

## Props

The component accepts a props object with the following properties:

| Prop                        | Type    | Required | Description                                                                                              |
|-----------------------------|---------|----------|----------------------------------------------------------------------------------------------------------|
| **message**                 | String  | Yes      | The full promotional message text.                                                                     |
| **highlightText**           | String  | No       | A fragment of the message to be visually highlighted (e.g., "MXN$ 600").                                 |
| **backgroundColorOverride** | String  | No       | Custom background color applied inline; if not provided, a default background defined in CSS is used.    |
| **textColorOverride**       | String  | No       | Custom text color applied inline; if not provided, a default text color defined in CSS is used.          |

## Implementation Details

- **Highlighting:**  
  If the `highlightText` prop is provided and is found within the `message`, that text fragment is wrapped in a `<span>` with the class `custom-promo-message__highlight` for special styling.

- **Color Overrides:**  
  The `backgroundColorOverride` and `textColorOverride` props let you customize the banner colors via inline styles, overriding the defaults set in the CSS.

## Usage Examples

### Example 1: Basic Promo Message

```js
<${CustomPromoMessage}
  message="Envío gratuito en órdenes mayores a MXN$ 600"
/>

<${CustomPromoMessage}
  message="Obsequio con tu pedido"
  highlightText="Obsequio con tu pedido"
/>

<${CustomPromoMessage}
  message="Envío gratuito en órdenes mayores a MXN$ 600"
  highlightText="MXN$ 600"
  backgroundColorOverride="#fff099"
  textColorOverride="#000000"
/>
