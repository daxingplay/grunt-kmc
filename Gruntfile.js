/*
 * grunt-kmc
 * https://github.com/daxingplay/grunt-kmc
 *
 * Copyright (c) 2013 daxingplay
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        kmc: {
            index: {
                options: {
                    packages: [{
                        name: 'assets',
                        path: 'test/'
                    }],
                    depExt: '.dep',
                    suffix: '.combo',
                    comboOnly: false
                },
                files: [{
                    src: 'test/assets/*.js',
                    dest: 'tmp/assets/'
                }]
            },
            combo: {
                options: {
                    packages: [{
                        name: 'assets',
                        path: 'test/'
                    }],
                    depExt: '.dep',
                    comboOnly: true
                },
                files: [{
                    src: 'test/assets/index.js',
                    dest: 'tmp/assets/combo/'
                }]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'kmc', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
