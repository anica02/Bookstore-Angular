import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenre } from '../interfaces/i-genre';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private http: HttpClient
  ) { }

  
  getGenres(): Observable<IGenre[]>{
    return this.http.get<IGenre[]>('http://localhost:5000/api/genre');
  }

  getGenre(id: number): Observable<IGenre>{
    return this.http.get<any>('http://localhost:5000/api/genre/'+ id);
    
  }

   

}
