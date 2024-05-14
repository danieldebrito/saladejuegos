import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';
import { UserLog } from '../class/userLog';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LogUserService } from './log-user.service';
import { ERole, Usuario } from '../class/usuario';
import { UsuariosService } from './usuarios.service';
import { clientesPHPservice } from '../../services/php/clientesPHP.service';
import { Cliente } from '../../class/users/cliente';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public currentUser: Usuario = {};

  userData: any; // Save logged in user data
  private _userLoggedOutSubject = new Subject<void>();

  constructor(
    private clientesSv: clientesPHPservice,
    private logService: LogUserService,
    public afsA: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
          localStorage.removeItem('user');
        }
      }
    });
  }

  get userLoggedOut$(): Observable<void> {
    return this._userLoggedOutSubject.asObservable();
  }
  
  // Sign in with email/password
  SignIn(usuario: any) {
    return this.afAuth
      .signInWithEmailAndPassword(usuario.email, usuario.password)
      .then((result) => {
        this.SetUserData(result.user, usuario);
        this.afAuth.authState.subscribe((user) => {

          ////////////////  guardo el log ///////////////////////////////////
          if (user) {
            let log: UserLog = {
              usuario: usuario,
              fechaIngreso: new Date(),
            };

            this.logService.addItem(log);
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "email o password incorrecto!",
        });

       console.log(error.message);
      });
  }
  // Sign up with email/password
  SignUp(usuario: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((result) => {
        let user: any = result.user;

        console.log(user);
        this.SetUserData(result.user, usuario);
        //this.usuariosService.addItem(usuario);

        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();

        return user;
      })
      .catch((error) => {
        window.alert(error.message);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });

      });
  }
  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  async SetUserData(userFirebase: any, userFormulario: any) {
    const userRef: AngularFirestoreDocument<any> = this.afsA.doc(
      `usuarios/${userFirebase.uid}`
    );

    userFormulario.uid = userFirebase.uid;
    userFormulario.email = userFirebase.email;
    // userFormulario.displayName = userFirebase.displayName;     // saco el displayName
    //userFormulario.photoURL = userFirebase.photoURL;
    userFormulario.emailVerified = userFirebase.emailVerified;

    console.log(userFirebase.emailVerified);

    return userRef.set(userFormulario, {
      merge: true,
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    console.log(user);

    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
      this.userData = null;
      // Emitir evento de cierre de sesión
      this._userLoggedOutSubject.next();
    });
  }

  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  public getUserByID(id: string): Observable<any> {
    const documento = this.afsA.doc<User>(`users/${id}`);

    const observable = documento.valueChanges().pipe(
      catchError((err) => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );

    return observable;
  }

  public getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {

          return this.clientesSv.getByUid(user.uid);
        } else {
          return of({ email: '', password: '' });
        }
      }),
      catchError((error) => {
        console.error('Error obteniendo usuario:', error);
        return of({ email: '', password: '' });
      })
    );
  }

  // Método para verificar si el usuario actual es un paciente
  isPaciente(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Obtener el documento del usuario desde la colección 'usuarios'
          return this.afsA.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return [];
      }),
      map((usuario: any) => {
        if (usuario) {
          return usuario.emailVerified && (usuario.role === ERole.paciente  || usuario.role === ERole.administrador);
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error al verificar si es paciente:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para verificar si el usuario actual es un admin
  isAdmin(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Obtener el documento del usuario desde la colección 'usuarios'
          return this.afsA.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return [];
      }),
      map((usuario: any) => {
        if (usuario) {
          return usuario.emailVerified && usuario.role === ERole.administrador;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error al verificar si es admin:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para verificar si el usuario actual es un admin
  isEspecialista(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Obtener el documento del usuario desde la colección 'usuarios'
          return this.afsA.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return [];
      }),
      map((usuario: any) => {
        if (usuario) {
          return usuario.habilitado && usuario.emailVerified && (usuario.role === ERole.especialista  || usuario.role === ERole.administrador);
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error al verificar si es admin:', error);
        return throwError(() => error);
      })
    );
  }
}
