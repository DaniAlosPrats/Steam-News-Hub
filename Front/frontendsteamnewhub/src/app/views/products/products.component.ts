import { Component, OnInit } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductsComponent, CommonModule, FormsModule], // Added FormsModule for ngModel
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = []; 
  filteredProducts: any[] = []; 
  searchTerm: string = ''; 
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
 
  
  searchProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products]; 
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.contents?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}