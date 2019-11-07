
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Categoria} from '../clases/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public listarCategoria(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/listaCategoria';

    return this.http.get(url,httpOptions);
  }

  public altaCategoria(categoria:Categoria){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/altaCategoria';

    return this.http.post(url,categoria,httpOptions);
  }
}
