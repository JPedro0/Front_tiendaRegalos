import axios from 'axios';
import { Injectable } from '@angular/core';
import { Global } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {

    readonly APIUrl = Global.urlBackend + 'inventario/';

    async listaProductos(): Promise<any> {
        return await axios.get(this.APIUrl + 'lista', {})
            .then((respuesta) => {
                return respuesta.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async altaInventario(nombre: string, descripcion: string, cantidad: number): Promise<any> {
        await axios.post(this.APIUrl + 'nuevo', {
            Nombre: nombre,
            Descripcion: descripcion,
            CantidadActual: cantidad
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async bajaInventario(id: number): Promise<any> {
        await axios.delete(this.APIUrl + 'eliminar', {
            data: { invID: id }
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async editInventario(id:number, nombre: string, descripcion: string, cantidad: number): Promise<any> {
        await axios.put(this.APIUrl + 'actualizar', {
            invID: id,
            nuevoNombre: nombre,
            nuevaDescripcion: descripcion,
            nuevaCantidadActual: cantidad
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async genCargo(id:number, cantidad: number): Promise<any> {
        await axios.post(this.APIUrl + 'cargo', {
            invID: id,
            cantidadVendida: cantidad
        })
            .then((respuesta) => {
                console.log(respuesta.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async genAbono(id:number, cantidad: number): Promise<any> {
        await axios.post(this.APIUrl + 'abono', {
            invID: id,
            cantidadComprada: cantidad
        })
            .then((respuesta) => {
                console.log(respuesta.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}