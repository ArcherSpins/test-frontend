import React, { useCallback, useEffect, useState } from "react";
import { ProductIds } from "../constants/enums";
import { PRODUCT_IDS_TO_NAMES } from "../constants/constants";
import { Stepper } from "../components/Stepper";
import { useInsuranceContext } from "../providers/InsuranceProvider";
import { useUserContext } from "../providers/UserProvider";
import Api from "../api";
import { User, UserPersonal } from "../types";

interface BuyflowProps {
  productId: ProductIds;
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const { insurance } = useInsuranceContext();
  const { user: collectedData, updateUser } = useUserContext();

  const [step, setStep] = useState<string | null>(null);

  useEffect(() => {
    const steps = Api.getSteps(insurance);

    if (!step && steps) {
      setStep(steps[Object.keys(steps)[0]].stepKey);
    }
  }, [step, setStep, insurance]);

  const handleUpdateUser = useCallback((field: string, value: string | number) => {
    updateUser(field, value);
  }, [updateUser]);
 
  const getSteps = useCallback(() => {
    const steps = Api.getSteps(insurance);

    return Object.entries(steps).reduce((res, [key, value]) => {
      return {
        ...res,
        [key]: {
          ...value,
          fields: steps[key].fields.map((field) => {
            const key = field.fieldKey as keyof User;
            const value = field.value ?? collectedData[key] ?? "";

            return {
              ...field,
              value,
              onChange: handleUpdateUser
            };
          })
        }
      };
    }, {});
  }, [handleUpdateUser, collectedData, insurance]);

  const getValidators = useCallback(() => {
    const testEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const user = collectedData as UserPersonal;

    const validators: {
      [key: string]: boolean;
    } = {
      email: testEmail.test(String(collectedData.email).toLowerCase()),
      user: Boolean(user.firstName) && Boolean(user.lastName),
      age: collectedData.age > 0
    };

    return validators;
  }, [collectedData]);

  const getNextStep = useCallback(() => {
    const steps = Api.getSteps(insurance);
    const stepConfigs = Object.values(steps);

    const nextStep =
      stepConfigs[
        stepConfigs.findIndex((item) => item.stepKey === step) + 1
      ];
    
    return nextStep;
  }, [step, insurance]);

  const onNextStep = useCallback(() => {
    const nextStep = getNextStep();

    if (nextStep) {
      setStep(nextStep.stepKey)
    }
  }, [getNextStep]);

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>
      {step && <Stepper showNextButton={Boolean(getNextStep())} validators={getValidators()} handleNext={onNextStep} step={step} steps={getSteps()} />}
    </>
  );
};

export default Buyflow;
