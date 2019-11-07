import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//componentes
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { DemoMaterialModule } from '../../material-module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { CambioContraseniaComponent } from './cambio-contrasenia/cambio-contrasenia.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HeaderComponent } from './header/header.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LoginComponent } from './login/login.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    FileSelectDirective,
    EtiquetaComponent,
    AppComponent,
    AltausuarioComponent,
    CambioContraseniaComponent,
    CarritoComponent,
    HeaderComponent,
    ImagenesComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    NgxPayPalModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    DemoMaterialModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
