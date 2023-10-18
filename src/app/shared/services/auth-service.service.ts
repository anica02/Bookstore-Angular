import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuth } from 'src/app/login/interfaces/i-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private userSubject: BehaviorSubject<IAuth | null> = new BehaviorSubject<IAuth | null>(null);
  user$: Observable<IAuth | null> = this.userSubject.asObservable();

  constructor() {
    // Initialize the service by checking localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as IAuth;
      this.setUser(user);
    }
  }

  ngOnInit() {
  
  }

  setUser(user: IAuth | null) {
    this.userSubject.next(user);
    // Store user data in localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  getUser(): IAuth | null {
    return this.userSubject.value;
  }

  removeUser(user: IAuth | null): void {
    this.setUser(user);
  }
}
