exports.up = (knex, Promise) => {
  return knex.schema.createTable('deals', (table) => {
    table.increments();
    table.integer('product_id').notNullable();
    table.integer('uid1').notNullable();
    table.integer('uid2').notNullable();
    table.integer('status').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('deals');
};