const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const indexRoutes = require('./routes/index');
const authRoutes  = require('./routes/auth');
const dealsRoutes  = require('./routes/deals');

const app = new Koa();
const PORT = process.env.PORT || 43037;

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRoutes.routes());
app.use(dealsRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
