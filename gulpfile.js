var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('serve', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task("vendor", function() {
    gulp.src("node_modules/phaser/build/phaser.min.js")
        .pipe(gulp.dest("build/js/vendor"));
});