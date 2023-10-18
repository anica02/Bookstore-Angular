import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import {MatListModule} from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    SharedModule
  ]
})
export class BooksModule { }
