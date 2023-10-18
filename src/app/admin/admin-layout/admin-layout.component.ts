import { Component, OnInit } from '@angular/core';
import { INav } from 'src/app/shared/interfaces/i-nav';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }
  nav: INav[]=[
    {
      href:"/books-admin",
      text:"Books",
      role:"admin"
    },
    {
      href:"/orders-admin",
      text:"Orders",
      role:"admin"
    },
    {
      href:"/logout",
      text:"Logout",
      role:"admin"
    },

  ]
  ngOnInit(): void {
  }

}
