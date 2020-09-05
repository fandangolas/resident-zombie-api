import bodyParser from "body-parser";
import express from 'express';

const server = ({ configs, router, logger }) => {
  const app = express();

  app.use(bodyParser.json());

  app.use(router);

  return {
    start: () =>
      app.listen(configs.port, () =>
        logger.info(`Application running on port ${configs.port}`))
  };
};

export default server;