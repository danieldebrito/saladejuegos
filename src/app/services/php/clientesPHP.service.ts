import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasePHPService } from './_basePHP.service';
import { Cliente } from '../../class/users/cliente';

@Injectable({
  providedIn: 'root'
})
export class clientesPHPservice {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {
    //this.API_URI = this.base.getURL();
    //this.API_URI = 'http://makerds.com/api/public/api';
    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/clientes`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/clientes/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/clientes/${id}`);
  }

  save(element: Cliente) {
    return this.http.post(`${this.API_URI}/clientes`, element);
  }

  update(id: string | number, updated: Cliente): Observable<any> {
    return this.http.post(`${this.API_URI}/clientes/${id}`, updated);
  }

  getByUid(uid: string): Observable<any> {
    return this.http.get(`${this.API_URI}/clientes/uid/${uid}`);
  }
}
