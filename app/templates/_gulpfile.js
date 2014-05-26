var gulp   = require('gulp');
var tsc    = require('gulp-typescript-compiler');
var shell  = require('gulp-shell')

var paths = {
	tscripts : { src : ['<%= tsSrc  %>/**/*.ts'],
				dest : '<%= tsDest %>' }
};

gulp.task('tsc', function () {
	return gulp
	.src(paths.tscripts.src)
	.pipe(tsc({
		module: "<%= moduleType %>",
		resolve: true,
		sourcemap : false
	}))
	.pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('run', shell.task([
  'node <%= defaultMain %>'
]))

gulp.task('compile', ['tsc']);
gulp.task('default', ['compile', 'run']);

gulp.task('watch', function () {
	gulp.watch(paths.tscripts.src, ['tsc']);
});

gulp.task('watchrun', function () {
	gulp.watch(paths.tscripts.src, ['compile', 'run']);
});