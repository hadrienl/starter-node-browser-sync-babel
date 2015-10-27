const exec = require('child_process').exec,
  watch = require('watch');

class ServerLauncher {
  restart () {
    console.info('restart server');
    this.stop();
    this.start();
  }
  stop () {
    this.process.kill();
  }
  start () {
    this.process = exec('node ./tasks/build-server', err => {
      if (err) {
        throw err;
      }

      this.process = exec('node dist/server');
      this.process.stdout.pipe(process.stdout, { end: false });
      this.process.stderr.pipe(process.stderr, { end: false });

    });
    this.process.stdout.pipe(process.stdout, { end: false });
    this.process.stderr.pipe(process.stderr, { end: false });
  }
}

const server = new ServerLauncher();
server.start();

watch.watchTree('server', (f, curr, prev) => {
  if (typeof f === 'object' && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
    server.restart();
  } else if (curr.nlink === 0) {
    // f was removed
    server.restart();
  } else {
    // f was changed
    server.restart();
  }
});
