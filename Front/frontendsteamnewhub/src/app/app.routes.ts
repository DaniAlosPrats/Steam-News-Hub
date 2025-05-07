import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { ProductsComponent } from './views/products/products.component';
import { LoginComponent } from './views/login/login.component';
import { RegistreComponent } from './views/registre/registre.component';
import { LoginAdminComponent } from './views/login-admin/login-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'juegos', component: ProductsComponent },
  {  path: 'login', component: LoginComponent },
  { path: 'register', component: RegistreComponent },
  { path : 'login-admin', component: LoginAdminComponent },


];
