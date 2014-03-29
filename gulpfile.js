var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('script', function(){
  gulp.src('src/aightbox.js')
      .pipe(uglify({outSourceMap: false}))
      .pipe(rename('aightbox.min.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('stylesheet', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(rename('aightbox.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['script', 'stylesheet']);
