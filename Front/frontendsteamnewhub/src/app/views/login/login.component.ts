import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
          this.router.navigate(['/home']);
          alert('Bienvenido, administrador.');
          return;
        }

  
        this.juegoService.getUsuarios().subscribe({
  next: (response) => { 
    const usuarios = response.member;
    const usuario = usuarios.find((u: any) => u.nombre === username && u.contrseña === password);
    if (usuario) {
      this.router.navigate(['/home']);
      alert('Bienvenido, usuario.');
      return;
    }
          
      },
      error: (err) => {
        console.error('Error al obtener admins:', err);
        alert('Error al intentar iniciar sesión como admin.');
      }
    });
  }

  });
  
  }
}
