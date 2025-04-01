'use strict';

const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');


exports.sass = function () {
    return src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist'));
}

exports.watch = function () {
    watch('./src/css/*.scss', series('sass'));
};