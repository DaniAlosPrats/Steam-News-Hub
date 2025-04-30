import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(public http: HttpClient) { }
  public getResponse(): Observable<any> {
    return this.http.get<any>('https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=420&count=3&maxlength=300&format=json');
    }
    
}
