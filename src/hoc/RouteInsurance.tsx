import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useInsuranceContext } from "../providers/InsuranceProvider";
import { INSURANCE_DEV, INSURANCE_DES } from "../constants/routes";
import { ProductIds } from "../constants/enums";

export const RouteInsurance: FC = ({ children }) => {
  const history = useHistory();
  const { insurance, setInsurance } = useInsuranceContext();

  useEffect(() => {
    if (
      history.location.pathname === INSURANCE_DEV &&
      insurance === ProductIds.desIns
    ) {
      setInsurance(ProductIds.devIns);
    }

    if (
      history.location.pathname === INSURANCE_DES &&
      insurance === ProductIds.devIns
    ) {
      setInsurance(ProductIds.desIns);
    }
  }, [insurance, history, setInsurance]);

  return <>{children}</>;
};
