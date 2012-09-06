require.config({
    baseUrl : "js",
    paths: {
        components          : "views/components",
        storeViews          : "views/store-views",
        templates           : "views/templates",
        themes              : "views/themes",
        modalComponent      : "views/components/modal-component.handlebars",

        // 3rd party modules
        jquery              : "libs/jquery/jquery-1.8.0.min",
        modernizr           : "libs/modernizr-2.5.3.min",   // From Modernizr docs: If you don't support IE8 and don't need to worry about FOUC, feel free to include modernizr.js whereever
        less                : "libs/less-1.3.0.min",
        underscore          : "libs/underscore-min",
        backbone            : "libs/backbone-min",
        backboneRelational  : "libs/backbone-relational",
        handlebars          : "libs/handlebars.runtime-1.0.0.beta.6"
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
        templates: {
            deps: ['handlebars']
        },
        modalComponent: {
            deps: ['handlebars']
        },
        handlebars : {
            exports : "Handlebars"
        }

        // No need to export globally in 'shim' section
    }
});
require(["modernizr", "store"]);