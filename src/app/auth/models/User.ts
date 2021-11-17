export enum UserRole {
  ADMIN = "admin",
  PUBLICATOR = "publicator",
  VIEWER = "viewer",
}

export interface User {
  email: string;
  id?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
