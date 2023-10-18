import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from 'src/app/login/interfaces/i-auth';
import { ICartItem } from 'src/app/shared/interfaces/i-cart';
import {  ICartDatabase, ICartDatabaseUpdate } from '../interfaces/i-cart-database';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user!: any;
  constructor(private http: HttpClient, private authService: AuthService) { 
   
    
    this.authService.user$.subscribe((user) => {
       this.user=user;
    });
   
  }
  

  createCart(items: ICartItem[]): Observable<any>{
    const body = { cartItems : items };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    
    return this.http.post('http://localhost:5000/api/cart', body, httpOptions);

  }

  getUserCar(): Observable<ICartDatabase>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<ICartDatabase>('http://localhost:5000/api/cart', httpOptions);
  }

  editUserCart(items: ICartDatabaseUpdate, cartId:number):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.put('http://localhost:5000/api/cart/'+ cartId, items, httpOptions);
 
  }

  
}
