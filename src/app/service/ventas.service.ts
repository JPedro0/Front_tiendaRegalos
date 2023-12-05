import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class VentasService {

    readonly APIUrl = Global.urlBackend + 'venta/';

    constructor(private http: HttpClient) { }

    //SP de obtener todos los usuarios
    listaInventario(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + 'lista');
    }

    altaInventario(nombre: string, descripcion: string, cantidad: number, fechaAdqui: Date) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const params = new HttpParams();
        params.set('Nombre', nombre);
        params.set('Descripcion', descripcion);
        params.set('CantidadActual', cantidad);
        params.set('FechaAdquision', fechaAdqui.toString());

        return this.http.post(this.APIUrl + 'nuevo', params,{ headers });
    }

    bajaInventario(id: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const params = new HttpParams();
        params.set('invID', id);

        return this.http.delete(this.APIUrl + 'eliminar', {headers,params});
    }
}