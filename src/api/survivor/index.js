import Survivor from "../../domain/survivor/survivor";
import { v4 as uuidv4 } from 'uuid';

const survivorModule = ({ survivorsRepository }) => {
  const create = async ({ body }) => {
    try {
      const entity = Survivor(body);

      const { lastLocation, items, ...survivorProps } = entity;

      const locationId = "8d5c03ce-d49e-407f-926c-066946748761";

      const location = { id: locationId , ...lastLocation };

      const survivor = { ...survivorProps, lastLocation: locationId };

      const data = await survivorsRepository.create(survivor);
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return { create };
};

export default survivorModule;
