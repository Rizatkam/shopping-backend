const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_PORT,
} = process.env;
const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    min: 1,
    max: 5,
    acquire: 30000,
    idle: 60000,
  },
});
module.exports = connection;
