const Router = require('koa-router');
const dealsQueries = require('../db/queries/deals');
const usersQueries = require('../db/queries/users');
const negotiationsQueries = require('../db/queries/negotiations');

const dealFunction = require('../services/deals');

const fs = require('fs');

const DEAL_IN_PROGRESS = 0;
const DEAL_ACCEPTED = 1;
const DEAL_DECLINED = -1;

const router = new Router();
const BASE_URL = `/api/v1/deals`;

function checkDealAccess(ctx, deal) {
  return [deal.uid1, deal.uid2].indexOf(ctx.state.user.id) > -1;
}
function format(dt) {
  return new Date(dt).toISOString().slice(0, 10);
}

//get deals list
router.get(BASE_URL, async (ctx) => {
  if (!ctx.isAuthenticated()) {

    ctx.redirect('/auth/login');
    return false;
  } else
    try {
      var deals = await dealsQueries.getUserDeals(ctx.state.user.id);
      if (deals.length) {
        const users = await usersQueries.getUsers(deals.reduce(function (c, o) {
          c = c.concat([o.uid1, o.uid2])
          return c;
        }, []));
        var negotiations = await negotiationsQueries.getNegotiationsByDeals(
          deals.map(item => item.id));
        deals = deals.reduce(function (c, o) {
          c[o.id] = o;
          return c;
        }, {});
        var negotiationsFormatted = negotiations.reduce(function (c, o) {
          var deal = deals[o.deal_id];
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

          c[o.deal_id] = c[o.deal_id] ||
            { title: 'Deal #' + [o.deal_id], negotiations: [] };
          c[o.deal_id].negotiations.push(formatted);
          return c;
        }, {});

        ctx.body = {
          status: 'success',
          data: Object.values(negotiationsFormatted),
        };

      }
    } catch (err) {
      console.log(err)
    }
})
//get deal

router.get(`${BASE_URL}/:id`, dealFunction.getDeal);
//deal ui
router.get(`/deals`, async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/server/views/deals.html');
});

//new deal
/**
 * { product_id: '1',uid2:2}
 */
router.post(`${BASE_URL}`, async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/auth/login');
    return false;
  }
  try {
    const deal = await dealsQueries.addDeal(
      Object.assign(ctx.request.body,
        { uid1: ctx.state.user.id, status: DEAL_IN_PROGRESS }));
    if (deal.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: deal,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    console.log(err)
  }
});

//new negotiation
/**
 {message: 'I can sell you a bicycle at 100$',price: 100}
 */
router.post(`${BASE_URL}/:id`, async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/auth/login');
    return false;
  }
  try {
    var dealID = ctx.params.id;
    const deal = await dealsQueries.getDeal(dealID);

    if (typeof deal == 'undefined') {
      ctx.status = 200;
      ctx.body = {
        status: 'error',
        message: 'Deal not exists.',
      };
      return false;
    }

    if ([DEAL_ACCEPTED, DEAL_DECLINED].indexOf(parseInt(deal.status)) > -1) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        message: 'Deal was closed.',
      };
      return false;
    }

    const newNegotiation = Object.assign({},
      {
        deal_id: parseInt(ctx.params.id),
        bid_owner: ctx.state.user.id == deal.uid1 ? 1 : 2,
      }, ctx.request.body);

    const previousNegotiations = await negotiationsQueries.getLastNegotiation(
      dealID);
    const negotiations = await negotiationsQueries.addNegotiation(
      newNegotiation);

    if (negotiations.length) {
      /**
       * if proposal was rejected
       */
      var message = '';

      if (newNegotiation.price == -1) {
        await dealsQueries.updateDeal(dealID, { status: -1 })
        message = 'Proposal was declined';
      }
      else if (previousNegotiations
        && parseFloat(previousNegotiations.price) ==
        parseFloat(newNegotiation.price) &&
        parseInt(previousNegotiations.bid_owner) !=
        parseInt(newNegotiation.bid_owner)) {

        await dealsQueries.updateDeal(dealID, { status: 1 })
        message = 'Proposal was accepted';
      }
      /**
       *
       */
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: message,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
