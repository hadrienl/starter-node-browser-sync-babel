const exec = require('child_process').exec;

const build = exec('rm -rf dist/server && ./node_modules/.bin/babel server --out-dir dist/server');
build.stdout.pipe(process.stdout, { end: false });
build.stderr.pipe(process.stderr, { end: false });

process.on('exit', () => build.stdin.end());
// && node dist/server
