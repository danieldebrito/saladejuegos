import { Articulo } from 'src/app/class/products/articulo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/_base.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  API_URI = 'https://api.juntasmeyro.wnpower.host/meyroWebAPI';
  //API_URI = '';


  constructor(
    private http: HttpClient,
    private base: BaseService) {
    this.API_URI = this.base.getURL();
   }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/articulos`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/articulos/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/articulos/${id}`);
  }

  save(element: Articulo) {
    return this.http.post(`${this.API_URI}/articulos`, element);
  }

  update(id: string|number, updated: Articulo): Observable<any> {
    return this.http.put(`${this.API_URI}/articulos/${id}`, updated);
  }
}
