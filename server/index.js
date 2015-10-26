import express from 'express';

export const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export const server = app.listen(3000, () => {
  const host = server.address().address,
    port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
