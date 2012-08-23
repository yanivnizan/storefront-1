require.config({
    baseUrl : "js",
    paths: {
        components          : "views/components",
        storeViews          : "views/store-views",
        templates           : "views/templates",
        modalComponent      : "views/templates/modal-component.handlebars",

        // 3rd party modules
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
    }
});
require(["store"]);