import SurvivorItems from "../../models/survivorItems";
import { DataTypes } from "sequelize";

const survivorItemsRepository = ({ db }) => {
  const model = SurvivorItems(db, DataTypes);

  const createItemForGivenSurvivor = async (data) => {
    const { dataValues } = await model.create(data);
    return dataValues;
  };

  const createItemsForGivenSurvivor = async (survivorId, items) => {
    for (const item of items) {
      await createItemForGivenSurvivor({
        survivorId,
        itemId: item.id,
        amount: item.amount
      });
    }
  };

  return { createItemForGivenSurvivor, createItemsForGivenSurvivor };
};

module.exports = survivorItemsRepository;