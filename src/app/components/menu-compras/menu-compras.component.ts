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

  formVentaData: FormGroup;

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

    this.formVentaData = this.formBuilder.group({
      id: ['', [Validators.required]],
      total: ['', [Validators.required]],
      fechaVenta: ['', [Validators.required]],
      productos: ['', [Validators.required]],
      promociones: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.refrescar();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Refrescar informacion tabla y paginacion
  async refrescar() {
    try {
      Lista_Ventas = await this.service.listaVentas();
      
      for (let index = 0; index < Lista_Ventas.length; index++) {
        Lista_Ventas[index].ProductosVendidos = Lista_Ventas[index].ProductosVendidos.replace(/\$/g," ");
        Lista_Ventas[index].PromocionesAplicadas = Lista_Ventas[index].PromocionesAplicadas.replace(/\$/g,' ');
      }

      this.dataSource = new MatTableDataSource<Venta>(Lista_Ventas);
      this.ngAfterViewInit();
      this.objetos = Lista_Ventas;
    }
    catch (e) {
      console.log(e);
    }
  }

  setName(){
    //console.log(this.objetos[1])
    if(this.formVentaData.value.id > 0 && this.formVentaData.value.id != 9999){
      for (let index = 0; index < this.objetos.length; index++) {    
        if(this.formVentaData.value.id == this.objetos[index].ID){
          this.formVentaData.controls['total'].setValue("$"+this.objetos[index].Total);
          this.formVentaData.controls['fechaVenta'].setValue(formatDate(this.objetos[index].FechaVenta, 'dd / MMMM / yyyy', 'es'));
          this.formVentaData.controls['productos'].setValue(this.objetos[index].ProductosVendidos);
          this.formVentaData.controls['promociones'].setValue(this.objetos[index].PromocionesAplicadas);
          break;
        }
      }
    }
    else{
          this.formVentaData.controls['total'].setValue('');
          this.formVentaData.controls['fechaVenta'].setValue('');
          this.formVentaData.controls['productos'].setValue('');
          this.formVentaData.controls['promociones'].setValue('');
    }
  }
}
