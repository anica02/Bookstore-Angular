import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent } from "./components/home-admin/home-admin.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { OrdersAdminComponent } from "./components/orders-admin/orders-admin.component";
import { BooksAdminComponent } from "./components/books-admin/books-admin.component";
import { BoookCreateComponent } from "./components/boook-create/boook-create.component";

const routes: Routes=[
   
     
    {
       path:"",
        component:AdminLayoutComponent,
        children:[
            {
                path:"",
                component:HomeAdminComponent,
                data:{title:"Home"},
            },
            {
                path:"home-admin",
                component:HomeAdminComponent,
                data:{title:"Home"},
            },
            {
                path:"orders-admin",
                component:OrdersAdminComponent,
                data:{title:"Orders"}
            },
            {
                path:"books-admin",
                component:BooksAdminComponent,
                data:{title:"Books"}
            },
            {
                path:"book-create",
                component:BoookCreateComponent,
                data:{title:"Create book form"}
            },
        
        ]
       
    }
    
   
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}