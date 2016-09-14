var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var concat = require(config.nm + 'gulp-concat');
var path = require('path');
var rename = require('gulp-rename');

//svg
//var svgSprite = require("gulp-svg-sprites");
var filter    = require('gulp-filter');
//var svg2png   = require('gulp-svg2png');
// var plumber = require('gulp-plumber');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var svgstore = require('gulp-svgstore');

//png
// var buffer = require('vinyl-buffer');

// var imagemin = require('gulp-imagemin');
// var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

// if (config.enable_browser_sync) {
//     var browserSync = require('browser-sync');
// }

// var output_path = path.dirname(config.path_css)+'/';
// var output_file = path.basename(config.path_css);
//
// var input_files = [
//     config.src_path + "/less/styles.less"
//     ];
//
// var watch_files = [
//                 config.src_path + "/less/**/*"
//             ];
//
// var paths = [
//             config.src_path + "/less",
//             config.src_path + "/bower_components/bootstrap/less"
//         ];
/**
 * Process LESS files and copy into build directory
 *
 * @return
 */


// gulp.task('sprites-svg', function () {
//     return gulp.src('src/sprites/svg/*.svg')
//         .pipe(svgmin())
//         .pipe(svgSprite({
//             cssFile: "less/_sprites_svg.less",
//             common: 'svgi',
//             selector: "svg-%f",
//             svg: {
//                 sprite: "img/sprites_svg.svg"
//             },
//             padding:1
//         }))
//         .pipe(gulp.dest("src/")) // Write the sprite-sheet + CSS + Preview
//         .pipe(filter("img/*.svg"))  // Filter out everything except the SVG file
//         .pipe(svg2png())           // Create a PNG
//         .pipe(gulp.dest("src/"));
// });


gulp.task('sprites-svg', function () {
    return gulp.src('src/sprites/svg/**.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [
                    {
                        cleanupIDs: {
                            minify: true
                        }
                    },
                    {
                        removeViewBox: false

                    }
                ]
            }  
        }))
        .pipe(svgstore({
            inlineSvg: true,
            fileName: 'sprites.svg',
            prefix: 'icon-'
        }))
        // .pipe(cheerio({
        //     run: function ($, file) {
        //         $('[fill]').removeAttr('fill');
        //         $('svg').children('defs').remove();
        //     },
        //     parserOptions: { xmlMode: true }
        // }))

        .pipe(cheerio({
            run: function ($) {
                $('svg').attr('style',  'display:none');
                $('[fill]').removeAttr('fill');
                $('symbol').attr('fill','currentColor');
                $('svg').children('defs').remove();
            }//,
            // parserOptions: { xmlMode: true }
        }))
        .pipe(rename("sprites.svg"))
        .pipe(gulp.dest("src/sprites/"));
});


gulp.task('sprites-png', function () {
    // Generate our spritesheet
    var spriteData = gulp.src('src/sprites/png/**/*.png').pipe(spritesmith({
        imgName: 'img/sprites.png',
        cssName: 'less/_sprites_png.less',
        retinaSrcFilter: ['**/2x/*.png'],
        retinaImgName: 'img/sprites@2x.png'
    }));

    return spriteData.pipe(gulp.dest('src/'));
    //
    // // Pipe image stream through image optimizer and onto disk
    // var imgStream = spriteData.img
    //     // DEV: We must buffer our stream into a Buffer for `imagemin`
    //     .pipe(buffer())
    //     .pipe(imagemin())
    //     .pipe(gulp.dest('path/to/image/folder/'));
    //
    // // Pipe CSS stream through CSS optimizer and onto disk
    // var cssStream = spriteData.css
    //     .pipe(csso())
    //     .pipe(gulp.dest('path/to/css/folder/'));
    //
    // // Return a merged stream to handle both `end` events
    // return merge(imgStream, cssStream);
});

gulp.task('sprites',['sprites-svg','sprites-png']);