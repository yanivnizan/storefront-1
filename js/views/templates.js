define( [
    "templates/basic-template.handlebars",
    "templates/basic-item.handlebars",
    "templates/basic-currencyPack.handlebars",
    "templates/grid-template.handlebars",
    "templates/grid-item.handlebars"
], function() {
    return {
        basic : {
            template    : Handlebars.templates["basic-template"],
            virtualGood : Handlebars.templates["basic-item"],
            currencyPack: Handlebars.templates["basic-currencyPack"]
        },
        grid : {
            template    : Handlebars.templates["grid-template"],
            virtualGood : Handlebars.templates["grid-item"],
            currencyPack: function(){}
        },
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){}
        }
    }
});
