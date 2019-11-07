import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../clases/Producto';


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }
  
  public confirmarPago(pedido:Object[]){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:8080/proyecto-web/rest/guardarProducto';
    console.log(pedido);
    
    
    return this.http.post(url,pedido,httpOptions);
  }

}
