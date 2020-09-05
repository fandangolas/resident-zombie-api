import Survivor from "../../domain/survivor/survivor";
import { v4 as uuidv4 } from 'uuid';

const survivorModule = ({ survivorsRepository, locationsRepository }) => {
  const create = async ({ body }) => {
    try {
      const entity = Survivor(body);
      const { lastLocation, items, ...survivor } = entity;

      const locationId = uuidv4();

      await locationsRepository.create({ id: locationId , ...lastLocation });

      await survivorsRepository.create({ ...survivor, lastLocation: locationId });
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return { create };
};

export default survivorModule;
