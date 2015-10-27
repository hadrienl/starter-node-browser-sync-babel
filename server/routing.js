import fs from 'fs';
import express from 'express';

export const router = express.Router();

fs.readdir(`${__dirname}/routes`, (err, files) => {
  files.forEach(file => {
    var Routes = require(`./routes/${file}`);
    new Routes(router);
  });
});
