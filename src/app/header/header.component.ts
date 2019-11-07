import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../servicio/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 mostrar:boolean;
  resp: any;
  constructor(private cookieService:CookieService, private loginService:LoginService) { }

  ngOnInit() {
   if(this.cookieService.get("etiquetaT-cookie")){

      this.mostrar=true;
      this.resp = this.loginService.getToken();
console.log("Estoy aqui");
    };

  }

  cerrarSesion(){
    this.cookieService.delete("etiquetaT-cookie");
    localStorage.removeItem('objetos');
    window.location.reload();
  }

}
