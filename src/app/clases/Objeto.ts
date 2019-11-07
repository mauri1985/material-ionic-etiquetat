import { Imagen } from './Imagen';
import { Etiqueta } from './Etiqueta';
export class Objeto {
  id: number;
  imagen: Imagen;
  coord_x: number;
  coord_y: number;
  color: string;
  texto: string;
  altura: number;
  ancho: number;
  rotacion: number;
  escala: number;
  tamanio_letra: number;
  tipo: string;
  fuente: string;
  opacidad: number;
  etiqueta: Etiqueta;
}
