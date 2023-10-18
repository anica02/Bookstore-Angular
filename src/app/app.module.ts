import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './user/home/home.module';
import { BooksModule } from './user/books/books.module';
import { MatTableModule } from '@angular/material/table';

import { AboutComponent } from './user/about/about.component';
import { AboutModule } from './user/about/about.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NavComponent } from './layout/components/nav/nav.component';
import { BookDetailsComponent } from './user/book-details/book-details.component';
import { ListingPipe } from './shared/pipes/listing.pipe';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginModule } from './login/login.module';
import { LogoutComponent } from './login/components/logout/logout.component';

import { RegisterModule } from './register/register.module';

import { AuthGuard } from './login/components/auth-guard/auth-guard.component';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    BookDetailsComponent,
    ListingPipe,
    LogoutComponent,

   


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
   
    LayoutModule,
    MatListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    LoginModule,
    RegisterModule, 
    AdminModule,
    UserModule
  
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
