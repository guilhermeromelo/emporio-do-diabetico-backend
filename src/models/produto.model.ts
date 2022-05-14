import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Produto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
  })
  subtitulo?: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 2,
    },
  })
  preco: number;

  @property({
    type: 'string',
    required: true,
  })
  imagem: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  dataCriacao?: string;

  @property({
    type: 'date',
    default: null,
  })
  dataAlteracao?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Produto>) {
    super(data);
  }
}

export interface ProdutoRelations {
  // describe navigational properties here
}

export type ProdutoWithRelations = Produto & ProdutoRelations;
