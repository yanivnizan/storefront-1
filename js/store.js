require(["models"], function(Models) {

    var StoreView = Backbone.View.extend({
        el : $("body"),
        initialize : function() {
            _.bindAll(this, "renderBackground", "renderTemplate", "render");
            this.model.on("change:background", this.renderBackground);
            this.model.on("change:templateName", this.renderTemplate);
            this.model.on("change:moreCurrencyText change:templateTitle", this.render);
        },
        renderBackground : function() {
            this.$(".background").remove();
            var background = $("<img>", {src : this.model.get("background"), class : "background"});
            this.$el.prepend(background);
        },
        renderTemplate : function() {
            var name = this.model.get("templateName");
            this.$("#main").empty().append(templates[name].template(this.model.toJSON()));


            // TODO: Release previous view bindings
            this.itemsView = new ItemCollectionView({
                el : $(".items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            });
        },
        render : function() {
            var name = this.model.get("templateName");
            this.$("#main").empty().append(templates[name].template(this.model.toJSON()));
            this.itemsView = new ItemCollectionView({
                el : $(".items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            }).render();
        }
    });

    // TODO: Change naming or move, to prevent name confusion with other ItemCollectionView
    var ItemCollectionView = Backbone.View.extend({
        initialize : function(options) {
            _.bindAll(this, "addItem");
            this.collection.on("add", this.addItem);
            return this;
        },
        addItem : function(item) {
            var name = this.options.templateName;
            this.$el.append(templates[name].item(item.toJSON()));
        },
        render : function() {
            var name = this.options.templateName;
            var $el = this.$el;

            // Render each item and append it
            this.collection.each(function(item) {
                $el.append(new ItemView({
                    model : item,
                    templateName : name
                }).render().el);
            })
        }
    });

    var ItemView = Backbone.View.extend({
        className : "item",
        tagName : "li",
        render : function() {
            var name = this.options.templateName;
            this.$el.append(templates[name].item(this.model.toJSON()));
            return this;
        }
    });


    var templates = {
        basic : {
            template : Handlebars.compile($("#basic-template").html()),
            item : Handlebars.compile($("#basic-item").html())
        }
    };

    $(function() {

        var Soomla = {
            bindPreview : function(store) {
                var storeView = new StoreView({ model : store });
            },
            newStore : function(props) {
                this.store = new Models.Store(props);
            },
            newStoreFromJSON : function(json) {
                var attributes = {};
                if (json.background) attributes.background = json.background;
                if (json.template) {
                    if (json.template.name)
                        attributes.templateName = json.template.name;
                    if (json.template.elements) {

                        if (json.template.elements.buyMore && json.template.elements.buyMore.text)
                            attributes.moreCurrencyText = json.template.elements.buyMore.text;

                        if (json.template.elements.title && json.template.elements.title.name)
                            attributes.templateTitle = json.template.elements.title.name;
                    }
                }
                if (json.virtualGoods)
                    attributes.virtualGoods = json.virtualGoods;

                this.store = new Models.Store(attributes);
            }
        };

        window.Soomla = Soomla;

    });
});