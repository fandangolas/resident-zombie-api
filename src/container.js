import server from "./api/server";
import app from "./api/app";

import configs from "../configs";

import dbConfig from "./persistence/dbConfig";
import survivorsRepository from "./persistence/repositories/survivors";


import router from "./interfaces/http/router";

import { createContainer, asFunction, asValue } from "awilix";
import survivorModule from "./api/survivor";

const container = createContainer();

container.register({
  configs: asValue(configs),

  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  survivorModule: asFunction(survivorModule).singleton(),

  db: asFunction(dbConfig).singleton(),
  router: asFunction(router).singleton(),
  survivorsRepository: asFunction(survivorsRepository).singleton()
});


module.exports = container;