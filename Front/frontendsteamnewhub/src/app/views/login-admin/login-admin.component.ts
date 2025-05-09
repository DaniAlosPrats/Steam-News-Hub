import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Router } from '@angular/router';
import { JuegosService } from '../../services/juegos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})


export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(
    private juegoService: JuegosService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    const username = this.username.trim();
    const password = this.password.trim();

    if (!username || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.juegoService.getAdmins().subscribe({
      next: (response) => {
        const admins = response.member;
        const admin = admins.find((a: any) => a.nombre === username && a.contraseña === password);

        if (admin) {
          this.authService.login(admin, true);
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas.');
        }
      },
      error: (err) => {
        console.error('Error al obtener los administradores:', err);
        alert('Hubo un error al verificar las credenciales.');
      }
    });
  }
}
