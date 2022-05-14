import {Entity, hasMany, model, property} from '@loopback/repository';
import {Endereco} from './endereco.model';

@model({settings: {strict: false}})
export class Cliente extends Entity {
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
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'string',
    required: true,
  })
  telefone: string;

  @hasMany(() => Endereco)
  enderecos: Endereco[];

  @property({
    type: 'string',
    required: true,
    hidden: true,
  })
  senha: string;

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

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
