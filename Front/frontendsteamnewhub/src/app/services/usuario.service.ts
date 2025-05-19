import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Member } from '../models/usuario.response.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(
      'http://127.0.0.1:8000/api/usuarios'
    );
  }
 getAllUsuarios(): Observable<Member[]> {
  return this.http.get<Usuario>('http://127.0.0.1:8000/api/usuarios')
    .pipe(map((response: Usuario) => response.member));
}


  public getUsuarioById(id: number ) {
    return this.http.get<any>(
       `http://127.0.0.1:8000/api/usuarios/${id}`
    );
  }


  public postUsuario(usuario: any): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });
  
    
    const userDataToSend: any = {
      nombre: usuario.member[0].nombre, 
      correoElectronico: usuario.member[0].correoElectronico,
      contraseña: usuario.member[0].contraseña,
    };
  
    return this.http.post<Usuario>(
      'http://127.0.0.1:8000/api/usuarios', 
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
      `http://127.0.0.1:8000/api/usuarios/${id}`,
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
      correoElectronico: usuario.correoElectronico,
      contraseña: usuario.contraseña
    };
  
    return this.http.patch<Member>(
      `http://127.0.0.1:8000/api/usuarios/${id}`,
      userDataToSend,
      { headers }
    );
  }

 editUsuarioById(id: number, userDataToSend: any): Observable<Usuario> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/merge-patch+json',
    'Accept': 'application/ld+json'
  });

  return this.http.patch<Usuario>(
    `http://127.0.0.1:8000/api/usuarios/${id}`,
    userDataToSend,
    { headers }
  );
}

}
