import { DefaultContext } from 'koa'
import Knex from 'knex'

export interface IApiContext extends DefaultContext {
  db: Knex
}
