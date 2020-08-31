const app = ({
  //db,
  server
}) => {
  return {
    start: async () => {
      //await db.configure();

      server.start();
    }
  }
}

export default app;
