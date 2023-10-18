import { Component, OnInit } from '@angular/core';
import { SocialNetworkIconsService } from '../../../shared/services/social-network-icons.service';
import { ISocialNetworkIcon } from '../../../shared/interfaces/i-social-network-icon';
import { HttpClient } from '@angular/common/http';
import { INav } from 'src/app/shared/interfaces/i-nav';
import { NavService } from 'src/app/shared/services/nav.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  socialNetworkIcons: ISocialNetworkIcon[]= [];
  nav: INav[]=[];
  constructor(private socialNetworkIconsService: SocialNetworkIconsService, private navService: NavService ) { }
  

  ngOnInit(): void {
    this.socialNetworkIconsService.getSNIcons().subscribe({
      next: data => {
        this.socialNetworkIcons = data
      },
      error: err =>{
        console.log(err)
      }
    })

    this.navService.getNav().subscribe({
      next: data => {
        this.nav = data
      },
      error: err =>{
        console.log(err)
      }
    })
  }

}
