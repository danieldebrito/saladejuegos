export class PedidoItem {
  constructor(
    public id?: string,
    public idPedido?: number,
    public idCliente?: string,
    public idArticulo?: string,
    public idProducto?: string,
    public aplicacion?: string,
    public descripcionCorta?: string,
    public descripcion?: string, // Add the 'descripcion' property
    public cantidad?: number,
    public preciolista?: number,
    public precioneto?: number,
    public preciocategorizado?: number,
    public updated_at?: string,
    public created_at?: string
  ) { }
}