module.exports = function (grunt) {

	var task = grunt.task;

	// 如果 Gruntfile.js 编码为 gbk，打开此注释
	// grunt.file.defaultEncoding = 'gbk';
	
    grunt.initConfig({

        // 对build目录进行清理
        clean: {
            build: {
                src: 'build/*'
			}
        },

        /**
         * 将src目录中的KISSY文件做编译打包，仅解析合并，源文件不需要指定名称
		 * 		KISSY.add(<名称留空>,function(S){});
		 *
         * 		@link https://github.com/daxingplay/grunt-kmc
		 * 		@link http://docs.kissyui.com/1.4/docs/html/guideline/kmc.html
         */
        kmc: {
            options: {
                // depFilePath: 'build/map.js',
                comboOnly: true,
                fixModuleName:true,
                comboMap: false,
                packages: [
                    {
                        name: 'xcake',
                        path: './build/',
						charset:'utf-8',
						ignorePackageNameInUri:true
                    }
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
						cwd: 'build/',
						// 仅合并这两个文件
                        src: [ '**/*.js','!map.js'],
                        dest: 'build/'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand:true,
                        cwd:'src/',
                        src: ['**/*.js'], dest: 'build/'}
                ]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-copy');
	return grunt.registerTask('default', '默认流程', function(type) {
		task.run(['clean:build','copy', 'kmc']);
	});

};
