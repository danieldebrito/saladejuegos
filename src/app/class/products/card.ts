export class Card {
    constructor(
        public idArticulo?: string,
        public linea?: string,
        public marca?: string,
        public combustible?: string,
        public motor?: string,
        public modelo?: string,
        public cilindrada?: string,
        public competicion?: string,
        public producto?: string,
        public aplicacion?: string,
        public aplicacionEspecifica?: string,
        public urlImgPeq?: string,
        public materialDetalle?: string,
        public espesor?: string,
        public nueva?: number,
        public promo?: number,
        public stock?: number,
        public prioridadBusqueda?: number,
        public precioLista ?: number,
        public precioNeto?: number
    ) { }
}
