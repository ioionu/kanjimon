var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

// style stuff
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var lost = require('lost');


function compile(watch) {
  var bundler = watchify(browserify(['./src/script.js'], { debug: true }).transform(babel));
  gulp.watch(['./css/*.css'], ['css']);

  function rebundle() {

    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./js'));

    gulp.src(['./src/serviceWorker.js'])
      .pipe(gulp.dest('./'))
    ;
    css();
  }

  if (watch) {

    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
    gulp.watch(['./src/serviceWorker.js'], function() {
      console.log('-> bundling sw...');
      rebundle();
    });
  }

  rebundle();
}

function css() {
  console.log('-> bundling css...');
  var processors = [
    autoprefixer,
    cssnext,
    precss,
    lost(),
  ];
  return gulp.src(['./css/*.css'])
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/css/'));
}

function libs() {
  console.log("copying some stuff");
  return gulp.src(['./node_modules/sw-toolbox/sw-toolbox.js'])
   .pipe(gulp.dest('./build/js/'));
}


function watch() {
  return compile(true);
}

gulp.task('css', function () { return css(); });
gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });
gulp.task('libs', function() { return libs(); });

gulp.task('default', ['watch', 'css', 'libs']);
