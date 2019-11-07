import { Component, OnInit } from '@angular/core';
import { Producto } from '../clases/Producto';
import { Objeto } from '../clases/Objeto';
import { Etiqueta } from '../clases/Etiqueta';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { PagoService } from '../servicio/pago.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
 showAlert: boolean= false;
 showAlertItem: boolean= false;
  montoFinal: string;
  etiqueta = new Etiqueta;
  public payPalConfig?: IPayPalConfig;
  objetosArray = new Array<Etiqueta>();
  
  total: number;


  constructor(private pagoService: PagoService) {

    this.verCarrito();
  }

  ngOnInit() {
    this.total = 0;
    this.initConfig();
    this.calcular2();
  }




  verCarrito() {

    if (localStorage.getItem('objetos') === null) {
      this.showAlertItem=true;
      console.log("Usted no tiene items en el carrito")
    } else {
      this.objetosArray = JSON.parse(localStorage.getItem('objetos'));
      return this.objetosArray;

    }


  }

  quitarPedidoCarrito(etiqueta: Etiqueta) {
    for (let i = 0; i < this.objetosArray.length; i++) {
      if (etiqueta == this.objetosArray[i]) {
        this.objetosArray.splice(i, 1);
        localStorage.setItem("objetos", JSON.stringify(this.objetosArray));
        window.location.reload();
      }

    }
  }


  public calcular2() {

      this.total=0;
    for (var i = 0; i < this.objetosArray.length; i++) {
      var etiqueta = this.objetosArray[i];
      this.total += this.total + etiqueta.monto;
      console.log(this.total);
    }
    return this.total;

  }


  private initConfig(): void {

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ASSl_8BzdjeZYJcncoyzQfYIhBNJrDfHSuB81iz62SrziOB3YDPKXn93ecf02TR1uQ5sW4uCRJUpEszf',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.total.toString(),

            },
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('Transaccion aprobada', data, actions);
        actions.order.get().then(details => {

          this.objetosArray = JSON.parse(localStorage.getItem('objetos'));
          this.pagoService.confirmarPago(this.objetosArray).subscribe(response => {
            
            if(response== true){
              localStorage.removeItem('objetos');
            }
            window.location.reload();
            this.showAlert = true;
          })
          console.log(this.objetosArray);
           

        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },

    };
  }


}
