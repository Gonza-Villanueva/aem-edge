# CustomTabs Component Documentation

## Overview

The `CustomTabs` component provides a reusable tabbed interface. Each child element passed to this component must include a `tabTitle` property, which is used to generate the tab header. Only the content of the active tab is displayed, making it easy to organize and navigate between different sections.

## Features

- **Dynamic Tab Headers:**  
  Generates tab headers based on the `tabTitle` prop of each child element.
  
- **Active Tab Management:**  
  Manages the active tab internally and calls an optional callback (`onTabChange`) whenever the active tab changes.
  
- **Responsive & Reusable:**  
  Loads its own CSS dynamically and adapts to different screen sizes.

## Props

| Prop                  | Type     | Default  | Description                                                                              |
| --------------------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| **defaultActiveIndex**| Number   | 0        | The index of the tab that is active on initial render.                                   |
| **onTabChange**       | Function | () => {} | Callback invoked with the new active tab index each time a tab is clicked.               |
| **children**          | ReactNode|          | Child elements that must include a `tabTitle` prop. Only the active child's content is rendered. |

## Usage Example

```js
<CustomTabs defaultActiveIndex={0} onTabChange={(index) => console.log('Active Tab:', index)}>
  <div tabTitle="Artículos ordenados">
    {/* Content for "Artículos ordenados" */}
    <p>Lista de artículos...</p>
  </div>
  <div tabTitle="Factura">
    {/* Content for "Factura" */}
    <p>Detalles de la factura...</p>
  </div>
  <div tabTitle="Devoluciones">
    {/* Content for "Devoluciones" */}
    <p>Información sobre devoluciones...</p>
  </div>
  <div tabTitle="Envíos">
    {/* Content for "Envíos" */}
    <p>Estado del envío...</p>
  </div>
</CustomTabs>
