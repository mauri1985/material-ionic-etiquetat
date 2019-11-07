import { Component, OnInit } from '@angular/core';
import { Imagen } from '../clases/Imagen';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Objeto } from '../clases/Objeto';
import { Categoria } from '../clases/Categoria';
import { ImagenService } from '../servicio/imagen.service';
import { EtiquetaService } from '../servicio/etiqueta.service';
import { Etiqueta } from '../clases/Etiqueta';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../servicio/categoria.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {
  listaimagenesObjetos: any;
  listaimagenes: any;
  listaetiqueta: Etiqueta;
  mensaje: String;
  lista: any;
  imagen: Imagen = new Imagen();
  public uploader: FileUploader;
  listacategoria: Categoria;
  urlimagen: string;
  Categoriaselected: number = 50;
  tiposelecion: string = "Lienzo";
  checkedLienzo = true;
  tipoimagen: string;
  checked = true;
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("delay"));
  }
  refrescarImagenes() {

    this.ImagenService.listarImagen(true, this.Categoriaselected, this.checkedLienzo, this.tiposelecion, 'e').subscribe((data) => this.listaimagenesObjetos = data);
  }
  cambioswitchImagen() {
    this.refrescarImagenes();
  }
  constructor(private ImagenService: ImagenService, private service: CategoriaService, private serviceetiqueta: EtiquetaService, public dialog: MatDialog) { }


  ngOnInit() {
    //this.service.listarTipoImagen().subscribe(data => this.lista = data);
    this.service.listarCategoria().subscribe((data: Categoria) => this.listacategoria = data);

    this.ImagenService.listarImagen(true, this.Categoriaselected, this.checkedLienzo, this.tiposelecion, 'e').subscribe((data) => this.listaimagenes = data);
    this.ImagenService.listarImagen(true, this.Categoriaselected, this.checkedLienzo, this.tiposelecion, 'e').subscribe((data) => this.listaimagenesObjetos = data);

    const uploaderOptions: FileUploaderOptions = {

      url: `https://api.cloudinary.com/v1_1/cdnimages-hechosdraps/image/upload`,
      autoUpload: false, // Cargar archivos automáticamente al agregarlos a la cola de carga
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
        return false;
      }

      console.log(fileItem);
      console.log(this.uploader.queue.length);
      console.log(fileItem.data.url);

      this.urlimagen = fileItem.data.url;

      this.imagen.enlace = fileItem.data.url;
      this.imagen.publica = true;
      this.imagen.tipo = this.tiposelecion;
      this.imagen.estado = this.checkedLienzo;
      this.imagen.email = 'administrador@gmail.com';

      this.imagen.id_categoria = this.Categoriaselected;


      this.ImagenService.altaImagen(this.imagen).subscribe(response => { });
      console.log(JSON.stringify(this.imagen));
      if (this.uploader.queue.length == 0) {
        console.log('termine');
        this.mensaje = 'Imagenes subida correctamente';
        this.delay(1000).then(any => {
          this.refrescarImagenes(); this.mensaje = '';
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


  guardar() {

    // this.service.altaImagen(this.imagen).subscribe(response => {});
  }

}
