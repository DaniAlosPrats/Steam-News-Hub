import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {
    // Verificar si hay datos de sesión guardados
    this.checkLocalStorage();
  }

  private checkLocalStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (userStr) {
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(isAdmin);
    }
  }

  login(user: any, isAdmin: boolean = false) {
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(isAdmin);

    // Guardar información del usuario y el estado de admin en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);

    // Limpiar localStorage al cerrar sesión
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  }

  getCurrentUser(): any | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}
