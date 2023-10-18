import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, 
    private router:Router,
    private location: Location,
    private authService: AuthService) { }
    
  email:string="";
  password:string="";
 
  
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('',[Validators.required])
  });

  ngOnInit(): void {

   
  }

  checkForm(): void{

    this.email = this.loginForm.get('email')?.value;
    this.password=this.loginForm.get('password')?.value;
    this.loginService.getToken(this.email,this.password).subscribe((user)=>{
      if(user){

       localStorage.setItem('user', JSON.stringify(user));
    
        this.authService.setUser(user);
 
        console.log('Good', user);
       
         if(user.RoleName=="user"){
          this.router.navigate(['/home']);
         }else if(user.RoleName=="admin"){
          this.router.navigate(['/admin']);
         }
        
       
      }else{
        console.error('Error');
      }
    })
  }

}
