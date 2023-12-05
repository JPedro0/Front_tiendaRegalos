import { Component } from '@angular/core';

@Component({
  selector: 'app-gen-respuesta',
  templateUrl: './gen-respuesta.component.html',
  styleUrls: ['./gen-respuesta.component.css'],
})
export class GenRespuestaComponent {
  fechahoy = new Date();
  seleccion: string = 'oficio';
  mostrarOficio: boolean = false;
  mostrarCorreo: boolean = false;

  opciones(eleccion:string){
    if(eleccion == 'oficio'){
      this.mostrarOficio = true;
      this.mostrarCorreo = false;
    }
    else{
      this.mostrarOficio = false;
      this.mostrarCorreo = true;
    }
  }

  comprobar(){

  }

  comprobarCorreo(){

  }

  altaRespuesta(){
    
  }

  enviarCorreo(){

  }
}
