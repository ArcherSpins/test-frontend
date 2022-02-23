import { UserPersonal, User } from "../types";
import { ProductIds } from "./enums";

export const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: "Developer Insurance",
  [ProductIds.desIns]: "Designer Insurance"
};

export const DefaultUser: User = {
  email: "",
  age: 0
};

export const DefaultUserPersonal: UserPersonal = {
  email: "",
  age: 0,
  firstName: "",
  lastName: ""
};
