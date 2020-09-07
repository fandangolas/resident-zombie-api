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

  const findById = async (survivorId, transaction) => {
    const survivor = await model.findByPk(survivorId, { transaction });

    if(isNil(survivor)) {
      return {};
    }

    const { dataValues } = survivor;
    return dataValues;
  };

  const updateLastLocation = async (survivorId, locationId, transaction) =>
    await model.update(
      {
        lastLocation: locationId
      },
      {
        where: { id: survivorId }
      },
      {
        transaction
      });

  return {
    getAll,
    create,
    findById,
    updateLastLocation
  };
};

module.exports = survivorsRepository;