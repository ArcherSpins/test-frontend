import React, { useCallback, useState } from "react";
import { DefaultUser, DefaultUserPersonal } from "../constants/constants";
import { ProductIds } from "../constants/enums";
import { User, UserPersonal } from "../types";
import { useInsuranceContext } from "./InsuranceProvider";

const UserContext = React.createContext<{
  user: User | UserPersonal;
  setUser: (user: User | UserPersonal) => void;
  updateUser: (field: string, value: string | number) => void;
}>({
  user: DefaultUser,
  setUser: (user) => {},
  updateUser: (field: string, value: string | number) => {}
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const { insurance } = useInsuranceContext();
  const defaultUsers = {
    [ProductIds.devIns]: DefaultUser,
    [ProductIds.desIns]: DefaultUserPersonal
  };
  const [state, setState] = useState(defaultUsers[insurance]);

  const updateUser = useCallback(
    (field: string, value: string | number) => {
      setState({
        ...state,
        [field]: value
      });
    },
    [state, setState]
  );

  const setUser = useCallback(
    (user) => {
      setState(user);
    },
    [setState]
  );

  const value = { user: state, updateUser, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserContext };
