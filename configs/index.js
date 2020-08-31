import dotenv from "dotenv";
dotenv.config();

module.exports = {
  pgsqlUser: process.env.PGSQL_USER,
  pgsqlPassword: process.env.PGSQL_PASSWORD,
  pgsqlBaseUrl: process.env.PGSQL_BASEURL,
  pgsqlConnectionString: process.env.PGSQL_CONNECTIONSTRING,
  port: process.env.PORT
};