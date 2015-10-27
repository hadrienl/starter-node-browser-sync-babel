const exec = require('child_process').exec;

const build = exec('node ./tasks/build-server', err => {
  if (err) {
    throw err;
  }

  const server = exec('node dist/server');
  server.stdout.pipe(process.stdout, { end: false });
  server.stderr.pipe(process.stderr, { end: false });

  process.on('exit', () => server.stdin.end());

});
build.stdout.pipe(process.stdout, { end: false });
build.stderr.pipe(process.stderr, { end: false });
