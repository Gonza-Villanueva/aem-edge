# CustomTimeline Component Documentation

## Overview

The `CustomTimeline` component is a reusable timeline particle designed to visualize order statuses or process steps. It displays a series of milestones, where each milestone is shown as either an icon with a label (for the current milestone) or as a dot (for past or future milestones). Additionally, if the current milestone is canceled, a default canceled milestone icon and label are displayed instead.

## Features

- **Customizable Milestones:** Accepts an array of milestones each with its own icon and label.
- **Current Step Highlighting:** The milestone corresponding to the current step is highlighted, displaying its icon and label.
- **Canceled State:** When the current step is canceled (`isCurrentStepCanceled` is true), a default canceled milestone (with custom icon and label) is rendered.
- **Default Configurations:** Provides default milestone configurations and a default canceled milestone if none are supplied.

## Props

The component accepts a props object with the following properties:

| Prop                    | Type    | Default Value                | Description                                                                                                             |
| ----------------------- | ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `milestones`            | Array   | `DEFAULT_MILESTONS`          | An array of milestone objects. Each object should have an `id` and a `state` object containing a `label` and an `icon`. |
| `currentStep`           | Number  | `0`                          | The index of the current milestone. This milestone is rendered in icon mode with its icon and label displayed.          |
| `canceledMilestone`     | Object  | `DEFAULT_CANCELED_MILESTONS` | A milestone object for the canceled state. It should follow the same format as the other milestones.                    |
| `isCurrentStepCanceled` | Boolean | `false`                      | If true, the current milestone is considered canceled, and the default canceled milestone is shown instead.             |

## Usage Example

Below is an example of how you can integrate the `CustomTimeline` component in a parent component:

```js
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { CustomTimeline } from 'path/to/CustomTimeline.js';

export const TimelineDemo = () => {
  // currentStep represents the active milestone index.
  const [currentStep, setCurrentStep] = useState(2);
  // isCurrentStepCanceled indicates if the current step is canceled.
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <div>
      <CustomTimeline
        props={{
          currentStep: currentStep,
          isCurrentStepCanceled: isCanceled,
          // Optionally, you can also pass custom milestones and a canceled milestone.
          // milestones: myMilestones,
          // canceledMilestone: myCanceledMilestone
        }}
      />
      {/* Add your controls here to update currentStep and isCanceled */}
    </div>
  );
};
```
