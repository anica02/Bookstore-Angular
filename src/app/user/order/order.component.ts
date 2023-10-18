import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

import {  IOrderItemShow, IShowOrder } from '../../shared/interfaces/i-show-order';

import { OrderService } from '../../shared/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemsDialogComponent } from './components/items-dialog/items-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersShow: IShowOrder[]= [];
  noOrders: boolean = true;

  displayedColumns: string[] = [ 'id', 'address','paymentMethod', 'deliveryMethod', 'createdAt', 'isActive','viewItems'];
  dataSource!: any;



  totalForAll:number=0;

  constructor( private orderService:OrderService, 
    private _snackBar:MatSnackBar,
     private cdr: ChangeDetectorRef, 
     private router: Router,
      private ngZone: NgZone,
      public dialog: MatDialog
     ) { }

    ngOnInit(): void {

      this.orderService.getOrders().subscribe({
        next: data => {
         this.ordersShow=data;
         this.getOrders(this.ordersShow);
        },
        error: err =>{
          console.log(err)
          
        }
      })
    
    }

  getOrders(orders: IShowOrder[]): void {
  
    this.noOrders = orders.length === 0;
    this.dataSource = new MatTableDataSource<IShowOrder>(orders);
    this.cdr.detectChanges();
  }

  openDialog(items: IOrderItemShow[]): void {
    const dialogRef = this.dialog.open(ItemsDialogComponent, {data: items});

  }
  

}
