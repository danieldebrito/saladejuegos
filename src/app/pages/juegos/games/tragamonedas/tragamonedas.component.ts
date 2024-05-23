import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { ScoresService } from '../../../../services/scores.FIRE.service';

import { Score } from '../../../../class/score';
import { User } from '../../../../auth/models/user';


@Component({
  selector: 'app-tragamonedas',
  templateUrl: './tragamonedas.component.html',
  styleUrls: ['./tragamonedas.component.scss']
})
export class TragamonedasComponent implements OnInit {

  public carrete = ['🍒', '🍊', '🍇', '🔔', '⭐️', '💎'];
  public resultados = ['🍒', '🍒', '🍒'];

  public cantCarretes = 3; // cantidad de carretes del juego
  public cantVueltas = 10; // cantidad de giros hasta mostrar el resultado
  public tiempoVuelta = 500; // tiempo en milisegundos de la vuelta antes de mostrar el resultado

  public mensaje = 'Apreta el boton y suerte !!';

  public myScore: Score = {};
  public currentUser: User = {};

  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private scoresSv: ScoresService,
  ) { }

  tirar() {
    this.mensaje = 'Jugando ...';
    for (let i = 0; i < this.cantCarretes; i++) {
      let j = 0;

      const interval = setInterval((): void => {
        this.resultados[i] = this.carrete[Math.floor(Math.random() * this.carrete.length)];

        if (++j === this.cantVueltas) {
          this.chequearGanador(this.resultados);
          clearInterval(interval);
        }
      }, this.tiempoVuelta);
    }
  }

  public chequearGanador(arreglo: any[]): boolean {
    if (arreglo.length === 0) {
      return true; // Un arreglo vacío se considera que tiene todos los elementos iguales
    }

    for (let i = 1; i < arreglo.length; i++) {
      if (arreglo[i] !== arreglo[0]) {
        this.mensaje = 'Perdiste restas 5 puntos!!';
        this.myScore.tragamonedas =- 5;
        this.scoresSv.update(this.myScore);
        return false;
      }
    }
    this.mensaje = 'Ganaste 100 puntos!!';
    this.myScore.tragamonedas =+ 100;
    this.scoresSv.update(this.myScore);
    return true;
  }

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.currentUser = res;

          this.scoresSv.getItems().subscribe((res) => {
            this.myScore = res.find((r) => r.uid == this.currentUser.uid) ?? {};
          });
        });
      } else {
        this.currentUser = {};
      }
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
}




/*
🍒: U+1F352
🍊: U+1F34A
🍇: U+1F347
🔔: U+1F514
⭐️: U+2B50
💎: U+1F48E
*/



/*
    this.resultados = ['', '', ''];

    const intervalTime = 100; // Tiempo en milisegundos entre cada actualización del resultado
    const totalSpins = 20; // Número total de giros antes de mostrar el resultado final
    const spinDuration = 2000; // Duración total del giro en milisegundos
    const delayBetweenSpins = 1000; // Retardo entre cada giro en milisegundos

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * this.carrete.length);
      
      let currentSpin = 0;

      const spinInterval = setInterval(() => {
        this.resultados[i] = this.carrete[Math.floor(Math.random() * this.carrete.length)];
        currentSpin++;

        if (currentSpin === totalSpins) {
          clearInterval(spinInterval);
          setTimeout(() => {
            this.resultados[i] = this.carrete[randomIndex];
          }, delayBetweenSpins);
        }
      }, intervalTime);
    }
  }
   */

