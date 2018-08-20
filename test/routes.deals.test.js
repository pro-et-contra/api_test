process.env.NODE_ENV = 'test';
const ctx = {};
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const user = { id: 1, username: 'test' }
//const authRoutes = require('./../src/server/routes/auth');
//const dealsRoutes = require('./../src/server/routes/deals');

const dealFunction = require('../src/server/services/deals');

chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : deals', () => {

  before(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); })
  });

  after(() => {
    return knex.migrate.rollback();
  });

  describe('GET /deals', () => {
    it('should check for deals UI', (done) => {
      chai.request(server)
        .get('/deals')
        .end((err, res) => {
          res.type.should.equal('text/html');
          res.text.should.contain('<title>Deals</title>');
          done();
        });
    });
    //it('should return all deals', (done) => {
    //  const ctx = {
    //    params: { id: 1 },
    //    isAuthenticated:()=>{true},
    //    redirect:()=>{},
    //
    //  };
    //  await dealFunction.getDeal(ctx)
    //  console.log(ctx);
    //  done();
    //});
  });


});
