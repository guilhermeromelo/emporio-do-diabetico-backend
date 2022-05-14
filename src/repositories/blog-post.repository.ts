import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {BlogPost, BlogPostRelations} from '../models';

export class BlogPostRepository extends DefaultCrudRepository<
  BlogPost,
  typeof BlogPost.prototype.id,
  BlogPostRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(BlogPost, dataSource);
  }
}
