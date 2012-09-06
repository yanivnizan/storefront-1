define( [
    "../themes/templates/basic-template.handlebars",
    "../themes/templates/basic-item.handlebars",
    "../themes/templates/basic-currencyPack.handlebars",
    "../themes/templates/grid-template.handlebars",
    "../themes/templates/grid-item.handlebars",
    "../themes/templates/muffinRush-template.handlebars",
    "../themes/templates/muffinRush-item.handlebars",
    "../themes/templates/muffinRush-currencyPack.handlebars"
], function() {

    Handlebars.registerHelper('formatCurrency', function(value) {
        return parseFloat(value).toFixed(2);
    });

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
        muffinRush : {
            template    : templates["muffinRush-template"],
            virtualGood : templates["muffinRush-item"],
            currencyPack: templates["muffinRush-currencyPack"]
        },
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){}
        }
    }
});
