import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import del from 'del';
import webpackConfig from './webpack.config';
import eventWebpackConfig from './event/webpack.config';

const $ = loadPlugins();

gulp.task('default', ['build']);

gulp.task('build', [
  'copy-manifest',
  'copy-assets',
  'content-js',
  'event-js'
]);

gulp.task('copy-manifest', ['clean'], () => gulp.src('manifest.json').pipe(gulp.dest('./build')));

gulp.task('copy-assets', ['clean'], () => {
  gulp.src('assets/images/**').pipe(gulp.dest('./build/images'));
  gulp.src('assets/css/**').pipe(gulp.dest('./build/css'));
});

gulp.task('content-js', ['clean'], () => {
  webpack(webpackConfig, (err, stats) => {
    if(err) throw new $.util.PluginError('webpack', err);

    $.util.log('[webpack]', stats.toString());
  });
});

gulp.task('event-js', ['clean'], () => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new $.util.PluginError('webpack', err);

    $.util.log('[webpack]', stats.toString());
  });
});

gulp.task('watch', ['default'], () => {
  gulp.watch('./app/**/*', ['build']),
  gulp.watch('./event/**/*', ['build']),
  gulp.watch('./assets/**/*', ['build']),
  gulp.watch('./lib/**/*', ['build'])
});

gulp.task('clean', () => del('./build'));