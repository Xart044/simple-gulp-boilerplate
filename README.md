# Simple boilerplate for front-end developers 

Simple and awesome boilerplate for organizing your front-end workflow.  

##Features:
####1.Using gulp,browserify,babel.  
####2.Using ES2015 in your gulpfile.js
```javascript
'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import minCSS from 'gulp-clean-css';
import minJS from 'gulp-uglifyjs';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import babel from 'gulp-babel';
import Browsersync from 'browser-sync';
import browserify from 'browserify';
import gutil from 'gulp-util';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import clean from 'gulp-clean';
```
####3.Using ES2015 modules with browserify
####4.Using Sass preprocessor

## Installing:  
git copy https://github.com/Xart044/simple-gulp-boilerplate.git 

##CLI Usage: 
###Developing stage 
```cli
gulp dev
```
###Production stage 
```cli
gulp product
```
