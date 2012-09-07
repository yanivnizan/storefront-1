/*global module:false*/
require('shelljs/global');


module.exports = function (grunt) {

    // Project configuration.
    var config = {
        meta : {
            version : '0.1.0',
            banner : '/*! PROJECT_NAME - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* http://PROJECT_WEBSITE/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'YOUR_NAME; Licensed MIT */'
        },
        less : {
            store : {
                src  :'css/store.less',
                dest :'dist/css/store.css',
                options : {
                    compress : true
                }
            }
        },
        requirejs : {
            baseUrl         : 'js',
            mainConfigFile  : 'js/main-store.js',
            name            : "main-store",
            out             : "dist/js/main-store.js"
        }
    };

    // Extend the config object to include LESS pre-compilation tasks for all themes
    var themes = ls("themes");
    themes.forEach(function(name) {
        config.less[name] = {
            src  :'dist/themes/' + name + '/less/' + name + '.less',
            dest :'dist/themes/' + name + '/' + name + '.css',
            options:{
                compress:true
            }
        }
    });

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-requirejs');


    // Register helper tasks

    grunt.registerTask('copy', 'Copies more necessary resources to the distribution folder', function() {

        // Copy Javascript
        mkdir("-p", "dist/js/libs");
        cp("js/libs/require.js", "dist/js/libs/");

        // Copy HTML & images
        cp("store.html", "dist/");
        cp("-R", "img", "dist/");

        // Copy themes
        cp("-R", "themes/", "dist/");
    });

    grunt.registerTask('clean', 'Cleans the distribution folder', function() {
        rm("-rf", "dist");
        mkdir("dist");
    });

    // Default task.
    grunt.registerTask('default', 'clean copy less requirejs');
};
