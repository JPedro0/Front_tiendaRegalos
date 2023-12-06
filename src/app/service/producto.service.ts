import { Injectable } from '@angular/core';
import { Global } from './global.service';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    readonly APIUrl = Global.urlBackend + 'producto/';

    async listaProductos(): Promise<any> {
        return await axios.get(this.APIUrl + 'lista', {})
            .then((respuesta) => {
                return respuesta.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async altaProducto(precio: number, id: number): Promise<any> {
        await axios.post(this.APIUrl + 'nuevo', {
            Precio: precio,
            Inventario: { ID: id }
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async bajaProducto(codigo: number): Promise<any> {
        await axios.delete(this.APIUrl + 'eliminar', {
            data: { Codigo: codigo }
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async editProducto(codigo:number, precio: number): Promise<any> {
        await axios.put(this.APIUrl + 'actualizar', {
            Codigo: codigo,
            nuevoPrecio: precio
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}