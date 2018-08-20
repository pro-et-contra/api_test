const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('test', salt);
  return knex('users').truncate()
    .then(() => {
      return Promise.join(
        knex('users').insert({
          username: 'test',
          password: hash,
        }),
      );
    })
    .then(() => {
      return Promise.join(
        knex('users').insert({
          username: 'Alex Popov',
          password: hash,
        }),
      );
    })
    .then(() => {
      return Promise.join(
        knex('users').insert({
          username: 'Vladimir Samoylov',
          password: hash,
        }),
      );
    })
    .then(() => {
      return Promise.join(
        knex('users').insert({
          username: 'Michael Ivanov',
          password: hash,
        }),
      );
    });
};