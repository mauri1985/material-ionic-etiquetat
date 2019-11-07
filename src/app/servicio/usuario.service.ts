import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Usuario } from '../clases/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

//private dominio = "http://" + environment.dominio_api;
  constructor(private http: HttpClient) { }

  public RegistroUsuario(usuario:Usuario){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/registroUsuario';
    console.log(usuario);
    
    
    return this.http.post(url,usuario,httpOptions);
  }

  public RegistroUsuarioAdmin(usuario:Usuario){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/altaUsuario';
    console.log(usuario);
    
    
    return this.http.post(url,usuario,httpOptions);
  }

  public cambiarContrasenia(email,contrasenia,nuevaContrasenia){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/cambiarContrasenia';
    
    
    
    return this.http.post(url,{email,contrasenia,nuevaContrasenia},httpOptions);
  }


}
