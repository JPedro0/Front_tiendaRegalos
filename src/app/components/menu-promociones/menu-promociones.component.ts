import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/interface/producto';
import { Promocion } from 'src/app/interface/promocion';
import { ProductoService } from 'src/app/service/producto.service';
import { PromocionesService } from 'src/app/service/promo.service';

let Lista_Promocion: Promocion[] = []

@Component({
  selector: 'app-menu-promociones',
  templateUrl: './menu-promociones.component.html',
  styleUrls: ['./menu-promociones.component.css']
})
export class MenuPromocionesComponent {
  objetos: Promocion[] = [];
  Lista_Producto: Producto[] = [];
  seleccion: number = 0;
  seleccion2: number = 0;
  seleccion3: number = -1;

  formPromocion: FormGroup;

  displayedColumns: string[] = ['id', 'tipo', 'descuento', 'productoCodigo', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Promocion>(Lista_Promocion);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Productos por pagina";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private service: PromocionesService,
    private proService: ProductoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder) {

    this.formPromocion = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      tipoDescuento: ['', [Validators.required]],
      descuento: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      productoCodigo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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
      Lista_Promocion = await this.service.listaPromociones();
      this.dataSource = new MatTableDataSource<Promocion>(Lista_Promocion);
      this.ngAfterViewInit();
      this.objetos = Lista_Promocion;
    }
    catch (e) {
      console.log(e);
    }
  }

  async eliminar(id: number) {
    try {
      let respuesta = await this.service.bajaProducto( id );

      //Notificacion de producto Eliminado
      this._snackBar.open('El producto ' + id + ' a sido eliminado', 'Okay', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

      //Refrescar tabla
      this.refrescar();

    }
    catch (e) {
      console.log(e);
    }
  }

  async altaPromocion() {
    console.log(this.formPromocion.value.productoCodigo)
    const promo: Promocion = {
      ID: this.formPromocion.value.id,
      TipoDescuento: this.formPromocion.value.tipoDescuento,
      Descuento: this.formPromocion.value.descuento,
      ProductoCodigo: this.formPromocion.value.productoCodigo
    }

    if(promo.ID == 9999){
      try {
        let respuesta = await this.service.altaProducto(
          promo.TipoDescuento,
          promo.Descuento,
          promo.ProductoCodigo
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + promo.ProductoCodigo + ' a sido dado de alta.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formPromocion.reset();
        this.formPromocion.controls['id'].setValue(0);
      }
      catch (e) {
        console.log(e);
      }
    }
    else{
      try {
        let respuesta = await this.service.editPromocion(
          promo.TipoDescuento,
          promo.Descuento,
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + promo.ID + ' a sido modificado.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formPromocion.reset();
        this.formPromocion.controls['id'].setValue(0);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  setName(){
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
  }
}
