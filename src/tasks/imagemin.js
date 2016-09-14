var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var newer = require(config.nm + 'gulp-newer');
var imagemin = require(config.nm + 'gulp-imagemin');
var svgmin = require('gulp-svgmin');

var output_path = config.path_tpl + "/img/";

var input_files = [
	config.src_path + "img/**/*.png", 
	config.src_path + "img/**/*.jpg"
];

var watch_files = input_files;

var options = {
	"optimizationLevel": 5
};

/**
 * Copy and compress static images
 *
 * @return
 */
gulp.task('svgmin',function(){
	return gulp.src(config.src_path + "img/**/*.svg")
		.pipe(svgmin())
		.pipe(gulp.dest(output_path));
});
gulp.task('imagemin', ['svgmin'], function() {
    return gulp.src(input_files)
        .pipe(newer(output_path))
        .pipe(imagemin(options).on('error', gutil.log))
        .pipe(gulp.dest(output_path));
});

gulp.task('imagemin-watch', function() {
	gulp.watch(watch_files, ['imagemin', 'browser-reload']);
});