exports.seed = (knex, Promise) => {
  return knex('deals').truncate()
    .then(() => {
      return knex('deals').insert({
        product_id: 1,
        uid1: 2,
        uid2: 1,
        status: 1,
      });
    })
    .then(() => {
      return knex('deals').insert({
        product_id: 1,
        uid1: 3,
        uid2: 1,
        status: -1,
      });
    })
    .then(() => {
      return knex('deals').insert({
        product_id: 1,
        uid1: 1,
        uid2: 4,
        status: 1,
      });
    });
};