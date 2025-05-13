import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  registed: boolean = false;

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

    this.juegoService.getUsuarios().subscribe({
      next: (response) => {
        const usuarios = response.member;
        const usuario = usuarios.find((u: any) => u.nombre === username && u.contraseña === password);

        if (usuario) {
          this.authService.login({
            nombre: usuario.nombre,
            email: usuario.correo_electronico 
}, false);
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas.');
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        alert('Error al intentar iniciar sesión como usuario.');
      }
    });
  }
}
