var gulp = require('gulp');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var rename=require('gulp-rename'),
	cssmin=require('gulp-minify-css'),
	htmlmin=require('gulp-htmlmin'),
	imgmin=require('gulp-imagemin'),
	includeFile=require('gulp-file-include');

gulp.task('script',function(){
  gulp.src('src/js/*.js')
  	  .pipe(concat('all.js'))
  	  .pipe(gulp.dest('dest/js'))
  	  .pipe(rename('all.min.js'))
  	  .pipe(uglify())
  	  .pipe(gulp.dest('dest/js'))
});
gulp.task('cssmini',function(){
	gulp.src('src/css/*.css')
	    .pipe(cssmin())
	    .pipe(gulp.dest('dest/css'))
});
gulp.task('htmlmini',function(){
	var options={
		removeComments:true,
		collapseBooleanAttributes:true,
		removeEmptyAttributes:true,
		minifyJS:true,
		minifyCSS:true
	};
	gulp.src('src/html/*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('dest/html'))
});
gulp.task('imgmini',function(){
	gulp.src('src/assets/*')
		.pipe(imgmin())
		.pipe(gulp.dest('dest/assets'))
});
gulp.task('fileinclude',function(){
	gulp.src('src/html/*.html')
		.pipe(includeFile({
			prefix:'@@',
		}))
		.pipe(gulp.dest('dest/html/'))
});
//默认任务
gulp.task('default',function(){
	gulp.run('fileinclude');
	gulp.run('script');
	gulp.run('script');
	gulp.run('cssmini');
	gulp.run('htmlmini');
	gulp.run('imgmini');
});


