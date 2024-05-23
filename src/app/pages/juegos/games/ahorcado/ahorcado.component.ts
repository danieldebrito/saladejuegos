import { Component, OnInit } from '@angular/core';
import { PalabrasService } from '../../../../services/palabrasHTTP.service';
import { Score } from '../../../../class/score';
import { ScoresService } from '../../../../services/scores.FIRE.service';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../../../auth/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  public palabra: string = '';
  public palabraArray: string[] = [];

  public myScore: Score = {};
  public currentUser: User = {};

  public palabraTipeada: string = '- - - - - -';
  public palabraTipeadaArray: string[] = [' - ', ' - ', ' - ', ' - ', ' - ', ' - '];
  public letraTipeada: string = '';

  public mostrarPalabra = false;
  public cantIntentos = 5;
  public esGanador = false;
  public mensaje = 'Jugando Ahorcado';

  public jugando = true;

  constructor(
    private afAuth: AngularFireAuth,
    private palabrasSv: PalabrasService,
    private scoresSv: ScoresService,
    private usuariosSv: UsuariosService) {
    this.mensaje = 'Jugando Ahorcado';
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
        this.myScore.ahorcado = this.myScore.ahorcado != undefined ? this.myScore.ahorcado + 1 : 0;
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
    if (!array.find(ar => ar == ' - ') && (this.cantIntentos != 0)) {
      this.esGanador = true;
      this.mensaje = "Ganaste 30 puntos!!";
      this.myScore.ahorcado = + 30;
      this.scoresSv.update(this.myScore);
    } else if (this.cantIntentos == 0) {
      this.jugando = false;
    }
  }

  public ResetJuego() {
    this.cantIntentos = 5;
    this.mostrarPalabra = false;
    this.palabraTipeada = '- - - - - -';
    this.getPalabra();
    this.palabra = '';
    this.palabraArray = [];
    this.mensaje = "Jugando Ahorcado";
    this.jugando = true;

    this.palabraTipeadaArray = [' - ', ' - ', ' - ', ' - ', ' - ', ' - '];
    this.letraTipeada = '';
  }


  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.currentUser = res;
          this.scoresSv.getItems().subscribe(res => {
            this.myScore = res.find(r => r.uid == this.currentUser.uid) ?? {};
          });
        });
      } else {
        this.currentUser = {};
      }
    });
  }

  ngOnInit(): void {
    this.getPalabra();
    this.mensaje = 'Jugando Ahorcado';
    this.getCurrentUser();
  }
}
