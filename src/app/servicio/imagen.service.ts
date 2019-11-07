import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Imagen } from '../clases/Imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }

  public listarTipoImagen() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/listarTipoImagen';

    return this.http.get(url, httpOptions);
  }

  public altaImagen(imagen: Imagen) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const url = 'http://localhost:8080/proyecto-web/rest/altaImagen';

    return this.http.post(url, imagen, httpOptions);
  }

  public listarImagen(publica: boolean, categoria: number, habilitado: boolean, tipo: string, email: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/listarImagen/' + publica + ',' + categoria + ',' + habilitado + ',' + tipo + ',' + email;

    return this.http.get(url, httpOptions);
  }


}
