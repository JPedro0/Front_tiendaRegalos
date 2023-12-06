import { Venta } from './../../interface/venta';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario } from 'src/app/interface/inventario';
import { Producto } from 'src/app/interface/producto';
import { InventarioService } from 'src/app/service/inventario.service';
import { ProductoService } from 'src/app/service/producto.service';
import { VentasService } from 'src/app/service/ventas.service';

let Lista_Venta:Venta[] = [];

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.component.html',
  styleUrls: ['./registro-compras.component.css']
})
export class RegistroComprasComponent {

  formVenta: FormGroup;

  objetos: Venta[] = [];
  Lista_Producto: any[] = [];
  Lista_Inventario: any[] = [];
  Lista_Objetos:any[]=[];
  seleccion: number = 0;
  seleccion2: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: VentasService,
    private proService: ProductoService,
    private invService: InventarioService,
    ) {
    this.formVenta = this.formBuilder.group({
      productoCodigo: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //this.refrescar();
    this.obtenerProductos();
  }

  async obtenerProductos(){
    this.Lista_Producto = await this.proService.listaProductos();
    this.Lista_Inventario = await this.invService.listaProductos();

    this.Lista_Inventario = this.Lista_Producto.map(item => {
      return this.Lista_Inventario.find(x => x.ID === item.InventarioID)
    })

    //console.log(this.Lista_Producto.find(x => x.InventarioID === 2))
  }

  /*async refrescar() {
    try {
      Lista_Venta = await this.service.listaVentas();
      this.dataSource = new MatTableDataSource<Promocion>(Lista_Promocion);
      this.ngAfterViewInit();
      this.objetos = Lista_Promocion;
    }
    catch (e) {
      console.log(e);
    }
  }*/

  agregar(){

  }

  realizarVenta(){

  }
}
