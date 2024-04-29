import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasePHPService } from './_basePHP.service';
import { Pedido } from 'src/app/class/order/pedido';
import { PedidoItem } from 'src/app/class/order/pedidoItem';
// CHANGEABLE
// import { PedidoItem } from 'src/app/_class/pedidoItem';

@Injectable({
  providedIn: 'root'
})
export class PedidosItemsPHPService {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {

    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/pedidoitems`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/pedidoitems/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/pedidoitems/${id}`);
  }

  save(element: PedidoItem) {
    return this.http.post(`${this.API_URI}/pedidoitems`, element);
  }

  update(id: string | number, updated: any): Observable<any> {
    return this.http.post(`${this.API_URI}/pedidoitems/${id}`, updated);
  }

  updateidpedido(pedido: Pedido ): Observable<any> {
    return this.http.post(`${this.API_URI}/pedidoitemsupdateidpedido`, pedido);
  }
}
