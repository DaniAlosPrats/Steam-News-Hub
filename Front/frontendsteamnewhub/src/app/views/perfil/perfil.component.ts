import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JuegosService } from '../../services/juegos.service';
import { FormsModule } from '@angular/forms';





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
          console.log('correo encontrado:', this.correo);
        }
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

  public eliminarCuenta(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const iduser= currentUser.id;

    

    this.juegosService.deleteUsuario(iduser).subscribe({
      next: (response) => {
        console.log('Cuenta eliminada:', response);
        this.authService.logout();
       
      },
      error: (error) => {
        console.error('Error al eliminar la cuenta:', error);
        alert('Error al eliminar la cuenta. Inténtalo de nuevo más tarde.');
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
    correo_electronico: this.correo,
    contraseña: currentUser.contraseña
  };

  this.juegosService.editUsuario(iduser, updatedUser).subscribe({
    next: (response) => {
      console.log('Cuenta actualizada:', response);
    

       const updatedUserInfo = {
        ...currentUser,  
        nombre: this.nombre,
        correo_electronico: this.correo
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
       this.authService.updateUser(updatedUserInfo);

      this.editar = false;
    },
    error: (error) => {
      console.error('Error al actualizar la cuenta:', error);
      alert('Error al actualizar la cuenta. Inténtalo de nuevo más tarde.');
    }
  });
}

}
