import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/_base.service';
import { DescuentoCliente } from 'src/app/class/order/descuentoCliente';
import { BasePHPService } from './_basePHP.service';

@Injectable({
  providedIn: 'root'
})
export class descuentosClientePHPService {
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
    return this.http.get(`${this.API_URI}/clientedescuentos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/clientedescuentos/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/clientedescuentos/${id}`);
  }

  save(element: DescuentoCliente) {
    return this.http.post(`${this.API_URI}/clientedescuentos`, element);
  }

  update(id: string | number, updated: DescuentoCliente): Observable<any> {
    return this.http.post(`${this.API_URI}/clientedescuentos/${id}`, updated);
  }

}
