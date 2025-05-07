import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private juegoService: JuegosService, private router: Router) {}

  
 

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
          alert('Bienvenido, administrador.');
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas.');
        }
      },
      error: (err) => {
        console.error('Error al obtener los administradores:', err);
        alert('Hubo un error al verificar las credenciales. Intenta de nuevo más tarde.');
      }
    });
  }
}


