import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth-service.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private location:Location, private authService: AuthService) { }

  ngOnInit(): void {
   localStorage.removeItem('user');
     this.authService.removeUser(null);
    this.router.navigate(['/home']);
   
  }

}
