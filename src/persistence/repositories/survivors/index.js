import Survivors from "../../models/survivors";
import { DataTypes } from "sequelize";
import { isNil } from "ramda";

const survivorsRepository = ({ db }) => {
  const model = Survivors(db, DataTypes);

  const getAll = async () => await model.findAll();

  const create = async (survivor, transaction) => {
    const { dataValues } = await model.create(survivor, { transaction });

    return dataValues;
  };

  const findById = async (survivorId) => {
    const survivor = await model.findByPk(survivorId);

    if(isNil(survivor)) {
      return {};
    }

    const { dataValues } = survivor;
    return dataValues;
  };

  const updateLastLocation = async (survivorId, locationId) =>
    await model.update(
      { lastLocation: locationId },
      { where: { id: survivorId } });

  return {
    getAll,
    create,
    findById,
    updateLastLocation
  };
};

module.exports = survivorsRepository;