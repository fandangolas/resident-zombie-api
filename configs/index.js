import dotenv from "dotenv";
dotenv.config();

module.exports = {
  dbName: process.env.DB,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  port: process.env.PORT
};