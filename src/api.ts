import { FieldComponentProps } from "./components/FieldComponent";
import { ProductIds } from "./constants/enums";

export interface StepType {
  stepKey: string;
  fields: Array<{
    label: string;
    fieldKey: string;
    value?: string | number;
    componentType?: FieldComponentProps["componentType"];
    inputType?: "number" | "string" | "email";
  }>;
}

const stepsForDev: {
  [key: string]: StepType;
} = {
  email: {
    stepKey: "email",
    fields: [
      {
        fieldKey: "email",
        label: "Email"
      }
    ]
  },
  age: {
    stepKey: "age",
    fields: [
      {
        fieldKey: "age",
        label: "Age",
        inputType: "number"
      }
    ]
  },
  summary: {
    stepKey: "summary",
    fields: [
      {
        fieldKey: "summary",
        label: "Summary",
        componentType: "summary"
      }
    ]
  }
};

const stepsForDes: {
  [key: string]: StepType;
} = {
  email: {
    stepKey: "email",
    fields: [
      {
        fieldKey: "email",
        label: "Email"
      }
    ]
  },
  age: {
    stepKey: "age",
    fields: [
      {
        fieldKey: "age",
        label: "Age",
        inputType: "number"
      }
    ]
  },
  user: {
    stepKey: "user",
    fields: [
      {
        fieldKey: "firstName",
        label: "FirstName"
      },
      {
        fieldKey: "lastName",
        label: "LastName"
      }
    ]
  },
  summary: {
    stepKey: "summary",
    fields: [
      {
        fieldKey: "summary",
        label: "Summary",
        componentType: "summary"
      }
    ]
  }
};

export default class Api {
  static getSteps(ProductId: ProductIds) {
    if (ProductId === ProductIds.devIns) {
      return stepsForDev;
    }

    return stepsForDes;
  }
}
