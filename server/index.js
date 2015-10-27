import express from 'express';
import {router} from './routing';

export const app = express();

app.use('/api', router);

export const server = app.listen(3000, () => {
  const host = server.address().address,
    port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
