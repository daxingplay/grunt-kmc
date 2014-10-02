/*
 * grunt-kmc
 * https://github.com/daxingplay/grunt-kmc
 *
 * Copyright (c) 2013 daxingplay
 * Licensed under the MIT license.
 */

'use strict';

var kmc = require('kmc'),
	fs = require('fs'),
    path = require('path'),
    os = require('os');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('kmc', 'Build KISSY modules.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(),
            depExt = options.depExt,
            depFilePath = options.depFilePath,
            comboOnly = options.comboOnly,
            depFileCharset = options.depFileCharset || options.charset,
            fixModuleName = options.fixModuleName === true,
            fixModuleNameOnDest = options.copyAssets === true,
			// 当 comboOnly 为 false（需要静态合并）时，将被合并入主文件的kmd文件删除
			cleanUp = options.cleanUp === true,
            traverse = options.traverse;
		
		// 被合并入主文件的kmd文件列表
		var combinedFiles = [];
		// src中指定的需要合并的入口文件列表
		var retainFiles = [];

		// added by jayli 2014-10-2
		// 从依赖的文件目录数组得到绝对地址数组
		var getResolvedFiles = function(a,dest){
			var result = [];
			//console.log(a);
			var moduleName;
			var outputFile= path.resolve(String(dest));
			var destRoot;
			a.forEach(function(item){
				for(var i in kmc._config.pkgs){
					if(item.indexOf(i) === 0){
						moduleName = i;
						break;
					}
				}
				// h5-test/widgets/calendar/index => /widgets/calendar/index
				var tname = item.replace(new RegExp('^'+moduleName,'i'),'');
				if(outputFile.indexOf(item)){
					destRoot = outputFile.replace(tname,'').replace(/\.js$/i,'');
					return false;
				}
			});
			a.forEach(function(item){
				for(var i in kmc._config.pkgs){
					if(item.indexOf(i) === 0){
						moduleName = i;
						break;
					}
				}
				// h5-test/widgets/calendar/index => ./widgets/calendar/index
				var rpath = item.replace(new RegExp('^'+moduleName,'i'),'.');
				if(!/\.(js|css)$/.test(rpath)){
					// 没有后缀，默认是js文件
					rpath += '.js';
				}
				//console.log('xxxx'+dest);
				result.push(path.resolve(destRoot,rpath));
			});
			return result;
		};

        kmc.config(options);

        // Iterate over all specified file groups.
        var results = [];
        this.files.forEach(function (f) {
            f.src.forEach(function(src){
                var depFile = '',
                    inputSrc = path.resolve(src),
                    outputSrc = path.resolve(String(f.dest));
                if(depExt || depFilePath){
                    depExt = depExt || '.dep';
                    var outputIsDir = grunt.file.isDir(outputSrc) || !/\.js$/.test(outputSrc);
                    if(depFilePath){
                        if(grunt.file.isDir(depFilePath) || !/.js$/.test(depFilePath)){
                            depFile = path.resolve(depFilePath, path.basename(outputIsDir ? path.basename(inputSrc, '.js') :outputSrc) + depExt + '.js');
                        }else{
                            depFile = depFilePath;
                        }
                    }else{
                        var dir = outputIsDir ? outputSrc : path.dirname(outputSrc);
                        depFile = path.resolve(dir, path.basename(inputSrc, '.js') + depExt + '.js');
                    }
                }
                var result = '';
                if(comboOnly === true){
                    var outputDir = grunt.file.isDir(outputSrc) ? outputSrc : path.dirname(outputSrc);
					var r = kmc.combo(inputSrc, options.comboMap !== true ? depFile : undefined, depFileCharset, fixModuleName, true, fixModuleNameOnDest ? outputDir : null,comboOnly === true);
					results.push(r);
                    options.comboMap !== true && grunt.log.ok('Dep File "' + depFile + '" created.');
                }else{
                    result = kmc.build(inputSrc, outputSrc, null, depFile, traverse);
                    results.push(result);
					combinedFiles = combinedFiles.concat(getResolvedFiles(result.files[0].combined,f.dest));
					retainFiles.push(outputSrc);
                    grunt.log.ok('File "' + result.files[0].outputFile + '" created.');
                }

            });
        });

		// added by jayli 2014-10-2
		if(options.comboOnly === false && options.cleanUp === true){
			combinedFiles.forEach(function(item){
				if(retainFiles.indexOf(item) < 0){
					try {
						fs.unlinkSync(item);
					} catch(e){
					}
					grunt.log.ok('clean Up files: '+ item);
				}
			});
		}

        if(options.comboMap === true){
            var content = [];
            var writed = [];
            results.forEach(function(result){
                if(result.modules){
                    for(var modName in result.modules){
                        if(writed.indexOf(modName) === -1){
                            var mod = result.modules[modName];
                            var requires = [];
                            if(mod && mod.dependencies && mod.dependencies.length){
                                mod.dependencies.forEach(function(subMod){
                                    requires.push("'" + subMod.name + "'");
                                });
                                content.push("'" + modName + "': { requires: [" + requires.join(', ') + "]}");
                            }
                            writed.push(modName);
                        }
                    }
                }
            });
            var r = '/*generated by KMC*/' + os.EOL;
            if(content.length){
                r += "KISSY.config('modules', {" + os.EOL + " " + content.join("," + os.EOL + " ") + " " + os.EOL + "});";
            }
            grunt.file.write(options.depFilePath, r, {'encoding':'utf8'});
            grunt.log.ok('combined dependency file ' + options.depFilePath + ' created.');
		}
    });

};
