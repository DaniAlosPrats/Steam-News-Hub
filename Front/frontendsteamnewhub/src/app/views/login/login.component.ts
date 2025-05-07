import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public service: JuegosService) {}

  ngOnInit(): void {
    this.getAdmins();
    this.getUsuarios();
  }

  public getAdmins(): void {
    this.service.getAdmins().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
      }
    });
  }
  public getUsuarios(): void {
    this.service.getUsuarios().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching usuarios:', error);
      }
    });
  }

}
