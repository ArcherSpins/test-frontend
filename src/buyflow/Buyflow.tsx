import React, { useCallback } from "react";
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

  const handleChangeForms = (field: string, value: string | number) => {
    updateUser(field, value);
  };

  const getSteps = () => {
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
              onChange: handleChangeForms
            };
          })
        }
      };
    }, {});
  };

  const getValidators = useCallback(() => {
    const testEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const user = collectedData as UserPersonal;

    const validators: {
      [key: string]: boolean;
    } = {
      email: testEmail.test(String(collectedData.email).toLowerCase()),
      user: Boolean(user.firstName) || !Boolean(user.lastName),
      age: collectedData.age > 0
    };

    return validators;
  }, [collectedData]);

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>
      <Stepper validators={getValidators()} steps={getSteps()} />
    </>
  );
};

export default Buyflow;
