import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/_class/order/pedido';
import { BasePHPService } from './_basePHP.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosPHPService {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {
    //this.API_URI = this.base.getURL();
    //this.API_URI = 'http://makerds.com/api/public/api';
    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/pedidos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/pedidos/${id}`);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.API_URI}/pedidos/${id}`);
  }

  save(element: Pedido) {
    // console.log(element);
    return this.http.post(`${this.API_URI}/pedidos`, element);
  }

  update(id: string | number, updated: Pedido): Observable<any> {
    return this.http.post(`${this.API_URI}/pedidos/${id}`, updated);
  }
}
