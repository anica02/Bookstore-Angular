import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ISocialNetworkIcon } from '../interfaces/i-social-network-icon';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkIconsService {

  private url: string = "../../../../assets/data/socialNetworks.json";
  constructor(private http: HttpClient) { }

  getSNIcons(): Observable<ISocialNetworkIcon[]>{
    return this.http.get<ISocialNetworkIcon[]>(this.url);
  }
 
}
