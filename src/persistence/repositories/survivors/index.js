import { Survivors } from "../../models/survivors";
import { DataTypes } from "sequelize";

const usersRepository = ({ db }) => {
  const model = Survivors(db, DataTypes);

  const getAll = async (...args) => {
    const data = await model.findAll(...args);

    return data;
  };

  return { getAll };
};

module.exports = usersRepository;