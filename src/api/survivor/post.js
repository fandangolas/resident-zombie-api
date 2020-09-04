import Survivor from "../../domain/survivor/survivor";

const post = () => {
  const create = ({ body }) => {
    try {
      const entity = Survivor(body);

      const { lastLocation, items } = entity;

      console.log(lastLocation, items);      
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return { create };
};

export default post;
