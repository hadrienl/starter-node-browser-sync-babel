import express from 'express';
import {router} from './routing';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser());
app.use('/api', router);

export const server = app.listen(3000, () => {
  const host = server.address().address,
    port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
