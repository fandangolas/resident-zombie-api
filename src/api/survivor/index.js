import Survivor from "../../domain/survivor/survivor";

const survivorModule = ({ survivorsRepository, locationsRepository }) => {
  const create = async ({ body }) => {
    try {
      const entity = Survivor(body);
      const { lastLocation, items, ...survivor } = entity;

      const location = await locationsRepository.findOrCreate(lastLocation);

      await survivorsRepository.create({
        ...survivor,
        lastLocation: location.id
      });
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return { create };
};

export default survivorModule;
