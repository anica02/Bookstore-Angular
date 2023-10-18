import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { IOrder } from '../interfaces/i-order';
import { Observable } from 'rxjs';

import { IShowOrder } from '../interfaces/i-show-order';
import { IOrderAdmin } from 'src/app/admin/interfaces/i-order-admin';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  user!: any;
  constructor(private http: HttpClient, private authService: AuthService) { 
   
    this.authService.user$.subscribe((user) => {
       this.user=user;
    });
   
  }

  createOrder(order: IOrder): Observable<any>{
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.post('http://localhost:5000/api/order', order, httpOptions);

  }

  getOrders():Observable<IShowOrder[]>{
    const userId = this.user?.Id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IShowOrder[]>('http://localhost:5000/api/order/' + userId , httpOptions);

  }

  getOrdersAdmin():Observable<IOrderAdmin[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.get<IOrderAdmin[]>('http://localhost:5000/api/order' , httpOptions);
  }

  editOrder(id:number, isActive:boolean):Observable<any>{
    const body={isActive:isActive};
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.put('http://localhost:5000/api/order/'+id , body, httpOptions);
  }
  deleteOrder(id:number):Observable<any>{
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user?.Token}`
      })
    };
    return this.http.delete('http://localhost:5000/api/order/'+id , httpOptions);
  }
}
