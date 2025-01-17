import Survivor from "../../domain/survivor/";
import Location from "../../domain/location/";
import { isEmpty } from "ramda";

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
      const requestLocation = Location(body);

      const survivor = await survivorsRepository.findById(survivorId);
        
      if(!isEmpty(survivor)) {
        const { id } = await locationsRepository.findOrCreate(requestLocation, null);
          
        await survivorsRepository.updateLastLocation(survivorId, id);

        const { lastLocation: oldLocation, ...survivorProps } = survivor;

        return { ...survivorProps, lastLocation: id };
      }

      return survivor;
    }
    
    catch (error) {
      logger.error(error);
    }    
  };

  return { create, updateLocation };
};

export default survivorModule;
