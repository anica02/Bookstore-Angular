import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { BooksComponent } from './user/books/books.component';
import { AboutComponent } from './user/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BookDetailsComponent } from './user/book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './user/cart/cart.component';
import { AuthGuard } from './login/components/auth-guard/auth-guard.component';
import { OrderComponent } from './user/order/order.component';
import { CreateOrderComponent } from './user/order/components/create-order/create-order.component';

const routes: Routes = [
  
  {
    path: "",
     component: LayoutComponent,
     children:[
      {
        path:"",
        pathMatch: "full",
        component:HomeComponent,
        data:{title:"Home"},
       
      },
      {
        path:"home",
        pathMatch: "full",
        data:{title:"Home"},
        component:HomeComponent
      },
      {
        path:"books",
        pathMatch: "full",
        component:BooksComponent,
        data:{title:"Books"}
      },
      {
        path:"about",
        pathMatch: "full",
        component:AboutComponent,
        data:{title:"About"}
      },
      {
        path: "bookDetails/:id",
        component: BookDetailsComponent,
        data:{title:"Book details"}
      },
      {
        path: "login",
        component: LoginComponent,
        data:{title:"Login"}
      },
      {
        path: "logout",
        component: LogoutComponent
       
      },
      {
        path: "register",
        component: RegisterComponent,
        data:{title:"Register"}
      },
      {
        path: "cart",
        component: CartComponent,
        data:{title:"Cart"},
        canActivate: [AuthGuard]
      },
      {
        path: "user-orders",
        component: OrderComponent,
        data:{title:"Orders"},
        canActivate: [AuthGuard]
      },
      {
        path: "create-order",
        component: CreateOrderComponent,
        data:{title:"Order form"},
        canActivate: [AuthGuard]
      },
     ]
  },
  {
    path:"admin",
    loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
