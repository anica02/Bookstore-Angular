import { Injectable } from '@angular/core';
import { IUserDb } from '../interfaces/i-user-db';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:any;
  constructor(private http: HttpClient, private authService: AuthService) {

    this.authService.user$.subscribe((user) => {
      this.user=user;
   });
   }

  
  getUsers(): Observable<IUserDb[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IUserDb[]>('http://localhost:5000/api/user', httpOptions);
  }

  getUser(id:number): Observable<IUserDb>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IUserDb>('http://localhost:5000/api/user/'+id, httpOptions);
  }

  deleteUser(id:number):Observable<any>{
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.delete('http://localhost:5000/api/user/'+id, httpOptions);
  }

  editUser(id:number, role:number, isActive:boolean):Observable<any>{
    const body={
      isActive: isActive,
      roleId: role
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.put('http://localhost:5000/api/user/'+id,body, httpOptions);
  }
}
