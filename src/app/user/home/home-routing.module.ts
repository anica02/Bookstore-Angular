import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        component:HomeComponent,
        data: {title:"Home"}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
