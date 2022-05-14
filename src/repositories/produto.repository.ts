import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Produto, ProdutoRelations} from '../models/produto.model';

export class ProdutoRepository extends DefaultCrudRepository<
  Produto,
  typeof Produto.prototype.id,
  ProdutoRelations
> {
  constructor(@inject('datasources.database') dataSource: DatabaseDataSource) {
    super(Produto, dataSource);
  }
}
