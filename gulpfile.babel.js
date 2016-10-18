'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import minCSS from 'gulp-clean-css';
import minJS from 'gulp-uglifyjs';
import babel from 'gulp-babel';
import Browsersync from 'browser-sync';

gulp.task('sass',()=>{
	gulp.src('app/sass/main.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'));
});

gulp.task('transpiler',()=>{
	gulp.src('app/js/index.js')
	.pipe(babel({
		presets:['es2015']
	}))
	.pipe(gulp.dest('app/scripts'));
});

gulp.task('devserver',()=>{
	Browsersync.init({
		server:{
			baseDir: 'app'
		},
		notify:false
	});
});

gulp.task('libJS',()=>{
	gulp.src([
// libs JS in app folder
	])
	.pipe(gulp.dest('dist/scripts/libs'));
});

gulp.task('libCSS',()=>{
	gulp.src([
// libs CSS in app folder
	])
	.pipe(gulp.dest('dist/css/libs'));
})

gulp.task('css',()=>{
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

gulp.task('js',()=>{
	gulp.src('app/scripts/index.js')
	.pipe(minJS())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch',['devserver','sass','transpiler'],()=>{
	gulp.watch('app/sass/**/*.sass',['sass',Browsersync.reload]);
	gulp.watch('app/js/**/*.js',['transpiler',Browsersync.reload]);
	gulp.watch('app/index.html',Browsersync.reload);
});

gulp.task('product',['js','css','html','libJS','libCSS']);

gulp.task('default',['watch']);