import express from 'express';
import cors from 'cors';

import { router } from './routes/index.routes.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 4000;

app.listen(port, function (err) {
  if (err) {
    console.log('Failed to start the server -', err);
  }
  console.log('Server listening on port', port);
});