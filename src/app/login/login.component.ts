import { Component, OnInit } from '@angular/core';
import {Usuario} from '../clases/Usuario';
import { LoginService } from '../servicio/login.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

import { TokenDecoded } from 'src/app/clases/Token';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioModel= new Usuario;
  constructor(private loginservice: LoginService, private cookies:CookieService, private router: Router) { }

  ngOnInit() {
    
  }
 
 
 
  autenticar(){
    this.loginservice.autenticar(this.usuarioModel.email, this.usuarioModel.contrasenia).subscribe((response:any) => {
         
   
    let token: TokenDecoded= jwt_decode(response.JWT);
    if(token.email!=null){
     console.log(token);
     this.loginservice.setCookie(token);
     console.log("Login Correcto");
     if(this.cookies.get("etiquetaT-cookie")){
      this.router.navigate(["/home"]);
    }
  
   }else{
    console.log("Usuario no logueado");
   }
     
  });
      
   
  }
}
