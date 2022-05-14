import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Endereco} from './endereco.model';
import {Produto} from './produto.model';

@model({settings: {strict: false}})
export class Pedido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  itens: Produto[];

  @property({
    type: 'number',
    required: false,
    postgresql: {
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 2,
    },
  })
  totalPrice?: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @property({
    type: 'object',
    required: true,
  })
  enderecoEntrega: Endereco;

  @property({
    type: 'date',
    default: new Date().toString(),
  })
  dataPedido?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
