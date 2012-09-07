define( [
    "../themes/templates/basic-template.handlebars",
    "../themes/templates/basic-item.handlebars",
    "../themes/templates/basic-currencyPack.handlebars",
    "../themes/templates/grid-template.handlebars",
    "../themes/templates/grid-item.handlebars",
    "modalDialog"
], function() {

    Handlebars.registerHelper('formatCurrency', function(value) {
        return parseFloat(value).toFixed(2);
    });

    var templates = Handlebars.templates;

    return {
        basic : {
            template    : templates["basic-template"],
            virtualGood : templates["basic-item"],
            currencyPack: templates["basic-currencyPack"],
            modalDialog : templates["modal-dialog"]
        },
        grid : {
            template    : templates["grid-template"],
            virtualGood : templates["grid-item"],
            currencyPack: function(){},
            modalDialog : templates["modal-dialog"]
        },
//        muffinRush : {
//            template    : templates["muffinRush-template"],
//            virtualGood : templates["muffinRush-item"],
//            currencyPack: templates["muffinRush-currencyPack"],
//            modalDialog : templates["muffinRush-modalDialog"]
//        },
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){},
            modalDialog : function(){}
        }
    }
});
