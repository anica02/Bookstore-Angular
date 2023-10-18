import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserDb } from '../../interfaces/i-user-db';

interface Select {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  role!:number;
  isActive!:boolean;
  userId!:number;
  user!:IUserDb;

  constructor(public dialogRef: MatDialogRef<UserEditComponent>,private userService:UsersService, 
      private _snackBar:MatSnackBar,
      private route: Router, 
      @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.userId=this.data;
    this.userService.getUser(this.userId).subscribe({
      next: data => {
        this.user=data;
        this.editForm.get('role')?.setValue(this.user.roleId);
        this.editForm.get('isActive')?.setValue(this.user.isActive);
      },
      error: err =>{
        console.log(err)
        
      }
    })
  }

  roles: Select[]=[
    {value:17, viewValue:"User"},
    {value:18, viewValue:'Admin'}
  ];

  status: Select[]=[
    {value:true, viewValue:"True"},
    {value:false, viewValue:"False"}
  ];

  editForm = new UntypedFormGroup({
    role: new UntypedFormControl('', [Validators.required, ]),
    isActive: new UntypedFormControl('', [Validators.required, ]),

  });
  checkForm():void{
    
    this.role=this.editForm.get('role')?.value;
    this.isActive=this.editForm.get('isActive')?.value;
    console.log(this.editForm.value);
    
    this.userService.editUser(this.userId, this.role, this.isActive).subscribe(
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
