import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    
   this.authService.isLoggedIn$.subscribe(value => {
  this.isLoggedIn = value;
 
});

this.authService.currentUser$.subscribe(user => {
  this.username = user?.nombre || null;
 
});

    
    this.authService.isAdmin$.subscribe(value => {
      this.isAdmin = value;
     
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}