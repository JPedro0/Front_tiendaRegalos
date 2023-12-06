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

    
}