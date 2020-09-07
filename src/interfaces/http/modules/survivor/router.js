import { Router } from "express";
import { isEmpty } from "ramda";

const router = ({ survivorModule, logger }) => {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const data = await survivorModule.create({ body: req.body });

      return res.status(200).json(data);
    }
    
    catch (error) {
      logger.error(error);
    }
  });

  router.put('/:id/location', async (req, res) => {
    const data = await survivorModule.updateLocation({
      body: req.body,
      survivorId: req.params.id
    });

    if(!isEmpty(data)) {
      return res.status(200).json(data);
    }

    return res.status(404).json({ error: "Survivor not registered!" });
  });

  return router;
};

export default router;