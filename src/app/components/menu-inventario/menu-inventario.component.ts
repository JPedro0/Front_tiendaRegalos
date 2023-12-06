import { Inventario } from './../../interface/inventario';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/service/inventario.service';

let Lista_Objetos: Inventario[] = [];

@Component({
  selector: 'app-menu-inventario',
  templateUrl: './menu-inventario.component.html',
  styleUrls: ['./menu-inventario.component.css'],
  providers: [InventarioService]
})

export class MenuInventarioComponent {

  objetos: Inventario[] = [];
  seleccion: number = 0;

  formInventario: FormGroup;

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripcion', 'CantidadActual', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Inventario>(Lista_Objetos);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Objetos por pagina";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private service: InventarioService,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder) {

    this.formInventario = this.formBuilder.group({
      id: ['', [Validators.required]],
      objeto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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
      Lista_Objetos = await this.service.listaProductos();
      this.dataSource = new MatTableDataSource<Inventario>(Lista_Objetos);
      this.ngAfterViewInit();
      this.objetos = Lista_Objetos;
    }
    catch (e) {
      console.log(e);
    }
  }

  async altaInventario() {
    const producto: Inventario = {
      ID: this.formInventario.value.id,
      Nombre: this.formInventario.value.objeto,
      Descripcion: this.formInventario.value.descripcion,
      CantidadActual: this.formInventario.value.cantidad
    }

    if(producto.ID == 9999){
      try {
        let respuesta = await this.service.altaInventario(
          producto.Nombre,
          producto.Descripcion,
          producto.CantidadActual
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + producto.Nombre + ' a sido dado de alta.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formInventario.reset();
        this.formInventario.controls['id'].setValue(0);
      }
      catch (e) {
        console.log(e);
      }
    }
    else{
      try {
        let respuesta = await this.service.editInventario(
          producto.ID,
          producto.Nombre,
          producto.Descripcion,
          producto.CantidadActual
        )
  
        this.refrescar();

        this._snackBar.open('El producto ' + producto.Nombre + ' a sido modificado.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.formInventario.reset();
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  async eliminar(id: number) {
    try {
      let respuesta = await this.service.bajaInventario( id )

      console.log(respuesta);

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

  setName(){
    //console.log(this.objetos[1])
    if(this.formInventario.value.id > 0 && this.formInventario.value.id != 9999){
      for (let index = 0; index < this.objetos.length; index++) {    
        if(this.formInventario.value.id == this.objetos[index].ID){
          this.formInventario.controls['objeto'].setValue(this.objetos[index].Nombre);
          this.formInventario.controls['descripcion'].setValue(this.objetos[index].Descripcion);
          this.formInventario.controls['cantidad'].setValue(this.objetos[index].CantidadActual);
          break;
        }
      }
    }
    else{
      this.formInventario.controls['objeto'].setValue('');
      this.formInventario.controls['descripcion'].setValue('');
      this.formInventario.controls['cantidad'].setValue('');
    }
  }
}
