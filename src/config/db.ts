import Knex from 'knex'
import config from '../../knexfile'

const _knex: Knex = Knex(config)

// @ts-ignore
_knex.migrate.latest([config])

export default _knex
