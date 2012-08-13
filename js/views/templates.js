define(["handlebars"], function() {
    return {
        basic : {
            template : Handlebars.compile($("#basic-template").html()),
            item : Handlebars.compile($("#basic-item").html())
        },
        grid : {
            template : Handlebars.compile($("#grid-template").html()),
            item : Handlebars.compile($("#grid-item").html())
        },
        empty : {
            template : function(){},
            item : function(){}
        }
    }
});
