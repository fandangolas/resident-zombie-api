import Survivor from "../../domain/survivor/survivor";

const survivorModule = ({ survivorsRepository }) => {
  const create = async ({ body }) => {
    try {
      const entity = Survivor(body);

      const { lastLocation, items, } = entity;

      await survivorsRepository.getAll();
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return { create };
};

export default survivorModule;
