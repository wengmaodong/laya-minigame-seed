/*jshint node: true*/

//引入gulp及各种组件;

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var concat = require("gulp-concat");
var changed = require("gulp-changed");
var path = require('path');

//设置各种输入输出文件夹的位置;

var releaseTar = './wxpackage/';
var resourceFile = [
    '!./bin/libs',
    '!./bin/libs/*',
    '!./bin/libs/*/*',
    '!./bin/js',
    '!./bin/js/*',
    '!./bin/js/*/*',
    './bin/*',
    './bin/*/*',
    './bin/*/*/*',
    './bin/*/*/*/*',
    '!./bin/*.json',
    '!./bin/*.html',
    '!./bin/*.js',
];

var libJs = [
    './bin/libs/min/laya.core.min.js',
    './bin/libs/min/laya.wxmini.min.js',
    './bin/libs/min/laya.webgl.min.js',
    './bin/libs/min/laya.ani.min.js',
    './bin/libs/min/laya.ui.min.js',
    './bin/libs/min/laya.device.min.js',
];

var srcJs = [
    './wxpackage/js/*',
    './wxpackage/js/*/*',
    './wxpackage/js/*/*/*',
    './wxpackage/js/*/*/*/*',
    '!./wxpackage/js/layaUI.max.all.js',
]

gulp.task('copyFile', function () {
    return gulp.src(resourceFile)
        .pipe(gulp.dest(releaseTar));
});

gulp.task('libJs', function () {
    return gulp.src(libJs)
        .pipe(concat('laya.js'))
        .pipe(gulp.dest('./wxpackage/libs'));
});

gulp.task('ui', function () {
    return gulp.src('./src/ui/layaUI.max.all.js', )
        .pipe(gulp.dest('./wxpackage/js'))
});

gulp.task('clean', function () {
    return gulp.src([
        './wxpackage/*',
        '!./wxpackage/js',
        '!./wxpackage/js/*',
        '!./wxpackage/js/*/*',
        '!./wxpackage/js/*/*/*',
        '!./wxpackage/js/*/*/*/*',
        '!./wxpackage/game.json',
        '!./wxpackage/game.js',
        '!./wxpackage/openData',
        '!./wxpackage/openData/*',
        '!./wxpackage/openData/*/*',
        '!./wxpackage/project.config.json',
        '!./wxpackage/weapp-adapter.js',
    ])
        .pipe(clean());
});

//监控改动并自动刷新任务;
gulp.task('watch', function () {
    return gulp.watch('./src/ui/layaUI.max.all.js', ['ui']);

    // gulp.watch('./src/bin/res/atlas/');

    // return gulp.watch(srcJs).on('change', function (data) {

    //     let srcPath = path.resolve(data.path).replace(path.resolve(__dirname), '.').replace('/\\/g', '/');
    //     let destFilePath = './wxpackage/js' + srcPath.replace('.\\www', '');
    //     let destPath = './wxpackage/js' + srcPath.replace('.\\www', '').replace(path.basename(data.path), '')

    //     let off = true;

    //     gulp.task('_makeFile',function () {
    //         return gulp.src(srcPath)
    //             .pipe(gulp.dest(destPath))
    //             .on('error', onError);
    //     });

    //     gulp.task('_cleanFile', function () {
    //         return gulp.src(destFilePath)
    //             .pipe(clean())
    //     });

    //     sequence('_cleanFile', '_makeFile')(function (err) {
    //         console.log(err);
    //     });

    //     function onError(err) {

    //     }

    // });
});


//gulp默认任务(集体走一遍,然后开监控);

gulp.task('default', sequence('release', 'watch'));

gulp.task('release', sequence('clean', 'copyFile', 'libJs', 'ui'));
