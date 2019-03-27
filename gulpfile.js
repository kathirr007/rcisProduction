var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true }),
	compass = require('gulp-compass'),
	pngcrush = require('imagemin-pngcrush'),
	del = require('del');

var env,
	htmlSources,
	jsSources,
	sassSources,
	cssSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/';
}

htmlSources = ['sources/html/*.*'];
cssSources = ['sources/css/*.css'];
imageSources = ['sources/images/**/*.*'];
jsSources = ['sources/js/jquery-1.7.1.min.js',
				'sources/js/html5.js',
				'sources/js/jquery.hoverIntent.js',
				'sources/js/jquery.responsivemenu.js',
				'sources/js/jquery.easing.1.3.js',
				'sources/js/jquery.equalheights.js',
				'sources/js/superfish.js',
				'sources/js/slides.min.jquery.js',
				'sources/js/forms.js',
				'sources/js/slides.js',
				'sources/js/slider.min.js',
				'sources/js/slides_touch.js'
			];

gulp.task('clean', function(){
	del([outputDir + '*']);
});

gulp.task('html', function(){
	return gulp.src(htmlSources)
	.pipe($.if(env==='production', $.minifyHtml({
		conditionals: true,
		spare: true
	})))
	.pipe(gulp.dest(outputDir))
	.pipe($.connect.reload())
});

gulp.task('css', function(){
	return gulp.src(cssSources)
	.pipe($.concat('style.css'))
	.pipe($.if(env==='production', $.minifyCss()))
	.pipe(gulp.dest(outputDir + 'css'))
	.pipe($.connect.reload())
});

gulp.task('images', function(){
	return gulp.src(imageSources)
	.pipe($.if(env==='production', $.imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngcrush()]
	})))
	.pipe(gulp.dest(outputDir + 'images'))
	.pipe($.connect.reload())
});

gulp.task('optim-images', function() {
	// var imageFilter = $.filter(['**/*.jpg', '**/*.png'], {restore: true});
	// var imageFilter = $.filter(['**/*.{jpg,png,gif,bmp,tif,svg}', '!**/*.{ico}'], {restore: true});
	return gulp.src(imageSources)
	  .pipe($.size({title: 'Total images in '}))
	  .pipe($.newer(outputDir + 'images'))
	  .pipe($.plumber())
	  .pipe($.image({
			jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
			// mozjpeg: ['-optimize', '-progressive'],
			// guetzli: ['--quality', 85],
			quiet: true
		}))
	  .pipe($.size({title: 'Total images out '}))
	  .pipe(gulp.dest(outputDir + 'images'));
  });

gulp.task('js', function(){
	return gulp.src(jsSources)
	.pipe($.concat('script.js'))
	.pipe($.browserify())
	.pipe($.if(env==='production', $.uglify()))
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe($.connect.reload())
});

gulp.task('connect', function(){
	$.connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('watch', function(){
	gulp.watch(htmlSources, gulp.series('html'));
	gulp.watch(cssSources, gulp.series('css'));
	gulp.watch(jsSources, gulp.series('js'));
	gulp.watch(imageSources, gulp.series('optim-images'));
});

gulp.task('default', gulp.parallel('html', 'optim-images', 'js', 'connect', 'watch', 'css'));
gulp.task('production', gulp.parallel('html', 'optim-images', 'js', 'css'));