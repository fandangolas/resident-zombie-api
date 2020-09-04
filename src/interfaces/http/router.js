const { Router } = require("express");

import survivor from "./modules/survivor";

const router = ({}) => {
  const apiRouter = Router();

  apiRouter.use('/api/survivors', survivor().router);

  return apiRouter;
};

export default router;