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
  const normalizedUser = {
    nombre: user.nombre || 'Usuario', 
    email: user.email || '',
    esAdmin: isAdmin
  };
  this.currentUserSubject.next(normalizedUser);
  this.isLoggedInSubject.next(true);
  this.isAdminSubject.next(isAdmin);
  localStorage.setItem('currentUser', JSON.stringify(normalizedUser));
}

  logout() {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    localStorage.removeItem('currentUser');
  }
}

