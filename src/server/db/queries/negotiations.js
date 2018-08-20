const knex = require('../connection');

function getUserDeals() {
  return knex('deals')
    .select('*');
}
function getNegotiationsByDeal(id) {
  return knex('negotiations')
    .select('*')
    .where({ deal_id: parseInt(id) });
}
function getNegotiationsByDeals(ids) {
  return knex('negotiations')
    .select('*')
    .whereIn('deal_id', ids);
}
function addNegotiation(negotiation) {
  return knex('negotiations')
    .insert(negotiation)
    .returning('*');
}
function updateNegotiation(id, negotiation) {
  return knex('negotiations')
    .update(negotiation)
    .where({ id: parseInt(id) })
    .returning('*');
}
function deleteNegotiation(id) {
  return knex('negotiations')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}
function getLastNegotiation(id) {
  return knex('negotiations')
    .first('*')
    .where({deal_id: id})
    .orderBy('id', 'desc')
    .limit(1);
}
module.exports = {
  getUserDeals,
  getNegotiationsByDeal,
  getNegotiationsByDeals,
  addNegotiation,
  updateNegotiation,
  deleteNegotiation,
  getLastNegotiation,

};
