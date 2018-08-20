const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    //connection: 'postgres://postgres:@localhost:5432/test',
    connection: 'postgres://postgres:@api_test_postgres_1:5432/test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    //connection: 'postgres://postgres:@localhost:5432/api',
    connection: 'postgres://postgres:@api_test_postgres_1:5432/api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};