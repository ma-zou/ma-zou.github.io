const {series, src, dest, watch, parallel} = require('gulp');
const stylus = require('gulp-stylus');

function styles() {
    return src('assets/styles/main.styl')
        .pipe(stylus({
            compress: false
        }))
        .pipe(dest('assets/styles/'));
}

function watchStyles() {
    return watch(`assets/styles/**/*.styl`, styles);
}

exports.styles = watchStyles;