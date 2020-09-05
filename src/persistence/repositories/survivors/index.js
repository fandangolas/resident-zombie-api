import Survivors from "../../models/survivors";
import { DataTypes } from "sequelize";

const survivorsRepository = ({ db }) => {
  const model = Survivors(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async survivor => {
    const { dataValues } = await model.create(survivor);

    return dataValues;
  };

  return { getAll, create };
};

module.exports = survivorsRepository;