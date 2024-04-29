export enum EstadosPedido { leido, noleido, anulado, entregado }

export class Pedido {
  constructor(
    public id?: number,
    public idCliente?: string,
    public idSucursal?: number,
    public idExpreso?: number,
    public estado?: EstadosPedido,
    public observaciones?: string,
    public fechaHora?: string
  ) { }
}
