import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre: string = '';
  password: string = '';
  registed: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    const nombre = this.nombre.trim();
    const password = this.password.trim();

    if (!nombre || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        const usuarios = response.member;
        const usuario = usuarios.find((u: any) => u.nombre === nombre && u.contraseña === password);

        if (usuario) {
          this.authService.login({
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correoElectronico
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
