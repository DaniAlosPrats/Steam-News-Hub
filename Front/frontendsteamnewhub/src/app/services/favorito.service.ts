import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favoritos } from '../models/favoritos.response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Member } from '../models/favoritos.response.interface';


@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private http: HttpClient) { }
  public getFavoritos(): Observable<Favoritos> {
    return this.http.get<Favoritos>(
      'http://localhost:8000/api/favoritos'
    );
  }
  
public getAllFavoritos(): Observable<Favoritos[]> {
  return this.http.get<Favoritos[]>(
    'http://localhost:8000/api/favoritos'
  );
}

  public addFavorito(favorito: any): Observable<Favoritos> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });
  
    const favoritoDataToSend = {
      gameId: favorito.id_juego.toString(), 
      favoritos: favorito.favoritos || false,
      users: favorito.id_usuario
    };
  
    return this.http.post<Favoritos>(
      'http://localhost:8000/api/favoritos',
      favoritoDataToSend,
      { headers }
    );
  }

  deleteFavorito(id: number): Observable<any> {
  return this.http.delete(`http://localhost:8000/api/favoritos/${id}`);
}

updateFavorito(favoritoId: number, favorito: Partial<Member>): Observable<Member> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/merge-patch+json',
    'Accept': 'application/ld+json'
  });

  const favoritoDataToSend = {
    favoritos: favorito.favoritos
  };

  return this.http.patch<Member>(
    `http://localhost:8000/api/favoritos/${favoritoId}`,
    favoritoDataToSend,
    { headers }
  );
}

}
