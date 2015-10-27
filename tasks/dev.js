const bs = require('browser-sync').create(),
  exec = require('child_process').exec;

function startFront () {
  return new Promise((resolve, reject) => {
    const client = exec('node ./tasks/start-front.js', (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(client);
    });
    client.stdout.pipe(process.stdout, { end: false });
    client.stderr.pipe(process.stderr, { end: false });
  });
}

function startServer () {
  return new Promise((resolve, reject) => {
    const server = exec('node ./tasks/start-server.js', (err) => {
      if (err) {
        return reject(err);
      }
    });

    server.stdout.on('data', data => {
      if (data.match('App listening')) {
        resolve(server);
      }
    });

    server.stdout.pipe(process.stdout, { end: false });
    server.stderr.pipe(process.stderr, { end: false });
  });
}

function startDev () {
  bs.watch('dist/client').on('change', bs.reload);

  bs.watch('dist/client/*.css', event => {
    if (event === 'change') {
      bs.reload('*.css');
    }
  });

  bs.init({
    serveStatic: ['dist/client'],
    plugins: [{
      module: 'bs-html-injector',
      options: {
        files: ['dist/client/*.html']
      }
    }],
    proxy: 'http://localhost:3000'
  });
}

Promise.all([startFront(), startServer()])
  .then(processes => {
    process.on('exit', () => processes.forEach(process => process.stdin.end()));
    startDev();
  })
  .catch(err => {
    process.stdout.write(err);
    return process.exit(1);
  });
