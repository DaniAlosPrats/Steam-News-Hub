import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UsuarioService } from '../../services/usuario.service';

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
  private apiService = inject(UsuarioService);
  private adminService = inject(AdminService);
  
signUpForm: FormGroup = this.fb.group({
  nombre: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
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

