
exports.up = function (knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary()
    table.string('desc').notNull()
    table.datetime('estimated_at')
    table.datetime('done_at')
    table.integer('id_user').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}
