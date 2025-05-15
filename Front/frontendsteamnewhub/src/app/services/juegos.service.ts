import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Steam } from '../models/response.interface'; 

import { HttpClient } from '@angular/common/http'

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




}

 

  
