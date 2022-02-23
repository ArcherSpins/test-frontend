export interface User {
  email: string;
  age: number;
}

export interface UserPersonal extends User {
  firstName: string;
  lastName: string;
}
