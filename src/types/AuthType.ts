import { RoleType, UserCredentialType } from "./CredentialType";

export interface UserType extends UserCredentialType {
  _id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  role: RoleType | string;
  avatar: string | undefined;
}

export interface RegisterDataType extends Omit<UserType, "role" | "_id"> {}
export interface UpdateUserType {
  _id: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  avatar: string | undefined;
  role: RoleType | string;
  token: string;
}
export interface LoginType {
  error: string;
  loading: boolean;
  createSuccess: boolean;
}

export interface TokenType {
  accessToken: string;
  refreshToken: string;
}
export interface CredentialStateType {
  users: UserType[];
  user: UserType | undefined;
  error: string | undefined;
  loading: boolean;
  token: TokenType | undefined;
  createSuccess: boolean;
}
