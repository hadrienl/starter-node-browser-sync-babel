import fs from 'fs';
import express from 'express';

export const router = express.Router();

fs.readdir(`${__dirname}/routes`, (err, files) => {
  files.forEach(file => {
    var Controller = require(`./routes/${file}`);

    const controller = new Controller(router);
    controller.app = router;
    if (Controller._routes && Controller._routes.length) {
      Controller._routes.forEach(route => {
        let middlewares = route.middlewares || [],
          globalMiddlewares = Controller._middlewares || [];
        if (!Array.isArray(globalMiddlewares)) {
          globalMiddlewares = [globalMiddlewares];
        }
        middlewares = globalMiddlewares.concat(middlewares);
        router[route.method](route.path, middlewares || [], (req, res, ...args) => {
          const result = controller[route.action](req, res, ...args);
          if (result && result.then) {
            result
            .then(data => {
              if (!data && data !== 0) {
                return res.sendStatus(204);
              }
              if (typeof data === 'object') {
                return res.json(data);
              }
              return res.send(`${data}`);
            })
            .catch(err => res.status(err.code||500).send(err.message));
          }
        });
      });
    }
    controller._init && controller._init();
    return controller;
  });
});

export class RoutingError extends Error {
  constructor (message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
