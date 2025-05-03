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

  constructor(public service: JuegosService) {}

  ngOnInit(): void {
    this.getResponse();
  }

  public getResponse(): void {
    this.service.getResponse().subscribe({
      next: (response) => {
        console.log('Full response:', response);
        console.log('Appnews:', response.appnews);
        console.log('Newsitems:', response.appnews.newsitems);
        
        
        this.products = response.appnews.newsitems;
        this.filteredProducts = [...this.products]; 
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
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