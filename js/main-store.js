require.config({
    baseUrl : "js",
    paths: {
        components          : "views/components",
        storeViews          : "views/store-views",
        viewMixins          : "views/view-mixins",
        cssUtils            : "views/css-utils",
        templates           : "views/templates",

        // 3rd party modules
        jquery              : "libs/jquery/jquery-1.8.0.min",
        modernizr           : "libs/modernizr-2.5.3.min",   // From Modernizr docs: If you don't support IE8 and don't need to worry about FOUC, feel free to include modernizr.js whereever
        less                : "libs/less-1.3.0.min",
        underscore          : "libs/underscore-min",
        backbone            : "libs/backbone-min",
        backboneRelational  : "libs/backbone-relational",
        handlebars          : "libs/handlebars-1.0.0.beta.6"
    },
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
        handlebars : {
            exports : "Handlebars"
        },
        templates : {
            deps: ['handlebars']
        }

        // No need to export globally in 'shim' section
    }
});
require(["modernizr", "store"]);