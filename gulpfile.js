var path = require("path");
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var cssWrap = require("gulp-css-wrap");
var argv = require("minimist")(process.argv.slice(2));

var customThemeName = argv.name;

gulp.task("css-wrap", function() {
  return gulp
    .src(path.resolve(argv.input + "index.css"))
    .pipe(cssWrap({ selector: customThemeName }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(argv.output));
});

gulp.task("move-font", function() {
  return gulp.src([argv.input + "fonts/**"]).pipe(gulp.dest(argv.output + "fonts"));
});

gulp.task("default", gulp.series("css-wrap", "move-font"));
