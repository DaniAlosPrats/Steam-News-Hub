import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAdmin$.subscribe(value => this.isAdmin = value);
    this.authService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
      const userString = localStorage.getItem('currentUser');
      this.username = value && userString ? JSON.parse(userString)?.nombre || null : null;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
