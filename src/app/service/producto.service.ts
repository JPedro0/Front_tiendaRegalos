import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    readonly APIUrl = Global.urlBackend + 'producto/';

    constructor(private http: HttpClient) { }

    
}