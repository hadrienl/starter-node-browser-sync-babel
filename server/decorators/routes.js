export function middlewares (fns = []) {
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  return function middlewares (Target) {
    Target._middlewares = Target._middlewares||[];
    Target._middlewares = Target._middlewares.concat(fns);
  };
}

function setRoute(opts = {}) {
  return function (Target, key, properties) {
    Target.constructor._routes = Target.constructor._routes || [];
    Target.constructor._routes.push({
      method: opts.method,
      action: key,
      path: opts.route,
      middlewares: opts.middlewares
    });

    return properties;
  };
}

export function get (opts = {}) {
  opts.method = 'get';
  return setRoute(opts);
}
export function post (opts = {}) {
  opts.method = 'post';
  return setRoute(opts);
}
export function patch (opts = {}) {
  opts.method = 'patch';
  return setRoute(opts);
}
export function put (opts = {}) {
  opts.method = 'put';
  return setRoute(opts);
}
export function del (opts = {}) {
  opts.method = 'delete';
  return setRoute(opts);
}
