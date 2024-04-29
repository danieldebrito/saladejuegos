import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/_base.service';
import { ClienteUtilidad } from 'src/app/class/order/clienteUtilidad';
import { BasePHPService } from './_basePHP.service';

@Injectable({
  providedIn: 'root'
})
export class clienteUtilidadPHPservice {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {
    //this.API_URI = this.base.getURL();
    //this.API_URI = 'http://makerds.com/api/public/api';
    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/clienteutilidad`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/clienteutilidad/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/clienteutilidad/${id}`);
  }

  save(element: ClienteUtilidad) {
    return this.http.post(`${this.API_URI}/clienteutilidad`, element);
  }

  update(id: string | number, updated: ClienteUtilidad): Observable<any> {
    return this.http.post(`${this.API_URI}/clienteutilidad/${id}`, updated);
  }

}
