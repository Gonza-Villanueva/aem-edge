# OrderStatusLabel Component Documentation

## Overview

The `OrderStatusLabel` component displays an order status badge with a corresponding icon and text. It is designed to visually represent the current state of an order (e.g., "Pedido creado", "En camino") by applying different styles based on the type (error, approved, shipped, etc.). The component supports two sizes and allows for optional color customization via inline styles.

## Features

- **Dynamic Status:** Displays different messages and icons based on the `type` prop.
- **Customizable Appearance:** Supports a default and small size variant; allows overriding the background color via `colorOverride`.
- **Icon Handling:** If an icon path is not provided via the `icon` prop, the component uses a default icon according to the type (e.g., a check icon for most statuses, a cross icon for canceled).

## Props

| Prop             | Type     | Required | Description                                                                                                  |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| **state**        | String   | Yes      | The text representing the current order status (e.g., "Pedido creado", "En camino").                           |
| **type**         | String   | No       | One of: `default`, `created`, `approved`, `preparation`, `received`, `shipped`, `delivered`, or `canceled`. Determines the styling and default icon. |
| **icon**         | String   | No       | The path to the icon to display. If not provided, a default icon is used (a check icon for most statuses, a cross for canceled). |
| **size**         | String   | No       | Either `'default'` or `'small'`. Controls the size of the badge.                                             |
| **colorOverride**| String   | No       | Optional custom background color to override the default background. Applied inline if specified.              |

## Usage Example

```js
<CustomMessage
  state="Pedido creado"
  type="created"
  size="default"
/>

<CustomMessage
  state="Cancelado"
  type="canceled"
  size="small"
  colorOverride="#fdd"
  icon="../icons/my-custom-cross.svg"
/>
