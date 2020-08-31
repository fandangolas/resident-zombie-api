import bodyParser from "body-parser";
import express from 'express';

const server = ({ configs }) => {
  const app = express();

  app.use(bodyParser.json());

  return {
    start: () =>
      app.listen(configs.port, () =>
        console.log(`Application running on port ${configs.port}`))
  };
};

export default server;