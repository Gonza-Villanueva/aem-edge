# CustomCheckbox Component Documentation

## Overview

The `CustomCheckbox` component is a reusable, accessible checkbox element designed for integration in AEM and other web applications. It is controlled via props, handling both mouse and keyboard interactions for toggling its checked state.

## Features

- **Accessible:** Uses `role="checkbox"` and `aria-checked` to ensure compatibility with assistive technologies.
- **Controlled Component:** The current state is managed externally via the `checked` prop.
- **Keyboard Support:** Users can toggle the checkbox using the spacebar or Enter key.
- **Custom Icon:** When checked, it displays an icon (using the `CustomeIcon` component) to indicate selection.

## Props

| Prop      | Type     | Required | Description                                                                       |
|-----------|----------|----------|-----------------------------------------------------------------------------------|
| **checked**   | Boolean  | Yes      | Indicates the current state (checked if `true`, unchecked if `false`).            |
| **id**        | String   | Yes      | A unique identifier for the checkbox.                                           |
| **onChange**  | Function | Yes      | Callback invoked when the checkbox state changes; receives the new boolean value. |

## Implementation Details

- Renders a `<button>` with the role `"checkbox"`, using `aria-checked` to reflect the state.
- State toggling is handled by calling the `onChange` callback with the inverse of the current value.
- Supports keyboard interactions (spacebar and Enter) to trigger the toggle.
- When checked, an icon (from `CustomeIcon`) is rendered inside the button.

## Usage Example

```js
// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import CustomCheckbox from 'path/to/CustomCheckbox';

const Example = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
    console.log('Checkbox state:', newValue);
  };

  return (
    <div>
      <CustomCheckbox
        checked={isChecked}
        id="example-checkbox"
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
