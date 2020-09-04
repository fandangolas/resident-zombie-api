
//const container = require('src/container');
import post from "../../../../api/survivor/post";

module.exports = () => {
  const postUseCase = post();

  return {
    postUseCase,
  };
};
