import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from './../../interface/producto';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto.service';
import { Inventario } from 'src/app/interface/inventario';
import { InventarioService } from 'src/app/service/inventario.service';

let Lista_Productos: Producto[] = []

@Component({
  selector: 'app-menu-productos',
  templateUrl: './menu-productos.component.html',
  styleUrls: ['./menu-productos.component.css']
})
export class MenuProductosComponent {
  objetos: Producto[] = [];
  Lista_Objetos: Inventario[] = [];
  seleccion: number = 0;
  seleccion2: number = 0;

  formProducto: FormGroup;

  displayedColumns: string[] = ['codigo', 'precio', 'inventarioID', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Producto>(Lista_Productos);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Productos por pagina";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private service: ProductoService,
    private invService: InventarioService,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder) {

    this.formProducto = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      precio: ['', [Validators.required]],
      inventarioID: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });

  }

  ngOnInit(): void {
    this.refrescar();
    this.obtenerInventario();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async obtenerInventario(){
    this.Lista_Objetos = await this.invService.listaProductos();
  }

  //Refrescar informacion tabla y paginacion
  async refrescar() {
    try {
      Lista_Productos = await this.service.listaProductos();
      this.dataSource = new MatTableDataSource<Producto>(Lista_Productos);
      this.ngAfterViewInit();
      this.objetos = Lista_Productos;
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

  async altaInventario() {
    const producto: Producto = {
      Codigo: this.formProducto.value.codigo,
      Precio: this.formProducto.value.precio,
      InventarioID: this.formProducto.value.inventarioID
    }

    if(producto.Codigo == 9999){
      try {
        let respuesta = await this.service.altaProducto(
          producto.Precio,
          producto.InventarioID
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + producto.InventarioID + ' a sido dado de alta.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formProducto.reset();
        this.formProducto.controls['codigo'].setValue(0);
      }
      catch (e) {
        console.log(e);
      }
    }
    else{
      try {
        let respuesta = await this.service.editProducto(
          producto.Codigo,
          producto.Precio
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + producto.Codigo + ' a sido modificado.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formProducto.reset();
        this.formProducto.controls['codigo'].setValue(0);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  setName(){
    //console.log(this.objetos[1])
    if(this.formProducto.value.codigo > 0 && this.formProducto.value.codigo != 9999){
      for (let index = 0; index < this.objetos.length; index++) {    
        if(this.formProducto.value.codigo == this.objetos[index].Codigo){
          this.formProducto.controls['precio'].setValue(this.objetos[index].Precio);
          this.formProducto.controls['inventarioID'].setValue(this.objetos[index].InventarioID);
          break;
        }
      }
    }
    else{
      this.formProducto.controls['precio'].setValue('');
      this.formProducto.controls['inventarioID'].setValue(0);
    }
  }
}
