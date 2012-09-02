define( [
    "templates/basic-template.handlebars",
    "templates/basic-item.handlebars",
    "templates/basic-currencyPack.handlebars",
    "templates/grid-template.handlebars",
    "templates/grid-item.handlebars"
], function() {

    // TODO: Refactor.  This is an ugly solution
    Handlebars.registerHelper('getPrice',function(currencyValues){
        return _.values(currencyValues)[0];
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
        empty : {
            template    : function(){},
            virtualGood : function(){},
            currencyPack: function(){}
        }
    }
});
