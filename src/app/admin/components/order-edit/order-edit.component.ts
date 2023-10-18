import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrderAdmin } from '../../interfaces/i-order-admin';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

interface Select {
  value: any;
  viewValue: string;
}


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  isActive!:boolean;
  order!:any;

  status: Select[]=[
    {value:true, viewValue:"True"},
    {value:false, viewValue:"False"}
  ];

  constructor(public dialogRef: MatDialogRef<OrderEditComponent>,
      private orderService:OrderService, 
      private _snackBar:MatSnackBar,
      private route: Router, 
      @Inject(MAT_DIALOG_DATA) public data: IOrderAdmin) { }

  ngOnInit(): void {
    this.order=this.data;
    this.editForm.get('isActive')?.setValue(this.order.isActive);
  }

  editForm = new UntypedFormGroup({
    isActive: new UntypedFormControl('', [Validators.required, ]),
  });

  checkForm():void{
    
  
    this.isActive=this.editForm.get('isActive')?.value;
    console.log(this.editForm.value);
    
    this.orderService.editOrder(this.order.id, this.isActive).subscribe(
      (response) => {
        this.dialogRef.close('success');
      },
      (error) => {
        
        this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
        console.error('Failed:', error);
      }
    );
  }

  onClick(): void {
    this.dialogRef.close(true); 
  }

}
