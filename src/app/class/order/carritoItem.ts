import { Cliente } from "../users/cliente";
import { Articulo } from "../products/products/articulo";

export class CarritoItem {
    constructor(
        public id?: string,
        public articulo?: Articulo,
        public cantidad?: number,
        public cliente?: Cliente,
        public abierto?: boolean
    ) { }
}
