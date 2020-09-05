import Survivor from "../../domain/survivor/";

const survivorModule = ({
  survivorsRepository,
  locationsRepository,
  survivorItemsRepository
}) => {
  const create = async ({ body }) => {
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
      console.log(error);
    }
  };

  return { create };
};

export default survivorModule;
