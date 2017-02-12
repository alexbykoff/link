const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
gulp.task('default', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('link.min.js'))
        .pipe(gulp.dest('./dist/'));
});