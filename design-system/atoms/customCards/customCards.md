# CustomCards Component Documentation

## Overview

The `CustomCards` component is a reusable promotional/informative card designed to display organized content, such as promotions, informational sections, or active campaigns. It can include an image (with configurable alt text), an optional label (category or tag), a prominent title, brief descriptive or promotional text, an action link (e.g., "Saber más"), and an optional urgency tag (e.g., "Próximamente"). The component is responsive and supports three layout variants:

- **Vertical:** The card is always vertical (image on top, content below). In this variant, the image is fixed at 246×246px and the card’s maximum width is 310px.
- **Horizontal:** The card is displayed vertically on mobile devices and switches to a horizontal layout (image on the left, content on the right) on desktop (above 900px).
- **Compact:** The card is always horizontal and uses a compact style.

## Features

- **Responsive Layout:**  
  - *Vertical variant:* Always vertical on all devices.  
  - *Horizontal variant:* Displays vertical on mobile and horizontal on desktop (≥900px).  
  - *Compact variant:* Always horizontal.
- **Configurable Content:**  
  Displays an image, an optional label, a title, descriptive text, and an action link.
- **Urgency Tag Support:**  
  Optionally show an urgency tag (e.g., "Próximamente") within the content.
- **Whole-Card Clickability:**  
  Optionally, if enabled and a link is provided, the entire card is clickable.

## Props

| Prop                 | Type    | Required | Description                                                                                          |
| -------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| **imageSrc**         | String  | Yes      | URL of the image.                                                                                    |
| **imageAlt**         | String  | Yes      | Alternative text for the image (for accessibility).                                                |
| **labelText**        | String  | No       | A short label or category (e.g., "Oferta").                                                          |
| **titleText**        | String  | Yes      | The main title of the card.                                                                          |
| **bodyText**         | String  | Yes      | Brief descriptive or promotional text.                                                             |
| **linkText**         | String  | No       | Text for the action link (e.g., "Saber más").                                                        |
| **linkUrl**          | String  | No       | URL to navigate to when the link is clicked.                                                       |
| **showUrgencyTag**   | Boolean | No       | If true, displays an urgency tag in the content.                                                   |
| **urgencyTagText**   | String  | No       | Text for the urgency tag (e.g., "Próximamente").                                                     |
| **clickableWholeCard** | Boolean | No    | If true, the entire card is clickable (requires a valid linkUrl).                                    |
| **cardVariant**      | String  | No       | Layout variant of the card; valid values are "vertical" (default), "horizontal", and "compact".      |

## Usage Examples

### Example 1: Vertical Layout (Default)
The card is always vertical. On vertical cards, the image is fixed at 246×246px and the card’s maximum width is 310px.

```js
<${CustomCards}
    imageSrc="https://picsum.photos/400/300"
    imageAlt="Promotional image"
    labelText="ETIQUETA"
    titleText="Título"
    bodyText="Texto de cuerpo"
    linkText="Enlace"
    linkUrl="/promocion"
    showUrgencyTag=${false}
    clickableWholeCard=${false}
    cardVariant="horizontal"
/>

<${CustomCards}
    imageSrc="https://picsum.photos/400/300"
    imageAlt="Promotional image"
    labelText="ETIQUETA"
    titleText="Título"
    bodyText="Texto de cuerpo"
    linkText="Enlace"
    linkUrl="/promocion"
    showUrgencyTag=${true}
    urgencyTagText="Próximamente"
    clickableWholeCard=${true}
    cardVariant="horizontal"
/>

<${CustomCards}
    imageSrc="https://picsum.photos/400/300"
    imageAlt="Promotional image"
    labelText="ETIQUETA"
    titleText="Título"
    bodyText="Texto de cuerpo"
    linkText="Enlace"
    linkUrl="/promocion"
    showUrgencyTag=${false}
    urgencyTagText="Últimos días"
    clickableWholeCard=${false}
    cardVariant="vertical"
/>

<${CustomCards}
    imageSrc="https://picsum.photos/400/300"
    imageAlt="Promotional image"
    labelText="ETIQUETA"
    titleText="Título"
    bodyText="Texto de cuerpo"
    linkText="Enlace"
    linkUrl="/promocion"
    showUrgencyTag=${true}
    urgencyTagText="Próximamente"
    clickableWholeCard=${false}
    cardVariant="vertical"
/>

<${CustomCards}
    imageSrc="https://picsum.photos/200/150"
    imageAlt="Corporate commitment image"
    titleText="Nuestro Compromiso"
    bodyText="Conoce nuestros compromisos de calidad y servicio."
    linkText="Saber más"
    linkUrl="/compromiso"
    showUrgencyTag=${false}
    cardVariant="compact"
/>