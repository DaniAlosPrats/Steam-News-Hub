import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Steam } from '../models/response.interface'; 
import { Admin } from '../models/admins.response.interface';
import { Favoritos } from '../models/favoritos.response.interface';
import { Usuario } from '../models/usuario.response.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  constructor(private http: HttpClient) {}

  public getResponse(): Observable<Steam> {
    return this.http.get<Steam>(
      '/api/ISteamNews/GetNewsForApp/v0002/?appid=420&count=3&maxlength=300&format=json'
    );
  }
  public getResponse2(): Observable<Steam> {
    return this.http.get<Steam>(
      '/api/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json'
    );
}
public getJuego(number: number): Observable<Steam> {
  return this.http.get<Steam>(
    `/api/ISteamNews/GetNewsForApp/v0002/?appid=${number}&count=3&maxlength=300&format=json`
  );
}
public getAdmins(): Observable<Admin> {
  return this.http.get<Admin>(
    'http://localhost:8000/api/admins'
  );
}
public getUsuarios(): Observable<Usuario> {
  return this.http.get<Usuario>(
    'http://localhost:8000/api/usuarios'
  );
}
public getFavoritos(): Observable<Favoritos> {
  return this.http.get<Favoritos>(
    'http://localhost:8000/api/favoritos'
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




}




 

  
