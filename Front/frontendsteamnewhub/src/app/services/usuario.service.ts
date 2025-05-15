import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Member } from '../models/usuario.response.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(
      'http://localhost:8000/api/usuarios'
    );
  }
  public postUsuario(usuario: any): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });
  
    
    const userDataToSend: any = {
      nombre: usuario.member[0].nombre, 
      correo_electronico: usuario.member[0].correo_electronico,
      contraseña: usuario.member[0].contraseña,
    };
  
    return this.http.post<Usuario>(
      'http://localhost:8000/api/usuarios', 
      userDataToSend, 
      { headers }
    );
  }
  public deleteUsuario(id: number): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });
  
    return this.http.delete<Usuario>(
      `http://localhost:8000/api/usuarios/${id}`,
      { headers }
    );
  }

  
  editUsuario(id: number, usuario: Partial<Member>): Observable<Member> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      'Accept': 'application/ld+json'
    });
  
    const userDataToSend = {
      nombre: usuario.nombre,
      correo_electronico: usuario.correo_electronico,
      contraseña: usuario.contraseña
    };
  
    return this.http.patch<Member>(
      `http://localhost:8000/api/usuarios/${id}`,
      userDataToSend,
      { headers }
    );
  }
}
