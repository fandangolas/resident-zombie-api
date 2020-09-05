import { getLogger } from "log4js";

module.exports = () => {
  const logger = getLogger();
  logger.level = "info";

  return logger;
}