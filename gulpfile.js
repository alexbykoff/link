const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('default', ['webpack']);

gulp.task('babel', () => {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./temp'));
});

gulp.task('webpack', ['babel'], (callback) => {
    const devConfig = Object.create(webpackConfig);
    devConfig.plugins = [
      new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(devConfig, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('server', ['webpack'], (callback) => {
    const devConfig = Object.create(webpackConfig);

    new WebpackDevServer(webpack(devConfig), {
        publicPath: '/' + devConfig.output.publicPath,
        stats: {
            colors: true
        },
        hot: true
    }).listen(8080, 'localhost', (err) => {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});
