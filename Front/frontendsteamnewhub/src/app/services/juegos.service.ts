import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Steam } from '../models/response.interface'; 
import { Admin } from '../models/admins.response.interface';
import { Favoritos } from '../models/favoritos.response.interface';
import { Usuario } from '../models/usuario.response.interface';

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



}