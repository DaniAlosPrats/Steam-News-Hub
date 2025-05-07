import { Component, OnInit } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductsComponent, CommonModule, FormsModule], 
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
  Back : boolean = false;
 
  photo: string = '';

  title1 : string = '';
  description1 : string = '';
  title2 : string = '';
  description2 : string = '';
  title3 : string = '';
  description3 : string = '';
  title4 : string = '';
  description4 : string = '';
  title5 : string = '';
  description5 : string = '';
  title6 : string = '';
  description6 : string = '';

  constructor(public service: JuegosService) {}

  ngOnInit(): void {
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
      },
      
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
        this.filteredProducts = [...this.products]; 
      },
      
    });
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
        this.products = response.appnews.newsitems || [];
        this.filteredProducts = [...this.products];
        this.photo = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + this.appidInput + '/header.jpg'
      },
      error: () => {
        this.errorMessage = 'No se pudo obtener información del juego.';
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  searchProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.title?.toLowerCase().includes(term) ||
      product.contents?.toLowerCase().includes(term)
    );
  }
  
}