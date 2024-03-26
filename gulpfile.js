const gulp = require('gulp');

gulp.task('copy-json', () => {
  return gulp.src('i18n/**/*.json')
  .pipe(
    gulp.dest('dist/i18n')
  )
});

gulp.task('i18n', gulp.series('copy-json'));
