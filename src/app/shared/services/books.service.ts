import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook} from '../interfaces/i-book';
import { Observable, delay, map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { IGenre } from '../interfaces/i-genre';
import { AuthService } from './auth-service.service';
import { IAuth } from 'src/app/login/interfaces/i-auth';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  user:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) { 

    this.authService.user$.subscribe((user) => {
      this.user=user;
   });
  }

  private url: string = "../../../../assets/data/books.json";
 
  getBooks(): Observable<IBook[]>{
    return this.http.get<IBook[]>('http://localhost:5000/api/book');
  }

  getBooksAdmin(): Observable<IBook[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IBook[]>('http://localhost:5000/api/book/admin', httpOptions);
  }
 
  getBook(id: number): Observable<IBook>{
    return this.http.get<any>('http://localhost:5000/api/book/'+ id);
    
  }

 
   getBooksByGenres(genreIdsToFind: IGenre[]): Observable<IBook[]> {
      const idsToFind = genreIdsToFind.map(item => item.id);
      
      return this.http.get<IBook[]>('http://localhost:5000/api/book').pipe(
        map((books: IBook[]) => 
        books
          .filter((book: IBook) => 
            book.bookGenres.some(genre => idsToFind.includes(genre.id))
          )
          .sort((a, b) => b.id - a.id)
      )
      );
    
   }

   

   getBooksByName(name:string): Observable<IBook[]> {
     this.loadData()
    return this.http.get<IBook[]>('http://localhost:5000/api/book').pipe(
      map((books: IBook[]) => books.sort((a, b) => b.id - a.id) && books.filter((book: IBook) => book.name.toLocaleLowerCase()=== name || book.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())))
    );
  
  }

 
  getBooksDesec(): Observable<IBook[]>{
    return this.http.get<any>('http://localhost:5000/api/book')
    .pipe(
       map((books:IBook[])=> books.sort((a, b) => b.id - a.id))
    )
  }

  loadData(page: number = 1, itemsPerPage: number = 8): Observable<IBook[]> {
    return this.http.get<IBook[]>('http://localhost:5000/api/book')
    .pipe(
     
      map((items : IBook[]) => items.sort((a, b) => b.id - a.id) &&
          items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      )
    );
  }

  deleteBook(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.delete('http://localhost:5000/api/book/'+id , httpOptions);
  }

  createBook(json:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.post('http://localhost:5000/api/book' , json,  httpOptions);
  }

}
