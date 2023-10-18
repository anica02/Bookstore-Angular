import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, TokenResponse } from '../interfaces/i-auth';
import { Observable, catchError, switchMap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

 
  
 
  getToken(email: string, password: string): Observable<IAuth | null> {
    const body = { email, password };

    return this.http.post<TokenResponse>('http://localhost:5000/api/auth', body).pipe(
      catchError((error : any) => {
        console.error('Authentication failed:', error);
        return of(null);
      }),
      map((response: TokenResponse | null) => {
        if (!response || !response.token) {
          return null;
        }

        const claims = this.parseJwt(response.token);

        const mail = claims['Email'];
        const userId = claims['Id'];
        const exp = claims['exp'];
        const roleName = claims['Role'];
        const expirationDate = new Date(+exp * 1000);

        const user: IAuth = {
          Email: mail,
          Id: +userId,
          Token: response.token,
          LoginExpiration: expirationDate,
          RoleName: roleName,
        };

        return user; 
      })
    );
  }
     
  private parseJwt(token: string): { [key: string]: string } {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }


}
