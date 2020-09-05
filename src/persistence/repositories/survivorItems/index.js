import SurvivorItems from "../../models/survivorItems";
import { DataTypes } from "sequelize";

const survivorItemsRepository = ({ db }) => {
  const model = SurvivorItems(db, DataTypes);

  const createItemForGivenSurvivor = async (data, transaction) => {
    const { dataValues } = await model.create(data, { transaction });
    return dataValues;
  };

  const createItemsForGivenSurvivor = async ({
       survivorId,
       items
    }, transaction) => {
    for (const item of items) {
      await createItemForGivenSurvivor({
        survivorId,
        itemId: item.id,
        amount: item.amount
      }, transaction);
    }
  };

  return { createItemForGivenSurvivor, createItemsForGivenSurvivor };
};

module.exports = survivorItemsRepository;