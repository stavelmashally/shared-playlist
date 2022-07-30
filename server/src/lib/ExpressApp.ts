import express from 'express';
import cors from 'cors';

const createExpressApp = () => {
  const app = express();

  app.use(cors);

  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  return app;
};

export { createExpressApp };
