import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {

    readonly APIUrl = Global.urlBackend + 'inventario/';

    constructor(private http: HttpClient) { }

    //SP de obtener todos los usuarios
    obtenerAreas(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl);
    }

    altaArea(nombre: string) {
        return this.http.post(this.APIUrl, {});
    }

    updateArea(id_areas: number, nombre: string) {
        return this.http.put(this.APIUrl + '?id_areas=' + id_areas + '&nombre=' + nombre, {});
    }
}