/*global module:false*/
require('shelljs/global');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta : {
            version:'0.1.0',
            banner:'/*! PROJECT_NAME - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* http://PROJECT_WEBSITE/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'YOUR_NAME; Licensed MIT */'
        },
        less:{
            all:{
                src  :['css/store.less'],
                dest :'dist/css/store.css',
                options:{
                    compress:true
                }
            }
        },
        requirejs:{
            baseUrl         : 'js',
            mainConfigFile  : 'js/main-store.js',
            name            : "main-store",
            out             : "dist/js/main-store.js"
        }
    });

    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-requirejs');

    // Register helper tasks

    grunt.registerTask('copy', 'Copies more necessary resources to the distribution folder', function() {
        mkdir("-p", "dist/js/libs");
        cp("js/libs/require.js", "dist/js/libs/");
        cp("store.html", "store_def.json", "dist/");
        cp("-R", "img", "dist/");
    });
    grunt.registerTask('clean', 'Cleans the distribution folder', function() {
        rm("-rf", "dist");
        mkdir("dist");
    });

    // Default task.
    grunt.registerTask('default', 'clean copy less requirejs');
};
