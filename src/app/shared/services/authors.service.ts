import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../interfaces/i-author';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  user:any;
  constructor(

    private http: HttpClient,
    private authService: AuthService

  ) {

    this.authService.user$.subscribe((user) => {
      this.user=user;
   });
   }


  
  getAuthors(): Observable<IAuthor[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IAuthor[]>("http://localhost:5000/api/author", httpOptions);
  }

  getAuthor(id: number): Observable<IAuthor>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IAuthor>("http://localhost:5000/api/author/"+id, httpOptions);
  
  }

}
