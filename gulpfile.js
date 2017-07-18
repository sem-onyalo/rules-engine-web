var gulp = require('gulp');

var browserify = require('browserify'),
  babelify = require('babelify'),
  buffer = require('vinyl-buffer'),
  notifier = require('node-notifier'),
  reload = require('livereactload'),
  source = require('vinyl-source-stream')
  watchify = require('watchify');

gulp.task('watch', () => {
  var bundler = createBundle(true);
  var watcher = watchify(bundler);
  rebundle();
  return watcher
    .on('error', handleError)
    .on('update', rebundle);

  function rebundle() {
    watcher
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./build/'));
  }
});

gulp.task('bundle', () => {
  var bundler = createBundle(false);
  bundler
    .bundle()
    .on('error', handleError)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', () => {
  return browserify('./src/app.js')
    .transform(babelify)
    .bundle()
    .on('error', handleError)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'));
});

function handleError(err) {
  console.log(err.stack);
  notifier.notify({
    title: 'Build Error',
    message: err.message
  });
  this.emit('end');
}

function createBundle(useWatchify) {
  return browserify({
    entries: ['./src/app.js'],
    transform: [ [babelify, {}] ],
    plugin: !useWatchify ? [] : [reload],
    cache: {},
    packageCache: {}
  });
}
