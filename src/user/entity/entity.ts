// src/user/user.entity
export interface User {
  email: string;
  fullName: string;
}

export interface Users {
  users: User[];
}
