export class TicketPedido {
    constructor(
        public subtotal?: number,
        public dtoCategorizado?: number,
        public subtotalNeto?: number,
        public subtotalLista?: number,
        public totalFinal?: number,
    ) { }
}
