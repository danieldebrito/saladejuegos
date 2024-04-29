import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/_base.service';
import { BasePHPService } from './_basePHP.service';
import { Empleado } from 'src/app/class/users/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPHPService {
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
    return this.http.get(`${this.API_URI}/empleados`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/empleados/${id}`);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.API_URI}/empleados/${id}`);
  }

  save(element: Empleado) {
    return this.http.post(`${this.API_URI}/empleados`, element);
  }

  update(id: string | number, updated: Empleado): Observable<any> {
    return this.http.post(`${this.API_URI}/empleados/${id}`, updated);
  }

  getByUid(uid: string): Observable<any> {
    return this.http.get(`${this.API_URI}/empleados/uid/${uid}`);
  }
}
