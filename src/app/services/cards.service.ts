import { Injectable } from '@angular/core';
import { Card } from 'src/app/class/products/card';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public articuloParaDetalle: Card = {};
  public versiones: Card[] = [];

  public show: boolean = true; // true, muestra grilla, false, muestra detalle de art
  public showDetail: boolean = true; // true, muestra verciones, false, muestra detalle de juego, en detalle de producto

  constructor(public miHttp: BaseService) { }

  public ListarO(): Observable<Card[]> {
    return this.miHttp.httpGetO<Card[]>('/cards/');
  }

  public getById(id: string): Observable<Card> {
    return this.miHttp.httpGetO<Card>('/cards/' + id);
  }

  public buscarPorFrase(frase: string): Observable<Card[]> {
    return this.miHttp.httpGetO<Card[]>('/cards/buscarFrase/' + frase);
  }

  public FiltrarP(
    linea: string,
    marca: string,
    combustible: string,
    motor: string,
    modelo: string,
    cilindrada: string,
    competicion: string,
    producto: string,
    aplicacion: string
  ): Promise<object> {

    const request: object = {
      linea: linea == null ? '' : linea,
      marca: marca == null ? '' : marca,
      combustible: combustible == null ? '' : combustible,
      motor: motor == null ? '' : motor,
      modelo: modelo == null ? '' : modelo,
      cilindrada: cilindrada == null ? '' : cilindrada,
      competicion: competicion == null ? '' : competicion,
      producto: producto == null ? '' : producto,
      aplicacion: aplicacion == null ? '' : aplicacion
    };

    return this.miHttp.httpPostP('/cards/filtrar', request);
  }
}
