import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admins.response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  public getAdmins(): Observable<Admin> {
    return this.http.get<Admin>(
      'http://127.0.0.1:8000/api/admins'
    );
  }


  getAdminById(id: number) {
  return this.http.get<any>(
    `http://127.0.0.1:8000/api/admins/${id}`
  );
}

}
