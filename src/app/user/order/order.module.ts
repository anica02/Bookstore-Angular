import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';

import { SharedModule } from '../../shared/shared.module';
import { ItemsDialogComponent } from './components/items-dialog/items-dialog.component';

@NgModule({
  declarations: [
    OrderComponent,
    CreateOrderComponent,  
    ItemsDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],exports:[
    ItemsDialogComponent,
  ]
})
export class OrderModule {}
