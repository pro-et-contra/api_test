const dealsQueries = require('../db/queries/deals');
const usersQueries = require('../db/queries/users');
const negotiationsQueries = require('../db/queries/negotiations');

function checkDealAccess(ctx, deal) {
  return [deal.uid1, deal.uid2].indexOf(ctx.state.user.id) > -1;
}

module.exports = {
  getDeal: async (ctx) => {
    console.log(ctx);
    if (!ctx.isAuthenticated()) {
      ctx.redirect('/auth/login');
      return false;
    }
    try {
      const deal = await dealsQueries.getDeal(ctx.params.id);
      if (deal) {
        if (!checkDealAccess(ctx, deal)) {
          ctx.status = 403;
          ctx.body = {
            status: 'error',
            message: 'Access denied.',
          };
          return false;
        }
        const users = await usersQueries.getUsers([deal.uid1, deal.uid2]);
        var negotiations = await negotiationsQueries.getNegotiationsByDeal(
          ctx.params.id);
        var negotiationsFormatted = negotiations.reduce(function (c, o) {
          var formatted = {};
          formatted.date = new Date(o.date).toISOString().slice(0, 10);
          var sender = users[deal['uid' + o.bid_owner]],
            receiver = users[deal['uid' + (o.bid_owner == '1' ? '2' : '1')]];
          formatted.sender = sender.id == ctx.state.user.id
            ? 'Me'
            : sender.username;
          formatted.receiver = receiver.id == ctx.state.user.id
            ? 'Me'
            : receiver.username;
          formatted.message = o.message;
          formatted.price = o.price;
          c.push(formatted);
          return c;
        }, []);
        ctx.body = {
          status: 'success',
          data: negotiationsFormatted,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That deal does not exist or negotiations not found.',
        };
      }
    } catch (err) {
      console.log(err)
    }
  }
};