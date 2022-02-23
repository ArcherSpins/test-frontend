import React, { FormEvent, useCallback } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";

export interface ComponentType {
  stepKey: string;
  fields: Array<{
    label: string;
    fieldKey: string;
    value: string | number;
    componentType?: FieldComponentProps["componentType"];
    inputType?: "number" | "string" | "email";
    onChange: (field: string, value: string | number) => void;
  }>;
}

export interface StepperProps {
  steps: {
    [key: string]: ComponentType;
  };
  step: string;
  showNextButton?: boolean;
  validators?: {
    [key: string]: boolean;
  };
  handleNext?: () => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  step,
  validators,
  handleNext,
  showNextButton
}) => {
  const handleChangeStep = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (handleNext) handleNext();
    },
    [handleNext]
  );

  const getStep = useCallback(() => {
    const currentStep = steps[step];

    if (!currentStep) {
      return null;
    }

    return currentStep;
  }, [steps, step]);

  const renderStep = (step: ComponentType) => {
    return step.fields.map((item) => (
      <FieldComponent key={item.fieldKey} {...item} />
    ));
  };

  const render = useCallback(() => {
    const step = getStep();

    if (step) {
      return (
        <form onSubmit={handleChangeStep}>
          {renderStep(step)}
          {showNextButton && (
            <button
              type="submit"
              disabled={validators && !validators[step.stepKey]}
            >
              Next
            </button>
          )}
        </form>
      );
    }

    return null;
  }, [getStep, validators, showNextButton, handleChangeStep]);

  return render();
};
