define(["handlebars"], function() {
    return {
        basic : {
            template : Handlebars.compile($("#basic-template").html()),
            item : Handlebars.compile($("#basic-item").html())
        },
        empty : {
            template : function(){},
            item : function(){}
        }
    }
});
