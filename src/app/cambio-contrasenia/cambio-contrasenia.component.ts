import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicio/usuario.service';
import { Usuario } from '../clases/Usuario';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../servicio/login.service';
import * as jwt_decode from 'jwt-decode';
import { TokenDecoded } from '../clases/Token';
@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.css']
})
export class CambioContraseniaComponent implements OnInit {
  usuarioModel = new Usuario;
  showAlertTrue: boolean = false;
  showAlertFalse: boolean = false;
  resp: any;
  constructor(private loginService:LoginService,private cookieService:CookieService,private formBuilder: FormBuilder,private usuarioService: UsuarioService) { }

  get contrasenia(){
    return this.cambiarContraForm.get('contrasenia');
  }

  get contrasenianueva(){
    return this.cambiarContraForm.get('contrasenianueva');
  }

  get contrasenianueva2(){
    return this.cambiarContraForm.get('contrasenianueva2');
  }

  cambiarContraForm= this.formBuilder.group({
    contrasenia:['', Validators.required],
    contrasenianueva:['', Validators.required],
    contrasenianueva2:['', Validators.required]
  });  

  ngOnInit() {
    
 this.resp = this.cookieService.get("etiquetaT-cookie");
 let tokenJSON = JSON.parse(this.resp);
 this.usuarioModel.email=tokenJSON.email;
 
 console.log(tokenJSON.email);

}
   
  cambiarContrasenia(){
    this.usuarioService.cambiarContrasenia(this.usuarioModel.email,this.usuarioModel.contrasenia,this.usuarioModel.nuevaContrasenia).subscribe((response:any) => {
      if(response== true){
        this.showAlertTrue = true;
        console.log("Cambio de contraseña realizado exitosamente");
      }else{
        this.showAlertFalse = true;
        console.log("Error al cambiar la contraseña");
      }
    });
  }

}
