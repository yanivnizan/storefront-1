$(function() {

    var StoreView = Backbone.View.extend({
        el : $("body"),
        initialize : function() {
            _.bindAll(this, "renderBackground", "renderTemplate");
            this.model.on("change:background", this.renderBackground);
            this.model.on("change:template", this.renderTemplate);
        },
        renderBackground : function() {
            this.$(".background").remove();
            var background = $("<img>", {src : this.model.get("background"), class : "background"});
            this.$el.prepend(background);
        },
        renderTemplate : function() {
            var name = this.model.get("template");
            this.$("#main").empty().append(templates[name]());
        }
    });

    var store;

    var templates = {
        basic : Handlebars.compile($("#basic-template").html())
    };


    var Soomla = {
        bindPreview : function(s) {
            store = s;
            var storeView = new StoreView({
                model : store
            });


        }
    };

    window.Soomla = Soomla;

});