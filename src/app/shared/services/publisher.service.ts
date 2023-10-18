import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPublisher } from '../interfaces/i-publisher';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  user:any;
  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) {

    this.authService.user$.subscribe((user) => {
      this.user=user;
   });
   }


  
  getPublishers(): Observable<IPublisher[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IPublisher[]>("http://localhost:5000/api/publisher", httpOptions);
  }

  getPublisher(id: number): Observable<IPublisher>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<any>("http://localhost:5000/api/author/"+id, httpOptions);
    
  }
}
