import { Injectable } from '@angular/core';
import { Global } from './global.service';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class VentasService {

    readonly APIUrl = Global.urlBackend + 'venta/';

    async listaVentas(): Promise<any> {
        return await axios.get(this.APIUrl + 'lista', {})
            .then((respuesta) => {
                return respuesta.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async altaVenta(ventaProductos: string): Promise<any> {
        let res:any;
        await axios.post(this.APIUrl + 'nuevo', {
            ventaProductos: ventaProductos
        })
            .then((respuesta) => {
                //console.log(respuesta)
                res = respuesta;
                return res;
            })
            .catch((error) => {
                console.log(error);
            });
            return res.data;
    }

    async bajaVenta(id: number): Promise<any> {
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

    async checkTicket(id: number): Promise<any> {
        await axios.put(this.APIUrl + 'ticket', {
            ID: id
        })
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}