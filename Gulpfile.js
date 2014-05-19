var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('default', function() {
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(concat('peach.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(concat('peach.min.js'));
});
