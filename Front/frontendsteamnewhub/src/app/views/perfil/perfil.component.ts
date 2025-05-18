import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AdminService } from '../../services/admin.service';





@Component({
  selector: 'app-perfil',
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nombre: string = '';
  correo: string = '';
  editar: boolean = false;
  esAdmin: boolean = false;
  usuarios: any[] = [];
  usuarioEditandoId: number | null = null;



  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private adminService: AdminService


  ) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
    this.esAdmin = currentUser.esAdmin || false;
    const id = currentUser.id;

    if (this.esAdmin) {
      this.adminService.getAdminById(id).subscribe({
        next: (admin) => {
          this.correo = admin.correoElectronico;
        },
        error: (err) => {
          console.error('Error al obtener datos del admin:', err);
        }
      });

      this.usuarioService.getAllUsuarios().subscribe({
        next: (response: any) => {

          if(Array.isArray(response)) {
            this.usuarios = response;
          } else {
            this.usuarios = [];
          }

        },
        error: (err) => {

          this.usuarios = [];
        }
      });
    } else {
      this.usuarioService.getUsuarioById(id).subscribe({
        next: (usuario) => {
          this.correo = usuario.correoElectronico;
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        }
      });
    }
  }
  public eliminarUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: (response) => {

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);

      }
    });
  }
  public editarUsuario(usuario: any): void {
  if (this.usuarioEditandoId === usuario.id) {
    const updatedUser: any = {
      nombre: usuario.nombre,
      correoElectronico: usuario.correoElectronico
    };


    this.usuarioService.editUsuarioById(usuario.id, updatedUser).subscribe({
      next: () => {
        this.usuarioEditandoId = null;
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert(`Error al actualizar usuario: ${err.message}`);
      }
    });
  } else {
    this.usuarioEditandoId = usuario.id;
  }
}



  public eliminarCuenta(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const iduser = currentUser.id;



    this.usuarioService.deleteUsuario(iduser).subscribe({
      next: (response) => {

        this.authService.logout();

      },
      error: (error) => {
        console.error('Error al eliminar la cuenta:', error);

      }
    });


  }

  public editarCuenta(): void {
    if (this.editar === false) {
      this.editar = true;
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const iduser = currentUser.id;

    const updatedUser = {
      nombre: this.nombre,
      correoElectronico: this.correo,
      contraseña: currentUser.contraseña
    };


    this.usuarioService.editUsuario(iduser, updatedUser).subscribe({
      next: (response) => {

        const updatedUserInfo = {
          ...currentUser,
          nombre: this.nombre,
          correoElectronico: this.correo
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
        this.authService.updateUser(updatedUserInfo);

        this.editar = false;
      },
      error: (error) => {
        console.error('Error al actualizar la cuenta:', error);

      }
    });

  }
}





