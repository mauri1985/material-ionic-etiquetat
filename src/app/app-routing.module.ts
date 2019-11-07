import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { HeaderComponent } from './header/header.component';
import { CambioContraseniaComponent } from './cambio-contrasenia/cambio-contrasenia.component';
import { ImagenesComponent } from './imagenes/imagenes.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'etiqueta', component: EtiquetaComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: 'registro', component: AltausuarioComponent },
  { path: 'cambioContrasenia', component:CambioContraseniaComponent},
  { path: 'app-imagenes', component: ImagenesComponent },
  { path: 'etiqueta', component: EtiquetaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
