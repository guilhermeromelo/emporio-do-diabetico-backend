import {Filter, repository} from '@loopback/repository';
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
import {BlogPost} from '../models';
import {BlogPostRepository} from '../repositories';

export class BlogPostController {
  constructor(
    @repository(BlogPostRepository)
    public blogPostRepository: BlogPostRepository,
  ) {}

  @post('/blog-posts')
  @response(200, {
    description: 'BlogPost model instance',
    content: {'application/json': {schema: getModelSchemaRef(BlogPost)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BlogPost, {
            title: 'NewBlogPost',
            exclude: ['id'],
          }),
        },
      },
    })
    blogPost: Omit<BlogPost, 'id'>,
  ): Promise<BlogPost> {
    return this.blogPostRepository.create(blogPost);
  }

  @get('/blog-posts')
  @response(200, {
    description: 'Array of BlogPost model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BlogPost, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BlogPost) filter?: Filter<BlogPost>,
  ): Promise<BlogPost[]> {
    return this.blogPostRepository.find(filter);
  }

  @patch('/blog-posts/{id}')
  @response(204, {
    description: 'BlogPost PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BlogPost, {partial: true}),
        },
      },
    })
    blogPost: BlogPost,
  ): Promise<void> {
    await this.blogPostRepository.updateById(id, blogPost);
  }

  @del('/blog-posts/{id}')
  @response(204, {
    description: 'BlogPost DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.blogPostRepository.deleteById(id);
  }
}
