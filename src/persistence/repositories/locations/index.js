import Locations from "../../models/locations";
import { DataTypes } from "sequelize";

const locationsRepository = ({ db }) => {
  const model = Locations(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async location => {
    const { dataValues } = await model.create(location);

    return dataValues;
  };

  return { getAll, create };
};

module.exports = locationsRepository;