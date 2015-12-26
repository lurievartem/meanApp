// Karma configuration
// Generated on Mon Dec 07 2015 17:59:35 GMT+0200 (FLE Standard Time)

module.exports = function(config) {
    'use strict';
    config.set({
        autoWatch: false,
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        // list of files / patterns to load in the browser
        files: [
            '../angular_app/libs/bind-polyfill/index.js',
            '../angular_app/libs/angular/angular.js',
            '../angular_app/libs/angular-messages/angular-messages.js',
            '../angular_app/libs/angular-mocks/angular-mocks.js',
            '../angular_app/libs/angular-resource/angular-resource.js',
            '../angular_app/libs/angular-ui-router/release/angular-ui-router.js',
            '../angular_app/libs/jquery/dist/jquery.js',
            '../angular_app/libs/bootstrap/dist/js/bootstrap.js',
            '../angular_app/libs/ngStorage/ngStorage.js',
            '../angular_app/libs/socket.io-client/socket.io.js',
            '../angular_app/js/*.js',
            '../angular_app/components/**/*.js',
            '../public/view/**/*.html',
            './unit/**/*.spec.js'
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../angular_app/js/*.js' :              ['browserify'],
            '../angular_app/components/**/*.js' :   ['browserify'],
            '../public/view/**/*.html':             ['ng-html2js']
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html'],
        port: 9876,
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'], //'Chrome'
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,

        browserify:{
            debug: true
        },

        htmlReporter: {
          outputDir: 'karma_html'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '../public/view/views/',
            moduleName: 'templates'
        },

        plugins : [
            'karma-chrome-launcher',
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-html-reporter',
            'karma-spec-reporter'
        ],

        browserNoActivityTimeout: 80000

    })
}
