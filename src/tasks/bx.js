var config = require('../../gulpconfig.json');

//var fs = require('fs');
var gulp = require('gulp');
var foreach = require('gulp-foreach');
var search = require('gulp-search');
var phpcs = require('gulp-phpcs');
var phpcpd = require('gulp-phpcpd');
var phplint = require('gulp-phplint');
var gmatch = require("gulp-match");
var notifier = require('node-notifier');
var gutil = require('gulp-util');




gulp.task('phpcpd', function () {
    return gulp.src('./**/**.php')
        .pipe(phpcpd());
});



gulp.task('lint-php', function () {
    return gulp.src(['.httpdocs/**/*.php'])
        .pipe(phplint('', {debug:true}))
        .pipe(phplint.reporter('fail'));
        //.pipe(phpcs({
        //    bin: config.nm+'.bin/phpcs',
        //    standard: 'PSR2',
        //    warningSeverity: 1}))
        //.pipe(phpcs.reporter('fail'));
});

var rules = [
    {
        "mask":[
            '**/bitrix/templates/**/header.php',
            '**/bitrix/templates/**/footer.php',
            '**/bitrix/templates/**/template.php',
            '**/local/templates/**/header.php',
            '**/local/templates/**/footer.php',
            '**/local/templates/**/template.php'
            ],
        "pattern":[
            /\$\_/g,
            /(C[A-z]*\:\:|GetList)/ig
        ],
        "error":[
            "Нельзя использовать $_ в шаблонах",
            "Обращения к АПИ следует делать в result_modifier.php или в самом компоненте, шаблон только для вывода"
        ]
    }
];


function scanRules(stream,file) {

    var erroredFiles = [];
    rules.forEach(function(rule){
        //rule.mask.forEach(function(src){
        file.base = '.';
            var match = gmatch(file, rule.mask, { dot: true });
            //console.log('match:',file.relative, match,rule.mask);
            if (match) {
                rule.pattern.forEach(function (regExp,num) {
                    if (file.contents.toString().search(regExp)>=0) {
                        gutil.log(gutil.colors.red('BX Error: '), rule.error[num] + ' (' + file.relative + ')');
                        erroredFiles.push(file.relative);
                    }
                });
            }

        //});
    });
    if (erroredFiles.length>0) {
        gulp.emit("error", new Error("Something happend: Error message!"));
        return false;
    }
    return stream;
}

gulp.task('bx',function(){

    var erroredFiles = [];

    //scanRules();
    //for (var i=0;i<rules.length;i++) {
    //    rule = rules[i];
    //
    //    rule.mask.each(function(i,e){console.log(i,e)});
    //}


    //console.log(config.path_tpl+'/**.php');
    //return gulp.src(config.path_tpl+'/**.php')
    //.pipe(search(/\$\_/ig,
    //    function(item) {
    //        console.log(item);
    //        return item;
    //    }
    //    , {
    //    path: './phpscan/',
    //    filename: 'scan_manifest.json'
    //    }
    //))
    //    //.pipe(gulp.dest('...'))
    // ;

    return gulp.src('./httpdocs/**/**.php', { dot: true })
        .pipe(foreach(scanRules).on('error',gutil.log))

});