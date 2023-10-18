import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { SharedModule } from '../shared/shared.module';
import { BooksAdminComponent } from './components/books-admin/books-admin.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { BoookCreateComponent } from './components/boook-create/boook-create.component';



@NgModule({
  declarations: [
    HomeAdminComponent,
    BooksAdminComponent,
    OrdersAdminComponent,
    UserEditComponent,
    OrderEditComponent,
    BoookCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    SharedModule
  ]
})
export class AdminModule { }
