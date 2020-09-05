import { Router } from "express";

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

  return router;
};

export default router;