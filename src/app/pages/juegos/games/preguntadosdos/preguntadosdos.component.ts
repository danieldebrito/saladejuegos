import { Component, OnInit } from '@angular/core';
import { Personaje } from './../../../../class/personaje';
import { SimpsonsService } from './../../../../services/simpsons.service';
import { Score } from '../../../../class/score';
import { User } from '../../../../auth/models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { ScoresService } from '../../../../services/scores.FIRE.service';


@Component({
  selector: 'app-preguntadosdos',
  templateUrl: './preguntadosdos.component.html',
  styleUrls: ['./preguntadosdos.component.scss']
})
export class PreguntadosdosComponent implements OnInit {

  public allItems: Personaje[] = [];
  public terna: Personaje[] = [];

  public mensaje: string = '';
  public mensajeResultado: string = '';
  public iniciarJuego = false;

  public personajeRespuesta: Personaje = {};
  public personajeCorrecto: Personaje = {};

  public myScore: Score = {};
  public currentUser: User = {};

  public jugando = true;


  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private scoresSv: ScoresService,
    private simpsonsSv: SimpsonsService) { }

  public cargarTerna() {
    this.iniciarJuego = true;
    this.jugando = true;

    let ternaTEMP: Personaje[] = [];
    for (let index = 0; index < 3; index++) {
      ternaTEMP.push(this.allItems[Math.floor(Math.random() * this.allItems.length)]);
    }
    this.personajeCorrecto = ternaTEMP[0];
    this.terna = this.mezclar(ternaTEMP);
  }

  private mezclar(arreglo: any[]): any[] {
    const respuestasTEMP = [...arreglo];
    // Mezclar las respuestas utilizando el algoritmo de Fisher-Yates
    for (let i = respuestasTEMP.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [respuestasTEMP[i], respuestasTEMP[j]] = [respuestasTEMP[j], respuestasTEMP[i]];
    }
    return respuestasTEMP;
  }

  public checkJugada(respuesta: Personaje) {
    this.jugando = false;

    if (respuesta == this.personajeCorrecto) {
      this.mensajeResultado = 'Correcto';

      this.myScore.preguntados2 = this.myScore.preguntados2 != undefined ? this.myScore.preguntados2 + 1 : 0;

    } else {
      this.mensajeResultado = 'Incorrecto era' + this.personajeCorrecto.Nombre;

      this.myScore.preguntados2 = this.myScore.preguntados2 != undefined ? this.myScore.preguntados2 - 1 : 0;
    }

    this.scoresSv.update(this.myScore);
  }

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.currentUser = res;

          this.scoresSv.getItems().subscribe((res) => {
            this.myScore = res.find((r) => r.uid == this.currentUser.uid) ?? {};
            this.mensaje = 'Hola ' + this.currentUser.displayName;

          });
        });
      } else {
        this.currentUser = {};
      }
    });
  }

  ngOnInit() {
    this.getCurrentUser();
    this.simpsonsSv.get().subscribe(res => {
      this.allItems = res.docs;
    });
  }
}
