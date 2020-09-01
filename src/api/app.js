const app = ({ db, server }) => {
  return {
    start: async () => {
      await db.authenticate();

      server.start();
    }
  }
}

export default app;
