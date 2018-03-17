var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var beautify = require('gulp-html-beautify');
var pkg = require('./package.json');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {
  // Bootstrap
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('public/vendor/bootstrap'))
  // ChartJS
  gulp.src([
      'node_modules/chart.js/dist/*.js'
    ])
    .pipe(gulp.dest('public/vendor/chart.js'))
  // DataTables
  gulp.src([
      'node_modules/datatables.net/js/*.js',
      'node_modules/datatables.net-bs4/js/*.js',
      'node_modules/datatables.net-bs4/css/*.css'
    ])
    .pipe(gulp.dest('public/vendor/datatables/'))
  // Font Awesome
  gulp.src([
      'node_modules/font-awesome/**/*',
      '!node_modules/font-awesome/{less,less/*}',
      '!node_modules/font-awesome/{scss,scss/*}',
      '!node_modules/font-awesome/.*',
      '!node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('public/vendor/font-awesome'))
  // jQuery
  gulp.src([
      'node_modules/jquery/dist/*',
      '!node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('public/vendor/jquery'))
  // jQuery Easing
  gulp.src([
      'node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('public/vendor/jquery-easing'))
});
// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('public/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
});
// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      'public/css/*.css',
      '!public/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'));
});
// CSS
gulp.task('css', ['css:compile', 'css:minify']);
// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      'public/js/*.js',
      '!public/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/js'));
});
// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);
// Dev task
gulp.task('dev', ['css', 'js', 'pug'], function() {
  gulp.watch('public/pug/**/*', ['pug']);
  gulp.watch('public/scss/**/*.scss', ['css']);
  gulp.watch('public/js/*.js', ['js']);
});
