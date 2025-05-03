import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Steam } from '../models/response.interface'; 

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
}
