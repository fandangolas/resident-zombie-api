import container from "./src/container";

const app = container.resolve('app');

(async () => {
  try {
    await app.start();
  }

  catch (error) {
    console.log(error);
    process.exit();
  }
})();