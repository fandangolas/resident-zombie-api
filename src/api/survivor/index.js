import Survivor from "../../domain/survivor/";
import Location from "../../domain/location/";

const survivorModule = ({
  survivorsRepository,
  locationsRepository,
  survivorItemsRepository,
  logger,
  db
}) => {
  const create = async ({ body }) => {
    try {
      const { lastLocation, items, ...survivor } = Survivor(body);

      const createdSurvivor = await db.transaction(async (t) => {
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

        return { ...createdSurvivor, items };    
      });

      return createdSurvivor;      
    }
    
    catch (error) {
      logger.error(error);
    }
  };

  const updateLocation = async ({ body, survivorId }) => {
    try {
      const location = Location(body);

      const updatedLocation = await db.transaction(async (t) => {
        const survivor = await survivorsRepository.findById(survivorId, t);
        //const location = await locationsRepository.findOrCreate(location, t);
        return survivor;
      });

      return { updatedLocation };
    }
    
    catch (error) {
      logger.error(error);
    }    
  };

  return { create, updateLocation };
};

export default survivorModule;
