import Items from "../../models/items";
import { DataTypes } from "sequelize";

const itemsRepository = ({ db }) => {
  const model = Items(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async item => {
    const { dataValues } = await model.create(item);

    return dataValues;
  };

  return { getAll, create };
};

module.exports = itemsRepository;