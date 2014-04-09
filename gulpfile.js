
'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  cache = require('gulp-cached'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  clean = require('gulp-clean'),
  paths = {
    scripts: {
      src: ['app/**/*.js', '!app/provider/**/*.js'],
      dest: 'build/js'
    },
    images: {
      src: 'img/**/*',
      dest: 'build/img'
    }
  };


gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts.src)
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Copy all static images
gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(changed('build/img'))
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('scripts', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts.src, ['scripts', 'lint']);
});

gulp.task('default', ['lint', 'scripts', 'images']);
