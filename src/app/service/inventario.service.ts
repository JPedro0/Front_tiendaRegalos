import { HeaderComponent } from './../components/header/header.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';
import { Inventario } from '../interface/inventario';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {

    readonly APIUrl = Global.urlBackend + 'inventario/';

    constructor(private http: HttpClient) { }

    //SP de obtener todos los usuarios
    listaInventario(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + 'lista');
    }

    altaInventario(nombre: string, descripcion: string, cantidad: number, fechaAdqui: Date) {

        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

        const body = {'Nombre': nombre, 'Descripcion': descripcion, 'CantidadActual': cantidad, 'FechaAdquision': fechaAdqui.toString()};

        return this.http.post(this.APIUrl + 'nuevo', body,{ headers });
    }

    bajaInventario(id: number):Observable<any[]> {

        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

        const body = {"invID":id};

        var config = {
            headers:  headers,
            body:body,
        };

        return this.http.delete<any>(this.APIUrl + 'eliminar', config);
    }
}