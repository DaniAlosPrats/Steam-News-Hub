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
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  hasSearched: boolean = false;
  Back: boolean = false;
  isLoggedIn: boolean = false;

  photo: string = '';

  title1 = ''; description1 = '';
  title2 = ''; description2 = '';
  title3 = ''; description3 = '';
  title4 = ''; description4 = '';
  title5 = ''; description5 = '';
  title6 = ''; description6 = '';

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
        this.title1 = response.appnews.newsitems[0].title;
        this.description1 = response.appnews.newsitems[0].contents;
        this.title2 = response.appnews.newsitems[1].title;
        this.description2 = response.appnews.newsitems[1].contents;
        this.title3 = response.appnews.newsitems[2].title;
        this.description3 = response.appnews.newsitems[2].contents;

        this.products = response.appnews.newsitems;
        this.filteredProducts = [...this.products]; 
      }
    });
  }

  public getResponse2(): void {
    this.service.getResponse2().subscribe({
      next: (response) => { 
        this.title4 = response.appnews.newsitems[0].title;   
        this.description4 = response.appnews.newsitems[0].contents;
        this.title5 = response.appnews.newsitems[1].title;
        this.description5 = response.appnews.newsitems[1].contents;
        this.title6 = response.appnews.newsitems[2].title;
        this.description6 = response.appnews.newsitems[2].contents;

        this.products = response.appnews.newsitems;
        this.filteredProducts =  this.products.slice();
      }
    });
  }

  volver(): void {
    this.hasSearched = false;
    this.appidInput = null;
    this.filteredProducts =  this.products.slice();;
  }

  buscarJuego(): void {
    if (!this.appidInput) {
      this.errorMessage = 'Debes introducir un AppID válido';
      return;
    }

    this.errorMessage = '';
    this.hasSearched = true;

    this.service.getJuego(this.appidInput).subscribe({
  next: (response) => {
    if (response.appnews && response.appnews.newsitems) {
      this.products = response.appnews.newsitems;
    } else {
      this.products = [];
    }

    this.filteredProducts =  this.products.slice();;
    this.photo = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + this.appidInput + '/header.jpg';
  },
  error: () => {
    this.products = [];
    this.filteredProducts = [];
    
  }
});
  }

  searchProducts(): void {
  const term = this.searchTerm.trim().toLowerCase();

  this.filteredProducts = this.products.filter(product =>
    !term ||
    product.title?.toLowerCase().includes(term) ||
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
      likes: false
    };

   
    this.favoritoService.getFavoritos().subscribe((data) => {
      const favoritoExistente = data.member.find((f: any) =>
        f.gameId === event.id_juego.toString() &&
        f.users === `/api/usuarios/${iduser}`
      );

      
        
        this.favoritoService.addFavorito(favoritoData).subscribe({
          next: () => console.log('Agregado a favoritos')
        });
      
    });
  }
}




}