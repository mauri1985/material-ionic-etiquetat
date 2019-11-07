
import { Objeto } from '../clases/Objeto';
import { Categoria } from '../clases/Categoria';
import { ImagenService } from '../servicio/imagen.service';
import { EtiquetaService } from '../servicio/etiqueta.service';
import { Etiqueta } from '../clases/Etiqueta';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { CategoriaService } from '../servicio/categoria.service';
import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';

import { CdkDragDrop, CdkDragEnter, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Point, DragRef } from '@angular/cdk/drag-drop/typings/drag-ref';
import { Item } from './item';
import * as jspdf from 'jspdf';

import { Imagen } from '../clases/Imagen';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import html2canvas from 'html2canvas';
import { delay } from 'q';
import { async } from '@angular/core/testing/testing';
import { AltaParametroService } from '../servicio/alta-parametro.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../clases/Usuario';
import { LoginService } from '../servicio/login.service';
import { CookieService } from 'ngx-cookie-service';
declare var takeSS: any;
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.component.html',
  styleUrls: ['./etiqueta.component.css']
})
export class EtiquetaComponent {
  @Input() heading: string;
  @Input() color: string = '#000105';
  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  public showAlert: boolean = false;
  alertaCarritoOK: boolean=false;
  public show = false;
 public id_para_carrito;
 objetosArray = new Array<Etiqueta>();
  public defaultColors: string[] = [
    '#000105',
    '#ffffff',
    '#3e6158',
    '#3f7a89',
    '#96c582',
    '#b7d5c4',
    '#bcd6e7',
    '#7c90c1',
    '#9d8594',
    '#dad0d8',
    '#4b4fce',
    '#4e0a77',
    '#a367b5',
    '#ee3e6d',
    '#d63d62',
    '#c6a670',
    '#f46600',
    '#cf0500',
    '#efabbd',
    '#8e0622',
    '#f0b89a',
    '#f0ca68',
    '#62382f',
    '#c97545',
    '#c1800b'
  ];
  constructor(private loginService: LoginService, private cookieService: CookieService, private parametroservice: AltaParametroService, private service: CategoriaService, private serviceetiqueta: EtiquetaService, private ImagenService: ImagenService, public dialog: MatDialog) { }

  etiquetaModel= new Etiqueta;
  mytext: String;
  listaImagenes: any;
  listatamanioEtiqueta: any;
  listaCantidad: any;
  listaTipoPapel: any;
  total: number = 0;
  selecionadosoporte: any;
  usuarioModel = new Usuario;
  resp: any;
  imagen: Imagen = new Imagen();
  mailusuariologin: string;
  public uploader: FileUploader;
  etiqueta: Etiqueta;
  objeto: Objeto;
  img: Imagen;
  urlimagen: String;
  mensaje: String;
  
  @Input() largo: number = 25;
  @Input() ancho: number = 150;
  tipofuente: string = 'serif';
  Categoriaselected: number = 50;
  soporteselecionado: any;
  cantidadselecionada: any;
  tipopapelseleccionado: any;
  checked = true;
  checkedLienzo = true;
  mostrar = true;
  listaetiqueta: Etiqueta;
  listacategoria: Categoria;
  listaimagenes: any;
  atrib_etiqueta: Object;
  listaimagenesObjetos: any;
  events: string[] = [];
  opened: boolean;
  title = 'my-proyecto-angular';
  dragRef = { x: 0, y: 0 };
  point = { x: 0, y: 0 };

  constrainPosition: (point: Point, dragRef: DragRef) => Point;

  dragPosition = { x: 0, y: 0 };

  //q: Item;
  pruebpx: string = '0px';
  tipoimagen: String;
  itemselecionado: number;
  lista: Item[] = [];
  lista2: Item[] = [];
  fondo: string;
  imgprevisualizacion: string;
  value: number = 1;
  OpacidadValor: number = 1;
  w: number = 200;
  h: number = 200;
  //show: boolean = false;

  cambioswitch() {
    /*
        this.delay(1000).then(any => {
          this.refrescarlienzos(); this.verr(); this.mensaje = '';
        });*/

    // this.mostrar = true;
    //this.verr();
    console.log(this.checked);
    //checked
    this.refrescarPlantillas();
    this.service.listarCategoria().subscribe((data: Categoria) => this.listacategoria = data);

    //myExtObject.takeSS('cdnimages-hechosdraps', '-a0YyLLRan4sR8EG2K3yNZCFDOM', 'bb7eoqrf');

  }
  mostrarbalor() {
    let inputValue = (<HTMLInputElement>document.getElementById('texto')).value;
    console.log(inputValue);
  }
  verr() {
    takeSS('cdnimages-hechosdraps', '-a0YyLLRan4sR8EG2K3yNZCFDOM', 'bb7eoqrf', document.getElementById('contentToConvert'));

    //  console.log(document.getElementById('texto').value);


    this.delay(8000).then(any => {
      this.mostrarbalor();
    })
    //   angular.element('#texto').val();
    //takeSS(takeSS(cloudinary_name, cloudinary_key, cloudinary_unsigned_preset, main_element){
    /*  let cloudinary_name = 'cdnimages-hechosdraps';
      let cloudinary_key = '-a0YyLLRan4sR8EG2K3yNZCFDOM';
      let cloudinary_unsigned_preset = 'bb7eoqrf';
      let main_element = document.getElementById('contentToConvert');
      main_element = main_element || document.body;
      const imageUrlToBase64 = (url) => fetch(
        `https://get-base64-image.rafaelverger.now.sh/?url=${encodeURIComponent(url)}`
      ).then(res => res.text());

      const _takeSS = () => {
        const elementImages = [].slice.call(
          main_element.querySelectorAll('img'), 0
        ).filter(img => /^http/.test(img.src));
        if (elementImages.length) console.log('replacing images sources by base64 data');
        Promise.all(
          elementImages.map(img => imageUrlToBase64(img.src))
        )
          .then(imagesBase64 => {
            imagesBase64.forEach((content, i) => elementImages[i].src = content);
          }).then(() => {
            console.log('generating canvas...');
            html2canvas(main_element, {
              logging: true,
              allowTaint: false,
              useCORS: true
            }).then((canvas) => {
              var imageData = canvas.toDataURL();
              // exposing image base64 to window context
              window._lastCanvasImage = imageData;
              console.log('uploading image (%d kb)...', imageData.length / 1024);
              var form = new FormData();
              form.append('upload_preset', cloudinary_unsigned_preset);
              form.append('timestamp', (+new Date));
              form.append('api_key', cloudinary_key);
              form.append('file', imageData);
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status === 200) {
                  var result = JSON.parse(xhr.responseText);
                  console.log("Imagem enviada com sucesso: " + result.url);
                } else {
                  console.error(xhr.responseText);
                }
              };
              xhr.open("post", 'https://api.cloudinary.com/v1_1/' + cloudinary_name + '/image/upload');
              xhr.send(form);
            });
          });
      };
      const loadh2c = () => {
        if (!window.h2c041) {
          console.log('downloading dependency:html2canvas...');
          var h2c = document.createElement('script');
          h2c.id = 'h2c041';
          h2c.type = 'text/javascript';
          h2c.src = '//html2canvas.hertzen.com/dist/html2canvas.min.js';
          h2c.onload = function () {
            console.log('dependency:html2canvas completed!');
            _takeSS();
          };
          document.body.appendChild(h2c);
        } else {
          _takeSS();
        }
      };
      loadh2c();*/
  }


  cambioswitchLinezo() {

    this.refrescarlienzos();
  }
  cambioswitchImagen() {
    this.refrescarImagenes();
  }


  refrescarPlantillas() {

    this.serviceetiqueta.listaretiqueta(this.checked, this.Categoriaselected, true, this.mailusuariologin).subscribe((data: Etiqueta) => this.listaetiqueta = data);

  }
  refrescarlienzos() {
    this.tipoimagen = 'Lienzo';
    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Lienzo', this.mailusuariologin).subscribe((data) => this.listaimagenes = data);
  }
  refrescarlienzosImagenes() {

    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Lienzo', this.mailusuariologin).subscribe((data) => this.listaimagenes = data);
    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Imagen', this.mailusuariologin).subscribe((data) => this.listaimagenesObjetos = data);

  }
  refrescarImagenes() {

    this.tipoimagen = 'Imagen';
    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Imagen', this.mailusuariologin).subscribe((data) => this.listaimagenesObjetos = data);
  }
  CambiarFondo(indlie) {

    this.fondo = this.listaimagenes[indlie].enlace;

  }
  AgregarImagen(indObj) {
    let imagencargar;
    imagencargar = {
      id: null,
      imagen: this.listaimagenesObjetos[indObj].enlace,
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      s: 1,
      r: 0,
      texto: null,
      opacidad: 1,
      tamanioLetra: null,
      fuente: null,
      color: null
    }

    this.lista.push(imagencargar);
  }


  ver(ind) {
    this.lista = [];
    let imagencargar;
    let re = 'LIENZO';
    const imagen = 'IMAGEN';
    const texto = 'TEXTO';

    for (let i = 0; i < this.listaetiqueta[ind].SetObjetos.length; i++) {
      //console.log(this.listaetiqueta[ind].SetObjetos[i].tipo);


      if (this.listaetiqueta[ind].SetObjetos[i].tipo == re) {
        this.fondo = this.listaetiqueta[ind].SetObjetos[i].imagen.enlace;
      }
      if (this.listaetiqueta[ind].SetObjetos[i].tipo === imagen) {
        console.log(this.listaetiqueta[ind].SetObjetos[i].imagen.id);
        console.log(this.listaetiqueta[ind].SetObjetos[i].imagen.enlace);
        imagencargar = {
          id: this.listaetiqueta[ind].SetObjetos[i].id,
          imagen: this.listaetiqueta[ind].SetObjetos[i].imagen.enlace,
          x: this.listaetiqueta[ind].SetObjetos[i].coord_x,
          y: this.listaetiqueta[ind].SetObjetos[i].coord_y,
          w: this.listaetiqueta[ind].SetObjetos[i].ancho,
          h: this.listaetiqueta[ind].SetObjetos[i].altura,
          s: this.listaetiqueta[ind].SetObjetos[i].escala,
          r: this.listaetiqueta[ind].SetObjetos[i].rotacion,
          texto: null,
          opacidad: this.listaetiqueta[ind].SetObjetos[i].opacidad,
          tamanioLetra: null,
          fuente: null,
          color: null
        }

        this.lista.push(imagencargar);

      }
      if (this.listaetiqueta[ind].SetObjetos[i].tipo === texto) {
        console.log(this.listaetiqueta[ind].SetObjetos[i].imagen.id);
        console.log(this.listaetiqueta[ind].SetObjetos[i].color);
        imagencargar = {
          id: this.listaetiqueta[ind].SetObjetos[i].id,
          imagen: null,
          x: this.listaetiqueta[ind].SetObjetos[i].coord_x,
          y: this.listaetiqueta[ind].SetObjetos[i].coord_y,
          w: this.listaetiqueta[ind].SetObjetos[i].ancho,
          h: this.listaetiqueta[ind].SetObjetos[i].altura,
          s: this.listaetiqueta[ind].SetObjetos[i].escala,
          r: this.listaetiqueta[ind].SetObjetos[i].rotacion,
          texto: this.listaetiqueta[ind].SetObjetos[i].texto,
          tamanioLetra: this.listaetiqueta[ind].SetObjetos[i].tamanio_letra,
          fuente: this.listaetiqueta[ind].SetObjetos[i].fuente,
          color: this.listaetiqueta[ind].SetObjetos[i].color,
          opacidad: this.listaetiqueta[ind].SetObjetos[i].opacidad
        }

        this.lista.push(imagencargar);

      }

    }

    // this.fondo = listaetiqueta[ind].'assets/imagenes/8.jpg';

    console.log(ind);
  }

  Modificafuente() {
    this.lista[this.itemselecionado].color = this.color;
    this.lista[this.itemselecionado].fuente = this.tipofuente;
    this.lista[this.itemselecionado].w = this.ancho;
    this.lista[this.itemselecionado].h = this.largo;
  }
  AgregarFuente() {



    console.log(this.ancho);
    let imagencargar;
    imagencargar = {
      id: null,
      imagen: null,
      x: 0,
      y: 0,
      w: this.ancho,
      h: this.largo,
      s: 1,
      r: 0,
      texto: 'Escriba su texto',
      tamanioLetra: 0,
      fuente: this.tipofuente,
      color: this.color,
      opacidad: 1

    }

    this.lista.push(imagencargar);
  }
  changePosition() {
    // this.dragPosition = {x: 0, y: 0};
    // this.lista[this.itemselecionado].y =0;
    // this.lista[this.itemselecionado].x =0;
    //  this.point.x = 100;
    //   this.point.y = 100;
    //   this.dragRef.x = 200;
    //    this.dragRef.y = 200;
    //  console.log('hola ' + this.point.x + 'chau ' + this.dragRef.x);
    console.log(this.listacategoria[1].id);

    //this.Categoriaselected = this.listacategoria[1].id;



  }
  changePosition2() {
    // this.dragPosition = {x: 0, y: 0};
    // this.lista[this.itemselecionado].y =0;
    // this.lista[this.itemselecionado].x =0;
    //  this.point.x = 100;
    //   this.point.y = 100;
    //   this.dragRef.x = 200;
    //    this.dragRef.y = 200;
    //  console.log('hola ' + this.point.x + 'chau ' + this.dragRef.x);

    for (let i = 0; i < this.lista2.length; i++) {

      this.lista.push(this.lista2[i]);


    }

  }



  drop(evento: CdkDragMove<any>) {
    console.log('dro');
    //  console.log(evento.pointerPosition.x);
    // console.log(evento.pointerPosition.y);


  }
  eliminar() {
    console.log('dro');
    this.lista.splice(this.itemselecionado, 1);

  }
  agrandar() {
    console.log('+');
    this.lista[this.itemselecionado].s = this.lista[this.itemselecionado].s + 0.1;
  }
  achicar() {
    console.log('-' + this.value);
    this.lista[this.itemselecionado].s = this.value;

    //this.lista[this.itemselecionado].h = this.lista[this.itemselecionado].h - 10 ;


  }
  witch() {

    this.lista[this.itemselecionado].w = this.w;
  }
  hige() {
    this.lista[this.itemselecionado].h = this.h;
  }
  opacidad() {
    console.log('-' + this.OpacidadValor);
    this.lista[this.itemselecionado].opacidad = this.OpacidadValor;

    //this.lista[this.itemselecionado].h = this.lista[this.itemselecionado].h - 10 ;


  }
  Rderecha() {
    console.log('+');
    this.lista[this.itemselecionado].r = this.lista[this.itemselecionado].r - 5;
  }
  Rizquierda() {
    console.log('+');
    this.lista[this.itemselecionado].r = this.lista[this.itemselecionado].r + 5;
  }

  selecionar(numero: number) {
    this.itemselecionado = numero;
    //this.lista.splice(numero, 1);
    console.log('selecionado' + numero);
    this.OpacidadValor = this.lista[this.itemselecionado].opacidad;
    this.value = this.lista[this.itemselecionado].s;
    this.w = this.lista[this.itemselecionado].w;
    this.h = this.lista[this.itemselecionado].h;

  }

  drop3(evento: CdkDragStart<any>, numero: number) {
    //  console.log(evento.pointerPosition.x)
    //  console.log(evento.pointerPosition.y)

    console.log('drop3');
    //console.log(evento.source);
    console.log(numero);
    //console.log(evento.pointerPosition.y)


  }


  drop2(evento: CdkDragEnd<any>, numero: number) {
    // evento.source.element.nativeElement.style.transform = 'translate3d(100px, 100px, 0px)' ;
    // visually reset element to its origin
    // const source: any = evento.source;
    //source._passiveTransform = { x: 100, y: 100 } ;// m
    //evento.source.element.nativeElement.style.translate = 'none';
    // evento.source.element.nativeElement.style.transform = 'translate3d(0,0,0)';
    console.log('traslate');
    console.log(this.lista[numero].w);

    if ((this.lista[numero].x + evento.distance.x) > 0) {
      if ((this.lista[numero].x + evento.distance.x) < (400 - this.lista[numero].w)) {
        this.lista[numero].x = this.lista[numero].x + evento.distance.x;

      } else {
        this.lista[numero].x = (400 - this.lista[numero].w);


      }

    }

    else {
      this.lista[numero].x = 0;
    }




    if ((this.lista[numero].y + evento.distance.y) > 0) {
      if ((this.lista[numero].y + evento.distance.y) < (400 - this.lista[numero].h)) {
        this.lista[numero].y = this.lista[numero].y + evento.distance.y;

      } else {
        this.lista[numero].y = (400 - this.lista[numero].h);

      }
    }

    else {
      this.lista[numero].y = 0;
    }



    console.log(evento.distance.x);
    console.log(evento.distance.y);
    /* this.itemselecionado = numero ;
     console.log(this.itemselecionado);*/
  }
  share5() {
    //this.lista2.push('9.png');

  }


  pepe() {
    console.log('OK!');

  }


  share() {

  }
  share2() {


  }
  share7() {


  }
  share3() {
    this.fondo = 'assets/imagenes/8.jpg';

  }
  share4() {
    this.fondo = 'assets/imagenes/55.gif';

  }
  public captureScreen() {
    window.scroll(0, 0);
    let data = document.getElementById('contentToConvert');
    html2canvas(data, {
      logging: true,
      allowTaint: false,
      useCORS: true
    }).then(canvas => {
      // Few necessary setting options
      let imgWidth = 100;
      let pageHeight = 600;
      let imgHeight = 100;//canvas.height * imgWidth / canvas.width;
      let pageWidtch = 400;
      let heightLeft = imgHeight;


      const contentDataURL = canvas.toDataURL('image/png');
      // $('body').append('<img src="'+contentDataURL+'"/>');


      //window.open(contentDataURL, "toDataURL() image", "width=200, height=200");

      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      /// pdf.text('sadasdasd', 2, 2);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      position = position + pageHeight;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      //  position = position + pageHeight;
      //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF



    });


  }
  ngOnInit() {
   this.id_para_carrito = new Number();
    this.resp = this.cookieService.get("etiquetaT-cookie");
    let tokenJSON = JSON.parse(this.resp);
    this.mailusuariologin=tokenJSON.email;
    let alphas: string[];
    let strin: string;
    //  eti: string[] = new array();
    //pepe: String[] = new array();
    this.service.listarCategoria().subscribe((data: Categoria) => this.listacategoria = data);
    this.parametroservice.listarParametro('TamanioEtiqueta').subscribe((data) => { this.listatamanioEtiqueta = data });
    this.parametroservice.listarParametro('Cantidad').subscribe((data) => { this.listaCantidad = data });
    this.parametroservice.listarParametro('TipoPapel').subscribe((data) => { this.listaTipoPapel = data });

    /*this.parametroservice.listarParametro('TamanioEtiqueta').subscribe(
    data => {

      console.log("User Login: " + data);
      console.log("Bio: " + data);
      console.log("Company: " + data);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        console.log("Server-side error");
      }
    }
);*/

    /*for (let i = 0; i <this.listatamanioEtiqueta.length; i++) {
      console.log(this.listatamanioEtiqueta[i]);



    }*/


    this.serviceetiqueta.listaretiqueta(this.checked, this.Categoriaselected, true, this.mailusuariologin).subscribe((data: Etiqueta) => this.listaetiqueta = data);
    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Lienzo', this.mailusuariologin).subscribe((data) => this.listaimagenes = data);
    this.ImagenService.listarImagen(this.checkedLienzo, this.Categoriaselected, true, 'Imagen', this.mailusuariologin).subscribe((data) => this.listaimagenesObjetos = data);

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/cdnimages-hechosdraps/image/upload`,
      autoUpload: true, // Cargar archivos automáticamente al agregarlos a la cola de carga
      isHTML5: true, // Use xhrTransport a favor de iframeTransport
      removeAfterUpload: true, // Calcule el progreso de forma independiente para cada archivo cargado
      headers: [ // XHR request headers
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    const upsertResponse = fileItem => {
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        console.log('Upload to cloudinary Failed');
        console.log(fileItem);
        this.mensaje = 'Error al  subir Imagen ';
        return false;
      }
      if (fileItem.status == 200) {
      console.log(fileItem);
      console.log(fileItem.data.url);
      this.urlimagen = fileItem.data.url;

      this.imagen.enlace = fileItem.data.url;
      this.imagen.publica = false;//this.checkedLienzo ;
      this.imagen.tipo = this.tipoimagen;
      this.imagen.estado = true;
      this.imagen.email = tokenJSON.email;

      this.imagen.id_categoria = this.Categoriaselected;


      this.ImagenService.altaImagen(this.imagen).subscribe(response => { });
      console.log(JSON.stringify(this.imagen));

      this.mensaje = 'Imagen subida correctamente';
      this.delay(1000).then(any => {
        this.refrescarlienzosImagenes(); this.mensaje = '';
      });
    }
    }

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Agregue el preajuste de carga sin firmar de Cloudinary al formulario de carga
      form.append('upload_preset', 'hechosdraps');
      // Usar el valor predeterminado "withCredentials" para las solicitudes CORS
      fileItem.withCredentials = false;
      return { fileItem, form };
    }

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file, status,
          data: JSON.parse(response),
        }
      );


  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("delay"));
  }


  public changeColor(color: string): void {
    this.color = color;
    this.event.emit(this.color);
    this.show = false;
  }


  /**
   * Change color from input
   * @param {string} color
   */
  public changeColorManual(color: string): void {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.color = color;
      this.event.emit(this.color);
    }
  }

  /**
   * Change status of visibility to color picker
   */
  public toggleColors(): void {
    this.show = !this.show;
  }

  guardar() {
    window.scroll(0, 0);
    this.verr();
    const imagen = 'IMAGEN';
    const texto = 'TEXTO';
    this.etiqueta = new Etiqueta();

    this.etiqueta.objetos = new Array();
    for (let i = 0; i < this.lista.length; i++) {
      this.objeto = new Objeto();
      this.imagen = new Imagen();


      this.objeto.coord_x = this.lista[i].x;
      this.objeto.coord_y = this.lista[i].y;
      this.objeto.color = this.lista[i].color;
      this.objeto.texto = this.lista[i].texto;
      this.objeto.altura = this.lista[i].h;
      this.objeto.ancho = this.lista[i].w;
      this.objeto.rotacion = this.lista[i].r;
      this.objeto.escala = this.lista[i].s;
      this.objeto.tamanio_letra = this.lista[i].tamanioLetra;
      if (this.lista[i].imagen) {
        this.objeto.tipo = 'IMAGEN';
        this.imagen.enlace = this.lista[i].imagen;

        this.objeto.imagen = this.imagen;
      }
      if (this.lista[i].texto) {
        this.objeto.tipo = 'TEXTO';
        this.imagen.enlace = 'http://res.cloudinary.com/cdnimages-hechosdraps/image/upload/v1571829367/imgdraps/oso.png';

        this.objeto.imagen = this.imagen;
      }


      this.objeto.fuente = this.lista[i].fuente;
      this.objeto.opacidad = this.lista[i].opacidad;
      this.etiqueta.objetos.push(this.objeto);

    }
    if (this.fondo) {
      this.objeto = new Objeto();
      this.imagen = new Imagen();
      this.imagen.enlace = this.fondo;

      this.objeto.imagen = this.imagen;
      this.objeto.coord_x = 1;
      this.objeto.coord_y = 1;
      this.objeto.color = '';
      this.objeto.texto = '';
      this.objeto.altura = 1;
      this.objeto.ancho = 1;
      this.objeto.rotacion = 1;
      this.objeto.escala = 1;
      this.objeto.tamanio_letra = 1;
      this.objeto.tipo = 'LIENZO';
      this.objeto.fuente = '';
      this.objeto.opacidad = 1;
      this.etiqueta.objetos.push(this.objeto);

    }

    //this.etiqueta.id = 22;
    this.etiqueta.publica = false;
    this.etiqueta.habilitado = true;
    this.etiqueta.foto_previsualizacion = "http://res.cloudinary.com/cdnimages-hechosdraps/image/upload/v1571829699/imgdraps/graduacion.png";
    this.etiqueta.id_categoria = this.Categoriaselected;
    this.etiqueta.email = this.mailusuariologin;
    //  this.etiqueta.
    // this.objeto.id = 22;

    // this.objeto.etiqueta: Etiqueta;
    // this.objeto.


    this.delay(9000).then(any => {
      let inputValue = (<HTMLInputElement>document.getElementById('texto')).value;
      this.etiqueta.foto_previsualizacion = inputValue;
    })

    console.log(JSON.stringify(this.etiqueta));
    this.delay(13000).then(any => {
      this.serviceetiqueta.altatiqueta(this.etiqueta).subscribe((response:Number) => {
    console.log(response);
      if(response!=null){
        this.show = true;
      }
      this.id_para_carrito=response;
   console.log(this.id_para_carrito);
     
    }); 
      
    })
    //  etiqueta: Imagen = new Imagen();
  }
  CalcularPrecio() {
    console.log(this.cantidadselecionada.clave);
    console.log(this.tipopapelseleccionado.clave);
    console.log(this.selecionadosoporte.clave);
    let cantidad: number = parseFloat(this.cantidadselecionada.valor);
    let tipopapel: number = parseFloat(this.tipopapelseleccionado.valor);
    let soporteselec: number = parseFloat(this.selecionadosoporte.valor);
    
    this.total = (cantidad * soporteselec) * tipopapel;
    console.log(this.total);

  }

  agregarCarrito(){
    console.log(this.id_para_carrito);
    this.serviceetiqueta.getEtiqueta(this.id_para_carrito).subscribe((response:any) => {
    
        console.log(response);
       let etiqueta_carrito:Etiqueta= response;
       if(localStorage.getItem('objetos') === null){
      this.etiquetaModel.id= etiqueta_carrito.id;
      this.etiquetaModel.foto_previsualizacion=etiqueta_carrito.foto_previsualizacion;
      this.etiquetaModel.email=this.mailusuariologin;
      this.etiquetaModel.monto=this.total;
      this.etiquetaModel.cantidad=this.cantidadselecionada.clave;
      this.etiquetaModel.tipo_Papel=this.tipopapelseleccionado.clave;
      this.etiquetaModel.tamanio_Etiqueta=this.selecionadosoporte.clave;
      this.objetosArray.push(this.etiquetaModel);
    
       localStorage.setItem("objetos",JSON.stringify(this.objetosArray));
       }else{
         
         this.objetosArray= JSON.parse(localStorage.getItem('objetos'));
        
         this.etiquetaModel.id= etiqueta_carrito.id;
         this.etiquetaModel.foto_previsualizacion=etiqueta_carrito.foto_previsualizacion;
         this.etiquetaModel.email=this.mailusuariologin;
         this.etiquetaModel.monto=this.total;
         this.etiquetaModel.cantidad=this.cantidadselecionada.clave;
         this.etiquetaModel.tipo_Papel=this.tipopapelseleccionado.clave;
         this.etiquetaModel.tamanio_Etiqueta=this.selecionadosoporte.clave;
         this.objetosArray.push(this.etiquetaModel);
         localStorage.setItem("objetos",JSON.stringify(this.objetosArray));
       }
       window.location.reload();
     
          });
         
        this.alertaCarritoOK=true;
  }
}
