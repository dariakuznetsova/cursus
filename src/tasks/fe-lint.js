/**
 * Created by maddocnc on 03.02.16.
 */
var config = require('../../gulpconfig.json');
var package = require('../../package.json');
var gulp = require('gulp');
var htmlhint = require(config.nm + "gulp-htmlhint");
var less = require('gulp-less');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var lessReporter = require('gulp-csslint-less-reporter');
var gulpFilter = require('gulp-filter');

gulp.task('lint',['lint-css','lint-js','lint-html']);

gulp.task('lint-css',function() {
    return gulp.src(config.src_path + "/less/styles.less")
        .pipe(sourcemaps.init()) // sourcemaps are required
        .pipe(less())
        .pipe(csslint())
        .pipe(lessReporter(config.src_path + "/less/styles.less"))
        //.pipe(gulp.dest('build'))
     ;
});

gulp.task('lint-js',function() {
    var filter = gulpFilter(['src/js', '!src/bower_components']);
  return gulp.src(config.src_js)
        .pipe(filter)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('lint-html',function() {
    gulp.src(config.build_path+"/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});