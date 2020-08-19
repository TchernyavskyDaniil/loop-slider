import { createEvent, createStore } from 'effector';

import { INITIAL_STEPS } from '../initialSteps';

export const $steps = createStore<typeof INITIAL_STEPS>(INITIAL_STEPS);

export const setupNextActiveStep = createEvent();

$steps.on(setupNextActiveStep, steps => {
  let indexOfActiveStep = steps.findIndex(({ isActive }) => isActive);

  if (indexOfActiveStep + 1 === steps.length) {
    indexOfActiveStep = -1;
  }

  const normalizedSteps = steps.map((step, index) => {
    if (indexOfActiveStep + 1 === index) {
      return {
        ...step,
        isActive: true,
      };
    }

    return {
      ...step,
      isActive: false,
    };
  });

  return normalizedSteps;
});
