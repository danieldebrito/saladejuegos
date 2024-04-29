import { Usuario } from "../../class/users/usuario";

export class Cliente extends Usuario {
  constructor(
    public idCliente?: string,
    public razonSocial?: string,
    public cuit?: string,
    public telefonoLinea?: string,
    public telefonoCelular?: string,
    public comprador?: string,
    public tieneDtoCateg?: string,
    public updated_at?: string,
    public created_at?: string
  ) {
    super();
  }
}



/*   ///  USUARIO  ////////////
    public id?: string,
    public uid?: string,
    public email?: string,
    public password?: string,
    public emailVerified?: boolean,
    public estado?: Estado,
    public role?: Roles
*/




/*   ///  USUARIO  ////////////
    public razonSocial?: string,
    public calleAndNumero?: string,
    public localidad?: string,
    public provincia?: string,
    public cp?: string,
    public cuit?: string,
    public telefonoLinea?: string,
    public telefonoCelular?: string,
    public comprador?: string,
    public tieneDtoCateg?: string,
    public id?: string,
    public uid?: string,
    public email?: string,
    public password?: string,
    public emailVerified?: boolean,
    public estado?: Estado,
    public role?: Roles
*/