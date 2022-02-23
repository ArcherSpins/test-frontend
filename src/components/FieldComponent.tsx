import React, { FC } from "react";
import SummaryStep from "../buyflow/SummaryStep";
import { useUserContext } from "../providers/UserProvider";
import Input from "./Input";

export interface FieldComponentProps {
  componentType?: "input" | "summary";
  label: string;
  fieldKey: string;
  value: string | number;
  inputType?: "number" | "string" | "email";
  onChange: (field: string, value: string | number) => void;
}

export const FieldComponent: FC<FieldComponentProps> = ({
  componentType,
  inputType,
  ...restProps
}) => {
  const { user } = useUserContext();

  if (componentType === "summary") {
    return <SummaryStep collectedData={user} {...restProps} />;
  }

  return <Input inputType={inputType} {...restProps} />;
};
