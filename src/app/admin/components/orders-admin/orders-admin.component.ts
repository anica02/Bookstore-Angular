import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrderAdmin, IOrderItemShow } from '../../interfaces/i-order-admin';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsDialogComponent } from 'src/app/user/order/components/items-dialog/items-dialog.component';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IShowOrder } from 'src/app/shared/interfaces/i-show-order';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  constructor(private orderService:OrderService,
    private _snackBar:MatSnackBar,
   private cdr: ChangeDetectorRef, 
   private router: Router, 
   private ngZone: NgZone,
   public dialog: MatDialog) { }

   ordersShow: IOrderAdmin[]= [];
   noOrders: boolean = true;
 
   displayedColumns: string[] = [ 'id', 'userId','address','paymentMethod', 'deliveryMethod', 'createdAt', 'isActive','viewItems', 'edit', 'delete'];
   dataSource!: any;

   totalForAll:number=0;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrdersAdmin().subscribe({
      next: data => {
       this.ordersShow=data;
       this.noOrders = data.length === 0;
       this.dataSource = new MatTableDataSource<IOrderAdmin>(data);
       this.cdr.detectChanges();
      },
      error: err =>{
        console.log(err)
        
      }
    })
  
  }
  deleteOrder(id:number):void{

    this.orderService.deleteOrder(id).subscribe(
      (response) => {
       
        this._snackBar.open('Order deleted', 'Close');
        this.ordersShow =this.ordersShow.filter(item => item.id !== id);
          this.dataSource=new MatTableDataSource<IShowOrder>(this.ordersShow);
          this.cdr.detectChanges();
      },
      (error) => {
        console.error('Failed:', error);
        this._snackBar.open("Data conflict", "Close");
      }
    );
  }

  openConfirmationDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteOrder(id);
      } 
    });
  }
  openDialogItems(items: IOrderItemShow): void {

    const dialogRef = this.dialog.open(ItemsDialogComponent, {data: items});
   
  }

  openDialogEdit(item: IOrderAdmin): void {
    
    const dialogRef = this.dialog.open(OrderEditComponent, {data: item});
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getOrders();
      }
    });
  }

}
