var gulp            = require('gulp');
var concat          = require('gulp-concat');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var sass            = require('gulp-sass');
var minifyCss       = require('gulp-minify-css');
var uglify          = require('gulp-uglify');
var mainBowerFiles  = require('gulp-main-bower-files');
var flatten         = require('gulp-flatten');
var filter          = require('gulp-filter');
var nodemon         = require('gulp-nodemon');
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var rename          = require('gulp-rename');
var sourcemaps      = require('gulp-sourcemaps');
var ngAnnotate      = require('gulp-ng-annotate');
var del             = require('del');
var mocha           = require('gulp-mocha');
var Server          = require('karma').Server;
var config          = require('./config/server');

gulp.task('uniteLibsFiles', function(){
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    return gulp.src('./bower.json')
            .pipe(mainBowerFiles({
                includeDev : true,
                overrides: {
                    bootstrap: {
                        main: [
                            './dist/js/bootstrap.js',
                            './dist/css/*.min.*',
                            './dist/fonts/*.*'
                        ]
                    }
                }
            }))
            .pipe(jsFilter)
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/libs/'))
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe(concat('libs.css'))
            .pipe(gulp.dest('./public/libs'));
});

gulp.task('browserify', function(){
    return browserify({
                entries: ['./angular_app/js/app.js'],
              //  paths: ['./angular_app/components/'],
                debug: true
           })
           .bundle()
           .pipe(source('app.js'))
           .pipe(jshint())
           .pipe(jshint.reporter(stylish))
           .pipe(gulp.dest('./public/js'));
});

gulp.task('js', ['browserify'], function(){
    return gulp.src('./public/js/app.js')
    	    .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./public/js'))
});

gulp.task('sass', function(){
    return gulp.src('./angular_app/**/*.scss')
            .pipe(sass())
            .pipe(rename({ dirname: '/' }))
            .pipe(gulp.dest('./public/css'));
});

gulp.task('css', ['sass'], function(){
    return gulp.src('./public/css/style.css')
            .pipe(minifyCss())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./public/css'))
});

gulp.task('view', function(){
    return gulp.src('./angular_app/**/*.html')
            .pipe(gulp.dest('./public/view'))
});

gulp.task('image', function(){
    return gulp.src(['./angular_app/img/*.jpg', './angular_app/img/*.ico' ])
            .pipe(gulp.dest('./public/img'));
});

gulp.task('lint', function(){
    return gulp.src(['./app/**/*.js', './config/**/*.js', 'server.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
    gulp.watch('bower.json', ['uniteLibsFiles']);
    gulp.watch('./angular_app/**/*.js', ['js']);
    gulp.watch('./angular_app/**/*.css', ['css']);
    gulp.watch('./angular_app/**/*.html', ['view']);
    gulp.watch('./angular_app/**/*.jpg', ['image']);
});

gulp.task('testb', function(){
    return gulp.src(['./tests/cont_integration/app/**/*.spec.js'], {read: false})
        .pipe(mocha({ reporter: 'list'}));
});

gulp.task('test', function(done){
    return new Server({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('clean', function(){
    del('./public/**/*');
});

gulp.task('angular', ['image', 'uniteLibsFiles', 'css', 'js', 'view']);

gulp.task('develop', ['lint', 'angular', 'watch'], function(){
    return nodemon({
        script: 'server.js',
        ext: 'js, html',
        env: { 'NODE_ENV': 'development'}
    }).on('restart', function(){
        console.log('server restart on port:' + config.port);
    });
});
