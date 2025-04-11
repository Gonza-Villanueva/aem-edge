# CustomSelect

`CustomSelect` is a custom dropdown component built with **Preact**, designed to work within a modular design system. It allows users to select an option from a list, with optional validation and keyboard navigation support.

---

## Basic Usage

```js
import { CustomSelect } from '../../../atoms/customSelect/customSelect.js';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const handleSelectChange = (option) => {
  console.log('Selected:', option);
};

<CustomSelect
  props={{
    label: 'Select an option',
    options,
    defaultValue: 'Choose a heading',
    required: true,
    errorMessage: 'This field is required',
    onChange: handleSelectChange,
  }}
/>;
```
