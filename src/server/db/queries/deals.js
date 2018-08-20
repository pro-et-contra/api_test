const knex = require('../connection');

function getUserDeals(uid) {
  return knex('deals')
    .select('*')
    .where('uid1',uid)
    .orWhere('uid2',uid);
}
function getDeal(id) {
  return knex('deals')
    .first('*')
    .where({ id: parseInt(id) })
}
function addDeal(deal) {
  return knex('deals')
    .insert(deal)
    .returning('*');
}
function updateDeal(id, deal) {
  return knex('deals')
    .update(deal)
    .where({ id: parseInt(id) })
    .returning('*');
}
function deleteDeal(id) {
  return knex('deals')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  getUserDeals,
  getDeal,
  addDeal,
  updateDeal,
  deleteDeal,
};
