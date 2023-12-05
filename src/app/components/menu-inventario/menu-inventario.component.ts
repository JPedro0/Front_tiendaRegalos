import { Inventario } from './../../interface/inventario';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/service/inventario.service';
import { DatePipe, formatDate } from '@angular/common';

let Lista_Objetos: Inventario[] = [

];

@Component({
  selector: 'app-menu-inventario',
  templateUrl: './menu-inventario.component.html',
  styleUrls: ['./menu-inventario.component.css'],
  providers: [InventarioService]
})

export class MenuInventarioComponent {

  formInventario: FormGroup;

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripcion', 'CantidadActual', 'FechaAdquision', 'acciones'];
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
      objeto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.refrescar();
  }

  eliminar(id: number) {
    this.service.bajaInventario(id).subscribe(data => {

      console.log(data);

      //Notificacion de producto Eliminado
      this._snackBar.open('El producto ' + id + ' a sido eliminado', 'Okay', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

      //Refrescar tabla
      this.refrescar();
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Refrescar informacion tabla y paginacion
  refrescar() {
    this.service.listaInventario().subscribe((data: Inventario[]) => {
      Lista_Objetos = data;
      this.dataSource = new MatTableDataSource<Inventario>(Lista_Objetos);
      this.ngAfterViewInit();
    })
  }

  altaInventario(){
    const producto: Inventario = {
      Nombre: this.formInventario.value.objeto,
      Descripcion: this.formInventario.value.descripcion,
      CantidadActual: this.formInventario.value.cantidad,
      FechaAdquision: this.formInventario.value.fechaRegistro
    }

    this.service.altaInventario(
      this.formInventario.value.objeto,
      this.formInventario.value.descripcion,
      this.formInventario.value.cantidad,
      this.formInventario.value.fechaRegistro
    ).subscribe(data => {
      console.log(data);
    })
  }

}
