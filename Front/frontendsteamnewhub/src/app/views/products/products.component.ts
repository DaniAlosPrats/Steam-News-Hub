import { Component, OnInit } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { CardfavComponent } from '../../components/cardfav/cardfav.component';
import { Favoritos } from '../../models/favoritos.response.interface';
import { FavoritoService } from '../../services/favorito.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductsComponent, CommonModule, FormsModule, CardfavComponent], 
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  appidInput: number | null = null;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  Buscado: boolean = false;
  Back: boolean = false;
  isLoggedIn: boolean = false;

  photo: string = '';

  titulo1 = ''; descripcion1 = '';
  titulo2 = ''; descripcion2 = '';
  titulo3 = ''; descripcion3 = '';
  titulo4 = ''; descripcion4 = '';
  titulo5 = ''; descripcion5 = '';
  titulo6 = ''; descripcion6 = '';

  constructor(
    public service: JuegosService,
    public authService: AuthService,
    public favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });

    this.getResponse();
    this.getResponse2();
  }

  public getResponse(): void {
    this.service.getResponse().subscribe({
      next: (response) => {
        this.titulo1 = response.appnews.newsitems[0].title;
        this.descripcion1 = response.appnews.newsitems[0].contents;
        this.titulo2 = response.appnews.newsitems[1].title;
        this.descripcion2 = response.appnews.newsitems[1].contents;
        this.titulo3 = response.appnews.newsitems[2].title;
        this.descripcion3 = response.appnews.newsitems[2].contents;

        this.productos = response.appnews.newsitems;
        this.productosFiltrados =  this.productos.slice();
      }
    });
  }

  public getResponse2(): void {
    this.service.getResponse2().subscribe({
      next: (response) => { 
        this.titulo4 = response.appnews.newsitems[0].title;   
        this.descripcion4 = response.appnews.newsitems[0].contents;
        this.titulo5 = response.appnews.newsitems[1].title;
        this.descripcion5 = response.appnews.newsitems[1].contents;
        this.titulo6 = response.appnews.newsitems[2].title;
        this.descripcion6 = response.appnews.newsitems[2].contents;

        this.productos = response.appnews.newsitems;
        this.productosFiltrados =  this.productos.slice();
      }
    });
  }

  volver(): void {
    this.Buscado = false;
    this.appidInput = null;
    this.productosFiltrados =  this.productos.slice();;
  }

  buscarJuego(): void {
    if (!this.appidInput) {
      this.errorMessage = 'Debes introducir un AppID válido';
      return;
    }

    this.errorMessage = '';
    this.Buscado = true;

    this.service.getJuego(this.appidInput).subscribe({
  next: (response) => {
    if (response.appnews && response.appnews.newsitems) {
      this.productos = response.appnews.newsitems;
    } else {
      this.productos = [];
    }

    this.productosFiltrados =  this.productos.slice();;
    this.photo = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + this.appidInput + '/header.jpg';
  },
  error: () => {
    this.productos = [];
    this.productosFiltrados = [];
    
  }
});
  }

  searchProducts(): void {
  const term = this.searchTerm.trim().toLowerCase();

  this.productosFiltrados = this.productos.filter(product =>
    !term ||
    product.titulo?.toLowerCase().includes(term) ||
    product.contents?.toLowerCase().includes(term)
  );
}

  addToFavorites(event: { isFavorite: boolean, id_juego: number }): void {
  if (event.isFavorite && this.isLoggedIn) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const iduser = currentUser.id;

    const favoritoData = {
      id_juego: event.id_juego,
      id_usuario: `/api/usuarios/${iduser}`,
      favoritos: true,
    };

   
    this.favoritoService.getFavoritos().subscribe((data) => {
      const favoritoExistente = data.member.find((f: any) =>
        f.gameId === event.id_juego.toString() &&
        f.usuarios === `/api/usuarios/${iduser}`
      );

      
        
        this.favoritoService.addFavorito(favoritoData).subscribe({
          next: () => console.log('Agregado a favoritos')
        });
      
    });
  }
}




}