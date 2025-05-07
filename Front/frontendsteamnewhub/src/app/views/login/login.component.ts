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
     
      this.juegoService.getAdmins().subscribe({
        next: (response) => console.log('Admins:', response),
        error: (err) => console.error('Error al obtener admins:', err)
      });
      
    
  
     
      this.juegoService.getUsuarios().subscribe({
        next: (response) => console.log('Usuarios:', response),
        error: (err) => console.error('Error al obtener usuarios:', err)
      });
    }

  }
  

