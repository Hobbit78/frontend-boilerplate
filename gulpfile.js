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
	clean = require('gulp-clean');

//==================================
// Paths
//==================================

// Set base path to where the assets are.
var path = {
	base: 'assets/'
}

//==================================
// Scripts Tasks
//==================================
gulp.task('scripts', function(){
	gulp.src([path.base + 'js/**/*.js', !path.base + 'js/**/*.min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(path.base + 'scripts'))
		.pipe(reload({stream:true}));
});

//==================================
// Sass Task
//==================================

// Local sass task
gulp.task('sass', function(){
	gulp.src(path.base + 'sass/**/*.sass')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['bower_components/foundation-sites/scss'],
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.base + 'css/'))
		.pipe(reload({stream:true}));
});

// Production sass task
gulp.task('sass-production', function(){
	gulp.src('assets/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['bower_components/foundation/scss'],
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest(path.base + 'css/'))
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
	gulp.watch(path.base + 'js/**/*.js', ['scripts']);
	gulp.watch(path.base + 'sass/**/*.scss', ['sass']);
	gulp.watch(path.base + 'sass/**/*.sass', ['sass']);
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
