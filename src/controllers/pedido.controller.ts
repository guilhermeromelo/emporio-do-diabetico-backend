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
import {Pedido} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) {}

  @post('/pedidos')
  @response(200, {
    description: 'Pedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedido',
            exclude: ['id'],
          }),
        },
      },
    })
    pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    //const order = pedido;
    //order.dataPedido = new Date().toString();
    return this.pedidoRepository.create(pedido);
  }

  @get('/pedidos')
  @response(200, {
    description: 'Array of Pedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Pedido) filter?: Filter<Pedido>): Promise<Pedido[]> {
    return this.pedidoRepository.find(filter);
  }

  @get('/pedidos/{id}')
  @response(200, {
    description: 'Pedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pedido, {exclude: 'where'})
    filter?: FilterExcludingWhere<Pedido>,
  ): Promise<Pedido> {
    return this.pedidoRepository.findById(id, filter);
  }

  @get('/pedidos/cliente/{id}')
  @response(200, {
    description: 'Pedido model instance',
  })
  async findByClienteId(
    @param.path.number('id') id: number,
  ): Promise<Pedido[]> {
    const filter: Filter<Pedido> = {where: {clienteId: id}};
    return this.pedidoRepository.find(filter);
  }

  @patch('/pedidos/{id}')
  @response(204, {
    description: 'Pedido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.updateById(id, pedido);
  }

  @del('/pedidos/{id}')
  @response(204, {
    description: 'Pedido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidoRepository.deleteById(id);
  }
}
