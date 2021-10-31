const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const env = process.env;

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
    use_env_variable: 'DATABASE_URL',
    dialect: 'mssql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
