import { Venta } from './../../interface/venta';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Inventario } from 'src/app/interface/inventario';
import { Producto } from 'src/app/interface/producto';
import { InventarioService } from 'src/app/service/inventario.service';
import { ProductoService } from 'src/app/service/producto.service';
import { VentasService } from 'src/app/service/ventas.service';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.component.html',
  styleUrls: ['./registro-compras.component.css']
})
export class RegistroComprasComponent {

  formVenta: FormGroup;

  objetos: Venta[] = [];
  Lista_Producto: Producto[] = [];
  Lista_Inventario: Inventario[] = [];
  Lista_Venta:any[] = [];
  Lista_Objetos:any[]=[];
  seleccion: number = 0;
  seleccion2: number = 0;

  finalizar:boolean = false;

  carritoCompras: string ='';

  displayedColumns: string[] = ['Codigo', 'Precio', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Producto>(this.Lista_Venta);

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private service: VentasService,
    private proService: ProductoService,
    private invService: InventarioService,
    ) {
    this.formVenta = this.formBuilder.group({
      invCodigo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //this.refrescar();
    this.obtenerProductos();
  }

  refrescar(){
    this.dataSource = new MatTableDataSource<Producto>(this.Lista_Venta);
    if(this.Lista_Venta.length > 0){
      this.finalizar = true;
    }
    else{
      this.finalizar=false;
    }
  }

  eliminarProducto(id:number){
    let i = this.Lista_Venta.indexOf(id);
    this.Lista_Venta.splice(this.Lista_Venta.indexOf(i), 1);
    this.refrescar();
  }


  async obtenerProductos(){
    this.Lista_Producto = await this.proService.listaProductos();
    this.Lista_Inventario = await this.invService.listaProductos();

    this.Lista_Objetos = this.Lista_Producto.map(item => {
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
    console.log();
    let codigo = 0;
    for (let index = 0; index < this.Lista_Inventario.length; index++) {
      if(this.formVenta.value.invCodigo == this.Lista_Inventario[index].ID){
        if(this.Lista_Inventario[index].CantidadActual > 0){
          for (let index = 0; index < this.Lista_Producto.length; index++) {
            if(this.Lista_Producto[index].InventarioID == this.formVenta.value.invCodigo){
              codigo = this.Lista_Producto[index].Codigo;
              this.Lista_Venta = this.Lista_Venta.concat(this.Lista_Producto[index]);
              this.refrescar();
              break;
            }
          }
          this.Lista_Inventario[index].CantidadActual = this.Lista_Inventario[index].CantidadActual - 1;
          this._snackBar.open('Producto agregado al carrito: ' + this.Lista_Inventario[index].Nombre, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.formVenta.controls['invCodigo'].setValue(0);
        }
        else{
          this._snackBar.open('Sin existencias del producto ' + this.Lista_Inventario[index].Nombre, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.formVenta.controls['invCodigo'].setValue(0);
        }
        break;
      }
    }

  }

  async realizarVenta(){    
    console.log(this.Lista_Venta)
    for (let index = 0; index < this.Lista_Venta.length; index++) {
      this.carritoCompras = this.carritoCompras + '$' + this.Lista_Venta[index].Codigo;
    }

    let respuesta:Venta = await this.service.altaVenta(this.carritoCompras)

    for (let index = 0; index < this.Lista_Venta.length; index++) {
      await this.invService.genCargo(this.Lista_Venta[index].InventarioID,1);
    }
    
    this._snackBar.open('El total de compra es de: $' + respuesta.Total, 'Okay', {
      duration: 7000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });

    this.carritoCompras = '';
    this.Lista_Venta = [];
    this.refrescar();
  }
}
