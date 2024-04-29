import { Usuario } from "src/app/class/users/usuario";

export class Empleado extends Usuario {
  constructor(
    public legajo?: string,
    public nombre?: string,
    public apellido?: string,
    public cuil?: string,
    public telefonoLinea?: string,
    public telefonoCelular?: string,
  ) {
    super();
  }
}



/*
     nombre?: string,
     apellido?: string,
     calleAndNumero?: string,
     localidad?: string,
     provincia?: string,
     cp?: string,
     cuil?: string,
     telefonoLinea?: string,
     telefonoCelular?: string,
     id?: string,
     uid?: string,
     email?: string,
     password?: string,
     emailVerified?: boolean,
     estado?: Estado,
     role?: Roles

*/