import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Cliente, ClienteRelations, Endereco} from '../models';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {
  public readonly enderecos: HasManyRepositoryFactory<
    Endereco,
    typeof Cliente.prototype.id
  >;

  constructor(@inject('datasources.database') dataSource: DatabaseDataSource) {
    super(Cliente, dataSource);
  }
}
