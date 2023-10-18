import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BookRowComponent } from './components/book-row/book-row.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../../app.component';

@NgModule({
  declarations: [
    HomeComponent,
   CarouselComponent,
   BookRowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    LayoutModule,
    NgbModule,

    
  ],
  bootstrap:[AppComponent]
})
export class HomeModule { }
