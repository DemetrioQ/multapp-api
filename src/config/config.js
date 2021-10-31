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
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    dialect: 'mssql',
    dialectModule: tedious,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
