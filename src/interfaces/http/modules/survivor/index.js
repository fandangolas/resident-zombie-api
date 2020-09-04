import router from "./router";
import instance from "./instance";

const survivor = () => {
  const app = instance();

  return {
    app,
    router: router(app)
  };
};

export default survivor;