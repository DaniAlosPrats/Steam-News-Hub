import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JuegosService } from '../../services/juegos.service';


@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

    nombre: string = '';
  correo: string = '';

  constructor(
    private juegosService: JuegosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;

  
    this.juegosService.getUsuarios().subscribe({
      next: (data) => {
        const usuarios = data.member;
        const usuario = usuarios.find((u: any) => u.nombre === this.nombre);
        if (usuario) {
          this.correo = usuario.correo_electronico;
        }
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }
}
