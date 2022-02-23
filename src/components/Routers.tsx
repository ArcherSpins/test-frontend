import React from "react";
import { Route, Switch } from "react-router-dom";
import Buyflow from "../buyflow/Buyflow";
import { Welcome } from "./Welcome";
import { ProductIds } from "../constants/enums";
import { INSURANCE_DEV, INSURANCE_DES } from "../constants/routes";

export const Routers = () => {
  return (
    <Switch>
      <Route path={INSURANCE_DEV}>
        <Buyflow productId={ProductIds.devIns} />
      </Route>
      <Route path={INSURANCE_DES}>
        <Buyflow productId={ProductIds.desIns} />
      </Route>
      <Route path="/">
        <Welcome />
      </Route>
    </Switch>
  );
};
