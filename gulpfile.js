const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp.task('default', ['webpack']);

gulp.task('babel', () => {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./temp'));
});

gulp.task('webpack', ['babel'], function(callback) {
    const devConfig = Object.create(webpackConfig);
    devConfig.plugins = [
      new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(devConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});
