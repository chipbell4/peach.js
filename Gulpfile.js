var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('dist', function() {

	// Get the paths to application files
	var application_file_paths = ['peach', 'peach.drawable', 'peach.input', 'peach.primitive'].map(function(file) {
		return 'src/' + file + '.js';
	});

	return gulp.src(application_file_paths)
		.pipe(jshint())
		.pipe(concat('peach.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(concat('peach.min.js'));
});

gulp.task('mocha', function() {
	return gulp.src('tests/*.js')
		.pipe(mocha());
});

gulp.task('default', ['mocha', 'dist']);
