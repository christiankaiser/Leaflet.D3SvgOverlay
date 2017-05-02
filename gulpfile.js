var argv   = require('yargs').argv,
    gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del    = require('del');

gulp.task('watch', function() {
    gulp.watch(['src/*.js'], ['js']);
});

gulp.task('clean', function() {
    del(['dist/a/main.css', 'www/a/main.fr.js', 'www/a/main.de.js', 'www/a/main.en.js', 'www/a/storage.js'])
});

gulp.task('default', ['clean'], function() {
  gulp.start('js');
});

gulp.task('js', function() {
  return gulp.src(['src/*.js'])
    .pipe(uglify().on('error', function(e) {
      this.end();
    }))
    .pipe(concat('L.D3SvgOverlay.min.js'))
    .pipe(gulp.dest('dist'));
});
