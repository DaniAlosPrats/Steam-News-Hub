import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(UsuarioService);
  
signUpForm: FormGroup = this.fb.group({
  nombre: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
});

  registrarUsuario(): void {
    

    const formValue = this.signUpForm.value;

    const usuarioRegistre = {
      member: [
        {
          nombre: formValue.nombre,
          correoElectronico: formValue.email,
          contraseña: formValue.password
        }
      ]
    };

    this.apiService.postUsuario(usuarioRegistre).subscribe({
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

