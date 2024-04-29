export class Articulo {
    constructor(
        public idArticulo?: string,
        public idProducto?: string,
        public idAplicacion?: string,
        public idMaterial?: string,
        public descripcionCorta?: string,
        public noComercializable?: boolean,
        public noMostrar?: string,
        public stock?: string,
        public unid_pack_jgo_tapa?: string,
        public cantKit?: string,
        public packVenta?: string,
        public preciolista?: number,
        public precioNeto?: number,
        public imgPeqURL?: string,
        public imgGrandeURL?: string,
        public imgEnvaseURL?: string,
        public pdfCatalogo?: string,
        public prioridadBusquedas?: string,
        public enPromocion?: string,
        public nuevoLanzamiento?: string,
        public origen?: string
    ) { }
}
