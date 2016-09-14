// Install deps:
// sudo npm install -g gulp bower less
// npm install

var gulp = require('gulp');
var prompt = require('prompt');
var chmod        = require('gulp-chmod');
// var plugins = require("gulp-load-plugins")({lazy: false});
var config = require('./gulpconfig.json');
var notifier     = require('node-notifier');
var requireDir = require('require-dir');

requireDir('./src/tasks/');

/**
 * Watch for file changes
 * But first, process all the files and start the livereload server
 *
 */
gulp.task('watch', [
    'default', 
    'browser-sync',
    'scripts-watch',
    'less-watch',
    'jade-watch',
    //'nunjucks-watch',
    // 'handlebars-watch',
    'imagemin-watch'
]);

/**
 * Default: Runs the build process
 */
gulp.task('default', [
    'build'
]);

/*
 * Build the entire project
 */
gulp.task('build', [
    'scripts',
    'sprites',
    'less',
    'imagemin',
    'copy',
    'jade'
    // 'handlebars',
    //'nunjucks'
]);

/*
 * Publish the project using FTP
 */
gulp.task('publish', [
    'build', 
    'ftp'
]);

/*
    Reinstall hooks
 */
gulp.task('hooks',function(){
    gulp.src('hooks/*')
        .pipe(chmod({
            execute:true
        }))
        .pipe(gulp.dest('.git/hooks/'));
});
gulp.task('pre-commit',['bx','lint']);
gulp.task('pre-commit-notify', function() {
    notifier.notify({
        message : 'Run gulp lint and Fix errors first',
        title   : 'Commit cancelled'
    });
});

