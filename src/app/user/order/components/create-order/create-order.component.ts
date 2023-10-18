import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import {IOrder} from 'src/app/shared/interfaces/i-order';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar,
     private route: Router, 
     private orderService: OrderService) { }

  address!:string;
  deliveryMethod!:string;
  paymentMethod!:string;

  deliverys: Select[]=[
    {value:'post office', viewValue:"Post office"},
    {value:'express', viewValue:'Express'}
  ];

  payments: Select[]=[
    {value:'cash', viewValue:"Cash"},
    {value:'credit card', viewValue:'Credit card'}
  ];

  ngOnInit(): void {
  }

  orderForm = new UntypedFormGroup({
    address: new UntypedFormControl('', [Validators.required, Validators.pattern('^[A-Za-zČĆŠĐŽčćšđž\\s]+\\s[\\d]+,\\s[A-Za-z\\s]+\\s[\\d]+$')]),
    deliveryMethod: new UntypedFormControl('', [Validators.required, ]),
    paymentMethod: new UntypedFormControl('', [Validators.required, ]),

  });

  checkForm():void{

    this.address = this.orderForm.get('address')?.value;
    this.deliveryMethod=this.orderForm.get('deliveryMethod')?.value;
    this.paymentMethod=this.orderForm.get('paymentMethod')?.value;

    const order: IOrder={
      address:this.address,
      paymentMethod:this.paymentMethod,
      deliveryMethod:this.deliveryMethod,
      
    }
    console.log(order);

 
  
    this.orderService.createOrder(order).subscribe(
      (response) => {
        this.route.navigate(['/user-orders']);
        console.log('Order created:', response);
      },
      (error) => {
        
        this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
        console.error('Failed:', error);
      }
    );
   
  }

}
