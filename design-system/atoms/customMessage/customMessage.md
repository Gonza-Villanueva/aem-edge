# CustomMessage Component Documentation

## Overview

The `CustomMessage` component is a reusable message particle designed to display notifications—such as error, warning, success, or informational messages—within your application. It supports different layout variants, allowing you to show a full message (with optional title, links, and images), a simple text-only version, or a compact snackbar-style notification.

## Features

- **Multiple Types:** Supports `error`, `warning`, `success`, and `info` for applying corresponding styles and icons.
- **Variants:**  
  - **complete:** Displays title (if provided), description, and, optionally, links and images.  
  - **textOnly:** Renders only the description (and an optional close button).  
  - **snackbar:** Shows a compact message with a full border.
- **Close & Auto-Close:** Optionally includes a close button and can automatically hide the message after a set time.
- **Responsive:** Styled to adapt gracefully to different screen sizes.

## Props

| Prop                  | Type     | Required | Description                                                                                         |
| --------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------- |
| **type**              | String   | No       | One of: `error`, `warning`, `success`, `info`. Determines the default styling and icon.             |
| **variant**           | String   | No       | One of: `complete`, `textOnly`, or `snackbar`. Controls the layout of the message.                  |
| **title**             | String   | No       | Optional title displayed in the "complete" variant.                                               |
| **description**       | String   | Yes      | The main message text.                                                                              |
| **images**            | Array    | No       | An array of image URLs to display (only in the "complete" variant, below the links).                |
| **links**             | Array    | No       | An array of objects `{ text: string, url: string }` representing additional links (for "complete"). |
| **showCloseButton**   | Boolean  | No       | If `true`, a close button is displayed.                                                           |
| **onClose**           | Function | No       | Callback function executed when the message is closed (via the close button).                       |
| **autoClose**         | Boolean  | No       | If `true`, the message automatically hides after a specified duration.                            |
| **autoCloseDuration** | Number   | No       | Duration in milliseconds before auto-close (default is 5000).                                      |

## Implementation Details

- **Layout:**  
  In the "complete" variant, if a `title` is provided it is displayed above the `description`, and additional links and images are rendered below the text.
- **Close Behavior:**  
  A close button is rendered when `showCloseButton` is true. If `autoClose` is enabled, the message hides automatically after the specified `autoCloseDuration`.
- **Responsive Design:**  
  The component’s CSS includes responsive rules to adjust typography and spacing on smaller screens.

## Usage Examples

### Example 1: Complete Error Message

```js
<CustomMessage
  type="error"
  variant="complete"
  title="Error"
  description="Se ha producido un error al procesar tu solicitud."
  links={[
    { text: "Reintentar", url: "#" },
    { text: "Ayuda", url: "#" }
  ]}
  showCloseButton={true}
  onClose={() => console.log('Message closed')}
/>

<CustomMessage
  type="info"
  variant="textOnly"
  description="Tu pedido ha sido recibido y está en proceso."
  showCloseButton={true}
  onClose={() => console.log('Message closed')}
/>

<CustomMessage
  type="success"
  variant="snackbar"
  description="¡El pedido fue entregado exitosamente!"
  showCloseButton={true}
  onClose={() => console.log('Snackbar closed')}
  autoClose={true}
  autoCloseDuration={4000}
/>
