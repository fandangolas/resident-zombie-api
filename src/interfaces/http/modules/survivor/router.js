import { Router } from "express";

const router = ({ postUseCase }) => {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const data = await postUseCase.create({ body: req.body });

      return res.status(200).json(data);
    }
    
    catch (error) {
      console.log(error);
    }    
  });

  return router;
};

export default router;