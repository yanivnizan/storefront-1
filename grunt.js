/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
//    lint: {
//      files: ['grunt.js', 'lib/**/*.js', 'spec/**/*.js']
//    },
//    qunit: {
//      files: ['spec/**/*.html']
//    },
//    concat: {
//      dist: {
//        src: ['<banner:meta.banner>', '<file_strip_banner:lib/FILE_NAME.js>'],
//        dest: 'dist/FILE_NAME.js'
//      }
//    },
    min: {
      dist: {
        src: ['js/store.js', 'js/native-api.js', 'js/models.js'],
        dest: 'dist/build.js',
          separator: ';'
      }
    },
//    watch: {
//      files: '<config:lint.files>',
//      tasks: 'lint qunit'
//    },
//    jshint: {
//      options: {
//        curly: true,
//        eqeqeq: true,
//        immed: true,
//        latedef: true,
//        newcap: true,
//        noarg: true,
//        sub: true,
//        undef: true,
//        boss: true,
//        eqnull: true,
//        browser: true
//      },
//      globals: {
//        jQuery: true
//      }
//    },


      less: {
          all: {
              src: ['css/store.less'],
              dest: 'dist/css/store.css',
              options: {
                  compress: true
              }
          }
      },
      requirejs: {
          baseUrl: 'js',
          mainConfigFile: 'js/main-store.js',
          name: "main-store",
          out: "dist/js/main-store.js"
      },

      uglify: {}
  });

    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
//  grunt.registerTask('default', 'lint qunit concat min');
  grunt.registerTask('default', 'less requirejs');

};
