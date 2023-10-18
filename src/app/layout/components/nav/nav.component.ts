import { Component, OnInit } from '@angular/core';
import { INav } from '../../../shared/interfaces/i-nav';
import { NavService } from '../../../shared/services/nav.service';
import { IAuth } from 'src/app/login/interfaces/i-auth';
import { JsonPipe } from '@angular/common';
import { Subscription, switchMap, timer } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  


  nav: INav[]= [];
  user!: IAuth; 
  constructor(private navService: NavService, private authService: AuthService) { }
  

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.navService.getNavUser().subscribe(
          (data) => {
            this.nav = data;
          },
          (err) => {
            console.error('Error: ', err);
          }
        );
  
      } else {
  
         this.navService.getNavUnauthorized().subscribe(
        (data) => {
          this.nav = data;
        },
        (err) => {
          console.error('Error: ', err);
        }
         );
      }
    });
  
  }

  


  

}
