import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Verificar si hay un usuario guardado en localStorage al iniciar
    this.checkLocalStorage();
  }

  // Método para verificar si hay datos de sesión guardados
  private checkLocalStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (userStr) {
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(isAdmin);
    }
  }

  login(isAdmin: boolean = false) {
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(isAdmin);
    // Guardar estado de admin en localStorage
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    // Limpiar localStorage al cerrar sesión
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  }

  // Método auxiliar para obtener el usuario actual desde localStorage
  getCurrentUser(): any | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}