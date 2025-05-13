import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { ProductsComponent } from './views/products/products.component';
import { LoginComponent } from './views/login/login.component';
import { RegistreComponent } from './views/registre/registre.component';
import { LoginAdminComponent } from './views/login-admin/login-admin.component';
import { PoliticaPrivacidadComponent } from './views/politica-privacidad/politica-privacidad.component';
import { PoliticaCookiesComponent } from './views/politica-cookies/politica-cookies.component';
import { AccesibilidadComponent} from './views/accesibilidad/accesibilidad.component';
import { AvisoLegalComponent } from './views/aviso-legal/aviso-legal.component';
import { PerfilComponent } from './views/perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'juegos', component: ProductsComponent },
  {  path: 'login', component: LoginComponent },
  { path: 'register', component: RegistreComponent },
  { path : 'login-admin', component: LoginAdminComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  {path: 'politica-cookies', component: PoliticaCookiesComponent},
  {path: 'accesibilidad', component: AccesibilidadComponent},
  {path: 'aviso-legal', component: AvisoLegalComponent},
  {path: 'perfil', component: PerfilComponent},



];
