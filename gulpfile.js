'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var series = require('stream-series');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
//const sourceMaps = require("gulp-sourcemaps");
const path = require("path");

// --- Environment ---
var envs = {
    dev: 'dev',
    prod: 'prod'
};

var environment = process.env.ENVIRONMENT || envs.dev;


// --- Paths ---

var paths = {


    jshintPaths: ['public/js/**/*.js'],
    sourceRootNode: path.join(__dirname, 'app'),
    sourceRootServer: path.join(__dirname, 'server.js')
};

var sources = {

    appjs: 'public/js/app.js',
    angularFiles:  ['public/js/**/*'],
    configDev: 'config/config.dev.js',
    configProd: 'config/config.prod.js',
    env: '.env',
    files: 'public/files/*',
    index: 'public/index.html',
    injectedJs:  ['public/js/**/*.js', '!public/js/app.js'],
    libs: 'public/libs/**/*',
    node: ['app/**/*'],
    passportConfig: './config/passport.js',
    sass: 'public/sass/**/*.scss',
    server: 'server.js',
    views: 'public/views/**/*'

};

var dest = {

    config: 'dist/config',
    configName: 'config.js',
    css: 'dist/public/css',
    dist: 'dist/',
    env: 'dist',
    files: 'dist/public/files',
    angularFiles: 'dist/public/js',
    libs: 'dist/public/libs',
    node: 'dist/app',
    public: 'dist/public',
    views: 'dist/public/views'

};

// -------------



// --- Testing, Linting, Etc ---

//Run jshint on our javascript files
gulp.task('jshint', function(){
    return gulp.src(paths.jshintPaths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// -----------------------------



// --- Move Tasks ---

gulp.task('libs', function(){
    return gulp.src(sources.libs)
    .pipe(gulp.dest(dest.libs));
});

gulp.task('views', function(){
    return gulp.src(sources.views)
    .pipe(gulp.dest(dest.views));
});

gulp.task('server', function(){
    return gulp.src(sources.server)
	    //.pipe(sourceMaps.init())
	    //.pipe(sourceMaps.write('.', { sourceRoot: paths.sourceRootServer}))
    .pipe(gulp.dest(dest.dist));
});

gulp.task('node', function(){
    return gulp.src(sources.node)
    //.pipe(sourceMaps.init())
    //.pipe(sourceMaps.write('.', { sourceRoot: paths.sourceRootNode}))
    .pipe(gulp.dest(dest.node));
});

gulp.task('angularFiles', function(){
    return gulp.src(sources.angularFiles)
    .pipe(gulp.dest(dest.angularFiles));
});

gulp.task('files', function(){
    return gulp.src(sources.files)
    .pipe(gulp.dest(dest.files));
});

//Move env file
gulp.task('env', function(){
    return gulp.src(sources.env)
    .pipe(gulp.dest(dest.env));
});

gulp.task('config', function(){
    var src;
    if(environment === envs.dev){
        src = sources.configDev;
    } else if(environment === envs.prod){
        src = sources.configProd;
    } else {
        console.error('Unknown environment');
    }

    return gulp.src(src)
        .pipe(rename(dest.configName))
        .pipe(gulp.dest(dest.config));
});

gulp.task('config-passport', function(){
    return gulp.src(sources.passportConfig)
    .pipe(gulp.dest(dest.config));
});

gulp.task('move', ['libs', 'views', 'server', 'angularFiles', 'node', 'env',
                   'files', 'config', 'config-passport']);

// ------------------



// --- Compilation Tasks ---

//Set up index.html, injecting required js files
gulp.task('index', function(){
    return gulp.src(sources.index)
    .pipe(inject(series(
        gulp.src(sources.injectedJs, {read:false}), 
        gulp.src(sources.appjs, {read:false}) ), 
        {relative:true}))
        .pipe(gulp.dest(dest.public));
});

gulp.task('sass', function(){
    return gulp.src(sources.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest.css));
});

gulp.task('compile', ['index', 'sass']);

// -------------------------


gulp.task('build', ['compile', 'move']);


gulp.task('clean', function(){
    return gulp.src(dest.dist)
    .pipe(clean());
});

gulp.task('default', ['jshint', 'build']);


gulp.task('watch', function() {
    gulp.watch(sources.sass, ['sass']);

    gulp.watch(sources.server, ['server']); 

    gulp.watch(sources.angularFiles, ['angularFiles']);
});

gulp.task('dev', ['watch'], function(){
    nodemon({
        script: 'dist/server.js'
    });

});
