import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class PromocionesService {

    readonly APIUrl = Global.urlBackend + 'promocion/';

    constructor(private http: HttpClient) { }

    
}