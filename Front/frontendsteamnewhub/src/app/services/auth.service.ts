import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(user?.esAdmin || false);
    }
  }

 login(user: any, isAdmin: boolean = false) {
  this.currentUserSubject.next(user);
  this.isLoggedInSubject.next(true);
  this.isAdminSubject.next(isAdmin);
  localStorage.setItem('currentUser', JSON.stringify({ ...user, esAdmin: isAdmin }));
  localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
}

  logout() {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    localStorage.removeItem('currentUser');
  }
}
