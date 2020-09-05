import { Sequelize } from "sequelize";

//Apparently Sequelize has a problem with MSSQL's datetime format
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = ({ configs }) => {
  const connection = new Sequelize(
    configs.dbName,
    configs.dbUser,
    configs.dbPassword,
    {
      host: configs.dbHost,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
  
  return connection;
};

export default sequelize;