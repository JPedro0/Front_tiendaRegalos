import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.component.html',
  styleUrls: ['./registro-compras.component.css']
})
export class RegistroComprasComponent {

  formVenta: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
    this.formVenta = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  agregar(){

  }

  realizarVenta(){

  }
}
