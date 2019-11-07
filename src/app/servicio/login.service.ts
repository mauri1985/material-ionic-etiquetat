import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookies: CookieService) { }
 
 
 
  public isTokenExpired(): boolean {
    let res: boolean = true;
    let token = this.cookies.get("etiquetaT-cookie");
    let tokenJSON = JSON.parse(token);
    if (this.cookies.check("etiquetaT-cookie")) {

      const current_time = Date.now().valueOf() / 1000;
      if (tokenJSON.expires > current_time) {
        res = false;
      }
    }
    return res;
  }

  public setCookie(token: any): void {

    this.cookies.set("etiquetaT-cookie", JSON.stringify(token), 1, "/", "localhost", false);
  }

  public getToken() {
let prueba= JSON.parse(this.cookies.get("etiquetaT-cookie"));
//console.log(prueba);
   return prueba;

  }





  autenticar(email, contrasenia) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const url = 'http://localhost:8080/proyecto-web/rest/login';
    return this.http.post(url, { email, contrasenia }, httpOptions)
  }

}
