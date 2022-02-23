import React from "react";
import { Link } from "react-router-dom";
import { DefaultUser } from "../constants/constants";
import { useUserContext } from "../providers/UserProvider";
import { User, UserPersonal } from "../types";

interface SummaryStepProps {
  collectedData: UserPersonal | User;
}

const SummaryStep: React.FC<SummaryStepProps> = (props) => {
  const { setUser } = useUserContext();

  const renderFields = () => {
    return Object.entries(props.collectedData).map(([key, value]) => (
      <div key={key}>
        {key}: {value}
      </div>
    ));
  };

  const cleanUserData = () => {
    setUser(DefaultUser);
  };

  return (
    <>
      {renderFields()}
      <div>
        <Link onClick={cleanUserData} to="/purchased=dev_ins">
          Purchase
        </Link>
      </div>
    </>
  );
};

export default SummaryStep;
