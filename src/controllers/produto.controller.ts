import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Produto} from '../models/produto.model';
import {ProdutoRepository} from '../repositories';

export class ProdutoController {
  constructor(
    @repository(ProdutoRepository)
    public produtoRepository: ProdutoRepository,
  ) {}

  @post('/produtos')
  @response(200, {
    description: 'Produto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Produto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produto, {
            title: 'NewProduto',
            exclude: ['id'],
          }),
        },
      },
    })
    produto: Omit<Produto, 'id'>,
  ): Promise<Produto> {
    return this.produtoRepository.create(produto);
  }

  @get('/produtos')
  @response(200, {
    description: 'Array of Produto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Produto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Produto) filter?: Filter<Produto>,
  ): Promise<Produto[]> {
    return this.produtoRepository.find(filter);
  }

  @get('/produtos/{id}')
  @response(200, {
    description: 'Produto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Produto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Produto, {exclude: 'where'})
    filter?: FilterExcludingWhere<Produto>,
  ): Promise<Produto> {
    return this.produtoRepository.findById(id, filter);
  }

  @patch('/produtos/{id}')
  @response(204, {
    description: 'Produto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produto, {partial: true}),
        },
      },
    })
    produto: Produto,
  ): Promise<void> {
    await this.produtoRepository.updateById(id, produto);
  }

  @del('/produtos/{id}')
  @response(204, {
    description: 'Produto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.produtoRepository.deleteById(id);
  }
}
