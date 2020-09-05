import Survivor from "../../domain/survivor/";

const survivorModule = ({
  survivorsRepository,
  locationsRepository,
  survivorItemsRepository,
  logger,
  db
}) => {
  const create = async ({ body }) => {
    const t = await db.transaction();

    try {
      const { lastLocation, items, ...survivor } = Survivor(body);      

      const location = await locationsRepository.findOrCreate(lastLocation, t);

      const createdSurvivor = await survivorsRepository.create({
        ...survivor,
        lastLocation: location.id
      }, t);

      await survivorItemsRepository
            .createItemsForGivenSurvivor({
              survivorId: createdSurvivor.id,
              items
            }, t);

      await t.commit();

      return { ...createdSurvivor, items };
    }
    
    catch (error) {
      await t.rollback();
      logger.error(error);
    }
  };

  return { create };
};

export default survivorModule;
