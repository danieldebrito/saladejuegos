
export enum Estado { desabilitado, habilitado, suspendido };
export enum Roles { cliente, admin, usuario, viajante };

import { Direccion } from "../../class/users/direccion";


export class Usuario extends Direccion {
  constructor(
    public id?: string,
    public uid?: string,
    public email?: string,
    public password?: string,
    public emailVerified?: boolean,
    public estado?: Estado,
    public role?: Roles
  ) { 
    super();
  }
}
