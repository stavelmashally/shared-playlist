import express from 'express';
import cors from 'cors';

const createExpressApp = () => {
  const app = express();
  app.use(cors);

  return app;
};

export { createExpressApp };
