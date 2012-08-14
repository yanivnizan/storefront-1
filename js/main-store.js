require.config({
    baseUrl : "js",
    paths: {
        storeViews  : "views/store-views",
        templates   : "views/templates",

        // 3rd party modules
        less        : "libs/less-1.3.0.min",
        underscore  : "libs/underscore-min",
        backbone    : "libs/backbone-min",
        handlebars  : "libs/handlebars.runtime-1.0.0.beta.6"
    },
    shim: {
        'templates': {
            deps: ['handlebars']
        },
        handlebars : {
            exports : "Handlebars"
        }
    }
});
require(["store"]);