let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	del = require('del'),
	injectSvg = require('gulp-inject-svg'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	changed = require('gulp-changed'),
	fileinclude = require('gulp-file-include'),
	tildeImporter = require('node-sass-tilde-importer');

gulp.task('fileinclude', function () {
	return gulp
		.src('src/pages/**/*.html')
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: 'src/components',
			})
		)
		.pipe(gulp.dest('./'));
});

gulp.task('reload', function (done) {
	browserSync.reload();
	done();
});

let paths = {
	src: {
		html: 'src/**/*.html',
		scss: 'src/scss/**/*.scss',
		images: 'src/images/**/*.*',
		js: 'src/js/**/*.js',
	},
	build: {
		html: 'dist/',
		css: 'dist/css',
		images: 'dist/images',
		js: 'dist/js',
	},
};

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task('clean', async function () {
	del.sync('dist');
});

gulp.task('scss', function () {
	return gulp
		.src(paths.src.scss)
		.pipe(
			sass({
				outputStyle: 'compressed',
				importer: tildeImporter,
			})
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 8 versions'],
			})
		)
		.pipe(cssnano({ zindex: false }))
		.pipe(concat('nav.min.css'))

		.pipe(gulp.dest(paths.build.css))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
	return gulp
		.src(paths.src.html)
		.pipe(changed(paths.build.html))
		.pipe(
			injectSvg({
				base: '/src/inline-svgs/',
			})
		)
		.on('error', swallowError)
		.pipe(gulp.dest(paths.build.html))
		.pipe(browserSync.stream());
});

gulp.task('js', function () {
	return gulp.src(paths.src.js).pipe(concat('main.min.js')).pipe(uglify()).pipe(gulp.dest(paths.build.js)).pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src(paths.src.images).pipe(gulp.dest(paths.build.images)).pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
	browserSync.init({
		ghostMode: false,
		watch: false,
		server: {
			baseDir: 'src/',
		},
	});
});

gulp.task('watch', async function () {
	gulp.watch(['./src/**/*.*'], gulp.series('fileinclude'));
	gulp.watch(['./ru/*.*', './en/*.*', './dist/**/*.*'], gulp.series('reload'));
	gulp.watch(paths.src.scss, gulp.parallel('scss'));
	gulp.watch(paths.src.html, gulp.parallel('html'));
	gulp.watch(paths.src.js, gulp.parallel('js'));
	gulp.watch(paths.src.images, gulp.parallel('images'));
});

gulp.task('build', gulp.series('clean', 'scss', 'html', 'js', 'images'));

gulp.task('default', gulp.parallel('fileinclude', 'scss', 'html', 'js', 'images', 'browser-sync', 'watch'));
