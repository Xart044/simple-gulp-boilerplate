'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import minCSS from 'gulp-clean-css';
import minJS from 'gulp-uglifyjs';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import Browsersync from 'browser-sync';
import browserify from 'browserify';
import gutil from 'gulp-util';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

gulp.task('sass',()=>{
	gulp.src('app/sass/main.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'));
});

gulp.task('js',()=>{
	return browserify('app/js/index.js')
	.transform(babelify.configure({
  		presets: ["es2015"]
	}))
	.bundle()
	.on('error',(e)=>{
		gutil.log(e);
	})
	.pipe(source('index.js'))
	.pipe(gulp.dest('app/scripts/'))
});

gulp.task('devserver',()=>{
	Browsersync.init({
		server:{
			baseDir: 'app'
		},
		notify:false
	});
});

gulp.task('CSS__prefix__minify',()=>{
	gulp.src('app/css/main.css')
	.pipe(autoprefixer({
		browser:'last 15 versions'
	}))
	.pipe(minCSS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/css'));	
});

gulp.task('html__minify',()=>{
	gulp.src('app/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/html'));
});

gulp.task('JS__babel__minify',()=>{
	gulp.src('app/scripts/*.js')
	.pipe(babel({
		presets:['es2015']
	}))
	.pipe(minJS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('dev',['devserver','sass','js'],()=>{
	gulp.watch('app/sass/**/*.sass',['sass',Browsersync.reload]);
	gulp.watch('app/js/**/*.js',['js',Browsersync.reload]);
	gulp.watch('app/index.html',Browsersync.reload);
});

gulp.task('production',['JS__babel__minify','CSS__prefix__minify','html__minify']);

gulp.task('default',['dev']);