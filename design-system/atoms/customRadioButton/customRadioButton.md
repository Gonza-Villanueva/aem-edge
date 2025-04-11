# CustomRadioButton Component Documentation

## Overview

The `CustomRadioButton` component is a controlled radio button designed for selecting one option among a group. It supports mouse and keyboard interactions, ensuring accessibility by using appropriate ARIA roles.

## Features

- **Controlled Component:**  
  Its checked state is managed externally through the `checked` prop.
- **Accessible:**  
  Uses `role="radio"` and `aria-checked` to ensure compatibility with assistive technologies.
- **Keyboard Interactivity:**  
  Supports toggling via the spacebar or Enter key.
- **Custom Grouping:**  
  The `name` prop allows grouping radio buttons for semantic purposes.

## Props

| Prop      | Type     | Required | Description                                                        |
| --------- | -------- | -------- | ------------------------------------------------------------------ |
| **checked**   | Boolean  | Yes      | Current state: `true` if selected, `false` otherwise.               |
| **id**        | String   | Yes      | Unique identifier for the radio button.                          |
| **name**      | String   | Yes      | Name used to group radio buttons together.                         |
| **onChange**  | Function | Yes      | Callback function called when the radio button is toggled. Receives the new boolean value. |

## Usage Example

```js
// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import CustomRadioButton from 'path/to/CustomRadioButton';

const ExampleRadioGroup = () => {
  const [selected, setSelected] = useState('option1');

  const handleOption1Change = () => setSelected('option1');
  const handleOption2Change = () => setSelected('option2');

  return (
    <div>
      <CustomRadioButton
        checked={selected === 'option1'}
        id="radio-1"
        name="radio-group"
        onChange={handleOption1Change}
      />
      <label htmlFor="radio-1">Opción 1</label>

      <CustomRadioButton
        checked={selected === 'option2'}
        id="radio-2"
        name="radio-group"
        onChange={handleOption2Change}
      />
      <label htmlFor="radio-2">Opción 2</label>
    </div>
  );
};
