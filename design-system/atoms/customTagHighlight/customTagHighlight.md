# CustomTagHighlight Component Documentation

## Overview

The `CustomTagHighlight` component is a simple UI element designed to emphasize or label short pieces of content. It is commonly used for tags, badges, or highlights in UI layouts.

## Features

- **Custom Background and Text Color:** Easily specify the background and text color via HEX values.
- **Lightweight and Flexible:** Only renders a styled `<span>` with dynamic inline styles.
- **CSS Ready:** Loads a scoped stylesheet automatically using the AEM `loadCSS` helper.

## Props

| Prop              | Type   | Required | Default     | Description                                   |
| ----------------- | ------ | -------- | ----------- | --------------------------------------------- |
| **backgroundColor** | String | No       | `#C40058`   | HEX color code for the background.            |
| **textColor**       | String | No       | `#FFFFFF`   | HEX color code for the text.                  |
| **text**            | String | No       | `""`        | The label or content to show in the tag.      |

## Implementation Details

- The tag is rendered as a `<span>` with inline styles.
- The default appearance is a pink background with white text, designed to visually pop against most backgrounds.
- CSS can be extended in the `customTagHighlight.css` file for hover effects, padding, typography, etc.

## Usage Examples

### Example 1: Default Tag

```js
<CustomTagHighlight text="Nuevo" />
