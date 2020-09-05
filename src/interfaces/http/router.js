const { Router } = require("express");

import survivorRouter from "./modules/survivor/router";

const router = ({ survivorModule }) => {
  const apiRouter = Router();

  apiRouter.use('/api/survivors', survivorRouter({ survivorModule }));

  return apiRouter;
};

export default router;