import { createServer } from 'http';
import type { Express } from 'express';

const createHttpServer = (expressApp: Express) => {
  const server = createServer(expressApp);

  return server;
};

export { createHttpServer };
