import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IOrderItemShow } from '../../../../shared/interfaces/i-show-order';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.css']
})
export class ItemsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IOrderItemShow[]) { }

  displayedColumns: string[] = [  'name','image', 'price', 'quantity', 'total'];
  dataSource!: any;
 

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<IOrderItemShow>(this.data);
  }

  onClick(): void {
    this.dialogRef.close(true); 
  }

  getTotalCost() {
    return this.dataSource.map((t: { price: any; }) => t.price).reduce((acc: any, value: any) => acc + value, 0);
  }

}
