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

 private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  currentUser$ = this.currentUserSubject.asObservable();



  constructor() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (currentUser && currentUser.id) {
    this.isLoggedInSubject.next(true); 
    this.currentUserSubject.next(currentUser); 
  } else {
    this.isLoggedInSubject.next(false); 
  }
}

  updateUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

 login(user: any, isAdmin: boolean = false) {
  const normalizedUser = {
    id: user.id,
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

