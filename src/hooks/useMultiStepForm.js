import { useState } from 'react';

export default function useMultiStepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) {
        return i;
      }

      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) {
        return i;
      }

      return i - 1;
    });
  }

  return {
    steps,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    step: steps[currentStepIndex],
    next,
    back,
  };
}
