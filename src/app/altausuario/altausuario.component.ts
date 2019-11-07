import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/Usuario';
import { UsuarioService } from '../servicio/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css']
})
export class AltausuarioComponent implements OnInit {

  usuarioModel = new Usuario;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }
  
  get nombre(){
    return this.registerForm.get('nombre');
  }

  get apellido(){
    return this.registerForm.get('apellido');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get contrasenia(){
    return this.registerForm.get('contrasenia');
  }

  get telefono(){
    return this.registerForm.get('telefono');
  }
  get barrio(){
    return this.registerForm.get('barrio');
  }
  
  get localidad(){
    return this.registerForm.get('localidad');
  }

  get departamento(){
    return this.registerForm.get('departamento');
  }
  get calle(){
    return this.registerForm.get('calle');
  }
  get numero(){
    return this.registerForm.get('numero');
  }
  get esquina(){
    return this.registerForm.get('esquina');
  }

  get codigoPostal(){
    return this.registerForm.get('codigoPostal');
  }
  registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', { 
    validators: [Validators.required, Validators.email]
    }],
    contrasenia: ['', Validators.required],
    telefono: ['', { 
      validators: [Validators.required, Validators.minLength(8)]
    }],
    barrio: ['', Validators.required],
    localidad: ['', Validators.required],
    departamento: ['', Validators.required],
    calle: ['', Validators.required],
    numero: ['', Validators.required],
    esquina: ['', Validators.required],
    extra: [''],
    codigoPostal: ['', Validators.required]
   });
  
  ngOnInit() {
  }

  registrarUsuario(){

    this.usuarioService.RegistroUsuario(this.usuarioModel).subscribe();
    console.log("El usuario esta registrado");
    
  }
}
