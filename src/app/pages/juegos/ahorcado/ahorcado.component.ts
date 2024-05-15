import { Component, OnInit } from '@angular/core';
import { PalabrasService } from '../../../services/palabrasHTTP.service';
import { Score } from '../../../class/score';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  public palabra: string = '';
  public palabraArray: string[] = [];

  public palabraTipeada: string = '------';
  public palabraTipeadaArray: string[] = ['-', '-', '-', '-', '-', '-'];
  public letraTipeada: string = '';

  public mostrarPalabra = false;
  public cantIntentos = 5;
  public esGanador = false;
  public mensaje = 'Jugando';

  public score: Score = {};

  constructor(private palabrasSv: PalabrasService) {
    this.mensaje = 'Jugando';
   }

  public getPalabra() {
    this.palabrasSv.get().subscribe(res => {
      this.palabra = res;
      console.log(this.palabra);
      this.palabraArray = this.palabra.toString().split('');
    });
  }

  public LetraTipeada(letra: string) {
    this.letraTipeada = letra;
    this.checkLetra();
  }

  public checkLetra() {
    let flag = true;
    for (let index = 0; index < this.palabraArray.length; index++) {
      if (this.palabraArray[index].toLowerCase() == this.letraTipeada.toLowerCase()) {
        this.palabraTipeadaArray[index] = this.letraTipeada;
        flag = false;
      }
    }

    if (flag) {
      this.cantIntentos -= 1;
    }

    this.palabraTipeada = this.arrayToPalabra(this.palabraTipeadaArray);
    this.checkGanador(this.palabraTipeadaArray);
  }

  public arrayToPalabra(palabra: string[]) {
    let ret = '';
    for (let index = 0; index < palabra.length; index++) {
      ret += palabra[index];
    }
    return ret;
  }

  public checkGanador(array: string[]) {
    if (!array.find(ar => ar == '-')) {
      this.esGanador = true;
      this.mensaje = "Ganaste!!";
    }
  }

  public ResetJuego() {
    this.cantIntentos = 5;
    this.mostrarPalabra = false;
    this.palabraTipeada = '------';
    this.getPalabra();
    this.palabra = '';
    this.palabraArray = [];
    this.mensaje = "Jugando";

    this.palabraTipeadaArray = ['-', '-', '-', '-', '-', '-'];
    this.letraTipeada = '';
  }

  ngOnInit(): void {
    this.getPalabra();
    this.mensaje = 'Jugando';
  }
}
