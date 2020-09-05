import server from "./api/server";
import app from "./api/app";

import configs from "../configs";

import dbConfig from "./persistence/dbConfig";
import router from "./interfaces/http/router";

import { createContainer, asFunction, asValue } from "awilix";

const configureContainer = () => {
  const container = createContainer();

  container.register({
    app: asFunction(app).singleton(),
    configs: asValue(configs),
    server: asFunction(server).singleton(),
    db: asFunction(dbConfig).singleton(),
    router: asFunction(router).singleton()
  });

  return container;
};

export default configureContainer;