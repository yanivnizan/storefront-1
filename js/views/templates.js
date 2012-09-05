define( [
    "templates/basic-template.handlebars",
    "templates/basic-item.handlebars",
    "templates/basic-currencyPack.handlebars",
    "templates/grid-template.handlebars",
    "templates/grid-item.handlebars",
    "templates/muffinRush-template.handlebars"
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
            virtualGood : templates["basic-item"],
            currencyPack: templates["basic-currencyPack"]
        },
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){}
        }
    }
});
