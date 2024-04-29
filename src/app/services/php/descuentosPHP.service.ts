import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/_base.service';
import { dtosCliente } from 'src/app/class/order/dtosCliente';
import { BasePHPService } from './_basePHP.service';

@Injectable({
  providedIn: 'root'
})
export class DescuentosPHPService {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private base: BaseService,
    private basePHP: BasePHPService) {
    //this.API_URI = this.base.getURL();
    //this.API_URI = 'http://makerds.com/api/public/api';
    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/descuentos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/descuentos/${id}`);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.API_URI}/descuentos/${id}`);
  }

  save(element: dtosCliente) {
    return this.http.post(`${this.API_URI}/descuentos`, element);
  }

  update(id: string | number, updated: dtosCliente): Observable<any> {
    return this.http.post(`${this.API_URI}/descuentos/${id}`, updated);
  }

}
