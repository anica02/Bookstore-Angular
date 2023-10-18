import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  registerUser(username:string, password:string, firstName:string, lastName:string,email:string) : Observable<any>{
    const body = { username, password, firstName, lastName, email };
    return this.http.post('http://localhost:5000/api/user', body);

  }
}
