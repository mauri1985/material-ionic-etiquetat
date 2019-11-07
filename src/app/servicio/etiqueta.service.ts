import { Etiqueta } from './../clases/Etiqueta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private http: HttpClient) { }

  public listaretiqueta(publica: boolean, categoria: number, habilitado: boolean, email: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/listarEtiqueta/' + publica + ',' + categoria + ',' + habilitado + ',' + email ;

    return this.http.get(url, httpOptions);
  }
  public altatiqueta(etiqueta: Etiqueta) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const url = 'http://localhost:8080/proyecto-web/rest/crearPlantilla';

    return this.http.post(url, etiqueta, httpOptions);
  }

  public getEtiqueta(id:Number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/findEtiquetaId/'+ id;

    return this.http.get(url, httpOptions);
  }

}
