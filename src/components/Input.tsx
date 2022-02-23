import React, { ChangeEvent } from "react";

export interface InputProps {
  onChange: (field: string, value: string | number) => void;
  fieldKey: string;
  label: string;
  value: string | number;
  inputType?: "string" | "number" | "email";
}

const Input: React.FC<InputProps> = (props) => {
  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    const validValue = props.inputType === "number" ? Number(value) : value;
    props.onChange(props.fieldKey, validValue);
  };

  return (
    <div>
      {props.label}:{" "}
      <input
        value={props.value}
        type={props.inputType}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
