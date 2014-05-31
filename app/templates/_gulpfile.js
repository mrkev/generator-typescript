var gulp   = require('gulp');
var tsc    = require('gulp-typescript-compiler');
var shell  = require('gulp-shell')
var runseq = require('run-sequence')

var paths = {
	tscripts : { src : ['<%= tsSrc  %>/**/*.ts'],
				dest : '<%= tsDest %>' }
};

gulp.task('build', ['tsc']);
gulp.task('tsc', function () {
	return gulp
	.src(paths.tscripts.src)
	.pipe(tsc({
		module: "<%= moduleType %>",
		resolve: true,
		sourcemap : "<%= genMaps %>"
	}))
	.pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('run', shell.task([
  'node <%= defaultMain %>'
]));

gulp.task('buildrun', function (cb) {
	runseq('build', 'run', cb);
});

gulp.task('watch', function () {
	gulp.watch(paths.tscripts.src, ['build']);
});

gulp.task('watchrun', function () {
	gulp.watch(paths.tscripts.src, ['default']);
});

gulp.task('default', ['buildrun']);