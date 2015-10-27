export function routes(Target) {
  return function (app) {
    var target = new Target(app);
    target.app = app;
    if (Target._routes && Target._routes.length) {
      Target._routes.forEach(route => {
        app[route.method](route.path, route.middlewares || [], (...args) => target[route.action](...args));
      });
    }
    target._init && target._init();
    return target;
  };
}

export function get(opts = {}) {
  return function (Target, key, properties) {
    Target.constructor._routes = Target.constructor._routes || [];
    Target.constructor._routes.push({
      method: 'get',
      action: key,
      path: opts.route,
      middlewares: opts.middlewares
    });

    return properties;
  };
}
