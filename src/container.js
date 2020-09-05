import server from "./api/server";
import app from "./api/app";
import survivorModule from "./api/survivor";

import configs from "../configs";

import logger from "./infrastructure/log/logger";

import dbConfig from "./persistence/dbConfig";
import survivorsRepository from "./persistence/repositories/survivors";
import locationsRepository from "./persistence/repositories/locations";
import itemsRepository from "./persistence/repositories/items";
import survivorItemsRepository from "./persistence/repositories/survivorItems";

import router from "./interfaces/http/router";

import { createContainer, asFunction, asValue } from "awilix";

const container = createContainer();
container.register({
  configs: asValue(configs),

  app: asFunction(app).singleton(),
  db: asFunction(dbConfig).singleton(),
  server: asFunction(server).singleton(),
  
  survivorModule: asFunction(survivorModule).singleton(),

  logger: asFunction(logger).singleton(),
  
  survivorsRepository: asFunction(survivorsRepository).singleton(),
  locationsRepository: asFunction(locationsRepository).singleton(),
  itemsRepository: asFunction(itemsRepository).singleton(),
  survivorItemsRepository: asFunction(survivorItemsRepository).singleton(),

  router: asFunction(router).singleton()
});


module.exports = container;