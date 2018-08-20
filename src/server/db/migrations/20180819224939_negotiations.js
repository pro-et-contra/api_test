exports.up = (knex, Promise) => {
  return knex.schema.createTable('negotiations', (table) => {
    table.increments();
    table.integer('deal_id').notNullable();

    table.string('bid_owner').notNullable();

    //table.date('date').notNullable();
    table.string('message').notNullable();
    table.float('price').notNullable();

    table.timestamp('date').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('negotiations');
};