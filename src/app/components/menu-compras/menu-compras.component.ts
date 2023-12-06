import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/interface/producto';
import { Venta } from 'src/app/interface/venta';
import { ProductoService } from 'src/app/service/producto.service';
import { VentasService } from 'src/app/service/ventas.service';

let Lista_Ventas: Venta[] = []
@Component({
  selector: 'app-menu-compras',
  templateUrl: './menu-compras.component.html',
  styleUrls: ['./menu-compras.component.css']
})
export class MenuComprasComponent {

  /*ngOnInit(): void {
    console.log(formatDate(Date(),'dd/MM/yyyy','es'));
  }*/

  objetos: Venta[] = [];
  Lista_Producto: Producto[] = [];
  seleccion: number = 0;

  formPromocion: FormGroup;

  displayedColumns: string[] = ['id', 'total', 'fechaVenta', 'productos', 'promociones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Venta>(Lista_Ventas);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Ventas por pagina";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private service: VentasService,
    private proService: ProductoService,
    private formBuilder: FormBuilder) {

    this.formPromocion = this.formBuilder.group({
      id: ['', [Validators.required]],
      total: ['', [Validators.required]],
      fechaVenta: ['', [Validators.required]],
      productos: ['', [Validators.required]],
      promociones: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.refrescar();
    this.obtenerProductos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async obtenerProductos(){
    this.Lista_Producto = await this.proService.listaProductos();
  }

  //Refrescar informacion tabla y paginacion
  async refrescar() {
    try {
      Lista_Ventas = await this.service.listaVentas();
      console.log(Lista_Ventas)
      this.dataSource = new MatTableDataSource<Venta>(Lista_Ventas);
      this.ngAfterViewInit();
      this.objetos = Lista_Ventas;
    }
    catch (e) {
      console.log(e);
    }
  }

  /*setName(){
    //console.log(this.objetos[1])
    if(this.formPromocion.value.id > 0 && this.formPromocion.value.id != 9999){
      for (let index = 0; index < this.objetos.length; index++) {    
        if(this.formPromocion.value.id == this.objetos[index].ID){
          this.formPromocion.controls['tipoDescuento'].setValue(this.objetos[index].TipoDescuento);
          this.formPromocion.controls['descuento'].setValue(this.objetos[index].Descuento);
          this.formPromocion.controls['productoCodigo'].setValue(this.objetos[index].ProductoCodigo);
          break;
        }
      }
    }
    else{
      this.formPromocion.controls['tipoDescuento'].setValue(-1);
      this.formPromocion.controls['descuento'].setValue('');
      this.formPromocion.controls['productoCodigo'].setValue(0);
    }
  }*/
}
