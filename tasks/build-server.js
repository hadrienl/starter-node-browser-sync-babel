var fs = require('fs'),
  allFiles = require('all-files');

const exec = require('child_process').exec;

const build = exec('rm -rf dist/server && ./node_modules/.bin/babel server --out-dir dist/server --source-maps inline', function () {
  var files = allFiles('dist/server');
  files.forEach(file => {
    if (file.match(/.js$/)) {
      supportSourceMap(file);
    }
  });
});
build.stdout.pipe(process.stdout, { end: false });
build.stderr.pipe(process.stderr, { end: false });

process.on('exit', () => build.stdin.end());
// && node dist/server

function supportSourceMap(file) {
  var content = 'require(\'source-map-support\').install();';
  content += fs.readFileSync(file).toString();
  fs.writeFileSync(file, content);
}
