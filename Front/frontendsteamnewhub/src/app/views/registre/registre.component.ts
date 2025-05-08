import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JuegosService } from '../../services/juegos.service'; 

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(JuegosService);

  signUpForm: FormGroup = this.fb.group({
    nombre: [''],
    email: [''],
    password: ['']
  });

  registrarUsuario(): void {
    

    const formValue = this.signUpForm.value;

    const usuarioPayload = {
      member: [
        {
          nombre: formValue.nombre,
          correo_electronico: formValue.email,
          contraseña: formValue.password
        }
      ]
    };

    this.apiService.postUsuario(usuarioPayload).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        alert(`Error en el registro: ${error.message || 'Verifica los datos e intenta de nuevo'}`);
      }
    });
  }
}

