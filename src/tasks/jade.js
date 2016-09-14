var config = require('../../gulpconfig.json');
var package = require('../../package.json');


// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var jade = require(config.nm + 'gulp-jade');
var data = require(config.nm + 'gulp-data');
var path = require('path');
var _ = require('lodash');


var output_path = config.build_path;


var input_files = [
				config.src_path + 'jade/*.jade'
			     ];

var watch_dir = config.src_path + "jade/";

var watch_files = [
                watch_dir + '*.jade',
                watch_dir + '**/*.jade',
                watch_dir + '**/*.json'
			];

var context = {
                "config": {
                    "app_name": package.name,
                    "version": package.version,
                    "base_path": "/"
                }
            };


/**
 * Compile jade templates
 *
 * @return
 */
gulp.task('jade', function () {
	return gulp.src(input_files)
        .pipe(data(function(file) {

            // try {
            //     var defl = require('./src/jade/tmpdata/default.json');
            //     var json = require('./src/jade/tmpdata/' + path.basename(file.path) + '.json');
            // } catch (e) {
                var defl = require('../../src/jade/tmpdata/default.json');
            // }
            // var data = _.assign({}, json, defl);
            var data = defl;
            // console.log(data);
            return data;
        }))
        .pipe(jade({
            pretty:true
        }).on('error', gutil.log))
        .pipe(gulp.dest(output_path));
});



gulp.task('jade-watch', function() {
	gulp.watch(watch_files, ['jade']);
    gulp.watch(output_path+'/**.html',['browser-reload']);
});