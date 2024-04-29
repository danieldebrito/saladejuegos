import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public urlBase: string;

  constructor(public http: HttpClient) {
    // expressJS with ts
    // this.urlBase = 'http://localhost:3300/meyroWebAPI';

    // vn power
    this.urlBase = 'https://api.juntasmeyro.wnpower.host/meyroWebAPI';
  }

  public getURL(): string {
    return this.urlBase;
  }

  public async httpGetP(url: string): Promise<any> {
    const response = await firstValueFrom(this.http.get(this.urlBase + url));
    return response || {};
  }

  public async httpDeleteP(url: string): Promise<any> {
    const response = await firstValueFrom(this.http.delete(this.urlBase + url));
    return response || {};
  }

  public async httpPostP(url: string, request: object): Promise<any> {
    const response = await firstValueFrom(this.http.post(this.urlBase + url, request));
    return response || {};
  }

  public httpGetO<T>(url: string): Observable<T> {
    return this.http.get<T>(this.urlBase + url);
  }
}
