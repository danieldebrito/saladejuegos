import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasePHPService } from './_basePHP.service';
// CHANGEABLE
import { Producto } from 'src/app/class/products/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosPHPService {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {

    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/productos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/productos/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/productos/${id}`);
  }

  save(element: Producto) {
    return this.http.post(`${this.API_URI}/productos`, element);
  }

  update(id: string | number, updated: any): Observable<any> {
    return this.http.post(`${this.API_URI}/productos/${id}`, updated);
  }

}
