const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const env = process.env;
const tedious = require('tedious');

module.exports = {
  development: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    dialect: 'mssql',
  },
  test: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    dialect: 'mssql',
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mssql',
    dialectModule: tedious,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  secret: env.secret,
  user: env.emailUser,
  pass: env.emailPassword,
};
