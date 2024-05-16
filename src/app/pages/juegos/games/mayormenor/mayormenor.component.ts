import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../../../auth/models/user';
import { Naipe } from '../../../../class/naipe';
import { Score } from '../../../../class/score';
import { NaipesService } from '../../../../services/naipesJSON.service';
import { ScoresService } from '../../../../services/scores.FIRE.service';
import { UsuariosService } from '../../../../auth/services/usuarios.service';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.scss']
})
export class MayormenorComponent implements OnInit {
  

  public score: Score = {};
  public scores: Score[] = [];

  public currentUser: User = {};

  public naipes: Naipe[] = [];
  cartaAleatoria: Naipe = {};
  cartaAleatoriaAnterior: Naipe = {};
  indiceActual: number = 0;
  public mensaje: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private cnaipesSv: NaipesService,
    private scoresSv: ScoresService,
    private usuariosSv: UsuariosService,
  ) { }

  obtenerNaipeAleatorio() {
    if (this.naipes && this.indiceActual < this.naipes.length) {
      this.cartaAleatoria = this.naipes[this.indiceActual];
      this.indiceActual++;
    }
  }

  public obtenerTodosLosNaipesAleatorios() {
    this.cnaipesSv.obtenernaipesAleatorias().subscribe((naipes: Naipe[]) => {
      this.naipes = naipes;
      this.indiceActual = 0;

      this.obtenerNaipeAleatorio();
    });
  }

  public checkJugada(jugada: string) {

    let resultado: string = '';
    this.cartaAleatoriaAnterior = this.cartaAleatoria;

    if (this.naipes && this.indiceActual < this.naipes.length) {
      this.cartaAleatoria = this.naipes[this.indiceActual];
      this.indiceActual++;

      if ((this.cartaAleatoriaAnterior.valor !== undefined && this.cartaAleatoria.valor !== undefined) && (this.cartaAleatoriaAnterior.valor > this.cartaAleatoria.valor)) {
        resultado = 'menor'
      } else {
        resultado = 'mayor'
      }

      if (jugada == resultado) {
        this.mensaje = 'Bien!!';
        this.score
      } else {
        this.mensaje = 'Perdiste!!';
      }

    }
  }

  public getScoreUsuario() {
    
    this.scoresSv.getItems().subscribe(res => {

      console.log(this.score);

      this.score = res.find(e => e.uid == this.currentUser.uid  ) ?? {};

      console.log(this.score);
    });
  }

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.currentUser = res;
        });
      } else {
        this.currentUser = { };
      }
    });
  }

  ngOnInit() {
    this.obtenerTodosLosNaipesAleatorios();
    this.getCurrentUser();
    this.getScoreUsuario();
  }
}
