/*
 * grunt-kmc
 * https://github.com/daxingplay/grunt-kmc
 *
 * Copyright (c) 2013 daxingplay
 * Licensed under the MIT license.
 */

'use strict';

var kmc = require('kmc'),
    path = require('path');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('kmc', 'Build KISSY modules.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(),
            depExt = options.depExt,
            depFilePath = options.depFilePath;

        kmc.config(options);

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            var depFile = '',
                inputSrc = path.resolve(String(f.src)),
                outputSrc = path.resolve(String(f.dest));
            if(depExt || depFilePath){
                depExt = depExt || '.dep';
                if(depFilePath){
                    depFile = grunt.file.isDir(depFilePath) ? depFilePath = path.resolve(depFilePath, path.basename(outputSrc) + depExt + '.js') : depFilePath;
                }else{
                    depFile = path.resolve(path.dirname(outputSrc), path.basename(inputSrc, '.js') + depExt + '.js');
                }
            }
            kmc.build(inputSrc, outputSrc, '', depFile);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
