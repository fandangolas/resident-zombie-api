import { Sequelize } from "sequelize";

const sequelize = ({ configs }) => {

  const connection = new Sequelize(
    configs.dbName,
    configs.dbUser,
    configs.dbPassword,
    {
      dbHost: configs.dbHost,
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