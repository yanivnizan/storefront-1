require.config({
    baseUrl : "js",
    paths: {
        components          : "views/components",
        storeViews          : "views/store-views",
        templates           : "views/templates",

        // 3rd party modules
        less                : "libs/less-1.3.0.min",
        underscore          : "libs/underscore-min",
        backbone            : "libs/backbone-min",
        backboneRelational  : "libs/backbone-relational",
        handlebars          : "libs/handlebars.runtime-1.0.0.beta.6"
    },
    // TODO: Check if necessary in generator
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        backboneRelational : {
            deps: ['backbone']
        },
        templates: {
            deps: ['handlebars']
        },
        handlebars : {
            exports : "Handlebars"
        }
    }

});


require(["startup"], function(Main) {
    $(Main.startup);
});

