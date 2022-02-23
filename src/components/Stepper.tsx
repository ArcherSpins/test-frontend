import React, { FormEvent, useCallback, useState } from "react";
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
  defaultStep?: string;
  validators?: {
    [key: string]: boolean;
  };
  handleNext?: (nextStep: string) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  defaultStep,
  validators,
  handleNext
}) => {
  const [step, setStep] = useState(
    defaultStep || steps[Object.keys(steps)[0]]?.stepKey
  );

  const handleChangeStep = useCallback(
    (nextStep: string) => {
      return (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(nextStep);
        if (handleNext) handleNext(nextStep);
      };
    },
    [setStep, handleNext]
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
      const stepsArr = Object.values(steps);

      const nextStep =
        stepsArr[
          stepsArr.findIndex((item) => item.stepKey === step.stepKey) + 1
        ];

      return (
        <form onSubmit={handleChangeStep(nextStep?.stepKey)}>
          {renderStep(step)}
          {nextStep && (
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
  }, [getStep, steps, validators, handleChangeStep]);

  return render();
};
