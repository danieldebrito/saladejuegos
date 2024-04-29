import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasePHPService {

  public urlBasePHP: string;

  constructor(public http: HttpClient) {

    // LOCAL php
    // this.urlBasePHP = 'http://127.0.0.1:8000/api';
    // vn power
    this.urlBasePHP = 'https://www.apiphp.juntasmeyro.wnpower.host/public/api';
  }


  public getURL(): string {
    return this.urlBasePHP;
  }

  public async httpGetP(url: string): Promise<any> {
    const response = await firstValueFrom(this.http.get(this.urlBasePHP + url));
    return response || {};
  }

  public async httpDeleteP(url: string): Promise<any> {
    const response = await firstValueFrom(this.http.delete(this.urlBasePHP + url));
    return response || {};
  }

  public async httpPostP(url: string, request: object): Promise<any> {
    const response = await firstValueFrom(this.http.post(this.urlBasePHP + url, request));
    return response || {};
  }

  public httpGetO<T>(url: string): Observable<T> {
    return this.http.get<T>(this.urlBasePHP + url);
  }
}

