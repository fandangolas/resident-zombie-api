import container from "./src/container";

const app = container.resolve('app');
const logger = container.resolve('logger');

(async () => {
  try {
    await app.start();
  }

  catch (error) {
    logger.fatal(error);
    process.exit();
  }
})();