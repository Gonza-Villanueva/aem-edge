# CustomTooltip Component Documentation

## Overview

The `CustomTooltip` component is a reusable tooltip element designed to display supplementary information when a user hovers over or focuses on an icon. It supports custom text, an optional link, two positioning options (top or bottom), and an optional close button.

## Features

- **Interactive Display:**  
  Opens on mouse enter/focus and closes on mouse leave/blur or when the Escape key is pressed.
  
- **Customizable Content:**  
  You can configure the tooltip text and optionally include a link.
  
- **Positioning Options:**  
  The tooltip can be positioned either above or below the triggering icon.
  
- **Close Button:**  
  Optionally shows a close button that allows the user to manually dismiss the tooltip.

- **Accessible:**  
  Supports keyboard interactions, including focus management and the Escape key for dismissal.

## Props

| Prop           | Type    | Required | Description                                                                                             |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| **text**       | String  | No       | The tooltip text to display. Default is `"Texto del tooltip"`.                                         |
| **linkText**   | String  | No       | The text for an optional link within the tooltip.                                                     |
| **linkUrl**    | String  | No       | The URL for the optional link. Defaults to `"#"`.                                                       |
| **position**   | String  | No       | The tooltip's position relative to the icon. Valid values are `"bottom"` or `"top"`.                    |
| **closeButton**| Boolean | No       | Whether to display a close button within the tooltip. Defaults to `true`.                               |
| **icon**       | String  | No       | The icon or trigger element for the tooltip. Can be any text or an image. Default is `"ⓘ"`.             |

## Usage Example

```js
<CustomTooltip
  text="Información adicional sobre este ítem"
  linkText="Más detalles"
  linkUrl="https://example.com"
  position="bottom"
  closeButton={true}
  icon="ⓘ"
/>
