import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { ProductsComponent } from './views/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent) },
  { path: 'juegos', loadComponent: () => import('./views/products/products.component').then(m => m.ProductsComponent) },
  { path: 'contact', loadComponent: () => import('./views/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: 'home' }
];
