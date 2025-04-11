# CustomSwitch Component Documentation

## Overview

The `CustomSwitch` component is a controlled toggle switch designed to be used in forms or interactive settings. It visually represents an on/off state and supports both mouse and keyboard interactions for accessibility.

## Features

- **Controlled Component:** The state (`checked`) is managed externally and passed as a prop.
- **Accessible:** Uses `role="switch"` and `aria-checked` to communicate its state to assistive technologies.
- **Keyboard Support:** Can be toggled using the spacebar or Enter key.
- **Custom ID:** Allows linking with forms via a unique identifier.

## Props

| Prop      | Type     | Required | Description                                                      |
|-----------|----------|----------|------------------------------------------------------------------|
| **checked**   | Boolean  | Yes      | The current state of the switch (true for on, false for off).       |
| **id**        | String   | Yes      | A unique identifier for linking the switch with form elements.    |
| **onChange**  | Function | Yes      | Callback function called when the switch is toggled. Receives the new boolean state.  |

## Implementation Details

- **Event Handling:**  
  The component uses the `useCallback` hook to memoize the `handleToggle` and `handleKeyDown` functions, ensuring efficient re-renders.
  
- **ARIA Attributes:**  
  It uses `role="switch"` and sets `aria-checked` to properly convey the switch’s state to assistive technologies.

- **User Interaction:**  
  The switch supports toggling via clicks and keyboard events (spacebar and Enter).

## Usage Example

```js
// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import CustomSwitch from 'path/to/CustomSwitch';

const ExampleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleChange = (newState) => {
    setIsOn(newState);
    console.log('Switch is now', newState ? 'On' : 'Off');
  };

  return (
    <div>
      <CustomSwitch
        checked={isOn}
        id="example-switch"
        onChange={handleChange}
      />
    </div>
  );
};
