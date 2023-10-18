export interface IAuth {
    Email: string;
    Id: number;
    Token: string;
    LoginExpiration: Date;
    RoleName: string;
}
  
export interface TokenResponse {
    token: string;
}