// src/user/user.entity
export interface User {
  email: string;
  name: string;
}

export interface Users {
  users: User[];
}
