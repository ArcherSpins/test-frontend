import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { ProductIds } from "../constants/enums";
import { useInsuranceContext } from "../providers/InsuranceProvider";
import { INSURANCE_DEV, INSURANCE_DES } from "../constants/routes";

export const Welcome = () => {
  const { insurance, setInsurance } = useInsuranceContext();

  const insuranceLabel = {
    [ProductIds.devIns]: "Developer Insurance",
    [ProductIds.desIns]: "Designer Insurance"
  };

  const insuranceRoutes = {
    [ProductIds.devIns]: INSURANCE_DEV,
    [ProductIds.desIns]: INSURANCE_DES
  };

  const handleChangeInsurance = (e: ChangeEvent<HTMLSelectElement>) => {
    setInsurance(e.target.value as ProductIds);
  };

  return (
    <>
      <p>Welcome to Getsafe's {insuranceLabel[insurance]}</p>
      Choose insurance:{"  "}
      <select value={insurance} onChange={handleChangeInsurance}>
        <option value={ProductIds.devIns}>Developer</option>
        <option value={ProductIds.desIns}>Designer</option>
      </select>
      <div>
        <Link to={insuranceRoutes[insurance]}>Get started!</Link>
      </div>
    </>
  );
};
