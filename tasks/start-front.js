const exec = require('child_process').exec;

const build = exec('rm -rf dist/client && cp -r client dist');
build.stdout.pipe(process.stdout, { end: false });
build.stderr.pipe(process.stderr, { end: false });

process.on('exit', () => build.stdin.end());
