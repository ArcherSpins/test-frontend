import React, { useCallback, useState } from "react";
import { ProductIds } from "../constants/enums";

const InsuranceContext = React.createContext<{
  insurance: ProductIds;
  setInsurance: (id: ProductIds) => void;
}>({
  insurance: ProductIds.devIns,
  setInsurance: (id: ProductIds) => {}
});

function InsuranceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(ProductIds.devIns);

  const setInsurance = useCallback(
    (id: ProductIds) => {
      if (id === state) {
        return;
      }

      setState(id);
    },
    [state, setState]
  );

  const value = { insurance: state, setInsurance };

  return (
    <InsuranceContext.Provider value={value}>
      {children}
    </InsuranceContext.Provider>
  );
}

function useInsuranceContext() {
  const context = React.useContext(InsuranceContext);
  if (context === undefined) {
    throw new Error("useInsurance must be used within a InsuranceProvider");
  }
  return context;
}

export { InsuranceProvider, useInsuranceContext };
