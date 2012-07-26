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
            this.$("#main").empty().append(templates[name].template());


            // TODO: Release previous view bindings
            this.itemsView = new ItemCollectionView({
                el : $(".items"),
                collection : this.collection,
                model : this.model
            });
        }
    });

    var ItemCollectionView = Backbone.View.extend({
        initialize : function(options) {
            _.bindAll(this, "addItem");
            this.collection.on("add", this.addItem);
        },
        addItem : function(item) {
            var name = this.options.model.get("template");
            this.$el.append(templates[name].item(item.toJSON()));
        }
    });

    var templates = {
        basic : {
            template : Handlebars.compile($("#basic-template").html()),
            item : Handlebars.compile($("#basic-item").html())
        }
    };


    var Soomla = {
        bindPreview : function(store, itemCollection) {
            var storeView = new StoreView({
                model : store,
                collection : itemCollection
            });

        }
    };

    window.Soomla = Soomla;

});