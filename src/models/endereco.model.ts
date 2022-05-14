import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Endereco extends Entity {
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
  rua: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
  })
  bairro: string;

  @property({
    type: 'string',
    required: true,
  })
  cidade: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  nomeResponsavel: string;

  @property({
    type: 'number',
  })
  clienteId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Endereco>) {
    super(data);
  }
}

export interface EnderecoRelations {
  // describe navigational properties here
}

export type EnderecoWithRelations = Endereco & EnderecoRelations;
