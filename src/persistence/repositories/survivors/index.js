import Survivors from "../../models/survivors";
import { DataTypes } from "sequelize";

const survivorsRepository = ({ db }) => {
  const model = Survivors(db, DataTypes);

  const getAll = async () => {
    const data = await model.findAll();

    console.log(data);

    return data;
  };

  return { getAll };
};

module.exports = survivorsRepository;