import Locations from "../../models/locations";
import { DataTypes } from "sequelize";
import { isNil } from "ramda";

const locationsRepository = ({ db }) => {
  const model = Locations(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async (location) => {
    const { dataValues } = await model.create(location);

    return dataValues;
  };

  const findOrCreate = async (location) => {
    const response = await model.findOne({
      where: { ...location }
    });
    
    if(isNil(response)) {
      return await create(location);
    }

    const { dataValues } = response;
    return dataValues;
  };  

  return { findOrCreate, getAll, create };
};

module.exports = locationsRepository;