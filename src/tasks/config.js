// config
var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var bower = require(config.nm + 'gulp-bower');
var prompt = require(config.nm+ 'gulp-prompt');
var jeditor = require(config.nm + 'gulp-json-editor');
/**
 * Run bower update on current directory.
 * Uses bower.json in root directory
 *
 * @param
 * @returns
 */
var bower_ran = !!config.bower_ran;
gulp.task('config', function() {

    gulp.src('prompt.js')
        .pipe(
            prompt.prompt({
                type: 'input',
                name: 'pname',
                message: 'Project name?'
            }, function(res){
                gulp.src("./gulpconfig.json")
                    .pipe(jeditor(function(json) {
                        json.pname = res.pname;
                        json.path_tpl = json.bitrix_path+'templates/'+json.pname+'/';

                        json.path_css = json.path_tpl+'template_styles.css';
                        json.path_js  = json.path_tpl+'script.js';

                        json.bower_ran = true;
                        require('fs')
                            .writeFileSync(
                                './src/jade/includes/scripts.jade',
                                'script(src=\''+json.path_js.substr(1)+'\')'
                            );
                        require('fs')
                            .writeFileSync(
                                './src/jade/includes/styles.jade',
                                'link(rel=\'stylesheet\', href=\''+json.path_css.substr(1)+'\')'
                            );
                        return json; // must return JSON object.
                    }))
                    .pipe(gulp.dest("."))
                 ;

            })
        );
    //if (!bower_ran) {
    //    bower_ran = true;
    //    return bower();
    //} else {
    //    return;
    //}

});