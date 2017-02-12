var gulp = require('gulp');
var watch = require('gulp-watch');
var mainBowerFiles = require('gulp-main-bower-files');
var exists = require('path-exists').sync;
var connect = require('gulp-connect');

//var Proxy = require('gulp-connect-proxy'); // wordt nie tmeer gebruikt
var cors = require('cors');

var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var gulpMinify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var gulpFilter = require('gulp-filter');

var corsHeaders = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*, localhost:8080, 127.0.0.1, :8080', 'https://development.prognotice.nl');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Origin, Authorization, Accept, Access-Control-Expose-Headers, username, password, replystatuscode, replymessage, sessietoken, message, etoken, protocol, replyfrom, os, browser, location');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
};

var sourcePath = './app/';

var paths = {
  js: [sourcePath + '**/*.js'],
  html: [sourcePath + '**/*.html'],
  css: [sourcePath + '**/*.css', sourcePath + '*/*.css'],
  assets: [sourcePath + '**/*.{svg,css,gif,png,jpg,pdf,json,eot,woff,ttf}', sourcePath + 'lib/**/*.{gif,png,jpg}']
};

var buildPath = './dist/';

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    // middleware: function(connect, opt) {
    //   opt.route = '/proxy';
    //   var proxy = new Proxy(opt);
    //   return [proxy];
    // },
    middleware: function() {
      return [corsHeaders, cors()];
    },
    livereload: true
  });
});

gulp.task('scripts', function() {

  gulp.src(sourcePath + 'constants/**/*')
    .pipe(gulp.dest(buildPath));

  return gulp.src(
    sourcePath + '**/*.js'
  )
  .pipe(jshint({
    esversion: 6
  }))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(buildPath))
	.pipe(connect.reload());
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/*.min.*',
                        './dist/fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(gulpMinify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest(buildPath + 'libs'));
});

gulp.task('assets', function(){
  gulp.src(paths.assets)
    .pipe(gulp.dest(buildPath))
    .pipe(connect.reload());
})

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(gulp.dest(buildPath))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(gulp.dest(buildPath))
    .pipe(connect.reload());
});

gulp.task('watch-files', function() {
  watch(paths.js, function() {
    gulp.start('scripts');
  });
  watch(paths.html, function() {
    gulp.start('html');
  });
  watch(paths.assets, function() {
    gulp.start('assets');
  });
  watch(paths.css, function() {
    gulp.start('assets');
  })
});

gulp.task('compile', ['scripts', 'assets', 'html', 'main-bower-files', 'watch-files', 'connect']);

gulp.task('watch-action', ['scripts', 'assets', 'html', 'main-bower-files', 'watch-files']);

gulp.task('build-action', ['scripts', 'assets', 'html', 'main-bower-files']);

gulp.task('watch', ['clean'], function() {
  gulp.start('watch-action');
})

gulp.task('build', ['clean'], function() {
  gulp.start('build-action');
})

gulp.task('default', ['clean'], function(){
  gulp.start('compile');
});
