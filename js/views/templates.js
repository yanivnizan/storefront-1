define( [
    "templates/basic-template.handlebars",
    "templates/basic-item.handlebars",
    "templates/grid-template.handlebars",
    "templates/grid-item.handlebars"
], function() {
    return {
        basic : {
            template    : Handlebars.templates["basic-template"],
            item        : Handlebars.templates["basic-item"]
        },
        grid : {
            template    : Handlebars.templates["grid-template"],
            item        : Handlebars.templates["grid-item"]
        },
        empty : {
            template    : function(){},
            item        : function(){}
        }
    }
});
