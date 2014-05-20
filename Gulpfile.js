var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('dist', ['lint', 'mocha'], function() {

	// Get the paths to application files
	var application_file_paths = ['peach', 'peach.drawable', 'peach.input', 'peach.primitive'].map(function(file) {
		return 'src/' + file + '.js';
	});

	return gulp.src(application_file_paths)
		.pipe(concat('peach.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(concat('peach.min.js'));
});

gulp.task('mocha', ['lint'], function() {
	return gulp.src('tests/*.js')
		.pipe(mocha());
});

gulp.task('default', ['mocha', 'lint', 'dist']);
