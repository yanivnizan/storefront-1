/*global module:false*/
require('shelljs/global');


module.exports = function (grunt) {

    var distFolder = "soomla_ui";

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
                dest :distFolder + '/css/store.css',
                options : {
                    compress : true
                }
            }
        },
        requirejs : {
            baseUrl         : 'js',
            mainConfigFile  : 'js/main-store.js',
            name            : "main-store",
            out             : distFolder + "/js/main-store.js"
        }
    };

    // TODO: Don't pre-compile stylesheets for all themes, just the one that's needed
    // Extend the config object to include LESS pre-compilation tasks for all themes
    var themes = ls("themes");
    themes.forEach(function(name) {
        config.less[name] = {
            src  :distFolder + '/themes/' + name + '/less/' + name + '.less',
            dest :distFolder + '/themes/' + name + '/' + name + '.css',
            options:{
                compress:true
            }
        }
    });

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-requirejs');


    // Register helper tasks

    grunt.registerTask('copy', 'Copies more necessary resources to the distribution folder', function(theme) {

        // Copy Javascript
        mkdir("-p", distFolder + "/js/libs");
        mkdir("-p", distFolder + "/themes");
        cp("js/libs/require.js", distFolder + "/js/libs/");

        // Copy HTML & images
        cp("store.html", distFolder + "/");
        cp("-R", "img", distFolder + "/");

        // Copy themes
        cp("-R", "themes/" + theme + "/", distFolder + "/themes/");
    });

    grunt.registerTask('clean', 'Cleans the distribution folder', function() {
        rm("-rf", distFolder);
    });

    grunt.registerTask('handlebars', "Pre-compile theme's Handlebars.js templates", function(theme) {
        // Backup file before appending Handelbars templates to it.
        cp("js/views/templates.js", "./");

        var command = "handlebars --min themes/" + theme + "/templates/ >> ./js/views/templates.js";
        exec(command, {async : true, silent : true});
    });

    grunt.registerTask('cleanup', 'Cleans leftover files from the build process', function() {
        // Restore backed up file (before Handlebars templates were appended to it).
        mv("-f", "./templates.js", "./js/views/templates.js");
    });


    // Default task.
    themes.forEach(function(name) {
        grunt.registerTask("theme:" + name, 'clean copy:' + name + ' less handlebars:' + name + ' requirejs cleanup');
    });
};
