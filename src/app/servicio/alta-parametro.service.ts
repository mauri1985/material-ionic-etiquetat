import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parametro } from '../clases/Parametro';

@Injectable({
  providedIn: 'root'
})
export class AltaParametroService {

  constructor(private http: HttpClient) { }

  public AltaParametro(parametro:Parametro){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/altaParametro';
    console.log(parametro);


    return this.http.post(url,parametro,httpOptions);
  }

  public listarParametro(id: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/getValores/' + id;

    return this.http.get(url,httpOptions);
  }
}
