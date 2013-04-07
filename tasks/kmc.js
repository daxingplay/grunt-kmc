/*
 * grunt-kmc
 * https://github.com/daxingplay/grunt-kmc
 *
 * Copyright (c) 2013 daxingplay
 * Licensed under the MIT license.
 */

'use strict';

var kmc = require('module-compiler'),
    path = require('path');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('kmc', 'Build KISSY modules.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        kmc.config(options);

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            var result = kmc.build(path.resolve(String(f.src)), path.resolve(String(f.dest)));

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
