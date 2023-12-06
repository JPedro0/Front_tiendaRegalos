import { Injectable } from '@angular/core';
import { Global } from './global.service';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class PromocionesService {

    readonly APIUrl = Global.urlBackend + 'promocion/';

    async listaPromociones(): Promise<any> {
        return await axios.get(this.APIUrl + 'lista', {})
            .then((respuesta) => {
                return respuesta.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async altaProducto(tipo: boolean, descuento: number, codigo: number): Promise<any> {
        await axios.post(this.APIUrl + 'nuevo', {
            TipoDescuento: tipo,
            Descuento: descuento,
            Producto: { Codigo: codigo }
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async bajaProducto(id: number): Promise<any> {
        await axios.delete(this.APIUrl + 'eliminar', {
            data: { ID: id }
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async editPromocion(codigo: number, tipo: boolean, descuento: number): Promise<any> {
        await axios.put(this.APIUrl + 'actualizar', {
            Codigo: codigo,
            nuevoTipoDescuento: tipo,
            nuevoDescuento: descuento
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}