import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasePHPService } from './_basePHP.service';
// CHANGEABLE
import { JgoComponentes } from 'src/app/_class/products/jgoComponentes';

@Injectable({
  providedIn: 'root'
})
export class jgoComponentesPHPService {
  API_URI = '';

  constructor(
    private http: HttpClient,
    private basePHP: BasePHPService) {

    this.API_URI = this.basePHP.getURL();
  }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/juegoscomponentes`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/juegoscomponentes/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/juegoscomponentes/${id}`);
  }

  save(element: JgoComponentes) {
    return this.http.post(`${this.API_URI}/juegoscomponentes`, element);
  }

  update(id: string | number, updated): Observable<any> {
    return this.http.post(`${this.API_URI}/juegoscomponentes/${id}`, updated);
  }

  getComponentes(jgo): Observable<any> {
    return this.http.post(`${this.API_URI}/componentes`, jgo);
  }

}
