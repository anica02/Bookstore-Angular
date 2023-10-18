import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INav } from '../interfaces/i-nav';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private url: string = "../../../../assets/data/nav.json";
  constructor(private http: HttpClient) { }

  getNav(): Observable<INav[]>{
    return this.http.get<INav[]>(this.url);
  }

  getNavUnauthorized(): Observable<INav[]>{
    return this.http.get<INav[]>(this.url).pipe(
      map((navs:INav[])=> navs.filter(nav=> nav.role ==='unauthorized'))
    )
  }

  getNavUser(): Observable<INav[]>{
    return this.http.get<INav[]>(this.url).pipe(
      map((navs:INav[])=> navs.filter(nav=> nav.role =='unauthorized' || nav.role == 'user'))
    )
  }
}
