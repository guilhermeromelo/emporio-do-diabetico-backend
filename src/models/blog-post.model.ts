import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class BlogPost extends Entity {
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
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  intro: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: false,
  })
  image: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BlogPost>) {
    super(data);
  }
}

export interface BlogPostRelations {
  // describe navigational properties here
}

export type BlogPostWithRelations = BlogPost & BlogPostRelations;
