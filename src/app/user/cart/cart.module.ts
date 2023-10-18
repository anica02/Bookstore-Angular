import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule, MatPaginatorModule,MatTableModule, FormsModule,MatButtonModule
  ]
})
export class CartModule { }
