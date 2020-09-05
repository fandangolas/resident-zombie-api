import Survivors from "../../models/survivors";
import { DataTypes } from "sequelize";

const survivorsRepository = ({ db }) => {
  const model = Survivors(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async (survivor, transaction) => {
    const { dataValues } = await model.create(survivor, { transaction });

    return dataValues;
  };

  return { getAll, create };
};

module.exports = survivorsRepository;