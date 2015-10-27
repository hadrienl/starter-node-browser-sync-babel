import express from 'express';

export const app = express();

app.get('/api', (req, res) => {
  res.send('Hello Api');
});

export const server = app.listen(3000, () => {
  const host = server.address().address,
    port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
