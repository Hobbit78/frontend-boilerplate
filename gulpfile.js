//==================================
// Required
//==================================
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean');;

//==================================
// Scripts Tasks
//==================================
gulp.task('scripts', function(){
	gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('assets/scripts'))
		.pipe(reload({stream:true}));
});

//==================================
// Sass Task
//==================================

// Local sass task
gulp.task('sass', function(){
	gulp.src('sass/app.sass')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/css/'))
		.pipe(reload({stream:true}));
});

// Production sass task
gulp.task('sass-production', function(){
	gulp.src('sass/app.sass')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('assets/css/'))
});

//==================================
// HTML Task
//==================================
gulp.task('html', function(){
	gulp.src('**/*.html')
		.pipe(reload({stream:true}));
});

//==================================
// PHP Task
//==================================
gulp.task('php', function(){
	gulp.src('**/*.php')
		.pipe(reload({stream:true}));
});

//==================================
// Browser-Sync Task
//==================================
gulp.task('browser-sync', function(){
	browserSync.init({
		browser: ["google chrome"],
		// Set path to your local server
		proxy: "styleguide.dev"
	});
});


//==================================
// Watch Tasks
//==================================
gulp.task('watch', function(){
	gulp.watch('assets/js/**/*.js', ['scripts']);
	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/sass/**/*.sass', ['sass']);
	gulp.watch('**/*.html', ['html']);
	gulp.watch('**/*php', ['html']);
});

//==================================
// Task Runner
//==================================
// Set your local task
gulp.task('default', ['browser-sync', 'watch', 'sass', 'scripts', 'html', 'php']);

// Set dev task (run: gulp dev)
// Still have sourcemaps available
gulp.task('dev', ['sass', 'scripts']);

// Set production task (run: gulp production)
// Still have sourcemaps available
gulp.task('production', ['sass-production', 'scripts']);
