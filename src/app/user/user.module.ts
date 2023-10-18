import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutModule } from './about/about.module';
import { BooksModule } from './books/books.module';
import { HomeModule } from './home/home.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HomeModule,
    BooksModule,
    AboutModule,
    CartModule,
    OrderModule,
    MatButtonModule
  ]
})
export class UserModule { }
