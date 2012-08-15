define( [
    "templates/basic-template.handlebars",
    "templates/basic-item.handlebars",
    "templates/basic-currencyPack.handlebars",
    "templates/grid-template.handlebars",
    "templates/grid-item.handlebars"
], function() {

    var templates = Handlebars.templates;

    return {
        basic : {
            template    : templates["basic-template"],
            virtualGood : templates["basic-item"],
            currencyPack: templates["basic-currencyPack"]
        },
        grid : {
            template    : templates["grid-template"],
            virtualGood : templates["grid-item"],
            currencyPack: function(){}
        },
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){}
        }
    }
});
