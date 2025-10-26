import { ReactElement, useState } from "react";

export function useMultiStep(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function reset() {
    setCurrentStepIndex(0);
  }

  function goTo(step: number) {
    setCurrentStepIndex(step);
  }

  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    back,
    next,
    reset,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps: steps.length,
  };
}
