import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ERole } from '../../class/usuario';
import { Paciente } from '../../../class/usuarios/paciente';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public error = false;
  public mostrarPass = false;

  public role: ERole = ERole.paciente;

  public userEmail: string = '';
  public userPwd: string = '';

  createForm = new FormGroup({
    //uid: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //emailVerified: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    displayName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    //photoURL: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    sexo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    fechaNacimiento: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    //role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  public async createUser() {
    if (this.createForm.valid) {
      //const habilitadoValue = this.createForm.value.habilitado === 'true' ? true : false;

      const newEspecialista: Paciente = {
        //id: this.createForm.value.id ?? '',
        emailVerified: false,

        email: this.createForm.value.email ?? '',
        password: this.createForm.value.password ?? '',
        displayName: this.createForm.value.displayName ?? '',
        nombre: this.createForm.value.nombre ?? '',
        apellido: this.createForm.value.apellido ?? '',
        sexo: this.createForm.value.sexo ?? '',
        dni: this.createForm.value.dni ?? '',
        edad: this.createForm.value.edad ?? '',
        fechaNacimiento: this.createForm.value.fechaNacimiento ?? '',
        role: this.role,
      };

      this.authService.SignUp(newEspecialista);
      // console.log(newEspecialista);
      //this.usuariosService.addItem(newEspecialista);
    } else {
      console.log(
        'El formulario no es válido, realiza alguna acción o muestra un mensaje de error.'
      );
    }
  }

  ngOnInit(): void {
    this.role = this.usuariosService.role;
  }
}
