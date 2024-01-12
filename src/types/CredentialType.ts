export interface CredentialType {
    access_token: string;
  }
  
export interface UserCredentialType {
    email: string;
    password: string;
}
  
export interface LoginFormStateType extends UserCredentialType {
    showPassword: boolean;
    name: string;
}
  
  export type RoleType = "customer" | "admin" 
  
  export type RightType = {
    [key: string]: boolean;
  };
  
  export type RightTypes = {
    [key: string]: RightType;
  };
  