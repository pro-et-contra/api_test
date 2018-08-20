function format(dt) {
  return new Date(dt).toISOString().slice(0, 10);
}
exports.seed = (knex, Promise) => {
  return knex('negotiations').truncate()
  // Deal #1
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 1,
        bid_owner: '1',
        date: format('2018-01-01'),
        message: 'Hi! I have a CD reader for you at discounted price',
        price: 50,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 1,
        bid_owner: '2',
        date: format('2018-01-02'),
        message: 'I can buy it at better price',
        price: 40,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 1,
        bid_owner: '1',
        date: format('2018-01-03'),
        message: 'Ok, deal!',
        price: 40,
      });
    })
    // Deal #2
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 2,
        bid_owner: '1',
        date: format('2018-01-01'),
        message: 'I can sell you a bicycle at 100$',
        price: 100,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 2,
        bid_owner: '2',
        date: format('2018-01-02'),
        message: 'It\'s too expensive!',
        price: 50,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 2,
        bid_owner: '1',
        date: format('2018-01-03'),
        message: 'I think the new price will fit you.',
        price: 70,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 2,
        bid_owner: '2',
        date: format('2018-01-04'),
        message: 'I insist on better price',
        price: 60,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 2,
        bid_owner: '1',
        date: format('2018-01-05'),
        message: 'No, I cannot afford it to me.',
        price: -1,
      });
    })
    // Deal #3
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 3,
        bid_owner: '1',
        date: format('2018-01-01'),
        message: 'I\'ll sell you iPhone at 200$',
        price: 200,
      });
    })
    .then(() => {
      return knex('negotiations').insert({
        deal_id: 3,
        bid_owner: '2',
        date: format('2018-01-02'),
        message: 'It\'s great! Thanks',
        price: 200,
      });
    })
    ;
};