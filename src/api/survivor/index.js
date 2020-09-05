import Survivor from "../../domain/survivor/";
//import sequelize from "sequelize";

const survivorModule = ({
  survivorsRepository,
  locationsRepository,
  survivorItemsRepository,
  logger
}) => {
  const create = async ({ body }) => {
    //TODO: add a transactional scope for these queries
    //const t = await sequelize.transaction();

    try {
      const { lastLocation, items, ...survivor } = Survivor(body);      

      const location = await locationsRepository.findOrCreate(lastLocation);

      const createdSurvivor = await survivorsRepository.create({
        ...survivor,
        lastLocation: location.id
      });

      await survivorItemsRepository
            .createItemsForGivenSurvivor(createdSurvivor.id, items);

      return { ...createdSurvivor, items };
    }
    
    catch (error) {
      logger.error(error);
    }
  };

  return { create };
};

export default survivorModule;
