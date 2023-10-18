import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
 
  private localStorageTimer: any;
  constructor(private authService: AuthService,  private changeDetectorRef: ChangeDetectorRef) { }

  name:string="";
  href:string="";


  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.href = user ? '/logout' : '/login';
      this.name = user ? 'Logout' : 'Login';
    });

  }

  


}
