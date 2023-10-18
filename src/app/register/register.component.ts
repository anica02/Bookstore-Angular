import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterService } from './services/register.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IError } from '../shared/interfaces/i-error';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService,  private _snackBar:MatSnackBar, private route: Router) { }
  
  username!:string;
  firstName!:string;
  lastName!:string;
  email!:string;
  password!:string;
  errors:IError[]=[];

  registerForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9_]{7,29}$') ]),
    firstName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[A-ZĆČĐŽŠ]{1}[a-zćčđžš]{2,15}(\\s[A-ZČĆŠĐŽ]{1}[a-zčćšđž]{2,15})*$')]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[A-ZĆČĐŽŠ]{1}[a-zćčđžš]{2,15}(\\s[A-ZČĆŠĐŽ]{1}[a-zčćšđž]{2,15})*$')]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('',[Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void {
  }

  checkForm():void{

    this.email = this.registerForm.get('email')?.value;
    this.password=this.registerForm.get('password')?.value;
    this.username=this.registerForm.get('username')?.value;
    this.firstName=this.registerForm.get('firstName')?.value;
    this.lastName=this.registerForm.get('lastName')?.value;
    console.log(this.registerForm.value);

    this.registerService.registerUser(this.username, this.password,this.firstName,this.lastName, this.email).subscribe(
      (response) => {
        this.route.navigate(['\login']);
    
        console.log('Registration successful:', response);
      },
      (error) => {
        
        this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
        console.error('Registration failed:', error);
      }
    );
   
  }
}
