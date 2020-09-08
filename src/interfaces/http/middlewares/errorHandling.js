module.exports = ({ logger }) => {
  const middleware = (req, res, next) => {
    try {
      const body = JSON.stringify(req.body);
      logger.info(`[REQUEST] - Body: ${body}`);

      next();
    }
    
    catch (error) {
      logger.error(error);
      res.status(500).json({ error: "An unexpected error ocurred!"});
    }
  };

  return { middleware };
};