export class DescuentoCliente {
    constructor(
        public id?: number,
        public idCliente?: string,
        public idProducto?: string,
        public idDescuento?: number,
        public utilidadCoeficiente?: number,  /// no usar
        public updated_at?: string,
        public created_at?: string
    ) { }
}
